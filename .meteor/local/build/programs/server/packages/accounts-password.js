(function () {

/* Imports */
var meteorEnv = Package.meteor.meteorEnv;
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var NpmModuleBcrypt = Package['npm-bcrypt'].NpmModuleBcrypt;
var Accounts = Package['accounts-base'].Accounts;
var SRP = Package.srp.SRP;
var SHA256 = Package.sha.SHA256;
var EJSON = Package.ejson.EJSON;
var DDP = Package['ddp-client'].DDP;
var DDPServer = Package['ddp-server'].DDPServer;
var Email = Package.email.Email;
var EmailInternals = Package.email.EmailInternals;
var Random = Package.random.Random;
var check = Package.check.check;
var Match = Package.check.Match;
var _ = Package.underscore._;
var ECMAScript = Package.ecmascript.ECMAScript;
var meteorInstall = Package.modules.meteorInstall;
var Buffer = Package.modules.Buffer;
var process = Package.modules.process;
var Symbol = Package['ecmascript-runtime'].Symbol;
var Map = Package['ecmascript-runtime'].Map;
var Set = Package['ecmascript-runtime'].Set;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;

var require = meteorInstall({"node_modules":{"meteor":{"accounts-password":{"email_templates.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/accounts-password/email_templates.js                                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
function greet(welcomeMsg) {                                                                                           // 1
  return function (user, url) {                                                                                        // 2
    var greeting = user.profile && user.profile.name ? "Hello " + user.profile.name + "," : "Hello,";                  // 3
    return greeting + "\n\n" + welcomeMsg + ", simply click the link below.\n\n" + url + "\n\nThanks.\n";              // 5
  };                                                                                                                   //
}                                                                                                                      //
                                                                                                                       //
/**                                                                                                                    //
 * @summary Options to customize emails sent from the Accounts system.                                                 //
 * @locus Server                                                                                                       //
 */                                                                                                                    //
Accounts.emailTemplates = {                                                                                            // 20
  from: "Meteor Accounts <no-reply@meteor.com>",                                                                       // 21
  siteName: Meteor.absoluteUrl().replace(/^https?:\/\//, '').replace(/\/$/, ''),                                       // 22
                                                                                                                       //
  resetPassword: {                                                                                                     // 24
    subject: function () {                                                                                             // 25
      function subject(user) {                                                                                         // 25
        return "How to reset your password on " + Accounts.emailTemplates.siteName;                                    // 26
      }                                                                                                                //
                                                                                                                       //
      return subject;                                                                                                  //
    }(),                                                                                                               //
    text: function () {                                                                                                // 28
      function text(user, url) {                                                                                       // 28
        var greeting = user.profile && user.profile.name ? "Hello " + user.profile.name + "," : "Hello,";              // 29
        return greeting + "\n\nTo reset your password, simply click the link below.\n\n" + url + "\n\nThanks.\n";      // 31
      }                                                                                                                //
                                                                                                                       //
      return text;                                                                                                     //
    }()                                                                                                                //
  },                                                                                                                   //
  verifyEmail: {                                                                                                       // 41
    subject: function () {                                                                                             // 42
      function subject(user) {                                                                                         // 42
        return "How to verify email address on " + Accounts.emailTemplates.siteName;                                   // 43
      }                                                                                                                //
                                                                                                                       //
      return subject;                                                                                                  //
    }(),                                                                                                               //
    text: greet("To verify your account email")                                                                        // 45
  },                                                                                                                   //
  enrollAccount: {                                                                                                     // 47
    subject: function () {                                                                                             // 48
      function subject(user) {                                                                                         // 48
        return "An account has been created for you on " + Accounts.emailTemplates.siteName;                           // 49
      }                                                                                                                //
                                                                                                                       //
      return subject;                                                                                                  //
    }(),                                                                                                               //
    text: greet("To start using the service")                                                                          // 51
  }                                                                                                                    //
};                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"password_server.js":["babel-runtime/helpers/typeof",function(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/accounts-password/password_server.js                                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _typeof2 = require("babel-runtime/helpers/typeof");                                                                //
                                                                                                                       //
var _typeof3 = _interopRequireDefault(_typeof2);                                                                       //
                                                                                                                       //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                      //
                                                                                                                       //
/// BCRYPT                                                                                                             //
                                                                                                                       //
var bcrypt = NpmModuleBcrypt;                                                                                          // 3
var bcryptHash = Meteor.wrapAsync(bcrypt.hash);                                                                        // 4
var bcryptCompare = Meteor.wrapAsync(bcrypt.compare);                                                                  // 5
                                                                                                                       //
// User records have a 'services.password.bcrypt' field on them to hold                                                //
// their hashed passwords (unless they have a 'services.password.srp'                                                  //
// field, in which case they will be upgraded to bcrypt the next time                                                  //
// they log in).                                                                                                       //
//                                                                                                                     //
// When the client sends a password to the server, it can either be a                                                  //
// string (the plaintext password) or an object with keys 'digest' and                                                 //
// 'algorithm' (must be "sha-256" for now). The Meteor client always sends                                             //
// password objects { digest: *, algorithm: "sha-256" }, but DDP clients                                               //
// that don't have access to SHA can just send plaintext passwords as                                                  //
// strings.                                                                                                            //
//                                                                                                                     //
// When the server receives a plaintext password as a string, it always                                                //
// hashes it with SHA256 before passing it into bcrypt. When the server                                                //
// receives a password as an object, it asserts that the algorithm is                                                  //
// "sha-256" and then passes the digest to bcrypt.                                                                     //
                                                                                                                       //
Accounts._bcryptRounds = 10;                                                                                           // 25
                                                                                                                       //
// Given a 'password' from the client, extract the string that we should                                               //
// bcrypt. 'password' can be one of:                                                                                   //
//  - String (the plaintext password)                                                                                  //
//  - Object with 'digest' and 'algorithm' keys. 'algorithm' must be "sha-256".                                        //
//                                                                                                                     //
var getPasswordString = function getPasswordString(password) {                                                         // 32
  if (typeof password === "string") {                                                                                  // 33
    password = SHA256(password);                                                                                       // 34
  } else {                                                                                                             //
    // 'password' is an object                                                                                         //
    if (password.algorithm !== "sha-256") {                                                                            // 36
      throw new Error("Invalid password hash algorithm. " + "Only 'sha-256' is allowed.");                             // 37
    }                                                                                                                  //
    password = password.digest;                                                                                        // 40
  }                                                                                                                    //
  return password;                                                                                                     // 42
};                                                                                                                     //
                                                                                                                       //
// Use bcrypt to hash the password for storage in the database.                                                        //
// `password` can be a string (in which case it will be run through                                                    //
// SHA256 before bcrypt) or an object with properties `digest` and                                                     //
// `algorithm` (in which case we bcrypt `password.digest`).                                                            //
//                                                                                                                     //
var hashPassword = function hashPassword(password) {                                                                   // 50
  password = getPasswordString(password);                                                                              // 51
  return bcryptHash(password, Accounts._bcryptRounds);                                                                 // 52
};                                                                                                                     //
                                                                                                                       //
// Check whether the provided password matches the bcrypt'ed password in                                               //
// the database user record. `password` can be a string (in which case                                                 //
// it will be run through SHA256 before bcrypt) or an object with                                                      //
// properties `digest` and `algorithm` (in which case we bcrypt                                                        //
// `password.digest`).                                                                                                 //
//                                                                                                                     //
Accounts._checkPassword = function (user, password) {                                                                  // 61
  var result = {                                                                                                       // 62
    userId: user._id                                                                                                   // 63
  };                                                                                                                   //
                                                                                                                       //
  password = getPasswordString(password);                                                                              // 66
                                                                                                                       //
  if (!bcryptCompare(password, user.services.password.bcrypt)) {                                                       // 68
    result.error = new Meteor.Error(403, "Incorrect password");                                                        // 69
  }                                                                                                                    //
                                                                                                                       //
  return result;                                                                                                       // 72
};                                                                                                                     //
var checkPassword = Accounts._checkPassword;                                                                           // 74
                                                                                                                       //
///                                                                                                                    //
/// LOGIN                                                                                                              //
///                                                                                                                    //
                                                                                                                       //
Accounts._findUserByQuery = function (query) {                                                                         // 80
  var user = null;                                                                                                     // 81
                                                                                                                       //
  if (query.id) {                                                                                                      // 83
    user = Meteor.users.findOne({ _id: query.id });                                                                    // 84
  } else {                                                                                                             //
    var fieldName;                                                                                                     // 86
    var fieldValue;                                                                                                    // 87
    if (query.username) {                                                                                              // 88
      fieldName = 'username';                                                                                          // 89
      fieldValue = query.username;                                                                                     // 90
    } else if (query.email) {                                                                                          //
      fieldName = 'emails.address';                                                                                    // 92
      fieldValue = query.email;                                                                                        // 93
    } else {                                                                                                           //
      throw new Error("shouldn't happen (validation missed something)");                                               // 95
    }                                                                                                                  //
    var selector = {};                                                                                                 // 97
    selector[fieldName] = fieldValue;                                                                                  // 98
    user = Meteor.users.findOne(selector);                                                                             // 99
    // If user is not found, try a case insensitive lookup                                                             //
    if (!user) {                                                                                                       // 85
      selector = selectorForFastCaseInsensitiveLookup(fieldName, fieldValue);                                          // 102
      var candidateUsers = Meteor.users.find(selector).fetch();                                                        // 103
      // No match if multiple candidates are found                                                                     //
      if (candidateUsers.length === 1) {                                                                               // 101
        user = candidateUsers[0];                                                                                      // 106
      }                                                                                                                //
    }                                                                                                                  //
  }                                                                                                                    //
                                                                                                                       //
  return user;                                                                                                         // 111
};                                                                                                                     //
                                                                                                                       //
/**                                                                                                                    //
 * @summary Finds the user with the specified username.                                                                //
 * First tries to match username case sensitively; if that fails, it                                                   //
 * tries case insensitively; but if more than one user matches the case                                                //
 * insensitive search, it returns null.                                                                                //
 * @locus Server                                                                                                       //
 * @param {String} username The username to look for                                                                   //
 * @returns {Object} A user if found, else null                                                                        //
 */                                                                                                                    //
Accounts.findUserByUsername = function (username) {                                                                    // 123
  return Accounts._findUserByQuery({                                                                                   // 124
    username: username                                                                                                 // 125
  });                                                                                                                  //
};                                                                                                                     //
                                                                                                                       //
/**                                                                                                                    //
 * @summary Finds the user with the specified email.                                                                   //
 * First tries to match email case sensitively; if that fails, it                                                      //
 * tries case insensitively; but if more than one user matches the case                                                //
 * insensitive search, it returns null.                                                                                //
 * @locus Server                                                                                                       //
 * @param {String} email The email address to look for                                                                 //
 * @returns {Object} A user if found, else null                                                                        //
 */                                                                                                                    //
Accounts.findUserByEmail = function (email) {                                                                          // 138
  return Accounts._findUserByQuery({                                                                                   // 139
    email: email                                                                                                       // 140
  });                                                                                                                  //
};                                                                                                                     //
                                                                                                                       //
// Generates a MongoDB selector that can be used to perform a fast case                                                //
// insensitive lookup for the given fieldName and string. Since MongoDB does                                           //
// not support case insensitive indexes, and case insensitive regex queries                                            //
// are slow, we construct a set of prefix selectors for all permutations of                                            //
// the first 4 characters ourselves. We first attempt to matching against                                              //
// these, and because 'prefix expression' regex queries do use indexes (see                                            //
// http://docs.mongodb.org/v2.6/reference/operator/query/regex/#index-use),                                            //
// this has been found to greatly improve performance (from 1200ms to 5ms in a                                         //
// test with 1.000.000 users).                                                                                         //
var selectorForFastCaseInsensitiveLookup = function selectorForFastCaseInsensitiveLookup(fieldName, string) {          // 153
  // Performance seems to improve up to 4 prefix characters                                                            //
  var prefix = string.substring(0, Math.min(string.length, 4));                                                        // 155
  var orClause = _.map(generateCasePermutationsForString(prefix), function (prefixPermutation) {                       // 156
    var selector = {};                                                                                                 // 158
    selector[fieldName] = new RegExp('^' + Meteor._escapeRegExp(prefixPermutation));                                   // 159
    return selector;                                                                                                   // 161
  });                                                                                                                  //
  var caseInsensitiveClause = {};                                                                                      // 163
  caseInsensitiveClause[fieldName] = new RegExp('^' + Meteor._escapeRegExp(string) + '$', 'i');                        // 164
  return { $and: [{ $or: orClause }, caseInsensitiveClause] };                                                         // 166
};                                                                                                                     //
                                                                                                                       //
// Generates permutations of all case variations of a given string.                                                    //
var generateCasePermutationsForString = function generateCasePermutationsForString(string) {                           // 170
  var permutations = [''];                                                                                             // 171
  for (var i = 0; i < string.length; i++) {                                                                            // 172
    var ch = string.charAt(i);                                                                                         // 173
    permutations = _.flatten(_.map(permutations, function (prefix) {                                                   // 174
      var lowerCaseChar = ch.toLowerCase();                                                                            // 175
      var upperCaseChar = ch.toUpperCase();                                                                            // 176
      // Don't add unneccesary permutations when ch is not a letter                                                    //
      if (lowerCaseChar === upperCaseChar) {                                                                           // 174
        return [prefix + ch];                                                                                          // 179
      } else {                                                                                                         //
        return [prefix + lowerCaseChar, prefix + upperCaseChar];                                                       // 181
      }                                                                                                                //
    }));                                                                                                               //
  }                                                                                                                    //
  return permutations;                                                                                                 // 185
};                                                                                                                     //
                                                                                                                       //
var checkForCaseInsensitiveDuplicates = function checkForCaseInsensitiveDuplicates(fieldName, displayName, fieldValue, ownUserId) {
  // Some tests need the ability to add users with the same case insensitive                                           //
  // value, hence the _skipCaseInsensitiveChecksForTest check                                                          //
  var skipCheck = _.has(Accounts._skipCaseInsensitiveChecksForTest, fieldValue);                                       // 191
                                                                                                                       //
  if (fieldValue && !skipCheck) {                                                                                      // 193
    var matchedUsers = Meteor.users.find(selectorForFastCaseInsensitiveLookup(fieldName, fieldValue)).fetch();         // 194
                                                                                                                       //
    if (matchedUsers.length > 0 && (                                                                                   // 197
    // If we don't have a userId yet, any match we find is a duplicate                                                 //
    !ownUserId ||                                                                                                      // 199
    // Otherwise, check to see if there are multiple matches or a match                                                //
    // that is not us                                                                                                  //
    matchedUsers.length > 1 || matchedUsers[0]._id !== ownUserId)) {                                                   // 202
      throw new Meteor.Error(403, displayName + " already exists.");                                                   // 203
    }                                                                                                                  //
  }                                                                                                                    //
};                                                                                                                     //
                                                                                                                       //
// XXX maybe this belongs in the check package                                                                         //
var NonEmptyString = Match.Where(function (x) {                                                                        // 209
  check(x, String);                                                                                                    // 210
  return x.length > 0;                                                                                                 // 211
});                                                                                                                    //
                                                                                                                       //
var userQueryValidator = Match.Where(function (user) {                                                                 // 214
  check(user, {                                                                                                        // 215
    id: Match.Optional(NonEmptyString),                                                                                // 216
    username: Match.Optional(NonEmptyString),                                                                          // 217
    email: Match.Optional(NonEmptyString)                                                                              // 218
  });                                                                                                                  //
  if (_.keys(user).length !== 1) throw new Match.Error("User property must have exactly one field");                   // 220
  return true;                                                                                                         // 222
});                                                                                                                    //
                                                                                                                       //
var passwordValidator = Match.OneOf(String, { digest: String, algorithm: String });                                    // 225
                                                                                                                       //
// Handler to login with a password.                                                                                   //
//                                                                                                                     //
// The Meteor client sets options.password to an object with keys                                                      //
// 'digest' (set to SHA256(password)) and 'algorithm' ("sha-256").                                                     //
//                                                                                                                     //
// For other DDP clients which don't have access to SHA, the handler                                                   //
// also accepts the plaintext password in options.password as a string.                                                //
//                                                                                                                     //
// (It might be nice if servers could turn the plaintext password                                                      //
// option off. Or maybe it should be opt-in, not opt-out?                                                              //
// Accounts.config option?)                                                                                            //
//                                                                                                                     //
// Note that neither password option is secure without SSL.                                                            //
//                                                                                                                     //
Accounts.registerLoginHandler("password", function (options) {                                                         // 244
  if (!options.password || options.srp) return undefined; // don't handle                                              // 245
                                                                                                                       //
  check(options, {                                                                                                     // 244
    user: userQueryValidator,                                                                                          // 249
    password: passwordValidator                                                                                        // 250
  });                                                                                                                  //
                                                                                                                       //
  var user = Accounts._findUserByQuery(options.user);                                                                  // 254
  if (!user) throw new Meteor.Error(403, "User not found");                                                            // 255
                                                                                                                       //
  if (!user.services || !user.services.password || !(user.services.password.bcrypt || user.services.password.srp)) throw new Meteor.Error(403, "User has no password set");
                                                                                                                       //
  if (!user.services.password.bcrypt) {                                                                                // 262
    if (typeof options.password === "string") {                                                                        // 263
      // The client has presented a plaintext password, and the user is                                                //
      // not upgraded to bcrypt yet. We don't attempt to tell the client                                               //
      // to upgrade to bcrypt, because it might be a standalone DDP                                                    //
      // client doesn't know how to do such a thing.                                                                   //
      var verifier = user.services.password.srp;                                                                       // 268
      var newVerifier = SRP.generateVerifier(options.password, {                                                       // 269
        identity: verifier.identity, salt: verifier.salt });                                                           // 270
                                                                                                                       //
      if (verifier.verifier !== newVerifier.verifier) {                                                                // 272
        return {                                                                                                       // 273
          userId: user._id,                                                                                            // 274
          error: new Meteor.Error(403, "Incorrect password")                                                           // 275
        };                                                                                                             //
      }                                                                                                                //
                                                                                                                       //
      return { userId: user._id };                                                                                     // 279
    } else {                                                                                                           //
      // Tell the client to use the SRP upgrade process.                                                               //
      throw new Meteor.Error(400, "old password format", EJSON.stringify({                                             // 282
        format: 'srp',                                                                                                 // 283
        identity: user.services.password.srp.identity                                                                  // 284
      }));                                                                                                             //
    }                                                                                                                  //
  }                                                                                                                    //
                                                                                                                       //
  return checkPassword(user, options.password);                                                                        // 289
});                                                                                                                    //
                                                                                                                       //
// Handler to login using the SRP upgrade path. To use this login                                                      //
// handler, the client must provide:                                                                                   //
//   - srp: H(identity + ":" + password)                                                                               //
//   - password: a string or an object with properties 'digest' and 'algorithm'                                        //
//                                                                                                                     //
// We use `options.srp` to verify that the client knows the correct                                                    //
// password without doing a full SRP flow. Once we've checked that, we                                                 //
// upgrade the user to bcrypt and remove the SRP information from the                                                  //
// user document.                                                                                                      //
//                                                                                                                     //
// The client ends up using this login handler after trying the normal                                                 //
// login handler (above), which throws an error telling the client to                                                  //
// try the SRP upgrade path.                                                                                           //
//                                                                                                                     //
// XXX COMPAT WITH 0.8.1.3                                                                                             //
Accounts.registerLoginHandler("password", function (options) {                                                         // 310
  if (!options.srp || !options.password) return undefined; // don't handle                                             // 311
                                                                                                                       //
  check(options, {                                                                                                     // 310
    user: userQueryValidator,                                                                                          // 315
    srp: String,                                                                                                       // 316
    password: passwordValidator                                                                                        // 317
  });                                                                                                                  //
                                                                                                                       //
  var user = Accounts._findUserByQuery(options.user);                                                                  // 320
  if (!user) throw new Meteor.Error(403, "User not found");                                                            // 321
                                                                                                                       //
  // Check to see if another simultaneous login has already upgraded                                                   //
  // the user record to bcrypt.                                                                                        //
  if (user.services && user.services.password && user.services.password.bcrypt) return checkPassword(user, options.password);
                                                                                                                       //
  if (!(user.services && user.services.password && user.services.password.srp)) throw new Meteor.Error(403, "User has no password set");
                                                                                                                       //
  var v1 = user.services.password.srp.verifier;                                                                        // 332
  var v2 = SRP.generateVerifier(null, {                                                                                // 333
    hashedIdentityAndPassword: options.srp,                                                                            // 336
    salt: user.services.password.srp.salt                                                                              // 337
  }).verifier;                                                                                                         //
  if (v1 !== v2) return {                                                                                              // 340
    userId: user._id,                                                                                                  // 342
    error: new Meteor.Error(403, "Incorrect password")                                                                 // 343
  };                                                                                                                   //
                                                                                                                       //
  // Upgrade to bcrypt on successful login.                                                                            //
  var salted = hashPassword(options.password);                                                                         // 310
  Meteor.users.update(user._id, {                                                                                      // 348
    $unset: { 'services.password.srp': 1 },                                                                            // 351
    $set: { 'services.password.bcrypt': salted }                                                                       // 352
  });                                                                                                                  //
                                                                                                                       //
  return { userId: user._id };                                                                                         // 356
});                                                                                                                    //
                                                                                                                       //
///                                                                                                                    //
/// CHANGING                                                                                                           //
///                                                                                                                    //
                                                                                                                       //
/**                                                                                                                    //
 * @summary Change a user's username. Use this instead of updating the                                                 //
 * database directly. The operation will fail if there is an existing user                                             //
 * with a username only differing in case.                                                                             //
 * @locus Server                                                                                                       //
 * @param {String} userId The ID of the user to update.                                                                //
 * @param {String} newUsername A new username for the user.                                                            //
 */                                                                                                                    //
Accounts.setUsername = function (userId, newUsername) {                                                                // 372
  check(userId, NonEmptyString);                                                                                       // 373
  check(newUsername, NonEmptyString);                                                                                  // 374
                                                                                                                       //
  var user = Meteor.users.findOne(userId);                                                                             // 376
  if (!user) throw new Meteor.Error(403, "User not found");                                                            // 377
                                                                                                                       //
  var oldUsername = user.username;                                                                                     // 380
                                                                                                                       //
  // Perform a case insensitive check fro duplicates before update                                                     //
  checkForCaseInsensitiveDuplicates('username', 'Username', newUsername, user._id);                                    // 372
                                                                                                                       //
  Meteor.users.update({ _id: user._id }, { $set: { username: newUsername } });                                         // 385
                                                                                                                       //
  // Perform another check after update, in case a matching user has been                                              //
  // inserted in the meantime                                                                                          //
  try {                                                                                                                // 372
    checkForCaseInsensitiveDuplicates('username', 'Username', newUsername, user._id);                                  // 390
  } catch (ex) {                                                                                                       //
    // Undo update if the check fails                                                                                  //
    Meteor.users.update({ _id: user._id }, { $set: { username: oldUsername } });                                       // 393
    throw ex;                                                                                                          // 394
  }                                                                                                                    //
};                                                                                                                     //
                                                                                                                       //
// Let the user change their own password if they know the old                                                         //
// password. `oldPassword` and `newPassword` should be objects with keys                                               //
// `digest` and `algorithm` (representing the SHA256 of the password).                                                 //
//                                                                                                                     //
// XXX COMPAT WITH 0.8.1.3                                                                                             //
// Like the login method, if the user hasn't been upgraded from SRP to                                                 //
// bcrypt yet, then this method will throw an 'old password format'                                                    //
// error. The client should call the SRP upgrade login handler and then                                                //
// retry this method again.                                                                                            //
//                                                                                                                     //
// UNLIKE the login method, there is no way to avoid getting SRP upgrade                                               //
// errors thrown. The reasoning for this is that clients using this                                                    //
// method directly will need to be updated anyway because we no longer                                                 //
// support the SRP flow that they would have been doing to use this                                                    //
// method previously.                                                                                                  //
Meteor.methods({ changePassword: function () {                                                                         // 413
    function changePassword(oldPassword, newPassword) {                                                                // 413
      check(oldPassword, passwordValidator);                                                                           // 414
      check(newPassword, passwordValidator);                                                                           // 415
                                                                                                                       //
      if (!this.userId) throw new Meteor.Error(401, "Must be logged in");                                              // 417
                                                                                                                       //
      var user = Meteor.users.findOne(this.userId);                                                                    // 420
      if (!user) throw new Meteor.Error(403, "User not found");                                                        // 421
                                                                                                                       //
      if (!user.services || !user.services.password || !user.services.password.bcrypt && !user.services.password.srp) throw new Meteor.Error(403, "User has no password set");
                                                                                                                       //
      if (!user.services.password.bcrypt) {                                                                            // 428
        throw new Meteor.Error(400, "old password format", EJSON.stringify({                                           // 429
          format: 'srp',                                                                                               // 430
          identity: user.services.password.srp.identity                                                                // 431
        }));                                                                                                           //
      }                                                                                                                //
                                                                                                                       //
      var result = checkPassword(user, oldPassword);                                                                   // 435
      if (result.error) throw result.error;                                                                            // 436
                                                                                                                       //
      var hashed = hashPassword(newPassword);                                                                          // 439
                                                                                                                       //
      // It would be better if this removed ALL existing tokens and replaced                                           //
      // the token for the current connection with a new one, but that would                                           //
      // be tricky, so we'll settle for just replacing all tokens other than                                           //
      // the one for the current connection.                                                                           //
      var currentToken = Accounts._getLoginToken(this.connection.id);                                                  // 413
      Meteor.users.update({ _id: this.userId }, {                                                                      // 446
        $set: { 'services.password.bcrypt': hashed },                                                                  // 449
        $pull: {                                                                                                       // 450
          'services.resume.loginTokens': { hashedToken: { $ne: currentToken } }                                        // 451
        },                                                                                                             //
        $unset: { 'services.password.reset': 1 }                                                                       // 453
      });                                                                                                              //
                                                                                                                       //
      return { passwordChanged: true };                                                                                // 457
    }                                                                                                                  //
                                                                                                                       //
    return changePassword;                                                                                             //
  }() });                                                                                                              //
                                                                                                                       //
// Force change the users password.                                                                                    //
                                                                                                                       //
/**                                                                                                                    //
 * @summary Forcibly change the password for a user.                                                                   //
 * @locus Server                                                                                                       //
 * @param {String} userId The id of the user to update.                                                                //
 * @param {String} newPassword A new password for the user.                                                            //
 * @param {Object} [options]                                                                                           //
 * @param {Object} options.logout Logout all current connections with this userId (default: true)                      //
 */                                                                                                                    //
Accounts.setPassword = function (userId, newPlaintextPassword, options) {                                              // 471
  options = _.extend({ logout: true }, options);                                                                       // 472
                                                                                                                       //
  var user = Meteor.users.findOne(userId);                                                                             // 474
  if (!user) throw new Meteor.Error(403, "User not found");                                                            // 475
                                                                                                                       //
  var update = {                                                                                                       // 478
    $unset: {                                                                                                          // 479
      'services.password.srp': 1, // XXX COMPAT WITH 0.8.1.3                                                           // 480
      'services.password.reset': 1                                                                                     // 481
    },                                                                                                                 //
    $set: { 'services.password.bcrypt': hashPassword(newPlaintextPassword) }                                           // 483
  };                                                                                                                   //
                                                                                                                       //
  if (options.logout) {                                                                                                // 486
    update.$unset['services.resume.loginTokens'] = 1;                                                                  // 487
  }                                                                                                                    //
                                                                                                                       //
  Meteor.users.update({ _id: user._id }, update);                                                                      // 490
};                                                                                                                     //
                                                                                                                       //
///                                                                                                                    //
/// RESETTING VIA EMAIL                                                                                                //
///                                                                                                                    //
                                                                                                                       //
// Method called by a user to request a password reset email. This is                                                  //
// the start of the reset process.                                                                                     //
Meteor.methods({ forgotPassword: function () {                                                                         // 500
    function forgotPassword(options) {                                                                                 // 500
      check(options, { email: String });                                                                               // 501
                                                                                                                       //
      var user = Accounts.findUserByEmail(options.email);                                                              // 503
      if (!user) throw new Meteor.Error(403, "User not found");                                                        // 504
                                                                                                                       //
      var emails = _.pluck(user.emails || [], 'address');                                                              // 507
      var caseSensitiveEmail = _.find(emails, function (email) {                                                       // 508
        return email.toLowerCase() === options.email.toLowerCase();                                                    // 509
      });                                                                                                              //
                                                                                                                       //
      Accounts.sendResetPasswordEmail(user._id, caseSensitiveEmail);                                                   // 512
    }                                                                                                                  //
                                                                                                                       //
    return forgotPassword;                                                                                             //
  }() });                                                                                                              //
                                                                                                                       //
// send the user an email with a link that when opened allows the user                                                 //
// to set a new password, without the old password.                                                                    //
                                                                                                                       //
/**                                                                                                                    //
 * @summary Send an email with a link the user can use to reset their password.                                        //
 * @locus Server                                                                                                       //
 * @param {String} userId The id of the user to send email to.                                                         //
 * @param {String} [email] Optional. Which address of the user's to send the email to. This address must be in the user's `emails` list. Defaults to the first email in the list.
 */                                                                                                                    //
Accounts.sendResetPasswordEmail = function (userId, email) {                                                           // 524
  // Make sure the user exists, and email is one of their addresses.                                                   //
  var user = Meteor.users.findOne(userId);                                                                             // 526
  if (!user) throw new Error("Can't find user");                                                                       // 527
  // pick the first email if we weren't passed an email.                                                               //
  if (!email && user.emails && user.emails[0]) email = user.emails[0].address;                                         // 524
  // make sure we have a valid email                                                                                   //
  if (!email || !_.contains(_.pluck(user.emails || [], 'address'), email)) throw new Error("No such email for user.");
                                                                                                                       //
  var token = Random.secret();                                                                                         // 536
  var when = new Date();                                                                                               // 537
  var tokenRecord = {                                                                                                  // 538
    token: token,                                                                                                      // 539
    email: email,                                                                                                      // 540
    when: when                                                                                                         // 541
  };                                                                                                                   //
  Meteor.users.update(userId, { $set: {                                                                                // 543
      "services.password.reset": tokenRecord                                                                           // 544
    } });                                                                                                              //
  // before passing to template, update user object with new token                                                     //
  Meteor._ensure(user, 'services', 'password').reset = tokenRecord;                                                    // 524
                                                                                                                       //
  var resetPasswordUrl = Accounts.urls.resetPassword(token);                                                           // 549
                                                                                                                       //
  var options = {                                                                                                      // 551
    to: email,                                                                                                         // 552
    from: Accounts.emailTemplates.resetPassword.from ? Accounts.emailTemplates.resetPassword.from(user) : Accounts.emailTemplates.from,
    subject: Accounts.emailTemplates.resetPassword.subject(user)                                                       // 556
  };                                                                                                                   //
                                                                                                                       //
  if (typeof Accounts.emailTemplates.resetPassword.text === 'function') {                                              // 559
    options.text = Accounts.emailTemplates.resetPassword.text(user, resetPasswordUrl);                                 // 560
  }                                                                                                                    //
                                                                                                                       //
  if (typeof Accounts.emailTemplates.resetPassword.html === 'function') options.html = Accounts.emailTemplates.resetPassword.html(user, resetPasswordUrl);
                                                                                                                       //
  if ((0, _typeof3.default)(Accounts.emailTemplates.headers) === 'object') {                                           // 568
    options.headers = Accounts.emailTemplates.headers;                                                                 // 569
  }                                                                                                                    //
                                                                                                                       //
  Email.send(options);                                                                                                 // 572
};                                                                                                                     //
                                                                                                                       //
// send the user an email informing them that their account was created, with                                          //
// a link that when opened both marks their email as verified and forces them                                          //
// to choose their password. The email must be one of the addresses in the                                             //
// user's emails field, or undefined to pick the first email automatically.                                            //
//                                                                                                                     //
// This is not called automatically. It must be called manually if you                                                 //
// want to use enrollment emails.                                                                                      //
                                                                                                                       //
/**                                                                                                                    //
 * @summary Send an email with a link the user can use to set their initial password.                                  //
 * @locus Server                                                                                                       //
 * @param {String} userId The id of the user to send email to.                                                         //
 * @param {String} [email] Optional. Which address of the user's to send the email to. This address must be in the user's `emails` list. Defaults to the first email in the list.
 */                                                                                                                    //
Accounts.sendEnrollmentEmail = function (userId, email) {                                                              // 589
  // XXX refactor! This is basically identical to sendResetPasswordEmail.                                              //
                                                                                                                       //
  // Make sure the user exists, and email is in their addresses.                                                       //
  var user = Meteor.users.findOne(userId);                                                                             // 593
  if (!user) throw new Error("Can't find user");                                                                       // 594
  // pick the first email if we weren't passed an email.                                                               //
  if (!email && user.emails && user.emails[0]) email = user.emails[0].address;                                         // 589
  // make sure we have a valid email                                                                                   //
  if (!email || !_.contains(_.pluck(user.emails || [], 'address'), email)) throw new Error("No such email for user.");
                                                                                                                       //
  var token = Random.secret();                                                                                         // 603
  var when = new Date();                                                                                               // 604
  var tokenRecord = {                                                                                                  // 605
    token: token,                                                                                                      // 606
    email: email,                                                                                                      // 607
    when: when                                                                                                         // 608
  };                                                                                                                   //
  Meteor.users.update(userId, { $set: {                                                                                // 610
      "services.password.reset": tokenRecord                                                                           // 611
    } });                                                                                                              //
                                                                                                                       //
  // before passing to template, update user object with new token                                                     //
  Meteor._ensure(user, 'services', 'password').reset = tokenRecord;                                                    // 589
                                                                                                                       //
  var enrollAccountUrl = Accounts.urls.enrollAccount(token);                                                           // 617
                                                                                                                       //
  var options = {                                                                                                      // 619
    to: email,                                                                                                         // 620
    from: Accounts.emailTemplates.enrollAccount.from ? Accounts.emailTemplates.enrollAccount.from(user) : Accounts.emailTemplates.from,
    subject: Accounts.emailTemplates.enrollAccount.subject(user)                                                       // 624
  };                                                                                                                   //
                                                                                                                       //
  if (typeof Accounts.emailTemplates.enrollAccount.text === 'function') {                                              // 627
    options.text = Accounts.emailTemplates.enrollAccount.text(user, enrollAccountUrl);                                 // 628
  }                                                                                                                    //
                                                                                                                       //
  if (typeof Accounts.emailTemplates.enrollAccount.html === 'function') options.html = Accounts.emailTemplates.enrollAccount.html(user, enrollAccountUrl);
                                                                                                                       //
  if ((0, _typeof3.default)(Accounts.emailTemplates.headers) === 'object') {                                           // 636
    options.headers = Accounts.emailTemplates.headers;                                                                 // 637
  }                                                                                                                    //
                                                                                                                       //
  Email.send(options);                                                                                                 // 640
};                                                                                                                     //
                                                                                                                       //
// Take token from sendResetPasswordEmail or sendEnrollmentEmail, change                                               //
// the users password, and log them in.                                                                                //
Meteor.methods({ resetPassword: function () {                                                                          // 646
    function resetPassword(token, newPassword) {                                                                       // 646
      var self = this;                                                                                                 // 647
      return Accounts._loginMethod(self, "resetPassword", arguments, "password", function () {                         // 648
        check(token, String);                                                                                          // 654
        check(newPassword, passwordValidator);                                                                         // 655
                                                                                                                       //
        var user = Meteor.users.findOne({                                                                              // 657
          "services.password.reset.token": token });                                                                   // 658
        if (!user) throw new Meteor.Error(403, "Token expired");                                                       // 659
        var email = user.services.password.reset.email;                                                                // 661
        if (!_.include(_.pluck(user.emails || [], 'address'), email)) return {                                         // 662
          userId: user._id,                                                                                            // 664
          error: new Meteor.Error(403, "Token has invalid email address")                                              // 665
        };                                                                                                             //
                                                                                                                       //
        var hashed = hashPassword(newPassword);                                                                        // 668
                                                                                                                       //
        // NOTE: We're about to invalidate tokens on the user, who we might be                                         //
        // logged in as. Make sure to avoid logging ourselves out if this                                              //
        // happens. But also make sure not to leave the connection in a state                                          //
        // of having a bad token set if things fail.                                                                   //
        var oldToken = Accounts._getLoginToken(self.connection.id);                                                    // 653
        Accounts._setLoginToken(user._id, self.connection, null);                                                      // 675
        var resetToOldToken = function () {                                                                            // 676
          function resetToOldToken() {                                                                                 // 676
            Accounts._setLoginToken(user._id, self.connection, oldToken);                                              // 677
          }                                                                                                            //
                                                                                                                       //
          return resetToOldToken;                                                                                      //
        }();                                                                                                           //
                                                                                                                       //
        try {                                                                                                          // 680
          // Update the user record by:                                                                                //
          // - Changing the password to the new one                                                                    //
          // - Forgetting about the reset token that was just used                                                     //
          // - Verifying their email, since they got the password reset via email.                                     //
          var affectedRecords = Meteor.users.update({                                                                  // 685
            _id: user._id,                                                                                             // 687
            'emails.address': email,                                                                                   // 688
            'services.password.reset.token': token                                                                     // 689
          }, { $set: { 'services.password.bcrypt': hashed,                                                             //
              'emails.$.verified': true },                                                                             // 692
            $unset: { 'services.password.reset': 1,                                                                    // 693
              'services.password.srp': 1 } });                                                                         // 694
          if (affectedRecords !== 1) return {                                                                          // 695
            userId: user._id,                                                                                          // 697
            error: new Meteor.Error(403, "Invalid email")                                                              // 698
          };                                                                                                           //
        } catch (err) {                                                                                                //
          resetToOldToken();                                                                                           // 701
          throw err;                                                                                                   // 702
        }                                                                                                              //
                                                                                                                       //
        // Replace all valid login tokens with new ones (changing                                                      //
        // password should invalidate existing sessions).                                                              //
        Accounts._clearAllLoginTokens(user._id);                                                                       // 653
                                                                                                                       //
        return { userId: user._id };                                                                                   // 709
      });                                                                                                              //
    }                                                                                                                  //
                                                                                                                       //
    return resetPassword;                                                                                              //
  }() });                                                                                                              //
                                                                                                                       //
///                                                                                                                    //
/// EMAIL VERIFICATION                                                                                                 //
///                                                                                                                    //
                                                                                                                       //
// send the user an email with a link that when opened marks that                                                      //
// address as verified                                                                                                 //
                                                                                                                       //
/**                                                                                                                    //
 * @summary Send an email with a link the user can use verify their email address.                                     //
 * @locus Server                                                                                                       //
 * @param {String} userId The id of the user to send email to.                                                         //
 * @param {String} [email] Optional. Which address of the user's to send the email to. This address must be in the user's `emails` list. Defaults to the first unverified email in the list.
 */                                                                                                                    //
Accounts.sendVerificationEmail = function (userId, address) {                                                          // 728
  // XXX Also generate a link using which someone can delete this                                                      //
  // account if they own said address but weren't those who created                                                    //
  // this account.                                                                                                     //
                                                                                                                       //
  // Make sure the user exists, and address is one of their addresses.                                                 //
  var user = Meteor.users.findOne(userId);                                                                             // 734
  if (!user) throw new Error("Can't find user");                                                                       // 735
  // pick the first unverified address if we weren't passed an address.                                                //
  if (!address) {                                                                                                      // 728
    var email = _.find(user.emails || [], function (e) {                                                               // 739
      return !e.verified;                                                                                              // 740
    });                                                                                                                //
    address = (email || {}).address;                                                                                   // 741
                                                                                                                       //
    if (!address) {                                                                                                    // 743
      throw new Error("That user has no unverified email addresses.");                                                 // 744
    }                                                                                                                  //
  }                                                                                                                    //
  // make sure we have a valid address                                                                                 //
  if (!address || !_.contains(_.pluck(user.emails || [], 'address'), address)) throw new Error("No such email address for user.");
                                                                                                                       //
  var tokenRecord = {                                                                                                  // 752
    token: Random.secret(),                                                                                            // 753
    address: address,                                                                                                  // 754
    when: new Date() };                                                                                                // 755
  Meteor.users.update({ _id: userId }, { $push: { 'services.email.verificationTokens': tokenRecord } });               // 756
                                                                                                                       //
  // before passing to template, update user object with new token                                                     //
  Meteor._ensure(user, 'services', 'email');                                                                           // 728
  if (!user.services.email.verificationTokens) {                                                                       // 762
    user.services.email.verificationTokens = [];                                                                       // 763
  }                                                                                                                    //
  user.services.email.verificationTokens.push(tokenRecord);                                                            // 765
                                                                                                                       //
  var verifyEmailUrl = Accounts.urls.verifyEmail(tokenRecord.token);                                                   // 767
                                                                                                                       //
  var options = {                                                                                                      // 769
    to: address,                                                                                                       // 770
    from: Accounts.emailTemplates.verifyEmail.from ? Accounts.emailTemplates.verifyEmail.from(user) : Accounts.emailTemplates.from,
    subject: Accounts.emailTemplates.verifyEmail.subject(user)                                                         // 774
  };                                                                                                                   //
                                                                                                                       //
  if (typeof Accounts.emailTemplates.verifyEmail.text === 'function') {                                                // 777
    options.text = Accounts.emailTemplates.verifyEmail.text(user, verifyEmailUrl);                                     // 778
  }                                                                                                                    //
                                                                                                                       //
  if (typeof Accounts.emailTemplates.verifyEmail.html === 'function') options.html = Accounts.emailTemplates.verifyEmail.html(user, verifyEmailUrl);
                                                                                                                       //
  if ((0, _typeof3.default)(Accounts.emailTemplates.headers) === 'object') {                                           // 786
    options.headers = Accounts.emailTemplates.headers;                                                                 // 787
  }                                                                                                                    //
                                                                                                                       //
  Email.send(options);                                                                                                 // 790
};                                                                                                                     //
                                                                                                                       //
// Take token from sendVerificationEmail, mark the email as verified,                                                  //
// and log them in.                                                                                                    //
Meteor.methods({ verifyEmail: function () {                                                                            // 795
    function verifyEmail(token) {                                                                                      // 795
      var self = this;                                                                                                 // 796
      return Accounts._loginMethod(self, "verifyEmail", arguments, "password", function () {                           // 797
        check(token, String);                                                                                          // 803
                                                                                                                       //
        var user = Meteor.users.findOne({ 'services.email.verificationTokens.token': token });                         // 805
        if (!user) throw new Meteor.Error(403, "Verify email link expired");                                           // 807
                                                                                                                       //
        var tokenRecord = _.find(user.services.email.verificationTokens, function (t) {                                // 810
          return t.token == token;                                                                                     // 812
        });                                                                                                            //
        if (!tokenRecord) return {                                                                                     // 814
          userId: user._id,                                                                                            // 816
          error: new Meteor.Error(403, "Verify email link expired")                                                    // 817
        };                                                                                                             //
                                                                                                                       //
        var emailsRecord = _.find(user.emails, function (e) {                                                          // 820
          return e.address == tokenRecord.address;                                                                     // 821
        });                                                                                                            //
        if (!emailsRecord) return {                                                                                    // 823
          userId: user._id,                                                                                            // 825
          error: new Meteor.Error(403, "Verify email link is for unknown address")                                     // 826
        };                                                                                                             //
                                                                                                                       //
        // By including the address in the query, we can use 'emails.$' in the                                         //
        // modifier to get a reference to the specific object in the emails                                            //
        // array. See                                                                                                  //
        // http://www.mongodb.org/display/DOCS/Updating/#Updating-The%24positionaloperator)                            //
        // http://www.mongodb.org/display/DOCS/Updating#Updating-%24pull                                               //
        Meteor.users.update({ _id: user._id,                                                                           // 802
          'emails.address': tokenRecord.address }, { $set: { 'emails.$.verified': true },                              // 836
          $pull: { 'services.email.verificationTokens': { address: tokenRecord.address } } });                         // 838
                                                                                                                       //
        return { userId: user._id };                                                                                   // 840
      });                                                                                                              //
    }                                                                                                                  //
                                                                                                                       //
    return verifyEmail;                                                                                                //
  }() });                                                                                                              //
                                                                                                                       //
/**                                                                                                                    //
 * @summary Add an email address for a user. Use this instead of directly                                              //
 * updating the database. The operation will fail if there is a different user                                         //
 * with an email only differing in case. If the specified user has an existing                                         //
 * email only differing in case however, we replace it.                                                                //
 * @locus Server                                                                                                       //
 * @param {String} userId The ID of the user to update.                                                                //
 * @param {String} newEmail A new email address for the user.                                                          //
 * @param {Boolean} [verified] Optional - whether the new email address should                                         //
 * be marked as verified. Defaults to false.                                                                           //
 */                                                                                                                    //
Accounts.addEmail = function (userId, newEmail, verified) {                                                            // 856
  check(userId, NonEmptyString);                                                                                       // 857
  check(newEmail, NonEmptyString);                                                                                     // 858
  check(verified, Match.Optional(Boolean));                                                                            // 859
                                                                                                                       //
  if (_.isUndefined(verified)) {                                                                                       // 861
    verified = false;                                                                                                  // 862
  }                                                                                                                    //
                                                                                                                       //
  var user = Meteor.users.findOne(userId);                                                                             // 865
  if (!user) throw new Meteor.Error(403, "User not found");                                                            // 866
                                                                                                                       //
  // Allow users to change their own email to a version with a different case                                          //
                                                                                                                       //
  // We don't have to call checkForCaseInsensitiveDuplicates to do a case                                              //
  // insensitive check across all emails in the database here because: (1) if                                          //
  // there is no case-insensitive duplicate between this user and other users,                                         //
  // then we are OK and (2) if this would create a conflict with other users                                           //
  // then there would already be a case-insensitive duplicate and we can't fix                                         //
  // that in this code anyway.                                                                                         //
  var caseInsensitiveRegExp = new RegExp('^' + Meteor._escapeRegExp(newEmail) + '$', 'i');                             // 856
                                                                                                                       //
  var didUpdateOwnEmail = _.any(user.emails, function (email, index) {                                                 // 880
    if (caseInsensitiveRegExp.test(email.address)) {                                                                   // 881
      Meteor.users.update({                                                                                            // 882
        _id: user._id,                                                                                                 // 883
        'emails.address': email.address                                                                                // 884
      }, { $set: {                                                                                                     //
          'emails.$.address': newEmail,                                                                                // 886
          'emails.$.verified': verified                                                                                // 887
        } });                                                                                                          //
      return true;                                                                                                     // 889
    }                                                                                                                  //
                                                                                                                       //
    return false;                                                                                                      // 892
  });                                                                                                                  //
                                                                                                                       //
  // In the other updates below, we have to do another call to                                                         //
  // checkForCaseInsensitiveDuplicates to make sure that no conflicting values                                         //
  // were added to the database in the meantime. We don't have to do this for                                          //
  // the case where the user is updating their email address to one that is the                                        //
  // same as before, but only different because of capitalization. Read the                                            //
  // big comment above to understand why.                                                                              //
                                                                                                                       //
  if (didUpdateOwnEmail) {                                                                                             // 856
    return;                                                                                                            // 903
  }                                                                                                                    //
                                                                                                                       //
  // Perform a case insensitive check for duplicates before update                                                     //
  checkForCaseInsensitiveDuplicates('emails.address', 'Email', newEmail, user._id);                                    // 856
                                                                                                                       //
  Meteor.users.update({                                                                                                // 909
    _id: user._id                                                                                                      // 910
  }, {                                                                                                                 //
    $addToSet: {                                                                                                       // 912
      emails: {                                                                                                        // 913
        address: newEmail,                                                                                             // 914
        verified: verified                                                                                             // 915
      }                                                                                                                //
    }                                                                                                                  //
  });                                                                                                                  //
                                                                                                                       //
  // Perform another check after update, in case a matching user has been                                              //
  // inserted in the meantime                                                                                          //
  try {                                                                                                                // 856
    checkForCaseInsensitiveDuplicates('emails.address', 'Email', newEmail, user._id);                                  // 923
  } catch (ex) {                                                                                                       //
    // Undo update if the check fails                                                                                  //
    Meteor.users.update({ _id: user._id }, { $pull: { emails: { address: newEmail } } });                              // 926
    throw ex;                                                                                                          // 928
  }                                                                                                                    //
};                                                                                                                     //
                                                                                                                       //
/**                                                                                                                    //
 * @summary Remove an email address for a user. Use this instead of updating                                           //
 * the database directly.                                                                                              //
 * @locus Server                                                                                                       //
 * @param {String} userId The ID of the user to update.                                                                //
 * @param {String} email The email address to remove.                                                                  //
 */                                                                                                                    //
Accounts.removeEmail = function (userId, email) {                                                                      // 939
  check(userId, NonEmptyString);                                                                                       // 940
  check(email, NonEmptyString);                                                                                        // 941
                                                                                                                       //
  var user = Meteor.users.findOne(userId);                                                                             // 943
  if (!user) throw new Meteor.Error(403, "User not found");                                                            // 944
                                                                                                                       //
  Meteor.users.update({ _id: user._id }, { $pull: { emails: { address: email } } });                                   // 947
};                                                                                                                     //
                                                                                                                       //
///                                                                                                                    //
/// CREATING USERS                                                                                                     //
///                                                                                                                    //
                                                                                                                       //
// Shared createUser function called from the createUser method, both                                                  //
// if originates in client or server code. Calls user provided hooks,                                                  //
// does the actual user insertion.                                                                                     //
//                                                                                                                     //
// returns the user id                                                                                                 //
var _createUser = function _createUser(options) {                                                                      // 960
  // Unknown keys allowed, because a onCreateUserHook can take arbitrary                                               //
  // options.                                                                                                          //
  check(options, Match.ObjectIncluding({                                                                               // 963
    username: Match.Optional(String),                                                                                  // 964
    email: Match.Optional(String),                                                                                     // 965
    password: Match.Optional(passwordValidator)                                                                        // 966
  }));                                                                                                                 //
                                                                                                                       //
  var username = options.username;                                                                                     // 969
  var email = options.email;                                                                                           // 970
  if (!username && !email) throw new Meteor.Error(400, "Need to set a username or email");                             // 971
                                                                                                                       //
  var user = { services: {} };                                                                                         // 974
  if (options.password) {                                                                                              // 975
    var hashed = hashPassword(options.password);                                                                       // 976
    user.services.password = { bcrypt: hashed };                                                                       // 977
  }                                                                                                                    //
                                                                                                                       //
  if (username) user.username = username;                                                                              // 980
  if (email) user.emails = [{ address: email, verified: false }];                                                      // 982
                                                                                                                       //
  // Perform a case insensitive check before insert                                                                    //
  checkForCaseInsensitiveDuplicates('username', 'Username', username);                                                 // 960
  checkForCaseInsensitiveDuplicates('emails.address', 'Email', email);                                                 // 987
                                                                                                                       //
  var userId = Accounts.insertUserDoc(options, user);                                                                  // 989
  // Perform another check after insert, in case a matching user has been                                              //
  // inserted in the meantime                                                                                          //
  try {                                                                                                                // 960
    checkForCaseInsensitiveDuplicates('username', 'Username', username, userId);                                       // 993
    checkForCaseInsensitiveDuplicates('emails.address', 'Email', email, userId);                                       // 994
  } catch (ex) {                                                                                                       //
    // Remove inserted user if the check fails                                                                         //
    Meteor.users.remove(userId);                                                                                       // 997
    throw ex;                                                                                                          // 998
  }                                                                                                                    //
  return userId;                                                                                                       // 1000
};                                                                                                                     //
                                                                                                                       //
// method for create user. Requests come from the client.                                                              //
Meteor.methods({ createUser: function () {                                                                             // 1004
    function createUser(options) {                                                                                     // 1004
      var self = this;                                                                                                 // 1005
      return Accounts._loginMethod(self, "createUser", arguments, "password", function () {                            // 1006
        // createUser() above does more checking.                                                                      //
        check(options, Object);                                                                                        // 1013
        if (Accounts._options.forbidClientAccountCreation) return {                                                    // 1014
          error: new Meteor.Error(403, "Signups forbidden")                                                            // 1016
        };                                                                                                             //
                                                                                                                       //
        // Create user. result contains id and token.                                                                  //
        var userId = _createUser(options);                                                                             // 1011
        // safety belt. createUser is supposed to throw on error. send 500 error                                       //
        // instead of sending a verification email with empty userid.                                                  //
        if (!userId) throw new Error("createUser failed to insert new user");                                          // 1011
                                                                                                                       //
        // If `Accounts._options.sendVerificationEmail` is set, register                                               //
        // a token to verify the user's primary email, and send it to                                                  //
        // that address.                                                                                               //
        if (options.email && Accounts._options.sendVerificationEmail) Accounts.sendVerificationEmail(userId, options.email);
                                                                                                                       //
        // client gets logged in as the new user afterwards.                                                           //
        return { userId: userId };                                                                                     // 1011
      });                                                                                                              //
    }                                                                                                                  //
                                                                                                                       //
    return createUser;                                                                                                 //
  }() });                                                                                                              //
                                                                                                                       //
// Create user directly on the server.                                                                                 //
//                                                                                                                     //
// Unlike the client version, this does not log you in as this user                                                    //
// after creation.                                                                                                     //
//                                                                                                                     //
// returns userId or throws an error if it can't create                                                                //
//                                                                                                                     //
// XXX add another argument ("server options") that gets sent to onCreateUser,                                         //
// which is always empty when called from the createUser method? eg, "admin:                                           //
// true", which we want to prevent the client from setting, but which a custom                                         //
// method calling Accounts.createUser could set?                                                                       //
//                                                                                                                     //
Accounts.createUser = function (options, callback) {                                                                   // 1050
  options = _.clone(options);                                                                                          // 1051
                                                                                                                       //
  // XXX allow an optional callback?                                                                                   //
  if (callback) {                                                                                                      // 1050
    throw new Error("Accounts.createUser with callback not supported on the server yet.");                             // 1055
  }                                                                                                                    //
                                                                                                                       //
  return _createUser(options);                                                                                         // 1058
};                                                                                                                     //
                                                                                                                       //
///                                                                                                                    //
/// PASSWORD-SPECIFIC INDEXES ON USERS                                                                                 //
///                                                                                                                    //
Meteor.users._ensureIndex('services.email.verificationTokens.token', { unique: 1, sparse: 1 });                        // 1064
Meteor.users._ensureIndex('services.password.reset.token', { unique: 1, sparse: 1 });                                  // 1066
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]}}}},{"extensions":[".js",".json"]});
require("./node_modules/meteor/accounts-password/email_templates.js");
require("./node_modules/meteor/accounts-password/password_server.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['accounts-password'] = {};

})();

//# sourceMappingURL=accounts-password.js.map
