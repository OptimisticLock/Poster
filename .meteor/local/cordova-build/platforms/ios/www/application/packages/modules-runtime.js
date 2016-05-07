//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var meteorEnv = Package.meteor.meteorEnv;
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;

/* Package-scope variables */
var makeInstaller, meteorInstall;

//////////////////////////////////////////////////////////////////////////////
//                                                                          //
// packages/modules-runtime/.npm/package/node_modules/install/install.js    //
// This file is in bare mode and is not in its own closure.                 //
//                                                                          //
//////////////////////////////////////////////////////////////////////////////
                                                                            //
makeInstaller = function (options) {                                        // 1
  options = options || {};                                                  // 2
                                                                            // 3
  // These file extensions will be appended to required module identifiers  // 4
  // if they do not exactly match an installed module.                      // 5
  var extensions = options.extensions || [".js", ".json"];                  // 6
                                                                            // 7
  // This constructor will be used to instantiate the module objects        // 8
  // passed to module factory functions (i.e. the third argument after      // 9
  // require and exports).                                                  // 10
  var Module = options.Module || function Module(id, parent) {              // 11
    this.id = id;                                                           // 12
    this.parent = parent;                                                   // 13
  };                                                                        // 14
                                                                            // 15
  // If defined, the options.onInstall function will be called any time     // 16
  // new modules are installed.                                             // 17
  var onInstall = options.onInstall;                                        // 18
                                                                            // 19
  // If defined, the options.override function will be called before        // 20
  // looking up any top-level package identifiers in node_modules           // 21
  // directories. It can either return a string to provide an alternate     // 22
  // package identifier, or a non-string value to prevent the lookup from   // 23
  // proceeding.                                                            // 24
  var override = options.override;                                          // 25
                                                                            // 26
  // If defined, the options.fallback function will be called when no       // 27
  // installed module is found for a required module identifier. Often      // 28
  // options.fallback will be implemented in terms of the native Node       // 29
  // require function, which has the ability to load binary modules.        // 30
  var fallback = options.fallback;                                          // 31
                                                                            // 32
  // Whenever a new require function is created in the makeRequire          // 33
  // function below, any methods contained by options.requireMethods will   // 34
  // be bound and attached as methods to that function object. This option  // 35
  // is intended to support user-defined require.* extensions like          // 36
  // require.ensure and require.promise.                                    // 37
  var requireMethods = options.requireMethods;                              // 38
                                                                            // 39
  // Nothing special about MISSING.hasOwnProperty, except that it's fewer   // 40
  // characters than Object.prototype.hasOwnProperty after minification.    // 41
  var hasOwn = {}.hasOwnProperty;                                           // 42
                                                                            // 43
  // The file object representing the root directory of the installed       // 44
  // module tree.                                                           // 45
  var root = new File("/", new File("/.."));                                // 46
  var rootRequire = makeRequire(root);                                      // 47
                                                                            // 48
  // Merges the given tree of directories and module factory functions      // 49
  // into the tree of installed modules and returns a require function      // 50
  // that behaves as if called from a module in the root directory.         // 51
  function install(tree, options) {                                         // 52
    if (isObject(tree)) {                                                   // 53
      fileMergeContents(root, tree, options);                               // 54
      if (isFunction(onInstall)) {                                          // 55
        onInstall(rootRequire);                                             // 56
      }                                                                     // 57
    }                                                                       // 58
    return rootRequire;                                                     // 59
  }                                                                         // 60
                                                                            // 61
  function getOwn(obj, key) {                                               // 62
    return hasOwn.call(obj, key) && obj[key];                               // 63
  }                                                                         // 64
                                                                            // 65
  function isObject(value) {                                                // 66
    return value && typeof value === "object";                              // 67
  }                                                                         // 68
                                                                            // 69
  function isFunction(value) {                                              // 70
    return typeof value === "function";                                     // 71
  }                                                                         // 72
                                                                            // 73
  function isString(value) {                                                // 74
    return typeof value === "string";                                       // 75
  }                                                                         // 76
                                                                            // 77
  function makeRequire(file) {                                              // 78
    function require(id) {                                                  // 79
      var result = fileResolve(file, id);                                   // 80
      if (result) {                                                         // 81
        return fileEvaluate(result);                                        // 82
      }                                                                     // 83
                                                                            // 84
      var error = new Error("Cannot find module '" + id + "'");             // 85
                                                                            // 86
      if (isFunction(fallback)) {                                           // 87
        return fallback(                                                    // 88
          id, // The missing module identifier.                             // 89
          file.m.id, // The path of the requiring file.                     // 90
          error // The error we would have thrown.                          // 91
        );                                                                  // 92
      }                                                                     // 93
                                                                            // 94
      throw error;                                                          // 95
    }                                                                       // 96
                                                                            // 97
    require.resolve = function (id) {                                       // 98
      var f = fileResolve(file, id);                                        // 99
      if (f) return f.m.id;                                                 // 100
      throw new Error("Cannot find module '" + id + "'");                   // 101
    };                                                                      // 102
                                                                            // 103
    // A function that immediately returns true iff all the transitive      // 104
    // dependencies of the module identified by id have been installed.     // 105
    // This function can be used with options.onInstall to implement        // 106
    // asynchronous module loading APIs like require.ensure.                // 107
    require.ready = function (id) {                                         // 108
      return fileReady(fileResolve(file, id));                              // 109
    };                                                                      // 110
                                                                            // 111
    if (requireMethods) {                                                   // 112
      Object.keys(requireMethods).forEach(function (name) {                 // 113
        if (isFunction(requireMethods[name])) {                             // 114
          require[name] = requireMethods[name].bind(require);               // 115
        }                                                                   // 116
      });                                                                   // 117
    }                                                                       // 118
                                                                            // 119
    return require;                                                         // 120
  }                                                                         // 121
                                                                            // 122
  // File objects represent either directories or modules that have been    // 123
  // installed. When a `File` respresents a directory, its `.c` (contents)  // 124
  // property is an object containing the names of the files (or            // 125
  // directories) that it contains. When a `File` represents a module, its  // 126
  // `.c` property is a function that can be invoked with the appropriate   // 127
  // `(require, exports, module)` arguments to evaluate the module. If the  // 128
  // `.c` property is a string, that string will be resolved as a module    // 129
  // identifier, and the exports of the resulting module will provide the   // 130
  // exports of the original file. The `.p` (parent) property of a File is  // 131
  // either a directory `File` or `null`. Note that a child may claim       // 132
  // another `File` as its parent even if the parent does not have an       // 133
  // entry for that child in its `.c` object.  This is important for        // 134
  // implementing anonymous files, and preventing child modules from using  // 135
  // `../relative/identifier` syntax to examine unrelated modules.          // 136
  function File(name, parent) {                                             // 137
    var file = this;                                                        // 138
                                                                            // 139
    // Link to the parent file.                                             // 140
    file.p = parent = parent || null;                                       // 141
                                                                            // 142
    // The module object for this File, which will eventually boast an      // 143
    // .exports property when/if the file is evaluated.                     // 144
    file.m = new Module(name, parent && parent.m);                          // 145
  }                                                                         // 146
                                                                            // 147
  // A file is ready if all of its dependencies are installed and ready.    // 148
  function fileReady(file) {                                                // 149
    return file && (                                                        // 150
      file.ready || ( // Return true immediately if already ready.          // 151
        file.ready = true, // Short-circuit circular fileReady calls.       // 152
        file.ready = // Now compute the actual value of file.ready.         // 153
          // The current file is aliased (or symbolically linked) to the    // 154
          // file obtained by resolving the `file.c` string as a module     // 155
          // identifier, so regard it as ready iff the resolved file exists
          // and is ready.                                                  // 157
          isString(file.c) ? fileReady(fileResolve(file, file.c)) :         // 158
          // Here file.c is a module factory function with an array of      // 159
          // dependencies `.d` that must be ready before the current file   // 160
          // can be considered ready.                                       // 161
          isFunction(file.c) && file.c.d.every(function (dep, i) {          // 162
            if (fileReady(fileResolve(file, dep))) {                        // 163
              delete file.c.d[i]; // Ignore this dependency once ready.     // 164
              return true;                                                  // 165
            }                                                               // 166
          })                                                                // 167
      )                                                                     // 168
    );                                                                      // 169
  }                                                                         // 170
                                                                            // 171
  function fileEvaluate(file) {                                             // 172
    var contents = file && file.c;                                          // 173
    var module = file.m;                                                    // 174
    if (! hasOwn.call(module, "exports")) {                                 // 175
      contents(                                                             // 176
        file.r = file.r || makeRequire(file),                               // 177
        module.exports = {},                                                // 178
        module,                                                             // 179
        file.m.id,                                                          // 180
        file.p.m.id                                                         // 181
      );                                                                    // 182
    }                                                                       // 183
    return module.exports;                                                  // 184
  }                                                                         // 185
                                                                            // 186
  function fileIsDirectory(file) {                                          // 187
    return file && isObject(file.c);                                        // 188
  }                                                                         // 189
                                                                            // 190
  function fileMergeContents(file, contents, options) {                     // 191
    // If contents is an array of strings and functions, return the last    // 192
    // function with a `.d` property containing all the strings.            // 193
    if (Array.isArray(contents)) {                                          // 194
      var deps = [];                                                        // 195
                                                                            // 196
      contents.forEach(function (item) {                                    // 197
        if (isString(item)) {                                               // 198
          deps.push(item);                                                  // 199
        } else if (isFunction(item)) {                                      // 200
          contents = item;                                                  // 201
        }                                                                   // 202
      });                                                                   // 203
                                                                            // 204
      if (isFunction(contents)) {                                           // 205
        contents.d = deps;                                                  // 206
      } else {                                                              // 207
        // If the array did not contain a function, merge nothing.          // 208
        contents = null;                                                    // 209
      }                                                                     // 210
                                                                            // 211
    } else if (isFunction(contents)) {                                      // 212
      // If contents is already a function, make sure it has `.d`.          // 213
      contents.d = contents.d || [];                                        // 214
                                                                            // 215
    } else if (! isString(contents) &&                                      // 216
               ! isObject(contents)) {                                      // 217
      // If contents is neither an array nor a function nor a string nor    // 218
      // an object, just give up and merge nothing.                         // 219
      contents = null;                                                      // 220
    }                                                                       // 221
                                                                            // 222
    if (contents) {                                                         // 223
      file.c = file.c || (isObject(contents) ? {} : contents);              // 224
      if (isObject(contents) && fileIsDirectory(file)) {                    // 225
        Object.keys(contents).forEach(function (key) {                      // 226
          if (key === "..") {                                               // 227
            child = file.p;                                                 // 228
                                                                            // 229
          } else {                                                          // 230
            var child = getOwn(file.c, key);                                // 231
            if (! child) {                                                  // 232
              child = file.c[key] = new File(                               // 233
                file.m.id.replace(/\/*$/, "/") + key,                       // 234
                file                                                        // 235
              );                                                            // 236
                                                                            // 237
              child.o = options;                                            // 238
            }                                                               // 239
          }                                                                 // 240
                                                                            // 241
          fileMergeContents(child, contents[key], options);                 // 242
        });                                                                 // 243
      }                                                                     // 244
    }                                                                       // 245
  }                                                                         // 246
                                                                            // 247
  function fileAppendIdPart(file, part, extensions) {                       // 248
    // Always append relative to a directory.                               // 249
    while (file && ! fileIsDirectory(file)) {                               // 250
      file = file.p;                                                        // 251
    }                                                                       // 252
                                                                            // 253
    if (! file || ! part || part === ".") {                                 // 254
      return file;                                                          // 255
    }                                                                       // 256
                                                                            // 257
    if (part === "..") {                                                    // 258
      return file.p;                                                        // 259
    }                                                                       // 260
                                                                            // 261
    var exactChild = getOwn(file.c, part);                                  // 262
                                                                            // 263
    // Only consider multiple file extensions if this part is the last      // 264
    // part of a module identifier and not equal to `.` or `..`, and there  // 265
    // was no exact match or the exact match was a directory.               // 266
    if (extensions && (! exactChild || fileIsDirectory(exactChild))) {      // 267
      for (var e = 0; e < extensions.length; ++e) {                         // 268
        var child = getOwn(file.c, part + extensions[e]);                   // 269
        if (child) {                                                        // 270
          return child;                                                     // 271
        }                                                                   // 272
      }                                                                     // 273
    }                                                                       // 274
                                                                            // 275
    return exactChild;                                                      // 276
  }                                                                         // 277
                                                                            // 278
  function fileAppendId(file, id) {                                         // 279
    var parts = id.split("/");                                              // 280
    var exts = file.o && file.o.extensions || extensions;                   // 281
                                                                            // 282
    // Use `Array.prototype.every` to terminate iteration early if          // 283
    // `fileAppendIdPart` returns a falsy value.                            // 284
    parts.every(function (part, i) {                                        // 285
      return file = i < parts.length - 1                                    // 286
        ? fileAppendIdPart(file, part)                                      // 287
        : fileAppendIdPart(file, part, exts);                               // 288
    });                                                                     // 289
                                                                            // 290
    return file;                                                            // 291
  }                                                                         // 292
                                                                            // 293
  function fileResolve(file, id, seenDirFiles) {                            // 294
    file =                                                                  // 295
      // Absolute module identifiers (i.e. those that begin with a `/`      // 296
      // character) are interpreted relative to the root directory, which   // 297
      // is a slight deviation from Node, which has access to the entire    // 298
      // file system.                                                       // 299
      id.charAt(0) === "/" ? fileAppendId(root, id) :                       // 300
      // Relative module identifiers are interpreted relative to the        // 301
      // current file, naturally.                                           // 302
      id.charAt(0) === "." ? fileAppendId(file, id) :                       // 303
      // Top-level module identifiers are interpreted as referring to       // 304
      // packages in `node_modules` directories.                            // 305
      nodeModulesLookup(file, id);                                          // 306
                                                                            // 307
    // If the identifier resolves to a directory, we use the same logic as  // 308
    // Node to find an `index.js` or `package.json` file to evaluate.       // 309
    while (fileIsDirectory(file)) {                                         // 310
      seenDirFiles = seenDirFiles || [];                                    // 311
                                                                            // 312
      // If the "main" field of a `package.json` file resolves to a         // 313
      // directory we've already considered, then we should not attempt to  // 314
      // read the same `package.json` file again. Using an array as a set   // 315
      // is acceptable here because the number of directories to consider   // 316
      // is rarely greater than 1 or 2. Also, using indexOf allows us to    // 317
      // store File objects instead of strings.                             // 318
      if (seenDirFiles.indexOf(file) < 0) {                                 // 319
        seenDirFiles.push(file);                                            // 320
                                                                            // 321
        var pkgJsonFile = fileAppendIdPart(file, "package.json");           // 322
        var main = pkgJsonFile && fileEvaluate(pkgJsonFile).main;           // 323
        if (isString(main)) {                                               // 324
          // The "main" field of package.json does not have to begin with   // 325
          // ./ to be considered relative, so first we try simply           // 326
          // appending it to the directory path before falling back to a    // 327
          // full fileResolve, which might return a package from a          // 328
          // node_modules directory.                                        // 329
          file = fileAppendId(file, main) ||                                // 330
            fileResolve(file, main, seenDirFiles);                          // 331
                                                                            // 332
          if (file) {                                                       // 333
            // The fileAppendId call above may have returned a directory,   // 334
            // so continue the loop to make sure we resolve it to a         // 335
            // non-directory file.                                          // 336
            continue;                                                       // 337
          }                                                                 // 338
        }                                                                   // 339
      }                                                                     // 340
                                                                            // 341
      // If we didn't find a `package.json` file, or it didn't have a       // 342
      // resolvable `.main` property, the only possibility left to          // 343
      // consider is that this directory contains an `index.js` module.     // 344
      // This assignment almost always terminates the while loop, because   // 345
      // there's very little chance `fileIsDirectory(file)` will be true    // 346
      // for the result of `fileAppendIdPart(file, "index.js")`. However,   // 347
      // in principle it is remotely possible that a file called            // 348
      // `index.js` could be a directory instead of a file.                 // 349
      file = fileAppendIdPart(file, "index.js");                            // 350
    }                                                                       // 351
                                                                            // 352
    if (file && isString(file.c)) {                                         // 353
      file = fileResolve(file, file.c, seenDirFiles);                       // 354
    }                                                                       // 355
                                                                            // 356
    return file;                                                            // 357
  };                                                                        // 358
                                                                            // 359
  function nodeModulesLookup(file, id) {                                    // 360
    if (isFunction(override)) {                                             // 361
      id = override(id, file.m.id);                                         // 362
    }                                                                       // 363
                                                                            // 364
    if (isString(id)) {                                                     // 365
      for (var resolved; file && ! resolved; file = file.p) {               // 366
        resolved = fileIsDirectory(file) &&                                 // 367
          fileAppendId(file, "node_modules/" + id);                         // 368
      }                                                                     // 369
                                                                            // 370
      return resolved;                                                      // 371
    }                                                                       // 372
  }                                                                         // 373
                                                                            // 374
  return install;                                                           // 375
};                                                                          // 376
                                                                            // 377
if (typeof exports === "object") {                                          // 378
  exports.makeInstaller = makeInstaller;                                    // 379
}                                                                           // 380
                                                                            // 381
//////////////////////////////////////////////////////////////////////////////







(function(){

//////////////////////////////////////////////////////////////////////////////
//                                                                          //
// packages/modules-runtime/modules-runtime.js                              //
//                                                                          //
//////////////////////////////////////////////////////////////////////////////
                                                                            //
var options = {                                                             // 1
  // File extensions to try when an imported module identifier does not     // 2
  // exactly match any installed file.                                      // 3
  extensions: []                                                            // 4
};                                                                          // 5
                                                                            // 6
var hasOwn = options.hasOwnProperty;                                        // 7
                                                                            // 8
// RegExp matching strings that don't start with a `.` or a `/`.            // 9
var topLevelIdPattern = /^[^./]/;                                           // 10
                                                                            // 11
// This function will be called whenever a module identifier that hasn't    // 12
// been installed is required. For backwards compatibility, and so that we  // 13
// can require binary dependencies on the server, we implement the          // 14
// fallback in terms of Npm.require.                                        // 15
options.fallback = function (id, dir, error) {                              // 16
  // For simplicity, we honor only top-level module identifiers here.       // 17
  // We could try to honor relative and absolute module identifiers by      // 18
  // somehow combining `id` with `dir`, but we'd have to be really careful  // 19
  // that the resulting modules were located in a known directory (not      // 20
  // some arbitrary location on the file system), and we only really need   // 21
  // the fallback for dependencies installed in node_modules directories.   // 22
  if (topLevelIdPattern.test(id)) {                                         // 23
    var parts = id.split("/");                                              // 24
    if (parts.length === 2 &&                                               // 25
        parts[0] === "meteor" &&                                            // 26
        hasOwn.call(Package, parts[1])) {                                   // 27
      return Package[parts[1]];                                             // 28
    }                                                                       // 29
                                                                            // 30
    if (typeof Npm === "object" &&                                          // 31
        typeof Npm.require === "function") {                                // 32
      return Npm.require(id);                                               // 33
    }                                                                       // 34
  }                                                                         // 35
                                                                            // 36
  throw error;                                                              // 37
};                                                                          // 38
                                                                            // 39
var install = makeInstaller(options);                                       // 40
                                                                            // 41
(install.addExtension = function (ext) {                                    // 42
  var args = arguments;                                                     // 43
  for (var i = 0; i < args.length; ++i) {                                   // 44
    ext = args[i].toLowerCase();                                            // 45
                                                                            // 46
    if (! /^\.\w+/.test(ext)) {                                             // 47
      throw new Error("bad module extension: " + ext);                      // 48
    }                                                                       // 49
                                                                            // 50
    var extensions = options.extensions;                                    // 51
    if (extensions.indexOf(ext) < 0) {                                      // 52
      extensions.push(ext);                                                 // 53
    }                                                                       // 54
  }                                                                         // 55
})(".js", ".json");                                                         // 56
                                                                            // 57
meteorInstall = install;                                                    // 58
                                                                            // 59
//////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['modules-runtime'] = {}, {
  meteorInstall: meteorInstall
});

})();
