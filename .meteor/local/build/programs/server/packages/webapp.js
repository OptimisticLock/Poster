(function () {

/* Imports */
var meteorEnv = Package.meteor.meteorEnv;
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var ECMAScript = Package.ecmascript.ECMAScript;
var Log = Package.logging.Log;
var _ = Package.underscore._;
var RoutePolicy = Package.routepolicy.RoutePolicy;
var Boilerplate = Package['boilerplate-generator'].Boilerplate;
var WebAppHashing = Package['webapp-hashing'].WebAppHashing;
var meteorInstall = Package.modules.meteorInstall;
var Buffer = Package.modules.Buffer;
var process = Package.modules.process;
var Symbol = Package['ecmascript-runtime'].Symbol;
var Map = Package['ecmascript-runtime'].Map;
var Set = Package['ecmascript-runtime'].Set;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;

/* Package-scope variables */
var WebApp, WebAppInternals, main;

var require = meteorInstall({"node_modules":{"meteor":{"webapp":{"webapp_server.js":["babel-runtime/helpers/typeof",function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/webapp/webapp_server.js                                                                                  //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _typeof2 = require("babel-runtime/helpers/typeof");                                                              //
                                                                                                                     //
var _typeof3 = _interopRequireDefault(_typeof2);                                                                     //
                                                                                                                     //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                    //
                                                                                                                     //
////////// Requires //////////                                                                                       //
                                                                                                                     //
var fs = Npm.require("fs");                                                                                          // 3
var http = Npm.require("http");                                                                                      // 4
var os = Npm.require("os");                                                                                          // 5
var path = Npm.require("path");                                                                                      // 6
var url = Npm.require("url");                                                                                        // 7
var crypto = Npm.require("crypto");                                                                                  // 8
                                                                                                                     //
var connect = Npm.require('connect');                                                                                // 10
var parseurl = Npm.require('parseurl');                                                                              // 11
var useragent = Npm.require('useragent');                                                                            // 12
var send = Npm.require('send');                                                                                      // 13
                                                                                                                     //
var Future = Npm.require('fibers/future');                                                                           // 15
var Fiber = Npm.require('fibers');                                                                                   // 16
                                                                                                                     //
var SHORT_SOCKET_TIMEOUT = 5 * 1000;                                                                                 // 18
var LONG_SOCKET_TIMEOUT = 120 * 1000;                                                                                // 19
                                                                                                                     //
WebApp = {};                                                                                                         // 21
WebAppInternals = {};                                                                                                // 22
                                                                                                                     //
WebAppInternals.NpmModules = {                                                                                       // 24
  connect: {                                                                                                         // 25
    version: Npm.require('connect/package.json').version,                                                            // 26
    module: connect                                                                                                  // 27
  }                                                                                                                  //
};                                                                                                                   //
                                                                                                                     //
WebApp.defaultArch = 'web.browser';                                                                                  // 31
                                                                                                                     //
// XXX maps archs to manifests                                                                                       //
WebApp.clientPrograms = {};                                                                                          // 34
                                                                                                                     //
// XXX maps archs to program path on filesystem                                                                      //
var archPath = {};                                                                                                   // 37
                                                                                                                     //
var bundledJsCssUrlRewriteHook;                                                                                      // 39
                                                                                                                     //
var sha1 = function sha1(contents) {                                                                                 // 41
  var hash = crypto.createHash('sha1');                                                                              // 42
  hash.update(contents);                                                                                             // 43
  return hash.digest('hex');                                                                                         // 44
};                                                                                                                   //
                                                                                                                     //
var readUtf8FileSync = function readUtf8FileSync(filename) {                                                         // 47
  return Meteor.wrapAsync(fs.readFile)(filename, 'utf8');                                                            // 48
};                                                                                                                   //
                                                                                                                     //
// #BrowserIdentification                                                                                            //
//                                                                                                                   //
// We have multiple places that want to identify the browser: the                                                    //
// unsupported browser page, the appcache package, and, eventually                                                   //
// delivering browser polyfills only as needed.                                                                      //
//                                                                                                                   //
// To avoid detecting the browser in multiple places ad-hoc, we create a                                             //
// Meteor "browser" object. It uses but does not expose the npm                                                      //
// useragent module (we could choose a different mechanism to identify                                               //
// the browser in the future if we wanted to).  The browser object                                                   //
// contains                                                                                                          //
//                                                                                                                   //
// * `name`: the name of the browser in camel case                                                                   //
// * `major`, `minor`, `patch`: integers describing the browser version                                              //
//                                                                                                                   //
// Also here is an early version of a Meteor `request` object, intended                                              //
// to be a high-level description of the request without exposing                                                    //
// details of connect's low-level `req`.  Currently it contains:                                                     //
//                                                                                                                   //
// * `browser`: browser identification object described above                                                        //
// * `url`: parsed url, including parsed query params                                                                //
//                                                                                                                   //
// As a temporary hack there is a `categorizeRequest` function on WebApp which                                       //
// converts a connect `req` to a Meteor `request`. This can go away once smart                                       //
// packages such as appcache are being passed a `request` object directly when                                       //
// they serve content.                                                                                               //
//                                                                                                                   //
// This allows `request` to be used uniformly: it is passed to the html                                              //
// attributes hook, and the appcache package can use it when deciding                                                //
// whether to generate a 404 for the manifest.                                                                       //
//                                                                                                                   //
// Real routing / server side rendering will probably refactor this                                                  //
// heavily.                                                                                                          //
                                                                                                                     //
// e.g. "Mobile Safari" => "mobileSafari"                                                                            //
var camelCase = function camelCase(name) {                                                                           // 87
  var parts = name.split(' ');                                                                                       // 88
  parts[0] = parts[0].toLowerCase();                                                                                 // 89
  for (var i = 1; i < parts.length; ++i) {                                                                           // 90
    parts[i] = parts[i].charAt(0).toUpperCase() + parts[i].substr(1);                                                // 91
  }                                                                                                                  //
  return parts.join('');                                                                                             // 93
};                                                                                                                   //
                                                                                                                     //
var identifyBrowser = function identifyBrowser(userAgentString) {                                                    // 96
  var userAgent = useragent.lookup(userAgentString);                                                                 // 97
  return {                                                                                                           // 98
    name: camelCase(userAgent.family),                                                                               // 99
    major: +userAgent.major,                                                                                         // 100
    minor: +userAgent.minor,                                                                                         // 101
    patch: +userAgent.patch                                                                                          // 102
  };                                                                                                                 //
};                                                                                                                   //
                                                                                                                     //
// XXX Refactor as part of implementing real routing.                                                                //
WebAppInternals.identifyBrowser = identifyBrowser;                                                                   // 107
                                                                                                                     //
WebApp.categorizeRequest = function (req) {                                                                          // 109
  return _.extend({                                                                                                  // 110
    browser: identifyBrowser(req.headers['user-agent']),                                                             // 111
    url: url.parse(req.url, true)                                                                                    // 112
  }, _.pick(req, 'dynamicHead', 'dynamicBody'));                                                                     //
};                                                                                                                   //
                                                                                                                     //
// HTML attribute hooks: functions to be called to determine any attributes to                                       //
// be added to the '<html>' tag. Each function is passed a 'request' object (see                                     //
// #BrowserIdentification) and should return null or object.                                                         //
var htmlAttributeHooks = [];                                                                                         // 119
var getHtmlAttributes = function getHtmlAttributes(request) {                                                        // 120
  var combinedAttributes = {};                                                                                       // 121
  _.each(htmlAttributeHooks || [], function (hook) {                                                                 // 122
    var attributes = hook(request);                                                                                  // 123
    if (attributes === null) return;                                                                                 // 124
    if ((typeof attributes === "undefined" ? "undefined" : (0, _typeof3.default)(attributes)) !== 'object') throw Error("HTML attribute hook must return null or object");
    _.extend(combinedAttributes, attributes);                                                                        // 128
  });                                                                                                                //
  return combinedAttributes;                                                                                         // 130
};                                                                                                                   //
WebApp.addHtmlAttributeHook = function (hook) {                                                                      // 132
  htmlAttributeHooks.push(hook);                                                                                     // 133
};                                                                                                                   //
                                                                                                                     //
// Serve app HTML for this URL?                                                                                      //
var appUrl = function appUrl(url) {                                                                                  // 137
  if (url === '/favicon.ico' || url === '/robots.txt') return false;                                                 // 138
                                                                                                                     //
  // NOTE: app.manifest is not a web standard like favicon.ico and                                                   //
  // robots.txt. It is a file name we have chosen to use for HTML5                                                   //
  // appcache URLs. It is included here to prevent using an appcache                                                 //
  // then removing it from poisoning an app permanently. Eventually,                                                 //
  // once we have server side routing, this won't be needed as                                                       //
  // unknown URLs with return a 404 automatically.                                                                   //
  if (url === '/app.manifest') return false;                                                                         // 137
                                                                                                                     //
  // Avoid serving app HTML for declared routes such as /sockjs/.                                                    //
  if (RoutePolicy.classify(url)) return false;                                                                       // 137
                                                                                                                     //
  // we currently return app HTML on all URLs by default                                                             //
  return true;                                                                                                       // 137
};                                                                                                                   //
                                                                                                                     //
// We need to calculate the client hash after all packages have loaded                                               //
// to give them a chance to populate __meteor_runtime_config__.                                                      //
//                                                                                                                   //
// Calculating the hash during startup means that packages can only                                                  //
// populate __meteor_runtime_config__ during load, not during startup.                                               //
//                                                                                                                   //
// Calculating instead it at the beginning of main after all startup                                                 //
// hooks had run would allow packages to also populate                                                               //
// __meteor_runtime_config__ during startup, but that's too late for                                                 //
// autoupdate because it needs to have the client hash at startup to                                                 //
// insert the auto update version itself into                                                                        //
// __meteor_runtime_config__ to get it to the client.                                                                //
//                                                                                                                   //
// An alternative would be to give autoupdate a "post-start,                                                         //
// pre-listen" hook to allow it to insert the auto update version at                                                 //
// the right moment.                                                                                                 //
                                                                                                                     //
Meteor.startup(function () {                                                                                         // 176
  var calculateClientHash = WebAppHashing.calculateClientHash;                                                       // 177
  WebApp.clientHash = function (archName) {                                                                          // 178
    archName = archName || WebApp.defaultArch;                                                                       // 179
    return calculateClientHash(WebApp.clientPrograms[archName].manifest);                                            // 180
  };                                                                                                                 //
                                                                                                                     //
  WebApp.calculateClientHashRefreshable = function (archName) {                                                      // 183
    archName = archName || WebApp.defaultArch;                                                                       // 184
    return calculateClientHash(WebApp.clientPrograms[archName].manifest, function (name) {                           // 185
      return name === "css";                                                                                         // 187
    });                                                                                                              //
  };                                                                                                                 //
  WebApp.calculateClientHashNonRefreshable = function (archName) {                                                   // 190
    archName = archName || WebApp.defaultArch;                                                                       // 191
    return calculateClientHash(WebApp.clientPrograms[archName].manifest, function (name) {                           // 192
      return name !== "css";                                                                                         // 194
    });                                                                                                              //
  };                                                                                                                 //
  WebApp.calculateClientHashCordova = function () {                                                                  // 197
    var archName = 'web.cordova';                                                                                    // 198
    if (!WebApp.clientPrograms[archName]) return 'none';                                                             // 199
                                                                                                                     //
    return calculateClientHash(WebApp.clientPrograms[archName].manifest, null, _.pick(__meteor_runtime_config__, 'PUBLIC_SETTINGS'));
  };                                                                                                                 //
});                                                                                                                  //
                                                                                                                     //
// When we have a request pending, we want the socket timeout to be long, to                                         //
// give ourselves a while to serve it, and to allow sockjs long polls to                                             //
// complete.  On the other hand, we want to close idle sockets relatively                                            //
// quickly, so that we can shut down relatively promptly but cleanly, without                                        //
// cutting off anyone's response.                                                                                    //
WebApp._timeoutAdjustmentRequestCallback = function (req, res) {                                                     // 215
  // this is really just req.socket.setTimeout(LONG_SOCKET_TIMEOUT);                                                 //
  req.setTimeout(LONG_SOCKET_TIMEOUT);                                                                               // 217
  // Insert our new finish listener to run BEFORE the existing one which removes                                     //
  // the response from the socket.                                                                                   //
  var finishListeners = res.listeners('finish');                                                                     // 215
  // XXX Apparently in Node 0.12 this event is now called 'prefinish'.                                               //
  // https://github.com/joyent/node/commit/7c9b6070                                                                  //
  res.removeAllListeners('finish');                                                                                  // 215
  res.on('finish', function () {                                                                                     // 224
    res.setTimeout(SHORT_SOCKET_TIMEOUT);                                                                            // 225
  });                                                                                                                //
  _.each(finishListeners, function (l) {                                                                             // 227
    res.on('finish', l);                                                                                             // 227
  });                                                                                                                //
};                                                                                                                   //
                                                                                                                     //
// Will be updated by main before we listen.                                                                         //
// Map from client arch to boilerplate object.                                                                       //
// Boilerplate object has:                                                                                           //
//   - func: XXX                                                                                                     //
//   - baseData: XXX                                                                                                 //
var boilerplateByArch = {};                                                                                          // 236
                                                                                                                     //
// Given a request (as returned from `categorizeRequest`), return the                                                //
// boilerplate HTML to serve for that request.                                                                       //
//                                                                                                                   //
// If a previous connect middleware has rendered content for the head or body,                                       //
// returns the boilerplate with that content patched in otherwise                                                    //
// memoizes on HTML attributes (used by, eg, appcache) and whether inline                                            //
// scripts are currently allowed.                                                                                    //
// XXX so far this function is always called with arch === 'web.browser'                                             //
var memoizedBoilerplate = {};                                                                                        // 246
var getBoilerplate = function getBoilerplate(request, arch) {                                                        // 247
  var useMemoized = !(request.dynamicHead || request.dynamicBody);                                                   // 248
  var htmlAttributes = getHtmlAttributes(request);                                                                   // 249
                                                                                                                     //
  if (useMemoized) {                                                                                                 // 251
    // The only thing that changes from request to request (unless extra                                             //
    // content is added to the head or body) are the HTML attributes                                                 //
    // (used by, eg, appcache) and whether inline scripts are allowed, so we                                         //
    // can memoize based on that.                                                                                    //
    var memHash = JSON.stringify({                                                                                   // 256
      inlineScriptsAllowed: inlineScriptsAllowed,                                                                    // 257
      htmlAttributes: htmlAttributes,                                                                                // 258
      arch: arch                                                                                                     // 259
    });                                                                                                              //
                                                                                                                     //
    if (!memoizedBoilerplate[memHash]) {                                                                             // 262
      memoizedBoilerplate[memHash] = boilerplateByArch[arch].toHTML({                                                // 263
        htmlAttributes: htmlAttributes                                                                               // 264
      });                                                                                                            //
    }                                                                                                                //
    return memoizedBoilerplate[memHash];                                                                             // 267
  }                                                                                                                  //
                                                                                                                     //
  var boilerplateOptions = _.extend({                                                                                // 270
    htmlAttributes: htmlAttributes                                                                                   // 271
  }, _.pick(request, 'dynamicHead', 'dynamicBody'));                                                                 //
                                                                                                                     //
  return boilerplateByArch[arch].toHTML(boilerplateOptions);                                                         // 274
};                                                                                                                   //
                                                                                                                     //
WebAppInternals.generateBoilerplateInstance = function (arch, manifest, additionalOptions) {                         // 277
  additionalOptions = additionalOptions || {};                                                                       // 280
                                                                                                                     //
  var runtimeConfig = _.extend(_.clone(__meteor_runtime_config__), additionalOptions.runtimeConfigOverrides || {});  // 282
                                                                                                                     //
  var jsCssUrlRewriteHook = bundledJsCssUrlRewriteHook || function (url) {                                           // 287
    var bundledPrefix = __meteor_runtime_config__.ROOT_URL_PATH_PREFIX || '';                                        // 288
    return bundledPrefix + url;                                                                                      // 290
  };                                                                                                                 //
                                                                                                                     //
  return new Boilerplate(arch, manifest, _.extend({                                                                  // 293
    pathMapper: function () {                                                                                        // 295
      function pathMapper(itemPath) {                                                                                // 295
        return path.join(archPath[arch], itemPath);                                                                  // 296
      }                                                                                                              //
                                                                                                                     //
      return pathMapper;                                                                                             //
    }(),                                                                                                             //
    baseDataExtension: {                                                                                             // 297
      additionalStaticJs: _.map(additionalStaticJs || [], function (contents, pathname) {                            // 298
        return {                                                                                                     // 301
          pathname: pathname,                                                                                        // 302
          contents: contents                                                                                         // 303
        };                                                                                                           //
      }),                                                                                                            //
      // Convert to a JSON string, then get rid of most weird characters, then                                       //
      // wrap in double quotes. (The outermost JSON.stringify really ought to                                        //
      // just be "wrap in double quotes" but we use it to be safe.) This might                                       //
      // end up inside a <script> tag so we need to be careful to not include                                        //
      // "</script>", but normal {{spacebars}} escaping escapes too much! See                                        //
      // https://github.com/meteor/meteor/issues/3730                                                                //
      meteorRuntimeConfig: JSON.stringify(encodeURIComponent(JSON.stringify(runtimeConfig))),                        // 313
      rootUrlPathPrefix: __meteor_runtime_config__.ROOT_URL_PATH_PREFIX || '',                                       // 315
      bundledJsCssUrlRewriteHook: jsCssUrlRewriteHook,                                                               // 316
      inlineScriptsAllowed: WebAppInternals.inlineScriptsAllowed(),                                                  // 317
      inline: additionalOptions.inline                                                                               // 318
    }                                                                                                                //
  }, additionalOptions));                                                                                            //
};                                                                                                                   //
                                                                                                                     //
// A mapping from url path to "info". Where "info" has the following fields:                                         //
// - type: the type of file to be served                                                                             //
// - cacheable: optionally, whether the file should be cached or not                                                 //
// - sourceMapUrl: optionally, the url of the source map                                                             //
//                                                                                                                   //
// Info also contains one of the following:                                                                          //
// - content: the stringified content that should be served at this path                                             //
// - absolutePath: the absolute path on disk to the file                                                             //
                                                                                                                     //
var staticFiles;                                                                                                     // 333
                                                                                                                     //
// Serve static files from the manifest or added with                                                                //
// `addStaticJs`. Exported for tests.                                                                                //
WebAppInternals.staticFilesMiddleware = function (staticFiles, req, res, next) {                                     // 337
  if ('GET' != req.method && 'HEAD' != req.method && 'OPTIONS' != req.method) {                                      // 338
    next();                                                                                                          // 339
    return;                                                                                                          // 340
  }                                                                                                                  //
  var pathname = parseurl(req).pathname;                                                                             // 342
  try {                                                                                                              // 343
    pathname = decodeURIComponent(pathname);                                                                         // 344
  } catch (e) {                                                                                                      //
    next();                                                                                                          // 346
    return;                                                                                                          // 347
  }                                                                                                                  //
                                                                                                                     //
  var serveStaticJs = function serveStaticJs(s) {                                                                    // 350
    res.writeHead(200, {                                                                                             // 351
      'Content-type': 'application/javascript; charset=UTF-8'                                                        // 352
    });                                                                                                              //
    res.write(s);                                                                                                    // 354
    res.end();                                                                                                       // 355
  };                                                                                                                 //
                                                                                                                     //
  if (pathname === "/meteor_runtime_config.js" && !WebAppInternals.inlineScriptsAllowed()) {                         // 358
    serveStaticJs("__meteor_runtime_config__ = " + JSON.stringify(__meteor_runtime_config__) + ";");                 // 360
    return;                                                                                                          // 362
  } else if (_.has(additionalStaticJs, pathname) && !WebAppInternals.inlineScriptsAllowed()) {                       //
    serveStaticJs(additionalStaticJs[pathname]);                                                                     // 365
    return;                                                                                                          // 366
  }                                                                                                                  //
                                                                                                                     //
  if (!_.has(staticFiles, pathname)) {                                                                               // 369
    next();                                                                                                          // 370
    return;                                                                                                          // 371
  }                                                                                                                  //
                                                                                                                     //
  // We don't need to call pause because, unlike 'static', once we call into                                         //
  // 'send' and yield to the event loop, we never call another handler with                                          //
  // 'next'.                                                                                                         //
                                                                                                                     //
  var info = staticFiles[pathname];                                                                                  // 337
                                                                                                                     //
  // Cacheable files are files that should never change. Typically                                                   //
  // named by their hash (eg meteor bundled js and css files).                                                       //
  // We cache them ~forever (1yr).                                                                                   //
  var maxAge = info.cacheable ? 1000 * 60 * 60 * 24 * 365 : 0;                                                       // 337
                                                                                                                     //
  // Set the X-SourceMap header, which current Chrome, FireFox, and Safari                                           //
  // understand.  (The SourceMap header is slightly more spec-correct but FF                                         //
  // doesn't understand it.)                                                                                         //
  //                                                                                                                 //
  // You may also need to enable source maps in Chrome: open dev tools, click                                        //
  // the gear in the bottom right corner, and select "enable source maps".                                           //
  if (info.sourceMapUrl) {                                                                                           // 337
    res.setHeader('X-SourceMap', __meteor_runtime_config__.ROOT_URL_PATH_PREFIX + info.sourceMapUrl);                // 394
  }                                                                                                                  //
                                                                                                                     //
  if (info.type === "js") {                                                                                          // 399
    res.setHeader("Content-Type", "application/javascript; charset=UTF-8");                                          // 400
  } else if (info.type === "css") {                                                                                  //
    res.setHeader("Content-Type", "text/css; charset=UTF-8");                                                        // 402
  } else if (info.type === "json") {                                                                                 //
    res.setHeader("Content-Type", "application/json; charset=UTF-8");                                                // 404
    // XXX if it is a manifest we are serving, set additional headers                                                //
    if (/\/manifest\.json$/.test(pathname)) {                                                                        // 403
      res.setHeader("Access-Control-Allow-Origin", "*");                                                             // 407
    }                                                                                                                //
  }                                                                                                                  //
                                                                                                                     //
  if (info.hash) {                                                                                                   // 411
    res.setHeader('ETag', '"' + info.hash + '"');                                                                    // 412
  }                                                                                                                  //
                                                                                                                     //
  if (info.content) {                                                                                                // 415
    res.write(info.content);                                                                                         // 416
    res.end();                                                                                                       // 417
  } else {                                                                                                           //
    send(req, info.absolutePath, {                                                                                   // 419
      maxage: maxAge,                                                                                                // 420
      dotfiles: 'allow', // if we specified a dotfile in the manifest, serve it                                      // 421
      lastModified: false // don't set last-modified based on the file date                                          // 422
    }).on('error', function (err) {                                                                                  // 419
      Log.error("Error serving static file " + err);                                                                 // 424
      res.writeHead(500);                                                                                            // 425
      res.end();                                                                                                     // 426
    }).on('directory', function () {                                                                                 //
      Log.error("Unexpected directory " + info.absolutePath);                                                        // 429
      res.writeHead(500);                                                                                            // 430
      res.end();                                                                                                     // 431
    }).pipe(res);                                                                                                    //
  }                                                                                                                  //
};                                                                                                                   //
                                                                                                                     //
var getUrlPrefixForArch = function getUrlPrefixForArch(arch) {                                                       // 437
  // XXX we rely on the fact that arch names don't contain slashes                                                   //
  // in that case we would need to uri escape it                                                                     //
                                                                                                                     //
  // We add '__' to the beginning of non-standard archs to "scope" the url                                           //
  // to Meteor internals.                                                                                            //
  return arch === WebApp.defaultArch ? '' : '/' + '__' + arch.replace(/^web\./, '');                                 // 443
};                                                                                                                   //
                                                                                                                     //
// parse port to see if its a Windows Server style named pipe. If so, return as-is (String), otherwise return as Int
WebAppInternals.parsePort = function (port) {                                                                        // 448
  if (/\\\\?.+\\pipe\\?.+/.test(port)) {                                                                             // 449
    return port;                                                                                                     // 450
  }                                                                                                                  //
                                                                                                                     //
  return parseInt(port);                                                                                             // 453
};                                                                                                                   //
                                                                                                                     //
var runWebAppServer = function runWebAppServer() {                                                                   // 456
  var shuttingDown = false;                                                                                          // 457
  var syncQueue = new Meteor._SynchronousQueue();                                                                    // 458
                                                                                                                     //
  var getItemPathname = function getItemPathname(itemUrl) {                                                          // 460
    return decodeURIComponent(url.parse(itemUrl).pathname);                                                          // 461
  };                                                                                                                 //
                                                                                                                     //
  WebAppInternals.reloadClientPrograms = function () {                                                               // 464
    syncQueue.runTask(function () {                                                                                  // 465
      staticFiles = {};                                                                                              // 466
      var generateClientProgram = function generateClientProgram(clientPath, arch) {                                 // 467
        // read the control for the client we'll be serving up                                                       //
        var clientJsonPath = path.join(__meteor_bootstrap__.serverDir, clientPath);                                  // 469
        var clientDir = path.dirname(clientJsonPath);                                                                // 471
        var clientJson = JSON.parse(readUtf8FileSync(clientJsonPath));                                               // 472
        if (clientJson.format !== "web-program-pre1") throw new Error("Unsupported format for client assets: " + JSON.stringify(clientJson.format));
                                                                                                                     //
        if (!clientJsonPath || !clientDir || !clientJson) throw new Error("Client config file not parsed.");         // 477
                                                                                                                     //
        var urlPrefix = getUrlPrefixForArch(arch);                                                                   // 480
                                                                                                                     //
        var manifest = clientJson.manifest;                                                                          // 482
        _.each(manifest, function (item) {                                                                           // 483
          if (item.url && item.where === "client") {                                                                 // 484
            staticFiles[urlPrefix + getItemPathname(item.url)] = {                                                   // 485
              absolutePath: path.join(clientDir, item.path),                                                         // 486
              cacheable: item.cacheable,                                                                             // 487
              hash: item.hash,                                                                                       // 488
              // Link from source to its map                                                                         //
              sourceMapUrl: item.sourceMapUrl,                                                                       // 490
              type: item.type                                                                                        // 491
            };                                                                                                       //
                                                                                                                     //
            if (item.sourceMap) {                                                                                    // 494
              // Serve the source map too, under the specified URL. We assume all                                    //
              // source maps are cacheable.                                                                          //
              staticFiles[urlPrefix + getItemPathname(item.sourceMapUrl)] = {                                        // 497
                absolutePath: path.join(clientDir, item.sourceMap),                                                  // 498
                cacheable: true                                                                                      // 499
              };                                                                                                     //
            }                                                                                                        //
          }                                                                                                          //
        });                                                                                                          //
                                                                                                                     //
        var program = {                                                                                              // 505
          format: "web-program-pre1",                                                                                // 506
          manifest: manifest,                                                                                        // 507
          version: WebAppHashing.calculateClientHash(manifest, null, _.pick(__meteor_runtime_config__, 'PUBLIC_SETTINGS')),
          PUBLIC_SETTINGS: __meteor_runtime_config__.PUBLIC_SETTINGS                                                 // 510
        };                                                                                                           //
                                                                                                                     //
        WebApp.clientPrograms[arch] = program;                                                                       // 513
                                                                                                                     //
        // Serve the program as a string at /foo/<arch>/manifest.json                                                //
        // XXX change manifest.json -> program.json                                                                  //
        staticFiles[urlPrefix + getItemPathname('/manifest.json')] = {                                               // 467
          content: JSON.stringify(program),                                                                          // 518
          cacheable: false,                                                                                          // 519
          hash: program.version,                                                                                     // 520
          type: "json"                                                                                               // 521
        };                                                                                                           //
      };                                                                                                             //
                                                                                                                     //
      try {                                                                                                          // 525
        var clientPaths = __meteor_bootstrap__.configJson.clientPaths;                                               // 526
        _.each(clientPaths, function (clientPath, arch) {                                                            // 527
          archPath[arch] = path.dirname(clientPath);                                                                 // 528
          generateClientProgram(clientPath, arch);                                                                   // 529
        });                                                                                                          //
                                                                                                                     //
        // Exported for tests.                                                                                       //
        WebAppInternals.staticFiles = staticFiles;                                                                   // 525
      } catch (e) {                                                                                                  //
        Log.error("Error reloading the client program: " + e.stack);                                                 // 535
        process.exit(1);                                                                                             // 536
      }                                                                                                              //
    });                                                                                                              //
  };                                                                                                                 //
                                                                                                                     //
  WebAppInternals.generateBoilerplate = function () {                                                                // 541
    // This boilerplate will be served to the mobile devices when used with                                          //
    // Meteor/Cordova for the Hot-Code Push and since the file will be served by                                     //
    // the device's server, it is important to set the DDP url to the actual                                         //
    // Meteor server accepting DDP connections and not the device's file server.                                     //
    var defaultOptionsForArch = {                                                                                    // 546
      'web.cordova': {                                                                                               // 547
        runtimeConfigOverrides: {                                                                                    // 548
          // XXX We use absoluteUrl() here so that we serve https://                                                 //
          // URLs to cordova clients if force-ssl is in use. If we were                                              //
          // to use __meteor_runtime_config__.ROOT_URL instead of                                                    //
          // absoluteUrl(), then Cordova clients would immediately get a                                             //
          // HCP setting their DDP_DEFAULT_CONNECTION_URL to                                                         //
          // http://example.meteor.com. This breaks the app, because                                                 //
          // force-ssl doesn't serve CORS headers on 302                                                             //
          // redirects. (Plus it's undesirable to have clients                                                       //
          // connecting to http://example.meteor.com when force-ssl is                                               //
          // in use.)                                                                                                //
          DDP_DEFAULT_CONNECTION_URL: process.env.MOBILE_DDP_URL || Meteor.absoluteUrl(),                            // 559
          ROOT_URL: process.env.MOBILE_ROOT_URL || Meteor.absoluteUrl()                                              // 561
        }                                                                                                            //
      }                                                                                                              //
    };                                                                                                               //
                                                                                                                     //
    syncQueue.runTask(function () {                                                                                  // 567
      _.each(WebApp.clientPrograms, function (program, archName) {                                                   // 568
        boilerplateByArch[archName] = WebAppInternals.generateBoilerplateInstance(archName, program.manifest, defaultOptionsForArch[archName]);
      });                                                                                                            //
                                                                                                                     //
      // Clear the memoized boilerplate cache.                                                                       //
      memoizedBoilerplate = {};                                                                                      // 567
                                                                                                                     //
      // Configure CSS injection for the default arch                                                                //
      // XXX implement the CSS injection for all archs?                                                              //
      WebAppInternals.refreshableAssets = {                                                                          // 567
        allCss: boilerplateByArch[WebApp.defaultArch].baseData.css                                                   // 581
      };                                                                                                             //
    });                                                                                                              //
  };                                                                                                                 //
                                                                                                                     //
  WebAppInternals.reloadClientPrograms();                                                                            // 586
                                                                                                                     //
  // webserver                                                                                                       //
  var app = connect();                                                                                               // 456
                                                                                                                     //
  // Auto-compress any json, javascript, or text.                                                                    //
  app.use(connect.compress());                                                                                       // 456
                                                                                                                     //
  // Packages and apps can add handlers that run before any other Meteor                                             //
  // handlers via WebApp.rawConnectHandlers.                                                                         //
  var rawConnectHandlers = connect();                                                                                // 456
  app.use(rawConnectHandlers);                                                                                       // 597
                                                                                                                     //
  // We're not a proxy; reject (without crashing) attempts to treat us like                                          //
  // one. (See #1212.)                                                                                               //
  app.use(function (req, res, next) {                                                                                // 456
    if (RoutePolicy.isValidUrl(req.url)) {                                                                           // 602
      next();                                                                                                        // 603
      return;                                                                                                        // 604
    }                                                                                                                //
    res.writeHead(400);                                                                                              // 606
    res.write("Not a proxy");                                                                                        // 607
    res.end();                                                                                                       // 608
  });                                                                                                                //
                                                                                                                     //
  // Strip off the path prefix, if it exists.                                                                        //
  app.use(function (request, response, next) {                                                                       // 456
    var pathPrefix = __meteor_runtime_config__.ROOT_URL_PATH_PREFIX;                                                 // 613
    var url = Npm.require('url').parse(request.url);                                                                 // 614
    var pathname = url.pathname;                                                                                     // 615
    // check if the path in the url starts with the path prefix (and the part                                        //
    // after the path prefix must start with a / if it exists.)                                                      //
    if (pathPrefix && pathname.substring(0, pathPrefix.length) === pathPrefix && (pathname.length == pathPrefix.length || pathname.substring(pathPrefix.length, pathPrefix.length + 1) === "/")) {
      request.url = request.url.substring(pathPrefix.length);                                                        // 621
      next();                                                                                                        // 622
    } else if (pathname === "/favicon.ico" || pathname === "/robots.txt") {                                          //
      next();                                                                                                        // 624
    } else if (pathPrefix) {                                                                                         //
      response.writeHead(404);                                                                                       // 626
      response.write("Unknown path");                                                                                // 627
      response.end();                                                                                                // 628
    } else {                                                                                                         //
      next();                                                                                                        // 630
    }                                                                                                                //
  });                                                                                                                //
                                                                                                                     //
  // Parse the query string into res.query. Used by oauth_server, but it's                                           //
  // generally pretty handy..                                                                                        //
  app.use(connect.query());                                                                                          // 456
                                                                                                                     //
  // Serve static files from the manifest.                                                                           //
  // This is inspired by the 'static' middleware.                                                                    //
  app.use(function (req, res, next) {                                                                                // 456
    Fiber(function () {                                                                                              // 641
      WebAppInternals.staticFilesMiddleware(staticFiles, req, res, next);                                            // 642
    }).run();                                                                                                        //
  });                                                                                                                //
                                                                                                                     //
  // Packages and apps can add handlers to this via WebApp.connectHandlers.                                          //
  // They are inserted before our default handler.                                                                   //
  var packageAndAppHandlers = connect();                                                                             // 456
  app.use(packageAndAppHandlers);                                                                                    // 649
                                                                                                                     //
  var _suppressConnectErrors = false;                                                                                // 651
  // connect knows it is an error handler because it has 4 arguments instead of                                      //
  // 3. go figure.  (It is not smart enough to find such a thing if it's hidden                                      //
  // inside packageAndAppHandlers.)                                                                                  //
  app.use(function (err, req, res, next) {                                                                           // 456
    if (!err || !_suppressConnectErrors || !req.headers['x-suppress-error']) {                                       // 656
      next(err);                                                                                                     // 657
      return;                                                                                                        // 658
    }                                                                                                                //
    res.writeHead(err.status, { 'Content-Type': 'text/plain' });                                                     // 660
    res.end("An error message");                                                                                     // 661
  });                                                                                                                //
                                                                                                                     //
  app.use(function (req, res, next) {                                                                                // 664
    Fiber(function () {                                                                                              // 665
      if (!appUrl(req.url)) return next();                                                                           // 666
                                                                                                                     //
      var headers = {                                                                                                // 669
        'Content-Type': 'text/html; charset=utf-8'                                                                   // 670
      };                                                                                                             //
      if (shuttingDown) headers['Connection'] = 'Close';                                                             // 672
                                                                                                                     //
      var request = WebApp.categorizeRequest(req);                                                                   // 675
                                                                                                                     //
      if (request.url.query && request.url.query['meteor_css_resource']) {                                           // 677
        // In this case, we're requesting a CSS resource in the meteor-specific                                      //
        // way, but we don't have it.  Serve a static css file that indicates that                                   //
        // we didn't have it, so we can detect that and refresh.  Make sure                                          //
        // that any proxies or CDNs don't cache this error!  (Normally proxies                                       //
        // or CDNs are smart enough not to cache error pages, but in order to                                        //
        // make this hack work, we need to return the CSS file as a 200, which                                       //
        // would otherwise be cached.)                                                                               //
        headers['Content-Type'] = 'text/css; charset=utf-8';                                                         // 685
        headers['Cache-Control'] = 'no-cache';                                                                       // 686
        res.writeHead(200, headers);                                                                                 // 687
        res.write(".meteor-css-not-found-error { width: 0px;}");                                                     // 688
        res.end();                                                                                                   // 689
        return undefined;                                                                                            // 690
      }                                                                                                              //
                                                                                                                     //
      if (request.url.query && request.url.query['meteor_js_resource']) {                                            // 693
        // Similarly, we're requesting a JS resource that we don't have.                                             //
        // Serve an uncached 404. (We can't use the same hack we use for CSS,                                        //
        // because actually acting on that hack requires us to have the JS                                           //
        // already!)                                                                                                 //
        headers['Cache-Control'] = 'no-cache';                                                                       // 698
        res.writeHead(404, headers);                                                                                 // 699
        res.end("404 Not Found");                                                                                    // 700
        return undefined;                                                                                            // 701
      }                                                                                                              //
                                                                                                                     //
      if (request.url.query && request.url.query['meteor_dont_serve_index']) {                                       // 704
        // When downloading files during a Cordova hot code push, we need                                            //
        // to detect if a file is not available instead of inadvertently                                             //
        // downloading the default index page.                                                                       //
        // So similar to the situation above, we serve an uncached 404.                                              //
        headers['Cache-Control'] = 'no-cache';                                                                       // 709
        res.writeHead(404, headers);                                                                                 // 710
        res.end("404 Not Found");                                                                                    // 711
        return undefined;                                                                                            // 712
      }                                                                                                              //
                                                                                                                     //
      // /packages/asdfsad ... /__cordova/dafsdf.js                                                                  //
      var pathname = parseurl(req).pathname;                                                                         // 665
      var archKey = pathname.split('/')[1];                                                                          // 717
      var archKeyCleaned = 'web.' + archKey.replace(/^__/, '');                                                      // 718
                                                                                                                     //
      if (!/^__/.test(archKey) || !_.has(archPath, archKeyCleaned)) {                                                // 720
        archKey = WebApp.defaultArch;                                                                                // 721
      } else {                                                                                                       //
        archKey = archKeyCleaned;                                                                                    // 723
      }                                                                                                              //
                                                                                                                     //
      var boilerplate;                                                                                               // 726
      try {                                                                                                          // 727
        boilerplate = getBoilerplate(request, archKey);                                                              // 728
      } catch (e) {                                                                                                  //
        Log.error("Error running template: " + e.stack);                                                             // 730
        res.writeHead(500, headers);                                                                                 // 731
        res.end();                                                                                                   // 732
        return undefined;                                                                                            // 733
      }                                                                                                              //
                                                                                                                     //
      var statusCode = res.statusCode ? res.statusCode : 200;                                                        // 736
      res.writeHead(statusCode, headers);                                                                            // 737
      res.write(boilerplate);                                                                                        // 738
      res.end();                                                                                                     // 739
      return undefined;                                                                                              // 740
    }).run();                                                                                                        //
  });                                                                                                                //
                                                                                                                     //
  // Return 404 by default, if no other handlers serve this URL.                                                     //
  app.use(function (req, res) {                                                                                      // 456
    res.writeHead(404);                                                                                              // 746
    res.end();                                                                                                       // 747
  });                                                                                                                //
                                                                                                                     //
  var httpServer = http.createServer(app);                                                                           // 751
  var onListeningCallbacks = [];                                                                                     // 752
                                                                                                                     //
  // After 5 seconds w/o data on a socket, kill it.  On the other hand, if                                           //
  // there's an outstanding request, give it a higher timeout instead (to avoid                                      //
  // killing long-polling requests)                                                                                  //
  httpServer.setTimeout(SHORT_SOCKET_TIMEOUT);                                                                       // 456
                                                                                                                     //
  // Do this here, and then also in livedata/stream_server.js, because                                               //
  // stream_server.js kills all the current request handlers when installing its                                     //
  // own.                                                                                                            //
  httpServer.on('request', WebApp._timeoutAdjustmentRequestCallback);                                                // 456
                                                                                                                     //
  // start up app                                                                                                    //
  _.extend(WebApp, {                                                                                                 // 456
    connectHandlers: packageAndAppHandlers,                                                                          // 767
    rawConnectHandlers: rawConnectHandlers,                                                                          // 768
    httpServer: httpServer,                                                                                          // 769
    // For testing.                                                                                                  //
    suppressConnectErrors: function () {                                                                             // 771
      function suppressConnectErrors() {                                                                             // 771
        _suppressConnectErrors = true;                                                                               // 772
      }                                                                                                              //
                                                                                                                     //
      return suppressConnectErrors;                                                                                  //
    }(),                                                                                                             //
    onListening: function () {                                                                                       // 774
      function onListening(f) {                                                                                      // 774
        if (onListeningCallbacks) onListeningCallbacks.push(f);else f();                                             // 775
      }                                                                                                              //
                                                                                                                     //
      return onListening;                                                                                            //
    }()                                                                                                              //
  });                                                                                                                //
                                                                                                                     //
  // Let the rest of the packages (and Meteor.startup hooks) insert connect                                          //
  // middlewares and update __meteor_runtime_config__, then keep going to set up                                     //
  // actually serving HTML.                                                                                          //
  main = function main(argv) {                                                                                       // 456
    WebAppInternals.generateBoilerplate();                                                                           // 786
                                                                                                                     //
    // only start listening after all the startup code has run.                                                      //
    var localPort = WebAppInternals.parsePort(process.env.PORT) || 0;                                                // 785
    var host = process.env.BIND_IP;                                                                                  // 790
    var localIp = host || '0.0.0.0';                                                                                 // 791
    httpServer.listen(localPort, localIp, Meteor.bindEnvironment(function () {                                       // 792
      if (process.env.METEOR_PRINT_ON_LISTEN) console.log("LISTENING"); // must match run-app.js                     // 793
                                                                                                                     //
      var callbacks = onListeningCallbacks;                                                                          // 792
      onListeningCallbacks = null;                                                                                   // 797
      _.each(callbacks, function (x) {                                                                               // 798
        x();                                                                                                         // 798
      });                                                                                                            //
    }, function (e) {                                                                                                //
      console.error("Error listening:", e);                                                                          // 801
      console.error(e && e.stack);                                                                                   // 802
    }));                                                                                                             //
                                                                                                                     //
    return 'DAEMON';                                                                                                 // 805
  };                                                                                                                 //
};                                                                                                                   //
                                                                                                                     //
runWebAppServer();                                                                                                   // 810
                                                                                                                     //
var inlineScriptsAllowed = true;                                                                                     // 813
                                                                                                                     //
WebAppInternals.inlineScriptsAllowed = function () {                                                                 // 815
  return inlineScriptsAllowed;                                                                                       // 816
};                                                                                                                   //
                                                                                                                     //
WebAppInternals.setInlineScriptsAllowed = function (value) {                                                         // 819
  inlineScriptsAllowed = value;                                                                                      // 820
  WebAppInternals.generateBoilerplate();                                                                             // 821
};                                                                                                                   //
                                                                                                                     //
WebAppInternals.setBundledJsCssUrlRewriteHook = function (hookFn) {                                                  // 825
  bundledJsCssUrlRewriteHook = hookFn;                                                                               // 826
  WebAppInternals.generateBoilerplate();                                                                             // 827
};                                                                                                                   //
                                                                                                                     //
WebAppInternals.setBundledJsCssPrefix = function (prefix) {                                                          // 830
  var self = this;                                                                                                   // 831
  self.setBundledJsCssUrlRewriteHook(function (url) {                                                                // 832
    return prefix + url;                                                                                             // 834
  });                                                                                                                //
};                                                                                                                   //
                                                                                                                     //
// Packages can call `WebAppInternals.addStaticJs` to specify static                                                 //
// JavaScript to be included in the app. This static JS will be inlined,                                             //
// unless inline scripts have been disabled, in which case it will be                                                //
// served under `/<sha1 of contents>`.                                                                               //
var additionalStaticJs = {};                                                                                         // 842
WebAppInternals.addStaticJs = function (contents) {                                                                  // 843
  additionalStaticJs["/" + sha1(contents) + ".js"] = contents;                                                       // 844
};                                                                                                                   //
                                                                                                                     //
// Exported for tests                                                                                                //
WebAppInternals.getBoilerplate = getBoilerplate;                                                                     // 848
WebAppInternals.additionalStaticJs = additionalStaticJs;                                                             // 849
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]}}}},{"extensions":[".js",".json"]});
require("./node_modules/meteor/webapp/webapp_server.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package.webapp = {}, {
  WebApp: WebApp,
  main: main,
  WebAppInternals: WebAppInternals
});

})();

//# sourceMappingURL=webapp.js.map
