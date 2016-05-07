(function () {

/* Imports */
var meteorEnv = Package.meteor.meteorEnv;
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var _ = Package.underscore._;
var Gravatar = Package['jparker:gravatar'].Gravatar;
var Inject = Package['meteorhacks:inject-initial'].Inject;

/* Package-scope variables */
var getDescendantProp, getService, getCustomUrl, getGravatarUrl, getEmailOrHash, sizeClass, shapeClass, customClasses, initialsText, createCSS, sizeName, Avatar;

(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/utilities_avatar/utils.js                                                                                //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
// see http://stackoverflow.com/questions/8051975/access-object-child-properties-using-a-dot-notation-string
getDescendantProp = function (obj, desc) {
  var arr = desc.split(".");
  while(arr.length && (obj = obj[arr.shift()]));
  return obj;
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/utilities_avatar/helpers.js                                                                              //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
// Get the account service to use for the user's avatar
// Priority: Twitter > Facebook > Google > GitHub > Instagram > Linkedin
getService = function (user) {
  var services = user && user.services || {};
  if (getCustomUrl(user)) { return 'custom'; }
  var service = _.find([['twitter', 'profile_image_url_https'], ['facebook', 'id'], ['google', 'picture'], ['github', 'username'], ['instagram', 'profile_picture'], ['linkedin', 'pictureUrl']], function(s) { return !!services[s[0]] && s[1].length && !!services[s[0]][s[1]]; });
  if(!service)
    return 'none';
  else
    return service[0];
};

getCustomUrl = function (user) {
  var computeUrl = function(prop) {
    if (typeof prop === 'function') {
      prop = prop.call(user);
    }
    if (prop && typeof prop === 'string') {
      return prop;
    }
  }

  var customProp = user && Avatar.options.customImageProperty;
  if (typeof customProp === 'function') {
    return computeUrl(customProp);
  } else if (customProp) {
    return computeUrl(getDescendantProp(user, customProp));
  }
}

getGravatarUrl = function (user, defaultUrl) {
  var gravatarDefault;
  var validGravatars = ['404', 'mm', 'identicon', 'monsterid', 'wavatar', 'retro', 'blank'];

  // Initials are shown when Gravatar returns 404.
  if (Avatar.options.fallbackType !== 'initials') {
    var valid = _.contains(validGravatars, Avatar.options.gravatarDefault);
    gravatarDefault = valid ? Avatar.options.gravatarDefault : defaultUrl;
  }
  else {
    gravatarDefault = '404';
  }

  var options = {
    // NOTE: Gravatar's default option requires a publicly accessible URL,
    // so it won't work when your app is running on localhost and you're
    // using an image with either the standard default image URL or a custom
    // defaultImageUrl that is a relative path (e.g. 'images/defaultAvatar.png').
    default: gravatarDefault,
    size: 200, // use 200x200 like twitter and facebook above (might be useful later)
    secure: true
  };

  var emailOrHash = getEmailOrHash(user);
  return Gravatar.imageUrl(emailOrHash, options);
};

// Get the user's email address or (if the emailHashProperty is defined) hash
getEmailOrHash = function (user) {
  var emailOrHash;
  if (user && Avatar.options.emailHashProperty && !!getDescendantProp(user, Avatar.options.emailHashProperty)) {
    emailOrHash = getDescendantProp(user, Avatar.options.emailHashProperty);
  }
  else if (user && user.emails) {
    var emails = _.pluck(user.emails, 'address');
    emailOrHash = emails[0] || '00000000000000000000000000000000';
  }
  else {
    // If all else fails, return 32 zeros (trash hash, hehe) so that Gravatar
    // has something to build a URL with at least.
    emailOrHash = '00000000000000000000000000000000';
  }
  return emailOrHash;
};

// Returns the size class to use for an avatar
sizeClass = function(context) {
  // Defaults are 'large', 'small', 'extra-small', but user can add new ones
  return Avatar.options.imageSizes[context.size] ? Avatar.getCssClassPrefix() + '-' + context.size : '';
}

// Returns the shape class for an avatar
shapeClass = function (context) {
  var valid = ['rounded', 'circle'];
  return _.contains(valid, context.shape) ? Avatar.getCssClassPrefix() + '-' + context.shape : '';
}

// Returns the custom class(es) for an avatar
customClasses = function (context) {
  return context.class ? context.class : '';
}

// Returns the initials text for an avatar
initialsText = function(user, context) {
  return context.initials || Avatar.getInitials(user);
}

// Creates the dynamically generated CSS file
//
// CSS is dynamically generated so that we can have both a custom class prefix and also allow for custom sizes
createCSS = function () {

  // We only need to do this on the server

  if (!Meteor.isServer)
    return;

  // The base CSS styles

  var p = '.' + Avatar.getCssClassPrefix();
  var a = p + ' ';

  var css =
    p + ' { \n\
      height: 50px; \n\
      width: 50px; \n\
      position: relative; \n\
    } \n' +
    a + p + '-image, \n' +
    a + p + '-initials { \n\
      height: 100%; \n\
      width: 100%; \n\
      position: absolute; \n\
      top: 0px; \n\
      left: 0px; \n\
    } \n' +
    a + p + '-image { \n\
      z-index: 10; \n\
      background-color: #fff; \n\
    } \n' +
    a + p + '-initials { \n\
      display: block; \n\
      background-size: 100% 100%; \n\
      background-color: ' + Avatar.options.backgroundColor + '; \n\
      color: ' + Avatar.options.textColor +'; \n\
      font-size: 25px; \n\
      line-height: 50px; \n\
      font-family: "Helvetica Neue", Helvetica, "Hiragino Sans GB", Arial, sans-serif; \n\
      text-align: center; \n\
      z-index: 1; \n\
    } \n' +
    p + '-rounded ' + p + '-image, \n' +
    p + '-rounded ' + p + '-initials { \n\
      border-radius: 5px; \n\
    } \n'+
    p + '-circle ' + p + '-image, \n' +
    p + '-circle ' + p + '-initials { \n\
      border-radius: 50%; \n\
    } \n' +
    p + '-hide-image ' + p + '-image { \n\
      display: none; \n\
    } \n' +
    p + '-hide-initials ' + p + '-initials { \n\
      display: none; \n\
    } \n\
  ';

  // CSS for each of the defined sizes

  for (sizeName in Avatar.options.imageSizes) {

    var size = Avatar.options.imageSizes[sizeName];

    css = css + p + '-' + sizeName + ' {' +
      'width: ' + size + 'px; ' +
      'min-width: ' + size + 'px; ' +
      'height: ' + size + 'px;' +
    '}\n' +
    p + '-' + sizeName + ' ' + p + '-initials {' +
      'font-size: ' + size / 2 + 'px; ' +
      'line-height: ' + size + 'px;' +
    '}\n';
  }

  // In order to allow for custom sizes and a custom prefix we need to be able to create a style sheet
  // on the fly. To do this cleanly we use the meteor-hacks:inject package to inject the styles directly
  // into the HTML code before it's sent to the client.

  Inject.rawHead('avatar-styles', '<style>' + css + '</style>');
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/utilities_avatar/export.js                                                                               //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
// Avatar object to be exported

Avatar = {

  // Default functionality. You can override these options by calling
  // Avater.setOptions (do not set Avatar.options directly)

  options: {

    // Determines the type of fallback to use when no image can be found via
    // linked services (Gravatar included):
    //   "default image" (the default option, which will show either the image
    //   specified by defaultImageUrl, the package's default image, or a Gravatar
    //   default image)
    //     OR
    //   "initials" (show the user's initials).
    fallbackType: '',

    // This will replace the included default avatar image's URL
    // ('packages/utilities_avatar/default.png'). It can be a relative path
    // (relative to website's base URL, e.g. 'images/defaultAvatar.png').
    defaultImageUrl: '',

    // This property name will be used to fetch an avatar url from the user's profile
    // (e.g. 'avatar'). If this property is set and a property of that name exists
    // on the user's profile (e.g. user.profile.avatar) that property will be used
    // as the avatar url.
    customImageProperty: '',

    // Gravatar default option to use (overrides default image URL)
    // Options are available at:
    // https://secure.gravatar.com/site/implement/images/#default-image
    gravatarDefault: '',

    // This property on the user object will be used for retrieving gravatars
    // (useful when user emails are not published).
    emailHashProperty: '',

    // This property is used to prefix the CSS classes of the DOM elements.
    // If no value is set, then the default CSS class assigned to all DOM elements are prefixed with 'avatar' as default.
    // If a value is set to, 'foo' for example, the resulting CSS classes are prefixed with 'foo'.
    cssClassPrefix: '',

    // This property defines the various image sizes available
    imageSizes: {
      'large': 80,
      'small': 30,
      'extra-small': 20
    },

    // Default background color when displaying the initials.
    // Can also be set to a function to map an user object to a background color.
    backgroundColor: "#aaa",

    // Default text color when displaying the initials.
    // Can also be set to a function to map an user object to a text color.
    textColor: "#fff",

    // Generate the required CSS and includ it in the head of your application.
    // Setting this to false will exclude the generated CSS and leave the
    // avatar unstyled by the package.
    generateCSS: true
  },

  // Sets the Avatar options. You must use this setter function rather than assigning directly to
  // Avatar.options, otherwise the stylesheet won't be generated.

  setOptions: function(options) {
    Avatar.options = _.extend(Avatar.options, options);
    if (Avatar.options.generateCSS)
      createCSS();
  },

  // Returns the cssClassPrefix property from options
  getCssClassPrefix: function () {
    return (Avatar.options.cssClassPrefix)? Avatar.options.cssClassPrefix: 'avatar';
  },

  // Returns a background color for initials
  getBackgroundColor: function (user) {
    if (_.isString(Avatar.options.backgroundColor))
      return Avatar.options.backgroundColor;
    else if (_.isFunction(Avatar.options.backgroundColor))
      return Avatar.options.backgroundColor(user);
  },

  // Returns a text color for initials
  getTextColor: function (user) {
    if (_.isString(Avatar.options.textColor))
      return Avatar.options.textColor;
    else if (_.isFunction(Avatar.options.textColor))
      return Avatar.options.textColor(user);
  },

  // Get the initials of the user
  getInitials: function (user) {

    var initials = '';
    var name = '';
    var parts = [];

    if (user && user.profile && user.profile.firstName) {
      initials = user.profile.firstName.charAt(0).toUpperCase();

      if (user.profile.lastName) {
        initials += user.profile.lastName.charAt(0).toUpperCase();
      }
      else if (user.profile.familyName) {
        initials += user.profile.familyName.charAt(0).toUpperCase();
      }
      else if (user.profile.secondName) {
        initials += user.profile.secondName.charAt(0).toUpperCase();
      }
    }
    else {
      if (user && user.profile && user.profile.name) {
        name = user.profile.name;
      }
      else if (user && user.username) {
        name = user.username;
      }

      parts = name.split(' ');
      // Limit getInitials to first and last initial to avoid problems with
      // very long multi-part names (e.g. "Jose Manuel Garcia Galvez")
      initials = _.first(parts).charAt(0).toUpperCase();
      if (parts.length > 1) {
        initials += _.last(parts).charAt(0).toUpperCase();
      }
    }

    return initials;
  },

  // Get the url of the user's avatar
  getUrl: function (user) {

    var url = '';
    var defaultUrl, svc;

    if (user) {
      svc = getService(user);
      if (svc === 'twitter') {
        // use larger image (200x200 is smallest custom option)
        url = user.services.twitter.profile_image_url_https.replace('_normal.', '_200x200.');
      }
      else if (svc === 'facebook') {
        // use larger image (~200x200)
        url = 'https://graph.facebook.com/' + user.services.facebook.id + '/picture/?type=large';
      }
      else if (svc === 'google') {
        url = user.services.google.picture;
      }
      else if (svc === 'github') {
        url = 'https://avatars.githubusercontent.com/' + user.services.github.username + '?s=200';
      }
      else if (svc === 'instagram') {
        url = user.services.instagram.profile_picture;
      }
      else if (svc === 'linkedin') {
        url = user.services.linkedin.pictureUrl;
      }
      else if (svc === "custom") {
        url = getCustomUrl(user);
      }
      else if (svc === 'none') {
        defaultUrl = Avatar.options.defaultImageUrl || '/packages/utilities_avatar/default.png';
        // If it's a relative path (no '//' anywhere), complete the URL
        if (defaultUrl.indexOf('//') === -1) {
          // Strip starting slash if it exists
          if (defaultUrl.charAt(0) === '/') defaultUrl = defaultUrl.slice(1);
          // Then add the relative path to the server's base URL
          defaultUrl = Meteor.absoluteUrl() + defaultUrl;
        }
        url = getGravatarUrl(user, defaultUrl);
      }
    }

    return url;
  },

  // Create a Gravatar-compatible hash for a given email address
  hash: function (email) {
    return Gravatar.hash(email);
  }
}

// Call setOptions to generate the default CSS. This will be replaced if the user calls setOptions in their own code

Avatar.setOptions({});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['utilities:avatar'] = {}, {
  Avatar: Avatar
});

})();

//# sourceMappingURL=utilities_avatar.js.map
