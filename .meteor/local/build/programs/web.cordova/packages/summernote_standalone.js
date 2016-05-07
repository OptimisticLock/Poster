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
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;

(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/summernote_standalone/dist/summernote.js                                                                 //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
/**                                                                                                                  // 1
 * Super simple wysiwyg editor v0.8.1                                                                                // 2
 * http://summernote.org/                                                                                            // 3
 *                                                                                                                   // 4
 * summernote.js                                                                                                     // 5
 * Copyright 2013-2015 Alan Hong. and other contributors                                                             // 6
 * summernote may be freely distributed under the MIT license./                                                      // 7
 *                                                                                                                   // 8
 * Date: 2016-02-15T18:35Z                                                                                           // 9
 */                                                                                                                  // 10
(function (factory) {                                                                                                // 11
  /* global define */                                                                                                // 12
  if (typeof define === 'function' && define.amd) {                                                                  // 13
    // AMD. Register as an anonymous module.                                                                         // 14
    define(['jquery'], factory);                                                                                     // 15
  } else if (typeof module === 'object' && module.exports) {                                                         // 16
    // Node/CommonJS                                                                                                 // 17
    module.exports = factory(require('jquery'));                                                                     // 18
  } else {                                                                                                           // 19
    // Browser globals                                                                                               // 20
    factory(window.jQuery);                                                                                          // 21
  }                                                                                                                  // 22
}(function ($) {                                                                                                     // 23
  'use strict';                                                                                                      // 24
                                                                                                                     // 25
  /**                                                                                                                // 26
   * @class core.func                                                                                                // 27
   *                                                                                                                 // 28
   * func utils (for high-order func's arg)                                                                          // 29
   *                                                                                                                 // 30
   * @singleton                                                                                                      // 31
   * @alternateClassName func                                                                                        // 32
   */                                                                                                                // 33
  var func = (function () {                                                                                          // 34
    var eq = function (itemA) {                                                                                      // 35
      return function (itemB) {                                                                                      // 36
        return itemA === itemB;                                                                                      // 37
      };                                                                                                             // 38
    };                                                                                                               // 39
                                                                                                                     // 40
    var eq2 = function (itemA, itemB) {                                                                              // 41
      return itemA === itemB;                                                                                        // 42
    };                                                                                                               // 43
                                                                                                                     // 44
    var peq2 = function (propName) {                                                                                 // 45
      return function (itemA, itemB) {                                                                               // 46
        return itemA[propName] === itemB[propName];                                                                  // 47
      };                                                                                                             // 48
    };                                                                                                               // 49
                                                                                                                     // 50
    var ok = function () {                                                                                           // 51
      return true;                                                                                                   // 52
    };                                                                                                               // 53
                                                                                                                     // 54
    var fail = function () {                                                                                         // 55
      return false;                                                                                                  // 56
    };                                                                                                               // 57
                                                                                                                     // 58
    var not = function (f) {                                                                                         // 59
      return function () {                                                                                           // 60
        return !f.apply(f, arguments);                                                                               // 61
      };                                                                                                             // 62
    };                                                                                                               // 63
                                                                                                                     // 64
    var and = function (fA, fB) {                                                                                    // 65
      return function (item) {                                                                                       // 66
        return fA(item) && fB(item);                                                                                 // 67
      };                                                                                                             // 68
    };                                                                                                               // 69
                                                                                                                     // 70
    var self = function (a) {                                                                                        // 71
      return a;                                                                                                      // 72
    };                                                                                                               // 73
                                                                                                                     // 74
    var invoke = function (obj, method) {                                                                            // 75
      return function () {                                                                                           // 76
        return obj[method].apply(obj, arguments);                                                                    // 77
      };                                                                                                             // 78
    };                                                                                                               // 79
                                                                                                                     // 80
    var idCounter = 0;                                                                                               // 81
                                                                                                                     // 82
    /**                                                                                                              // 83
     * generate a globally-unique id                                                                                 // 84
     *                                                                                                               // 85
     * @param {String} [prefix]                                                                                      // 86
     */                                                                                                              // 87
    var uniqueId = function (prefix) {                                                                               // 88
      var id = ++idCounter + '';                                                                                     // 89
      return prefix ? prefix + id : id;                                                                              // 90
    };                                                                                                               // 91
                                                                                                                     // 92
    /**                                                                                                              // 93
     * returns bnd (bounds) from rect                                                                                // 94
     *                                                                                                               // 95
     * - IE Compatibility Issue: http://goo.gl/sRLOAo                                                                // 96
     * - Scroll Issue: http://goo.gl/sNjUc                                                                           // 97
     *                                                                                                               // 98
     * @param {Rect} rect                                                                                            // 99
     * @return {Object} bounds                                                                                       // 100
     * @return {Number} bounds.top                                                                                   // 101
     * @return {Number} bounds.left                                                                                  // 102
     * @return {Number} bounds.width                                                                                 // 103
     * @return {Number} bounds.height                                                                                // 104
     */                                                                                                              // 105
    var rect2bnd = function (rect) {                                                                                 // 106
      var $document = $(document);                                                                                   // 107
      return {                                                                                                       // 108
        top: rect.top + $document.scrollTop(),                                                                       // 109
        left: rect.left + $document.scrollLeft(),                                                                    // 110
        width: rect.right - rect.left,                                                                               // 111
        height: rect.bottom - rect.top                                                                               // 112
      };                                                                                                             // 113
    };                                                                                                               // 114
                                                                                                                     // 115
    /**                                                                                                              // 116
     * returns a copy of the object where the keys have become the values and the values the keys.                   // 117
     * @param {Object} obj                                                                                           // 118
     * @return {Object}                                                                                              // 119
     */                                                                                                              // 120
    var invertObject = function (obj) {                                                                              // 121
      var inverted = {};                                                                                             // 122
      for (var key in obj) {                                                                                         // 123
        if (obj.hasOwnProperty(key)) {                                                                               // 124
          inverted[obj[key]] = key;                                                                                  // 125
        }                                                                                                            // 126
      }                                                                                                              // 127
      return inverted;                                                                                               // 128
    };                                                                                                               // 129
                                                                                                                     // 130
    /**                                                                                                              // 131
     * @param {String} namespace                                                                                     // 132
     * @param {String} [prefix]                                                                                      // 133
     * @return {String}                                                                                              // 134
     */                                                                                                              // 135
    var namespaceToCamel = function (namespace, prefix) {                                                            // 136
      prefix = prefix || '';                                                                                         // 137
      return prefix + namespace.split('.').map(function (name) {                                                     // 138
        return name.substring(0, 1).toUpperCase() + name.substring(1);                                               // 139
      }).join('');                                                                                                   // 140
    };                                                                                                               // 141
                                                                                                                     // 142
    return {                                                                                                         // 143
      eq: eq,                                                                                                        // 144
      eq2: eq2,                                                                                                      // 145
      peq2: peq2,                                                                                                    // 146
      ok: ok,                                                                                                        // 147
      fail: fail,                                                                                                    // 148
      self: self,                                                                                                    // 149
      not: not,                                                                                                      // 150
      and: and,                                                                                                      // 151
      invoke: invoke,                                                                                                // 152
      uniqueId: uniqueId,                                                                                            // 153
      rect2bnd: rect2bnd,                                                                                            // 154
      invertObject: invertObject,                                                                                    // 155
      namespaceToCamel: namespaceToCamel                                                                             // 156
    };                                                                                                               // 157
  })();                                                                                                              // 158
                                                                                                                     // 159
  /**                                                                                                                // 160
   * @class core.list                                                                                                // 161
   *                                                                                                                 // 162
   * list utils                                                                                                      // 163
   *                                                                                                                 // 164
   * @singleton                                                                                                      // 165
   * @alternateClassName list                                                                                        // 166
   */                                                                                                                // 167
  var list = (function () {                                                                                          // 168
    /**                                                                                                              // 169
     * returns the first item of an array.                                                                           // 170
     *                                                                                                               // 171
     * @param {Array} array                                                                                          // 172
     */                                                                                                              // 173
    var head = function (array) {                                                                                    // 174
      return array[0];                                                                                               // 175
    };                                                                                                               // 176
                                                                                                                     // 177
    /**                                                                                                              // 178
     * returns the last item of an array.                                                                            // 179
     *                                                                                                               // 180
     * @param {Array} array                                                                                          // 181
     */                                                                                                              // 182
    var last = function (array) {                                                                                    // 183
      return array[array.length - 1];                                                                                // 184
    };                                                                                                               // 185
                                                                                                                     // 186
    /**                                                                                                              // 187
     * returns everything but the last entry of the array.                                                           // 188
     *                                                                                                               // 189
     * @param {Array} array                                                                                          // 190
     */                                                                                                              // 191
    var initial = function (array) {                                                                                 // 192
      return array.slice(0, array.length - 1);                                                                       // 193
    };                                                                                                               // 194
                                                                                                                     // 195
    /**                                                                                                              // 196
     * returns the rest of the items in an array.                                                                    // 197
     *                                                                                                               // 198
     * @param {Array} array                                                                                          // 199
     */                                                                                                              // 200
    var tail = function (array) {                                                                                    // 201
      return array.slice(1);                                                                                         // 202
    };                                                                                                               // 203
                                                                                                                     // 204
    /**                                                                                                              // 205
     * returns item of array                                                                                         // 206
     */                                                                                                              // 207
    var find = function (array, pred) {                                                                              // 208
      for (var idx = 0, len = array.length; idx < len; idx ++) {                                                     // 209
        var item = array[idx];                                                                                       // 210
        if (pred(item)) {                                                                                            // 211
          return item;                                                                                               // 212
        }                                                                                                            // 213
      }                                                                                                              // 214
    };                                                                                                               // 215
                                                                                                                     // 216
    /**                                                                                                              // 217
     * returns true if all of the values in the array pass the predicate truth test.                                 // 218
     */                                                                                                              // 219
    var all = function (array, pred) {                                                                               // 220
      for (var idx = 0, len = array.length; idx < len; idx ++) {                                                     // 221
        if (!pred(array[idx])) {                                                                                     // 222
          return false;                                                                                              // 223
        }                                                                                                            // 224
      }                                                                                                              // 225
      return true;                                                                                                   // 226
    };                                                                                                               // 227
                                                                                                                     // 228
    /**                                                                                                              // 229
     * returns index of item                                                                                         // 230
     */                                                                                                              // 231
    var indexOf = function (array, item) {                                                                           // 232
      return $.inArray(item, array);                                                                                 // 233
    };                                                                                                               // 234
                                                                                                                     // 235
    /**                                                                                                              // 236
     * returns true if the value is present in the list.                                                             // 237
     */                                                                                                              // 238
    var contains = function (array, item) {                                                                          // 239
      return indexOf(array, item) !== -1;                                                                            // 240
    };                                                                                                               // 241
                                                                                                                     // 242
    /**                                                                                                              // 243
     * get sum from a list                                                                                           // 244
     *                                                                                                               // 245
     * @param {Array} array - array                                                                                  // 246
     * @param {Function} fn - iterator                                                                               // 247
     */                                                                                                              // 248
    var sum = function (array, fn) {                                                                                 // 249
      fn = fn || func.self;                                                                                          // 250
      return array.reduce(function (memo, v) {                                                                       // 251
        return memo + fn(v);                                                                                         // 252
      }, 0);                                                                                                         // 253
    };                                                                                                               // 254
                                                                                                                     // 255
    /**                                                                                                              // 256
     * returns a copy of the collection with array type.                                                             // 257
     * @param {Collection} collection - collection eg) node.childNodes, ...                                          // 258
     */                                                                                                              // 259
    var from = function (collection) {                                                                               // 260
      var result = [], idx = -1, length = collection.length;                                                         // 261
      while (++idx < length) {                                                                                       // 262
        result[idx] = collection[idx];                                                                               // 263
      }                                                                                                              // 264
      return result;                                                                                                 // 265
    };                                                                                                               // 266
                                                                                                                     // 267
    /**                                                                                                              // 268
     * returns whether list is empty or not                                                                          // 269
     */                                                                                                              // 270
    var isEmpty = function (array) {                                                                                 // 271
      return !array || !array.length;                                                                                // 272
    };                                                                                                               // 273
                                                                                                                     // 274
    /**                                                                                                              // 275
     * cluster elements by predicate function.                                                                       // 276
     *                                                                                                               // 277
     * @param {Array} array - array                                                                                  // 278
     * @param {Function} fn - predicate function for cluster rule                                                    // 279
     * @param {Array[]}                                                                                              // 280
     */                                                                                                              // 281
    var clusterBy = function (array, fn) {                                                                           // 282
      if (!array.length) { return []; }                                                                              // 283
      var aTail = tail(array);                                                                                       // 284
      return aTail.reduce(function (memo, v) {                                                                       // 285
        var aLast = last(memo);                                                                                      // 286
        if (fn(last(aLast), v)) {                                                                                    // 287
          aLast[aLast.length] = v;                                                                                   // 288
        } else {                                                                                                     // 289
          memo[memo.length] = [v];                                                                                   // 290
        }                                                                                                            // 291
        return memo;                                                                                                 // 292
      }, [[head(array)]]);                                                                                           // 293
    };                                                                                                               // 294
                                                                                                                     // 295
    /**                                                                                                              // 296
     * returns a copy of the array with all falsy values removed                                                     // 297
     *                                                                                                               // 298
     * @param {Array} array - array                                                                                  // 299
     * @param {Function} fn - predicate function for cluster rule                                                    // 300
     */                                                                                                              // 301
    var compact = function (array) {                                                                                 // 302
      var aResult = [];                                                                                              // 303
      for (var idx = 0, len = array.length; idx < len; idx ++) {                                                     // 304
        if (array[idx]) { aResult.push(array[idx]); }                                                                // 305
      }                                                                                                              // 306
      return aResult;                                                                                                // 307
    };                                                                                                               // 308
                                                                                                                     // 309
    /**                                                                                                              // 310
     * produces a duplicate-free version of the array                                                                // 311
     *                                                                                                               // 312
     * @param {Array} array                                                                                          // 313
     */                                                                                                              // 314
    var unique = function (array) {                                                                                  // 315
      var results = [];                                                                                              // 316
                                                                                                                     // 317
      for (var idx = 0, len = array.length; idx < len; idx ++) {                                                     // 318
        if (!contains(results, array[idx])) {                                                                        // 319
          results.push(array[idx]);                                                                                  // 320
        }                                                                                                            // 321
      }                                                                                                              // 322
                                                                                                                     // 323
      return results;                                                                                                // 324
    };                                                                                                               // 325
                                                                                                                     // 326
    /**                                                                                                              // 327
     * returns next item.                                                                                            // 328
     * @param {Array} array                                                                                          // 329
     */                                                                                                              // 330
    var next = function (array, item) {                                                                              // 331
      var idx = indexOf(array, item);                                                                                // 332
      if (idx === -1) { return null; }                                                                               // 333
                                                                                                                     // 334
      return array[idx + 1];                                                                                         // 335
    };                                                                                                               // 336
                                                                                                                     // 337
    /**                                                                                                              // 338
     * returns prev item.                                                                                            // 339
     * @param {Array} array                                                                                          // 340
     */                                                                                                              // 341
    var prev = function (array, item) {                                                                              // 342
      var idx = indexOf(array, item);                                                                                // 343
      if (idx === -1) { return null; }                                                                               // 344
                                                                                                                     // 345
      return array[idx - 1];                                                                                         // 346
    };                                                                                                               // 347
                                                                                                                     // 348
    return { head: head, last: last, initial: initial, tail: tail,                                                   // 349
             prev: prev, next: next, find: find, contains: contains,                                                 // 350
             all: all, sum: sum, from: from, isEmpty: isEmpty,                                                       // 351
             clusterBy: clusterBy, compact: compact, unique: unique };                                               // 352
  })();                                                                                                              // 353
                                                                                                                     // 354
  var isSupportAmd = typeof define === 'function' && define.amd;                                                     // 355
                                                                                                                     // 356
  /**                                                                                                                // 357
   * returns whether font is installed or not.                                                                       // 358
   *                                                                                                                 // 359
   * @param {String} fontName                                                                                        // 360
   * @return {Boolean}                                                                                               // 361
   */                                                                                                                // 362
  var isFontInstalled = function (fontName) {                                                                        // 363
    var testFontName = fontName === 'Comic Sans MS' ? 'Courier New' : 'Comic Sans MS';                               // 364
    var $tester = $('<div>').css({                                                                                   // 365
      position: 'absolute',                                                                                          // 366
      left: '-9999px',                                                                                               // 367
      top: '-9999px',                                                                                                // 368
      fontSize: '200px'                                                                                              // 369
    }).text('mmmmmmmmmwwwwwww').appendTo(document.body);                                                             // 370
                                                                                                                     // 371
    var originalWidth = $tester.css('fontFamily', testFontName).width();                                             // 372
    var width = $tester.css('fontFamily', fontName + ',' + testFontName).width();                                    // 373
                                                                                                                     // 374
    $tester.remove();                                                                                                // 375
                                                                                                                     // 376
    return originalWidth !== width;                                                                                  // 377
  };                                                                                                                 // 378
                                                                                                                     // 379
  var userAgent = navigator.userAgent;                                                                               // 380
  var isMSIE = /MSIE|Trident/i.test(userAgent);                                                                      // 381
  var browserVersion;                                                                                                // 382
  if (isMSIE) {                                                                                                      // 383
    var matches = /MSIE (\d+[.]\d+)/.exec(userAgent);                                                                // 384
    if (matches) {                                                                                                   // 385
      browserVersion = parseFloat(matches[1]);                                                                       // 386
    }                                                                                                                // 387
    matches = /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(userAgent);                                                // 388
    if (matches) {                                                                                                   // 389
      browserVersion = parseFloat(matches[1]);                                                                       // 390
    }                                                                                                                // 391
  }                                                                                                                  // 392
                                                                                                                     // 393
  var isEdge = /Edge\/\d+/.test(userAgent);                                                                          // 394
                                                                                                                     // 395
  var hasCodeMirror = !!window.CodeMirror;                                                                           // 396
  if (!hasCodeMirror && isSupportAmd && require) {                                                                   // 397
    if (require.hasOwnProperty('resolve')) {                                                                         // 398
      try {                                                                                                          // 399
        // If CodeMirror can't be resolved, `require.resolve` will throw an                                          // 400
        // exception and `hasCodeMirror` won't be set to `true`.                                                     // 401
        require.resolve('codemirror');                                                                               // 402
        hasCodeMirror = true;                                                                                        // 403
      } catch (e) {                                                                                                  // 404
        hasCodeMirror = false;                                                                                       // 405
      }                                                                                                              // 406
    } else if (require.hasOwnProperty('specified')) {                                                                // 407
      hasCodeMirror = require.specified('codemirror');                                                               // 408
    }                                                                                                                // 409
  }                                                                                                                  // 410
                                                                                                                     // 411
  /**                                                                                                                // 412
   * @class core.agent                                                                                               // 413
   *                                                                                                                 // 414
   * Object which check platform and agent                                                                           // 415
   *                                                                                                                 // 416
   * @singleton                                                                                                      // 417
   * @alternateClassName agent                                                                                       // 418
   */                                                                                                                // 419
  var agent = {                                                                                                      // 420
    isMac: navigator.appVersion.indexOf('Mac') > -1,                                                                 // 421
    isMSIE: isMSIE,                                                                                                  // 422
    isEdge: isEdge,                                                                                                  // 423
    isFF: !isEdge && /firefox/i.test(userAgent),                                                                     // 424
    isPhantom: /PhantomJS/i.test(userAgent),                                                                         // 425
    isWebkit: !isEdge && /webkit/i.test(userAgent),                                                                  // 426
    isChrome: !isEdge && /chrome/i.test(userAgent),                                                                  // 427
    isSafari: !isEdge && /safari/i.test(userAgent),                                                                  // 428
    browserVersion: browserVersion,                                                                                  // 429
    jqueryVersion: parseFloat($.fn.jquery),                                                                          // 430
    isSupportAmd: isSupportAmd,                                                                                      // 431
    hasCodeMirror: hasCodeMirror,                                                                                    // 432
    isFontInstalled: isFontInstalled,                                                                                // 433
    isW3CRangeSupport: !!document.createRange                                                                        // 434
  };                                                                                                                 // 435
                                                                                                                     // 436
                                                                                                                     // 437
  var NBSP_CHAR = String.fromCharCode(160);                                                                          // 438
  var ZERO_WIDTH_NBSP_CHAR = '\ufeff';                                                                               // 439
                                                                                                                     // 440
  /**                                                                                                                // 441
   * @class core.dom                                                                                                 // 442
   *                                                                                                                 // 443
   * Dom functions                                                                                                   // 444
   *                                                                                                                 // 445
   * @singleton                                                                                                      // 446
   * @alternateClassName dom                                                                                         // 447
   */                                                                                                                // 448
  var dom = (function () {                                                                                           // 449
    /**                                                                                                              // 450
     * @method isEditable                                                                                            // 451
     *                                                                                                               // 452
     * returns whether node is `note-editable` or not.                                                               // 453
     *                                                                                                               // 454
     * @param {Node} node                                                                                            // 455
     * @return {Boolean}                                                                                             // 456
     */                                                                                                              // 457
    var isEditable = function (node) {                                                                               // 458
      return node && $(node).hasClass('note-editable');                                                              // 459
    };                                                                                                               // 460
                                                                                                                     // 461
    /**                                                                                                              // 462
     * @method isControlSizing                                                                                       // 463
     *                                                                                                               // 464
     * returns whether node is `note-control-sizing` or not.                                                         // 465
     *                                                                                                               // 466
     * @param {Node} node                                                                                            // 467
     * @return {Boolean}                                                                                             // 468
     */                                                                                                              // 469
    var isControlSizing = function (node) {                                                                          // 470
      return node && $(node).hasClass('note-control-sizing');                                                        // 471
    };                                                                                                               // 472
                                                                                                                     // 473
    /**                                                                                                              // 474
     * @method makePredByNodeName                                                                                    // 475
     *                                                                                                               // 476
     * returns predicate which judge whether nodeName is same                                                        // 477
     *                                                                                                               // 478
     * @param {String} nodeName                                                                                      // 479
     * @return {Function}                                                                                            // 480
     */                                                                                                              // 481
    var makePredByNodeName = function (nodeName) {                                                                   // 482
      nodeName = nodeName.toUpperCase();                                                                             // 483
      return function (node) {                                                                                       // 484
        return node && node.nodeName.toUpperCase() === nodeName;                                                     // 485
      };                                                                                                             // 486
    };                                                                                                               // 487
                                                                                                                     // 488
    /**                                                                                                              // 489
     * @method isText                                                                                                // 490
     *                                                                                                               // 491
     *                                                                                                               // 492
     *                                                                                                               // 493
     * @param {Node} node                                                                                            // 494
     * @return {Boolean} true if node's type is text(3)                                                              // 495
     */                                                                                                              // 496
    var isText = function (node) {                                                                                   // 497
      return node && node.nodeType === 3;                                                                            // 498
    };                                                                                                               // 499
                                                                                                                     // 500
    /**                                                                                                              // 501
     * @method isElement                                                                                             // 502
     *                                                                                                               // 503
     *                                                                                                               // 504
     *                                                                                                               // 505
     * @param {Node} node                                                                                            // 506
     * @return {Boolean} true if node's type is element(1)                                                           // 507
     */                                                                                                              // 508
    var isElement = function (node) {                                                                                // 509
      return node && node.nodeType === 1;                                                                            // 510
    };                                                                                                               // 511
                                                                                                                     // 512
    /**                                                                                                              // 513
     * ex) br, col, embed, hr, img, input, ...                                                                       // 514
     * @see http://www.w3.org/html/wg/drafts/html/master/syntax.html#void-elements                                   // 515
     */                                                                                                              // 516
    var isVoid = function (node) {                                                                                   // 517
      return node && /^BR|^IMG|^HR|^IFRAME|^BUTTON/.test(node.nodeName.toUpperCase());                               // 518
    };                                                                                                               // 519
                                                                                                                     // 520
    var isPara = function (node) {                                                                                   // 521
      if (isEditable(node)) {                                                                                        // 522
        return false;                                                                                                // 523
      }                                                                                                              // 524
                                                                                                                     // 525
      // Chrome(v31.0), FF(v25.0.1) use DIV for paragraph                                                            // 526
      return node && /^DIV|^P|^LI|^H[1-7]/.test(node.nodeName.toUpperCase());                                        // 527
    };                                                                                                               // 528
                                                                                                                     // 529
    var isHeading = function (node) {                                                                                // 530
      return node && /^H[1-7]/.test(node.nodeName.toUpperCase());                                                    // 531
    };                                                                                                               // 532
                                                                                                                     // 533
    var isPre = makePredByNodeName('PRE');                                                                           // 534
                                                                                                                     // 535
    var isLi = makePredByNodeName('LI');                                                                             // 536
                                                                                                                     // 537
    var isPurePara = function (node) {                                                                               // 538
      return isPara(node) && !isLi(node);                                                                            // 539
    };                                                                                                               // 540
                                                                                                                     // 541
    var isTable = makePredByNodeName('TABLE');                                                                       // 542
                                                                                                                     // 543
    var isInline = function (node) {                                                                                 // 544
      return !isBodyContainer(node) &&                                                                               // 545
             !isList(node) &&                                                                                        // 546
             !isHr(node) &&                                                                                          // 547
             !isPara(node) &&                                                                                        // 548
             !isTable(node) &&                                                                                       // 549
             !isBlockquote(node);                                                                                    // 550
    };                                                                                                               // 551
                                                                                                                     // 552
    var isList = function (node) {                                                                                   // 553
      return node && /^UL|^OL/.test(node.nodeName.toUpperCase());                                                    // 554
    };                                                                                                               // 555
                                                                                                                     // 556
    var isHr = makePredByNodeName('HR');                                                                             // 557
                                                                                                                     // 558
    var isCell = function (node) {                                                                                   // 559
      return node && /^TD|^TH/.test(node.nodeName.toUpperCase());                                                    // 560
    };                                                                                                               // 561
                                                                                                                     // 562
    var isBlockquote = makePredByNodeName('BLOCKQUOTE');                                                             // 563
                                                                                                                     // 564
    var isBodyContainer = function (node) {                                                                          // 565
      return isCell(node) || isBlockquote(node) || isEditable(node);                                                 // 566
    };                                                                                                               // 567
                                                                                                                     // 568
    var isAnchor = makePredByNodeName('A');                                                                          // 569
                                                                                                                     // 570
    var isParaInline = function (node) {                                                                             // 571
      return isInline(node) && !!ancestor(node, isPara);                                                             // 572
    };                                                                                                               // 573
                                                                                                                     // 574
    var isBodyInline = function (node) {                                                                             // 575
      return isInline(node) && !ancestor(node, isPara);                                                              // 576
    };                                                                                                               // 577
                                                                                                                     // 578
    var isBody = makePredByNodeName('BODY');                                                                         // 579
                                                                                                                     // 580
    /**                                                                                                              // 581
     * returns whether nodeB is closest sibling of nodeA                                                             // 582
     *                                                                                                               // 583
     * @param {Node} nodeA                                                                                           // 584
     * @param {Node} nodeB                                                                                           // 585
     * @return {Boolean}                                                                                             // 586
     */                                                                                                              // 587
    var isClosestSibling = function (nodeA, nodeB) {                                                                 // 588
      return nodeA.nextSibling === nodeB ||                                                                          // 589
             nodeA.previousSibling === nodeB;                                                                        // 590
    };                                                                                                               // 591
                                                                                                                     // 592
    /**                                                                                                              // 593
     * returns array of closest siblings with node                                                                   // 594
     *                                                                                                               // 595
     * @param {Node} node                                                                                            // 596
     * @param {function} [pred] - predicate function                                                                 // 597
     * @return {Node[]}                                                                                              // 598
     */                                                                                                              // 599
    var withClosestSiblings = function (node, pred) {                                                                // 600
      pred = pred || func.ok;                                                                                        // 601
                                                                                                                     // 602
      var siblings = [];                                                                                             // 603
      if (node.previousSibling && pred(node.previousSibling)) {                                                      // 604
        siblings.push(node.previousSibling);                                                                         // 605
      }                                                                                                              // 606
      siblings.push(node);                                                                                           // 607
      if (node.nextSibling && pred(node.nextSibling)) {                                                              // 608
        siblings.push(node.nextSibling);                                                                             // 609
      }                                                                                                              // 610
      return siblings;                                                                                               // 611
    };                                                                                                               // 612
                                                                                                                     // 613
    /**                                                                                                              // 614
     * blank HTML for cursor position                                                                                // 615
     * - [workaround] old IE only works with &nbsp;                                                                  // 616
     * - [workaround] IE11 and other browser works with bogus br                                                     // 617
     */                                                                                                              // 618
    var blankHTML = agent.isMSIE && agent.browserVersion < 11 ? '&nbsp;' : '<br>';                                   // 619
                                                                                                                     // 620
    /**                                                                                                              // 621
     * @method nodeLength                                                                                            // 622
     *                                                                                                               // 623
     * returns #text's text size or element's childNodes size                                                        // 624
     *                                                                                                               // 625
     * @param {Node} node                                                                                            // 626
     */                                                                                                              // 627
    var nodeLength = function (node) {                                                                               // 628
      if (isText(node)) {                                                                                            // 629
        return node.nodeValue.length;                                                                                // 630
      }                                                                                                              // 631
                                                                                                                     // 632
      return node.childNodes.length;                                                                                 // 633
    };                                                                                                               // 634
                                                                                                                     // 635
    /**                                                                                                              // 636
     * returns whether node is empty or not.                                                                         // 637
     *                                                                                                               // 638
     * @param {Node} node                                                                                            // 639
     * @return {Boolean}                                                                                             // 640
     */                                                                                                              // 641
    var isEmpty = function (node) {                                                                                  // 642
      var len = nodeLength(node);                                                                                    // 643
                                                                                                                     // 644
      if (len === 0) {                                                                                               // 645
        return true;                                                                                                 // 646
      } else if (!isText(node) && len === 1 && node.innerHTML === blankHTML) {                                       // 647
        // ex) <p><br></p>, <span><br></span>                                                                        // 648
        return true;                                                                                                 // 649
      } else if (list.all(node.childNodes, isText) && node.innerHTML === '') {                                       // 650
        // ex) <p></p>, <span></span>                                                                                // 651
        return true;                                                                                                 // 652
      }                                                                                                              // 653
                                                                                                                     // 654
      return false;                                                                                                  // 655
    };                                                                                                               // 656
                                                                                                                     // 657
    /**                                                                                                              // 658
     * padding blankHTML if node is empty (for cursor position)                                                      // 659
     */                                                                                                              // 660
    var paddingBlankHTML = function (node) {                                                                         // 661
      if (!isVoid(node) && !nodeLength(node)) {                                                                      // 662
        node.innerHTML = blankHTML;                                                                                  // 663
      }                                                                                                              // 664
    };                                                                                                               // 665
                                                                                                                     // 666
    /**                                                                                                              // 667
     * find nearest ancestor predicate hit                                                                           // 668
     *                                                                                                               // 669
     * @param {Node} node                                                                                            // 670
     * @param {Function} pred - predicate function                                                                   // 671
     */                                                                                                              // 672
    var ancestor = function (node, pred) {                                                                           // 673
      while (node) {                                                                                                 // 674
        if (pred(node)) { return node; }                                                                             // 675
        if (isEditable(node)) { break; }                                                                             // 676
                                                                                                                     // 677
        node = node.parentNode;                                                                                      // 678
      }                                                                                                              // 679
      return null;                                                                                                   // 680
    };                                                                                                               // 681
                                                                                                                     // 682
    /**                                                                                                              // 683
     * find nearest ancestor only single child blood line and predicate hit                                          // 684
     *                                                                                                               // 685
     * @param {Node} node                                                                                            // 686
     * @param {Function} pred - predicate function                                                                   // 687
     */                                                                                                              // 688
    var singleChildAncestor = function (node, pred) {                                                                // 689
      node = node.parentNode;                                                                                        // 690
                                                                                                                     // 691
      while (node) {                                                                                                 // 692
        if (nodeLength(node) !== 1) { break; }                                                                       // 693
        if (pred(node)) { return node; }                                                                             // 694
        if (isEditable(node)) { break; }                                                                             // 695
                                                                                                                     // 696
        node = node.parentNode;                                                                                      // 697
      }                                                                                                              // 698
      return null;                                                                                                   // 699
    };                                                                                                               // 700
                                                                                                                     // 701
    /**                                                                                                              // 702
     * returns new array of ancestor nodes (until predicate hit).                                                    // 703
     *                                                                                                               // 704
     * @param {Node} node                                                                                            // 705
     * @param {Function} [optional] pred - predicate function                                                        // 706
     */                                                                                                              // 707
    var listAncestor = function (node, pred) {                                                                       // 708
      pred = pred || func.fail;                                                                                      // 709
                                                                                                                     // 710
      var ancestors = [];                                                                                            // 711
      ancestor(node, function (el) {                                                                                 // 712
        if (!isEditable(el)) {                                                                                       // 713
          ancestors.push(el);                                                                                        // 714
        }                                                                                                            // 715
                                                                                                                     // 716
        return pred(el);                                                                                             // 717
      });                                                                                                            // 718
      return ancestors;                                                                                              // 719
    };                                                                                                               // 720
                                                                                                                     // 721
    /**                                                                                                              // 722
     * find farthest ancestor predicate hit                                                                          // 723
     */                                                                                                              // 724
    var lastAncestor = function (node, pred) {                                                                       // 725
      var ancestors = listAncestor(node);                                                                            // 726
      return list.last(ancestors.filter(pred));                                                                      // 727
    };                                                                                                               // 728
                                                                                                                     // 729
    /**                                                                                                              // 730
     * returns common ancestor node between two nodes.                                                               // 731
     *                                                                                                               // 732
     * @param {Node} nodeA                                                                                           // 733
     * @param {Node} nodeB                                                                                           // 734
     */                                                                                                              // 735
    var commonAncestor = function (nodeA, nodeB) {                                                                   // 736
      var ancestors = listAncestor(nodeA);                                                                           // 737
      for (var n = nodeB; n; n = n.parentNode) {                                                                     // 738
        if ($.inArray(n, ancestors) > -1) { return n; }                                                              // 739
      }                                                                                                              // 740
      return null; // difference document area                                                                       // 741
    };                                                                                                               // 742
                                                                                                                     // 743
    /**                                                                                                              // 744
     * listing all previous siblings (until predicate hit).                                                          // 745
     *                                                                                                               // 746
     * @param {Node} node                                                                                            // 747
     * @param {Function} [optional] pred - predicate function                                                        // 748
     */                                                                                                              // 749
    var listPrev = function (node, pred) {                                                                           // 750
      pred = pred || func.fail;                                                                                      // 751
                                                                                                                     // 752
      var nodes = [];                                                                                                // 753
      while (node) {                                                                                                 // 754
        if (pred(node)) { break; }                                                                                   // 755
        nodes.push(node);                                                                                            // 756
        node = node.previousSibling;                                                                                 // 757
      }                                                                                                              // 758
      return nodes;                                                                                                  // 759
    };                                                                                                               // 760
                                                                                                                     // 761
    /**                                                                                                              // 762
     * listing next siblings (until predicate hit).                                                                  // 763
     *                                                                                                               // 764
     * @param {Node} node                                                                                            // 765
     * @param {Function} [pred] - predicate function                                                                 // 766
     */                                                                                                              // 767
    var listNext = function (node, pred) {                                                                           // 768
      pred = pred || func.fail;                                                                                      // 769
                                                                                                                     // 770
      var nodes = [];                                                                                                // 771
      while (node) {                                                                                                 // 772
        if (pred(node)) { break; }                                                                                   // 773
        nodes.push(node);                                                                                            // 774
        node = node.nextSibling;                                                                                     // 775
      }                                                                                                              // 776
      return nodes;                                                                                                  // 777
    };                                                                                                               // 778
                                                                                                                     // 779
    /**                                                                                                              // 780
     * listing descendant nodes                                                                                      // 781
     *                                                                                                               // 782
     * @param {Node} node                                                                                            // 783
     * @param {Function} [pred] - predicate function                                                                 // 784
     */                                                                                                              // 785
    var listDescendant = function (node, pred) {                                                                     // 786
      var descendants = [];                                                                                          // 787
      pred = pred || func.ok;                                                                                        // 788
                                                                                                                     // 789
      // start DFS(depth first search) with node                                                                     // 790
      (function fnWalk(current) {                                                                                    // 791
        if (node !== current && pred(current)) {                                                                     // 792
          descendants.push(current);                                                                                 // 793
        }                                                                                                            // 794
        for (var idx = 0, len = current.childNodes.length; idx < len; idx++) {                                       // 795
          fnWalk(current.childNodes[idx]);                                                                           // 796
        }                                                                                                            // 797
      })(node);                                                                                                      // 798
                                                                                                                     // 799
      return descendants;                                                                                            // 800
    };                                                                                                               // 801
                                                                                                                     // 802
    /**                                                                                                              // 803
     * wrap node with new tag.                                                                                       // 804
     *                                                                                                               // 805
     * @param {Node} node                                                                                            // 806
     * @param {Node} tagName of wrapper                                                                              // 807
     * @return {Node} - wrapper                                                                                      // 808
     */                                                                                                              // 809
    var wrap = function (node, wrapperName) {                                                                        // 810
      var parent = node.parentNode;                                                                                  // 811
      var wrapper = $('<' + wrapperName + '>')[0];                                                                   // 812
                                                                                                                     // 813
      parent.insertBefore(wrapper, node);                                                                            // 814
      wrapper.appendChild(node);                                                                                     // 815
                                                                                                                     // 816
      return wrapper;                                                                                                // 817
    };                                                                                                               // 818
                                                                                                                     // 819
    /**                                                                                                              // 820
     * insert node after preceding                                                                                   // 821
     *                                                                                                               // 822
     * @param {Node} node                                                                                            // 823
     * @param {Node} preceding - predicate function                                                                  // 824
     */                                                                                                              // 825
    var insertAfter = function (node, preceding) {                                                                   // 826
      var next = preceding.nextSibling, parent = preceding.parentNode;                                               // 827
      if (next) {                                                                                                    // 828
        parent.insertBefore(node, next);                                                                             // 829
      } else {                                                                                                       // 830
        parent.appendChild(node);                                                                                    // 831
      }                                                                                                              // 832
      return node;                                                                                                   // 833
    };                                                                                                               // 834
                                                                                                                     // 835
    /**                                                                                                              // 836
     * append elements.                                                                                              // 837
     *                                                                                                               // 838
     * @param {Node} node                                                                                            // 839
     * @param {Collection} aChild                                                                                    // 840
     */                                                                                                              // 841
    var appendChildNodes = function (node, aChild) {                                                                 // 842
      $.each(aChild, function (idx, child) {                                                                         // 843
        node.appendChild(child);                                                                                     // 844
      });                                                                                                            // 845
      return node;                                                                                                   // 846
    };                                                                                                               // 847
                                                                                                                     // 848
    /**                                                                                                              // 849
     * returns whether boundaryPoint is left edge or not.                                                            // 850
     *                                                                                                               // 851
     * @param {BoundaryPoint} point                                                                                  // 852
     * @return {Boolean}                                                                                             // 853
     */                                                                                                              // 854
    var isLeftEdgePoint = function (point) {                                                                         // 855
      return point.offset === 0;                                                                                     // 856
    };                                                                                                               // 857
                                                                                                                     // 858
    /**                                                                                                              // 859
     * returns whether boundaryPoint is right edge or not.                                                           // 860
     *                                                                                                               // 861
     * @param {BoundaryPoint} point                                                                                  // 862
     * @return {Boolean}                                                                                             // 863
     */                                                                                                              // 864
    var isRightEdgePoint = function (point) {                                                                        // 865
      return point.offset === nodeLength(point.node);                                                                // 866
    };                                                                                                               // 867
                                                                                                                     // 868
    /**                                                                                                              // 869
     * returns whether boundaryPoint is edge or not.                                                                 // 870
     *                                                                                                               // 871
     * @param {BoundaryPoint} point                                                                                  // 872
     * @return {Boolean}                                                                                             // 873
     */                                                                                                              // 874
    var isEdgePoint = function (point) {                                                                             // 875
      return isLeftEdgePoint(point) || isRightEdgePoint(point);                                                      // 876
    };                                                                                                               // 877
                                                                                                                     // 878
    /**                                                                                                              // 879
     * returns whether node is left edge of ancestor or not.                                                         // 880
     *                                                                                                               // 881
     * @param {Node} node                                                                                            // 882
     * @param {Node} ancestor                                                                                        // 883
     * @return {Boolean}                                                                                             // 884
     */                                                                                                              // 885
    var isLeftEdgeOf = function (node, ancestor) {                                                                   // 886
      while (node && node !== ancestor) {                                                                            // 887
        if (position(node) !== 0) {                                                                                  // 888
          return false;                                                                                              // 889
        }                                                                                                            // 890
        node = node.parentNode;                                                                                      // 891
      }                                                                                                              // 892
                                                                                                                     // 893
      return true;                                                                                                   // 894
    };                                                                                                               // 895
                                                                                                                     // 896
    /**                                                                                                              // 897
     * returns whether node is right edge of ancestor or not.                                                        // 898
     *                                                                                                               // 899
     * @param {Node} node                                                                                            // 900
     * @param {Node} ancestor                                                                                        // 901
     * @return {Boolean}                                                                                             // 902
     */                                                                                                              // 903
    var isRightEdgeOf = function (node, ancestor) {                                                                  // 904
      while (node && node !== ancestor) {                                                                            // 905
        if (position(node) !== nodeLength(node.parentNode) - 1) {                                                    // 906
          return false;                                                                                              // 907
        }                                                                                                            // 908
        node = node.parentNode;                                                                                      // 909
      }                                                                                                              // 910
                                                                                                                     // 911
      return true;                                                                                                   // 912
    };                                                                                                               // 913
                                                                                                                     // 914
    /**                                                                                                              // 915
     * returns whether point is left edge of ancestor or not.                                                        // 916
     * @param {BoundaryPoint} point                                                                                  // 917
     * @param {Node} ancestor                                                                                        // 918
     * @return {Boolean}                                                                                             // 919
     */                                                                                                              // 920
    var isLeftEdgePointOf = function (point, ancestor) {                                                             // 921
      return isLeftEdgePoint(point) && isLeftEdgeOf(point.node, ancestor);                                           // 922
    };                                                                                                               // 923
                                                                                                                     // 924
    /**                                                                                                              // 925
     * returns whether point is right edge of ancestor or not.                                                       // 926
     * @param {BoundaryPoint} point                                                                                  // 927
     * @param {Node} ancestor                                                                                        // 928
     * @return {Boolean}                                                                                             // 929
     */                                                                                                              // 930
    var isRightEdgePointOf = function (point, ancestor) {                                                            // 931
      return isRightEdgePoint(point) && isRightEdgeOf(point.node, ancestor);                                         // 932
    };                                                                                                               // 933
                                                                                                                     // 934
    /**                                                                                                              // 935
     * returns offset from parent.                                                                                   // 936
     *                                                                                                               // 937
     * @param {Node} node                                                                                            // 938
     */                                                                                                              // 939
    var position = function (node) {                                                                                 // 940
      var offset = 0;                                                                                                // 941
      while ((node = node.previousSibling)) {                                                                        // 942
        offset += 1;                                                                                                 // 943
      }                                                                                                              // 944
      return offset;                                                                                                 // 945
    };                                                                                                               // 946
                                                                                                                     // 947
    var hasChildren = function (node) {                                                                              // 948
      return !!(node && node.childNodes && node.childNodes.length);                                                  // 949
    };                                                                                                               // 950
                                                                                                                     // 951
    /**                                                                                                              // 952
     * returns previous boundaryPoint                                                                                // 953
     *                                                                                                               // 954
     * @param {BoundaryPoint} point                                                                                  // 955
     * @param {Boolean} isSkipInnerOffset                                                                            // 956
     * @return {BoundaryPoint}                                                                                       // 957
     */                                                                                                              // 958
    var prevPoint = function (point, isSkipInnerOffset) {                                                            // 959
      var node, offset;                                                                                              // 960
                                                                                                                     // 961
      if (point.offset === 0) {                                                                                      // 962
        if (isEditable(point.node)) {                                                                                // 963
          return null;                                                                                               // 964
        }                                                                                                            // 965
                                                                                                                     // 966
        node = point.node.parentNode;                                                                                // 967
        offset = position(point.node);                                                                               // 968
      } else if (hasChildren(point.node)) {                                                                          // 969
        node = point.node.childNodes[point.offset - 1];                                                              // 970
        offset = nodeLength(node);                                                                                   // 971
      } else {                                                                                                       // 972
        node = point.node;                                                                                           // 973
        offset = isSkipInnerOffset ? 0 : point.offset - 1;                                                           // 974
      }                                                                                                              // 975
                                                                                                                     // 976
      return {                                                                                                       // 977
        node: node,                                                                                                  // 978
        offset: offset                                                                                               // 979
      };                                                                                                             // 980
    };                                                                                                               // 981
                                                                                                                     // 982
    /**                                                                                                              // 983
     * returns next boundaryPoint                                                                                    // 984
     *                                                                                                               // 985
     * @param {BoundaryPoint} point                                                                                  // 986
     * @param {Boolean} isSkipInnerOffset                                                                            // 987
     * @return {BoundaryPoint}                                                                                       // 988
     */                                                                                                              // 989
    var nextPoint = function (point, isSkipInnerOffset) {                                                            // 990
      var node, offset;                                                                                              // 991
                                                                                                                     // 992
      if (nodeLength(point.node) === point.offset) {                                                                 // 993
        if (isEditable(point.node)) {                                                                                // 994
          return null;                                                                                               // 995
        }                                                                                                            // 996
                                                                                                                     // 997
        node = point.node.parentNode;                                                                                // 998
        offset = position(point.node) + 1;                                                                           // 999
      } else if (hasChildren(point.node)) {                                                                          // 1000
        node = point.node.childNodes[point.offset];                                                                  // 1001
        offset = 0;                                                                                                  // 1002
      } else {                                                                                                       // 1003
        node = point.node;                                                                                           // 1004
        offset = isSkipInnerOffset ? nodeLength(point.node) : point.offset + 1;                                      // 1005
      }                                                                                                              // 1006
                                                                                                                     // 1007
      return {                                                                                                       // 1008
        node: node,                                                                                                  // 1009
        offset: offset                                                                                               // 1010
      };                                                                                                             // 1011
    };                                                                                                               // 1012
                                                                                                                     // 1013
    /**                                                                                                              // 1014
     * returns whether pointA and pointB is same or not.                                                             // 1015
     *                                                                                                               // 1016
     * @param {BoundaryPoint} pointA                                                                                 // 1017
     * @param {BoundaryPoint} pointB                                                                                 // 1018
     * @return {Boolean}                                                                                             // 1019
     */                                                                                                              // 1020
    var isSamePoint = function (pointA, pointB) {                                                                    // 1021
      return pointA.node === pointB.node && pointA.offset === pointB.offset;                                         // 1022
    };                                                                                                               // 1023
                                                                                                                     // 1024
    /**                                                                                                              // 1025
     * returns whether point is visible (can set cursor) or not.                                                     // 1026
     *                                                                                                               // 1027
     * @param {BoundaryPoint} point                                                                                  // 1028
     * @return {Boolean}                                                                                             // 1029
     */                                                                                                              // 1030
    var isVisiblePoint = function (point) {                                                                          // 1031
      if (isText(point.node) || !hasChildren(point.node) || isEmpty(point.node)) {                                   // 1032
        return true;                                                                                                 // 1033
      }                                                                                                              // 1034
                                                                                                                     // 1035
      var leftNode = point.node.childNodes[point.offset - 1];                                                        // 1036
      var rightNode = point.node.childNodes[point.offset];                                                           // 1037
      if ((!leftNode || isVoid(leftNode)) && (!rightNode || isVoid(rightNode))) {                                    // 1038
        return true;                                                                                                 // 1039
      }                                                                                                              // 1040
                                                                                                                     // 1041
      return false;                                                                                                  // 1042
    };                                                                                                               // 1043
                                                                                                                     // 1044
    /**                                                                                                              // 1045
     * @method prevPointUtil                                                                                         // 1046
     *                                                                                                               // 1047
     * @param {BoundaryPoint} point                                                                                  // 1048
     * @param {Function} pred                                                                                        // 1049
     * @return {BoundaryPoint}                                                                                       // 1050
     */                                                                                                              // 1051
    var prevPointUntil = function (point, pred) {                                                                    // 1052
      while (point) {                                                                                                // 1053
        if (pred(point)) {                                                                                           // 1054
          return point;                                                                                              // 1055
        }                                                                                                            // 1056
                                                                                                                     // 1057
        point = prevPoint(point);                                                                                    // 1058
      }                                                                                                              // 1059
                                                                                                                     // 1060
      return null;                                                                                                   // 1061
    };                                                                                                               // 1062
                                                                                                                     // 1063
    /**                                                                                                              // 1064
     * @method nextPointUntil                                                                                        // 1065
     *                                                                                                               // 1066
     * @param {BoundaryPoint} point                                                                                  // 1067
     * @param {Function} pred                                                                                        // 1068
     * @return {BoundaryPoint}                                                                                       // 1069
     */                                                                                                              // 1070
    var nextPointUntil = function (point, pred) {                                                                    // 1071
      while (point) {                                                                                                // 1072
        if (pred(point)) {                                                                                           // 1073
          return point;                                                                                              // 1074
        }                                                                                                            // 1075
                                                                                                                     // 1076
        point = nextPoint(point);                                                                                    // 1077
      }                                                                                                              // 1078
                                                                                                                     // 1079
      return null;                                                                                                   // 1080
    };                                                                                                               // 1081
                                                                                                                     // 1082
    /**                                                                                                              // 1083
     * returns whether point has character or not.                                                                   // 1084
     *                                                                                                               // 1085
     * @param {Point} point                                                                                          // 1086
     * @return {Boolean}                                                                                             // 1087
     */                                                                                                              // 1088
    var isCharPoint = function (point) {                                                                             // 1089
      if (!isText(point.node)) {                                                                                     // 1090
        return false;                                                                                                // 1091
      }                                                                                                              // 1092
                                                                                                                     // 1093
      var ch = point.node.nodeValue.charAt(point.offset - 1);                                                        // 1094
      return ch && (ch !== ' ' && ch !== NBSP_CHAR);                                                                 // 1095
    };                                                                                                               // 1096
                                                                                                                     // 1097
    /**                                                                                                              // 1098
     * @method walkPoint                                                                                             // 1099
     *                                                                                                               // 1100
     * @param {BoundaryPoint} startPoint                                                                             // 1101
     * @param {BoundaryPoint} endPoint                                                                               // 1102
     * @param {Function} handler                                                                                     // 1103
     * @param {Boolean} isSkipInnerOffset                                                                            // 1104
     */                                                                                                              // 1105
    var walkPoint = function (startPoint, endPoint, handler, isSkipInnerOffset) {                                    // 1106
      var point = startPoint;                                                                                        // 1107
                                                                                                                     // 1108
      while (point) {                                                                                                // 1109
        handler(point);                                                                                              // 1110
                                                                                                                     // 1111
        if (isSamePoint(point, endPoint)) {                                                                          // 1112
          break;                                                                                                     // 1113
        }                                                                                                            // 1114
                                                                                                                     // 1115
        var isSkipOffset = isSkipInnerOffset &&                                                                      // 1116
                           startPoint.node !== point.node &&                                                         // 1117
                           endPoint.node !== point.node;                                                             // 1118
        point = nextPoint(point, isSkipOffset);                                                                      // 1119
      }                                                                                                              // 1120
    };                                                                                                               // 1121
                                                                                                                     // 1122
    /**                                                                                                              // 1123
     * @method makeOffsetPath                                                                                        // 1124
     *                                                                                                               // 1125
     * return offsetPath(array of offset) from ancestor                                                              // 1126
     *                                                                                                               // 1127
     * @param {Node} ancestor - ancestor node                                                                        // 1128
     * @param {Node} node                                                                                            // 1129
     */                                                                                                              // 1130
    var makeOffsetPath = function (ancestor, node) {                                                                 // 1131
      var ancestors = listAncestor(node, func.eq(ancestor));                                                         // 1132
      return ancestors.map(position).reverse();                                                                      // 1133
    };                                                                                                               // 1134
                                                                                                                     // 1135
    /**                                                                                                              // 1136
     * @method fromOffsetPath                                                                                        // 1137
     *                                                                                                               // 1138
     * return element from offsetPath(array of offset)                                                               // 1139
     *                                                                                                               // 1140
     * @param {Node} ancestor - ancestor node                                                                        // 1141
     * @param {array} offsets - offsetPath                                                                           // 1142
     */                                                                                                              // 1143
    var fromOffsetPath = function (ancestor, offsets) {                                                              // 1144
      var current = ancestor;                                                                                        // 1145
      for (var i = 0, len = offsets.length; i < len; i++) {                                                          // 1146
        if (current.childNodes.length <= offsets[i]) {                                                               // 1147
          current = current.childNodes[current.childNodes.length - 1];                                               // 1148
        } else {                                                                                                     // 1149
          current = current.childNodes[offsets[i]];                                                                  // 1150
        }                                                                                                            // 1151
      }                                                                                                              // 1152
      return current;                                                                                                // 1153
    };                                                                                                               // 1154
                                                                                                                     // 1155
    /**                                                                                                              // 1156
     * @method splitNode                                                                                             // 1157
     *                                                                                                               // 1158
     * split element or #text                                                                                        // 1159
     *                                                                                                               // 1160
     * @param {BoundaryPoint} point                                                                                  // 1161
     * @param {Object} [options]                                                                                     // 1162
     * @param {Boolean} [options.isSkipPaddingBlankHTML] - default: false                                            // 1163
     * @param {Boolean} [options.isNotSplitEdgePoint] - default: false                                               // 1164
     * @return {Node} right node of boundaryPoint                                                                    // 1165
     */                                                                                                              // 1166
    var splitNode = function (point, options) {                                                                      // 1167
      var isSkipPaddingBlankHTML = options && options.isSkipPaddingBlankHTML;                                        // 1168
      var isNotSplitEdgePoint = options && options.isNotSplitEdgePoint;                                              // 1169
                                                                                                                     // 1170
      // edge case                                                                                                   // 1171
      if (isEdgePoint(point) && (isText(point.node) || isNotSplitEdgePoint)) {                                       // 1172
        if (isLeftEdgePoint(point)) {                                                                                // 1173
          return point.node;                                                                                         // 1174
        } else if (isRightEdgePoint(point)) {                                                                        // 1175
          return point.node.nextSibling;                                                                             // 1176
        }                                                                                                            // 1177
      }                                                                                                              // 1178
                                                                                                                     // 1179
      // split #text                                                                                                 // 1180
      if (isText(point.node)) {                                                                                      // 1181
        return point.node.splitText(point.offset);                                                                   // 1182
      } else {                                                                                                       // 1183
        var childNode = point.node.childNodes[point.offset];                                                         // 1184
        var clone = insertAfter(point.node.cloneNode(false), point.node);                                            // 1185
        appendChildNodes(clone, listNext(childNode));                                                                // 1186
                                                                                                                     // 1187
        if (!isSkipPaddingBlankHTML) {                                                                               // 1188
          paddingBlankHTML(point.node);                                                                              // 1189
          paddingBlankHTML(clone);                                                                                   // 1190
        }                                                                                                            // 1191
                                                                                                                     // 1192
        return clone;                                                                                                // 1193
      }                                                                                                              // 1194
    };                                                                                                               // 1195
                                                                                                                     // 1196
    /**                                                                                                              // 1197
     * @method splitTree                                                                                             // 1198
     *                                                                                                               // 1199
     * split tree by point                                                                                           // 1200
     *                                                                                                               // 1201
     * @param {Node} root - split root                                                                               // 1202
     * @param {BoundaryPoint} point                                                                                  // 1203
     * @param {Object} [options]                                                                                     // 1204
     * @param {Boolean} [options.isSkipPaddingBlankHTML] - default: false                                            // 1205
     * @param {Boolean} [options.isNotSplitEdgePoint] - default: false                                               // 1206
     * @return {Node} right node of boundaryPoint                                                                    // 1207
     */                                                                                                              // 1208
    var splitTree = function (root, point, options) {                                                                // 1209
      // ex) [#text, <span>, <p>]                                                                                    // 1210
      var ancestors = listAncestor(point.node, func.eq(root));                                                       // 1211
                                                                                                                     // 1212
      if (!ancestors.length) {                                                                                       // 1213
        return null;                                                                                                 // 1214
      } else if (ancestors.length === 1) {                                                                           // 1215
        return splitNode(point, options);                                                                            // 1216
      }                                                                                                              // 1217
                                                                                                                     // 1218
      return ancestors.reduce(function (node, parent) {                                                              // 1219
        if (node === point.node) {                                                                                   // 1220
          node = splitNode(point, options);                                                                          // 1221
        }                                                                                                            // 1222
                                                                                                                     // 1223
        return splitNode({                                                                                           // 1224
          node: parent,                                                                                              // 1225
          offset: node ? dom.position(node) : nodeLength(parent)                                                     // 1226
        }, options);                                                                                                 // 1227
      });                                                                                                            // 1228
    };                                                                                                               // 1229
                                                                                                                     // 1230
    /**                                                                                                              // 1231
     * split point                                                                                                   // 1232
     *                                                                                                               // 1233
     * @param {Point} point                                                                                          // 1234
     * @param {Boolean} isInline                                                                                     // 1235
     * @return {Object}                                                                                              // 1236
     */                                                                                                              // 1237
    var splitPoint = function (point, isInline) {                                                                    // 1238
      // find splitRoot, container                                                                                   // 1239
      //  - inline: splitRoot is a child of paragraph                                                                // 1240
      //  - block: splitRoot is a child of bodyContainer                                                             // 1241
      var pred = isInline ? isPara : isBodyContainer;                                                                // 1242
      var ancestors = listAncestor(point.node, pred);                                                                // 1243
      var topAncestor = list.last(ancestors) || point.node;                                                          // 1244
                                                                                                                     // 1245
      var splitRoot, container;                                                                                      // 1246
      if (pred(topAncestor)) {                                                                                       // 1247
        splitRoot = ancestors[ancestors.length - 2];                                                                 // 1248
        container = topAncestor;                                                                                     // 1249
      } else {                                                                                                       // 1250
        splitRoot = topAncestor;                                                                                     // 1251
        container = splitRoot.parentNode;                                                                            // 1252
      }                                                                                                              // 1253
                                                                                                                     // 1254
      // if splitRoot is exists, split with splitTree                                                                // 1255
      var pivot = splitRoot && splitTree(splitRoot, point, {                                                         // 1256
        isSkipPaddingBlankHTML: isInline,                                                                            // 1257
        isNotSplitEdgePoint: isInline                                                                                // 1258
      });                                                                                                            // 1259
                                                                                                                     // 1260
      // if container is point.node, find pivot with point.offset                                                    // 1261
      if (!pivot && container === point.node) {                                                                      // 1262
        pivot = point.node.childNodes[point.offset];                                                                 // 1263
      }                                                                                                              // 1264
                                                                                                                     // 1265
      return {                                                                                                       // 1266
        rightNode: pivot,                                                                                            // 1267
        container: container                                                                                         // 1268
      };                                                                                                             // 1269
    };                                                                                                               // 1270
                                                                                                                     // 1271
    var create = function (nodeName) {                                                                               // 1272
      return document.createElement(nodeName);                                                                       // 1273
    };                                                                                                               // 1274
                                                                                                                     // 1275
    var createText = function (text) {                                                                               // 1276
      return document.createTextNode(text);                                                                          // 1277
    };                                                                                                               // 1278
                                                                                                                     // 1279
    /**                                                                                                              // 1280
     * @method remove                                                                                                // 1281
     *                                                                                                               // 1282
     * remove node, (isRemoveChild: remove child or not)                                                             // 1283
     *                                                                                                               // 1284
     * @param {Node} node                                                                                            // 1285
     * @param {Boolean} isRemoveChild                                                                                // 1286
     */                                                                                                              // 1287
    var remove = function (node, isRemoveChild) {                                                                    // 1288
      if (!node || !node.parentNode) { return; }                                                                     // 1289
      if (node.removeNode) { return node.removeNode(isRemoveChild); }                                                // 1290
                                                                                                                     // 1291
      var parent = node.parentNode;                                                                                  // 1292
      if (!isRemoveChild) {                                                                                          // 1293
        var nodes = [];                                                                                              // 1294
        var i, len;                                                                                                  // 1295
        for (i = 0, len = node.childNodes.length; i < len; i++) {                                                    // 1296
          nodes.push(node.childNodes[i]);                                                                            // 1297
        }                                                                                                            // 1298
                                                                                                                     // 1299
        for (i = 0, len = nodes.length; i < len; i++) {                                                              // 1300
          parent.insertBefore(nodes[i], node);                                                                       // 1301
        }                                                                                                            // 1302
      }                                                                                                              // 1303
                                                                                                                     // 1304
      parent.removeChild(node);                                                                                      // 1305
    };                                                                                                               // 1306
                                                                                                                     // 1307
    /**                                                                                                              // 1308
     * @method removeWhile                                                                                           // 1309
     *                                                                                                               // 1310
     * @param {Node} node                                                                                            // 1311
     * @param {Function} pred                                                                                        // 1312
     */                                                                                                              // 1313
    var removeWhile = function (node, pred) {                                                                        // 1314
      while (node) {                                                                                                 // 1315
        if (isEditable(node) || !pred(node)) {                                                                       // 1316
          break;                                                                                                     // 1317
        }                                                                                                            // 1318
                                                                                                                     // 1319
        var parent = node.parentNode;                                                                                // 1320
        remove(node);                                                                                                // 1321
        node = parent;                                                                                               // 1322
      }                                                                                                              // 1323
    };                                                                                                               // 1324
                                                                                                                     // 1325
    /**                                                                                                              // 1326
     * @method replace                                                                                               // 1327
     *                                                                                                               // 1328
     * replace node with provided nodeName                                                                           // 1329
     *                                                                                                               // 1330
     * @param {Node} node                                                                                            // 1331
     * @param {String} nodeName                                                                                      // 1332
     * @return {Node} - new node                                                                                     // 1333
     */                                                                                                              // 1334
    var replace = function (node, nodeName) {                                                                        // 1335
      if (node.nodeName.toUpperCase() === nodeName.toUpperCase()) {                                                  // 1336
        return node;                                                                                                 // 1337
      }                                                                                                              // 1338
                                                                                                                     // 1339
      var newNode = create(nodeName);                                                                                // 1340
                                                                                                                     // 1341
      if (node.style.cssText) {                                                                                      // 1342
        newNode.style.cssText = node.style.cssText;                                                                  // 1343
      }                                                                                                              // 1344
                                                                                                                     // 1345
      appendChildNodes(newNode, list.from(node.childNodes));                                                         // 1346
      insertAfter(newNode, node);                                                                                    // 1347
      remove(node);                                                                                                  // 1348
                                                                                                                     // 1349
      return newNode;                                                                                                // 1350
    };                                                                                                               // 1351
                                                                                                                     // 1352
    var isTextarea = makePredByNodeName('TEXTAREA');                                                                 // 1353
                                                                                                                     // 1354
    /**                                                                                                              // 1355
     * @param {jQuery} $node                                                                                         // 1356
     * @param {Boolean} [stripLinebreaks] - default: false                                                           // 1357
     */                                                                                                              // 1358
    var value = function ($node, stripLinebreaks) {                                                                  // 1359
      var val = isTextarea($node[0]) ? $node.val() : $node.html();                                                   // 1360
      if (stripLinebreaks) {                                                                                         // 1361
        return val.replace(/[\n\r]/g, '');                                                                           // 1362
      }                                                                                                              // 1363
      return val;                                                                                                    // 1364
    };                                                                                                               // 1365
                                                                                                                     // 1366
    /**                                                                                                              // 1367
     * @method html                                                                                                  // 1368
     *                                                                                                               // 1369
     * get the HTML contents of node                                                                                 // 1370
     *                                                                                                               // 1371
     * @param {jQuery} $node                                                                                         // 1372
     * @param {Boolean} [isNewlineOnBlock]                                                                           // 1373
     */                                                                                                              // 1374
    var html = function ($node, isNewlineOnBlock) {                                                                  // 1375
      var markup = value($node);                                                                                     // 1376
                                                                                                                     // 1377
      if (isNewlineOnBlock) {                                                                                        // 1378
        var regexTag = /<(\/?)(\b(?!!)[^>\s]*)(.*?)(\s*\/?>)/g;                                                      // 1379
        markup = markup.replace(regexTag, function (match, endSlash, name) {                                         // 1380
          name = name.toUpperCase();                                                                                 // 1381
          var isEndOfInlineContainer = /^DIV|^TD|^TH|^P|^LI|^H[1-7]/.test(name) &&                                   // 1382
                                       !!endSlash;                                                                   // 1383
          var isBlockNode = /^BLOCKQUOTE|^TABLE|^TBODY|^TR|^HR|^UL|^OL/.test(name);                                  // 1384
                                                                                                                     // 1385
          return match + ((isEndOfInlineContainer || isBlockNode) ? '\n' : '');                                      // 1386
        });                                                                                                          // 1387
        markup = $.trim(markup);                                                                                     // 1388
      }                                                                                                              // 1389
                                                                                                                     // 1390
      return markup;                                                                                                 // 1391
    };                                                                                                               // 1392
                                                                                                                     // 1393
    var posFromPlaceholder = function (placeholder) {                                                                // 1394
      var $placeholder = $(placeholder);                                                                             // 1395
      var pos = $placeholder.offset();                                                                               // 1396
      var height = $placeholder.outerHeight(true); // include margin                                                 // 1397
                                                                                                                     // 1398
      return {                                                                                                       // 1399
        left: pos.left,                                                                                              // 1400
        top: pos.top + height                                                                                        // 1401
      };                                                                                                             // 1402
    };                                                                                                               // 1403
                                                                                                                     // 1404
    var attachEvents = function ($node, events) {                                                                    // 1405
      Object.keys(events).forEach(function (key) {                                                                   // 1406
        $node.on(key, events[key]);                                                                                  // 1407
      });                                                                                                            // 1408
    };                                                                                                               // 1409
                                                                                                                     // 1410
    var detachEvents = function ($node, events) {                                                                    // 1411
      Object.keys(events).forEach(function (key) {                                                                   // 1412
        $node.off(key, events[key]);                                                                                 // 1413
      });                                                                                                            // 1414
    };                                                                                                               // 1415
                                                                                                                     // 1416
    return {                                                                                                         // 1417
      /** @property {String} NBSP_CHAR */                                                                            // 1418
      NBSP_CHAR: NBSP_CHAR,                                                                                          // 1419
      /** @property {String} ZERO_WIDTH_NBSP_CHAR */                                                                 // 1420
      ZERO_WIDTH_NBSP_CHAR: ZERO_WIDTH_NBSP_CHAR,                                                                    // 1421
      /** @property {String} blank */                                                                                // 1422
      blank: blankHTML,                                                                                              // 1423
      /** @property {String} emptyPara */                                                                            // 1424
      emptyPara: '<p>' + blankHTML + '</p>',                                                                         // 1425
      makePredByNodeName: makePredByNodeName,                                                                        // 1426
      isEditable: isEditable,                                                                                        // 1427
      isControlSizing: isControlSizing,                                                                              // 1428
      isText: isText,                                                                                                // 1429
      isElement: isElement,                                                                                          // 1430
      isVoid: isVoid,                                                                                                // 1431
      isPara: isPara,                                                                                                // 1432
      isPurePara: isPurePara,                                                                                        // 1433
      isHeading: isHeading,                                                                                          // 1434
      isInline: isInline,                                                                                            // 1435
      isBlock: func.not(isInline),                                                                                   // 1436
      isBodyInline: isBodyInline,                                                                                    // 1437
      isBody: isBody,                                                                                                // 1438
      isParaInline: isParaInline,                                                                                    // 1439
      isPre: isPre,                                                                                                  // 1440
      isList: isList,                                                                                                // 1441
      isTable: isTable,                                                                                              // 1442
      isCell: isCell,                                                                                                // 1443
      isBlockquote: isBlockquote,                                                                                    // 1444
      isBodyContainer: isBodyContainer,                                                                              // 1445
      isAnchor: isAnchor,                                                                                            // 1446
      isDiv: makePredByNodeName('DIV'),                                                                              // 1447
      isLi: isLi,                                                                                                    // 1448
      isBR: makePredByNodeName('BR'),                                                                                // 1449
      isSpan: makePredByNodeName('SPAN'),                                                                            // 1450
      isB: makePredByNodeName('B'),                                                                                  // 1451
      isU: makePredByNodeName('U'),                                                                                  // 1452
      isS: makePredByNodeName('S'),                                                                                  // 1453
      isI: makePredByNodeName('I'),                                                                                  // 1454
      isImg: makePredByNodeName('IMG'),                                                                              // 1455
      isTextarea: isTextarea,                                                                                        // 1456
      isEmpty: isEmpty,                                                                                              // 1457
      isEmptyAnchor: func.and(isAnchor, isEmpty),                                                                    // 1458
      isClosestSibling: isClosestSibling,                                                                            // 1459
      withClosestSiblings: withClosestSiblings,                                                                      // 1460
      nodeLength: nodeLength,                                                                                        // 1461
      isLeftEdgePoint: isLeftEdgePoint,                                                                              // 1462
      isRightEdgePoint: isRightEdgePoint,                                                                            // 1463
      isEdgePoint: isEdgePoint,                                                                                      // 1464
      isLeftEdgeOf: isLeftEdgeOf,                                                                                    // 1465
      isRightEdgeOf: isRightEdgeOf,                                                                                  // 1466
      isLeftEdgePointOf: isLeftEdgePointOf,                                                                          // 1467
      isRightEdgePointOf: isRightEdgePointOf,                                                                        // 1468
      prevPoint: prevPoint,                                                                                          // 1469
      nextPoint: nextPoint,                                                                                          // 1470
      isSamePoint: isSamePoint,                                                                                      // 1471
      isVisiblePoint: isVisiblePoint,                                                                                // 1472
      prevPointUntil: prevPointUntil,                                                                                // 1473
      nextPointUntil: nextPointUntil,                                                                                // 1474
      isCharPoint: isCharPoint,                                                                                      // 1475
      walkPoint: walkPoint,                                                                                          // 1476
      ancestor: ancestor,                                                                                            // 1477
      singleChildAncestor: singleChildAncestor,                                                                      // 1478
      listAncestor: listAncestor,                                                                                    // 1479
      lastAncestor: lastAncestor,                                                                                    // 1480
      listNext: listNext,                                                                                            // 1481
      listPrev: listPrev,                                                                                            // 1482
      listDescendant: listDescendant,                                                                                // 1483
      commonAncestor: commonAncestor,                                                                                // 1484
      wrap: wrap,                                                                                                    // 1485
      insertAfter: insertAfter,                                                                                      // 1486
      appendChildNodes: appendChildNodes,                                                                            // 1487
      position: position,                                                                                            // 1488
      hasChildren: hasChildren,                                                                                      // 1489
      makeOffsetPath: makeOffsetPath,                                                                                // 1490
      fromOffsetPath: fromOffsetPath,                                                                                // 1491
      splitTree: splitTree,                                                                                          // 1492
      splitPoint: splitPoint,                                                                                        // 1493
      create: create,                                                                                                // 1494
      createText: createText,                                                                                        // 1495
      remove: remove,                                                                                                // 1496
      removeWhile: removeWhile,                                                                                      // 1497
      replace: replace,                                                                                              // 1498
      html: html,                                                                                                    // 1499
      value: value,                                                                                                  // 1500
      posFromPlaceholder: posFromPlaceholder,                                                                        // 1501
      attachEvents: attachEvents,                                                                                    // 1502
      detachEvents: detachEvents                                                                                     // 1503
    };                                                                                                               // 1504
  })();                                                                                                              // 1505
                                                                                                                     // 1506
  /**                                                                                                                // 1507
   * @param {jQuery} $note                                                                                           // 1508
   * @param {Object} options                                                                                         // 1509
   * @return {Context}                                                                                               // 1510
   */                                                                                                                // 1511
  var Context = function ($note, options) {                                                                          // 1512
    var self = this;                                                                                                 // 1513
                                                                                                                     // 1514
    var ui = $.summernote.ui;                                                                                        // 1515
    this.memos = {};                                                                                                 // 1516
    this.modules = {};                                                                                               // 1517
    this.layoutInfo = {};                                                                                            // 1518
    this.options = options;                                                                                          // 1519
                                                                                                                     // 1520
    /**                                                                                                              // 1521
     * create layout and initialize modules and other resources                                                      // 1522
     */                                                                                                              // 1523
    this.initialize = function () {                                                                                  // 1524
      this.layoutInfo = ui.createLayout($note, options);                                                             // 1525
      this._initialize();                                                                                            // 1526
      $note.hide();                                                                                                  // 1527
      return this;                                                                                                   // 1528
    };                                                                                                               // 1529
                                                                                                                     // 1530
    /**                                                                                                              // 1531
     * destroy modules and other resources and remove layout                                                         // 1532
     */                                                                                                              // 1533
    this.destroy = function () {                                                                                     // 1534
      this._destroy();                                                                                               // 1535
      $note.removeData('summernote');                                                                                // 1536
      ui.removeLayout($note, this.layoutInfo);                                                                       // 1537
    };                                                                                                               // 1538
                                                                                                                     // 1539
    /**                                                                                                              // 1540
     * destory modules and other resources and initialize it again                                                   // 1541
     */                                                                                                              // 1542
    this.reset = function () {                                                                                       // 1543
      var disabled = self.isDisabled();                                                                              // 1544
      this.code(dom.emptyPara);                                                                                      // 1545
      this._destroy();                                                                                               // 1546
      this._initialize();                                                                                            // 1547
                                                                                                                     // 1548
      if (disabled) {                                                                                                // 1549
        self.disable();                                                                                              // 1550
      }                                                                                                              // 1551
    };                                                                                                               // 1552
                                                                                                                     // 1553
    this._initialize = function () {                                                                                 // 1554
      // add optional buttons                                                                                        // 1555
      var buttons = $.extend({}, this.options.buttons);                                                              // 1556
      Object.keys(buttons).forEach(function (key) {                                                                  // 1557
        self.memo('button.' + key, buttons[key]);                                                                    // 1558
      });                                                                                                            // 1559
                                                                                                                     // 1560
      var modules = $.extend({}, this.options.modules, $.summernote.plugins || {});                                  // 1561
                                                                                                                     // 1562
      // add and initialize modules                                                                                  // 1563
      Object.keys(modules).forEach(function (key) {                                                                  // 1564
        self.module(key, modules[key], true);                                                                        // 1565
      });                                                                                                            // 1566
                                                                                                                     // 1567
      Object.keys(this.modules).forEach(function (key) {                                                             // 1568
        self.initializeModule(key);                                                                                  // 1569
      });                                                                                                            // 1570
    };                                                                                                               // 1571
                                                                                                                     // 1572
    this._destroy = function () {                                                                                    // 1573
      // destroy modules with reversed order                                                                         // 1574
      Object.keys(this.modules).reverse().forEach(function (key) {                                                   // 1575
        self.removeModule(key);                                                                                      // 1576
      });                                                                                                            // 1577
                                                                                                                     // 1578
      Object.keys(this.memos).forEach(function (key) {                                                               // 1579
        self.removeMemo(key);                                                                                        // 1580
      });                                                                                                            // 1581
    };                                                                                                               // 1582
                                                                                                                     // 1583
    this.code = function (html) {                                                                                    // 1584
      var isActivated = this.invoke('codeview.isActivated');                                                         // 1585
                                                                                                                     // 1586
      if (html === undefined) {                                                                                      // 1587
        this.invoke('codeview.sync');                                                                                // 1588
        return isActivated ? this.layoutInfo.codable.val() : this.layoutInfo.editable.html();                        // 1589
      } else {                                                                                                       // 1590
        if (isActivated) {                                                                                           // 1591
          this.layoutInfo.codable.val(html);                                                                         // 1592
        } else {                                                                                                     // 1593
          this.layoutInfo.editable.html(html);                                                                       // 1594
        }                                                                                                            // 1595
        $note.val(html);                                                                                             // 1596
        this.triggerEvent('change', html);                                                                           // 1597
      }                                                                                                              // 1598
    };                                                                                                               // 1599
                                                                                                                     // 1600
    this.isDisabled = function () {                                                                                  // 1601
      return this.layoutInfo.editable.attr('contenteditable') === 'false';                                           // 1602
    };                                                                                                               // 1603
                                                                                                                     // 1604
    this.enable = function () {                                                                                      // 1605
      this.layoutInfo.editable.attr('contenteditable', true);                                                        // 1606
      this.invoke('toolbar.activate', true);                                                                         // 1607
    };                                                                                                               // 1608
                                                                                                                     // 1609
    this.disable = function () {                                                                                     // 1610
      // close codeview if codeview is opend                                                                         // 1611
      if (this.invoke('codeview.isActivated')) {                                                                     // 1612
        this.invoke('codeview.deactivate');                                                                          // 1613
      }                                                                                                              // 1614
      this.layoutInfo.editable.attr('contenteditable', false);                                                       // 1615
      this.invoke('toolbar.deactivate', true);                                                                       // 1616
    };                                                                                                               // 1617
                                                                                                                     // 1618
    this.triggerEvent = function () {                                                                                // 1619
      var namespace = list.head(arguments);                                                                          // 1620
      var args = list.tail(list.from(arguments));                                                                    // 1621
                                                                                                                     // 1622
      var callback = this.options.callbacks[func.namespaceToCamel(namespace, 'on')];                                 // 1623
      if (callback) {                                                                                                // 1624
        callback.apply($note[0], args);                                                                              // 1625
      }                                                                                                              // 1626
      $note.trigger('summernote.' + namespace, args);                                                                // 1627
    };                                                                                                               // 1628
                                                                                                                     // 1629
    this.initializeModule = function (key) {                                                                         // 1630
      var module = this.modules[key];                                                                                // 1631
      module.shouldInitialize = module.shouldInitialize || func.ok;                                                  // 1632
      if (!module.shouldInitialize()) {                                                                              // 1633
        return;                                                                                                      // 1634
      }                                                                                                              // 1635
                                                                                                                     // 1636
      // initialize module                                                                                           // 1637
      if (module.initialize) {                                                                                       // 1638
        module.initialize();                                                                                         // 1639
      }                                                                                                              // 1640
                                                                                                                     // 1641
      // attach events                                                                                               // 1642
      if (module.events) {                                                                                           // 1643
        dom.attachEvents($note, module.events);                                                                      // 1644
      }                                                                                                              // 1645
    };                                                                                                               // 1646
                                                                                                                     // 1647
    this.module = function (key, ModuleClass, withoutIntialize) {                                                    // 1648
      if (arguments.length === 1) {                                                                                  // 1649
        return this.modules[key];                                                                                    // 1650
      }                                                                                                              // 1651
                                                                                                                     // 1652
      this.modules[key] = new ModuleClass(this);                                                                     // 1653
                                                                                                                     // 1654
      if (!withoutIntialize) {                                                                                       // 1655
        this.initializeModule(key);                                                                                  // 1656
      }                                                                                                              // 1657
    };                                                                                                               // 1658
                                                                                                                     // 1659
    this.removeModule = function (key) {                                                                             // 1660
      var module = this.modules[key];                                                                                // 1661
      if (module.shouldInitialize()) {                                                                               // 1662
        if (module.events) {                                                                                         // 1663
          dom.detachEvents($note, module.events);                                                                    // 1664
        }                                                                                                            // 1665
                                                                                                                     // 1666
        if (module.destroy) {                                                                                        // 1667
          module.destroy();                                                                                          // 1668
        }                                                                                                            // 1669
      }                                                                                                              // 1670
                                                                                                                     // 1671
      delete this.modules[key];                                                                                      // 1672
    };                                                                                                               // 1673
                                                                                                                     // 1674
    this.memo = function (key, obj) {                                                                                // 1675
      if (arguments.length === 1) {                                                                                  // 1676
        return this.memos[key];                                                                                      // 1677
      }                                                                                                              // 1678
      this.memos[key] = obj;                                                                                         // 1679
    };                                                                                                               // 1680
                                                                                                                     // 1681
    this.removeMemo = function (key) {                                                                               // 1682
      if (this.memos[key] && this.memos[key].destroy) {                                                              // 1683
        this.memos[key].destroy();                                                                                   // 1684
      }                                                                                                              // 1685
                                                                                                                     // 1686
      delete this.memos[key];                                                                                        // 1687
    };                                                                                                               // 1688
                                                                                                                     // 1689
    this.createInvokeHandler = function (namespace, value) {                                                         // 1690
      return function (event) {                                                                                      // 1691
        event.preventDefault();                                                                                      // 1692
        self.invoke(namespace, value || $(event.target).closest('[data-value]').data('value'));                      // 1693
      };                                                                                                             // 1694
    };                                                                                                               // 1695
                                                                                                                     // 1696
    this.invoke = function () {                                                                                      // 1697
      var namespace = list.head(arguments);                                                                          // 1698
      var args = list.tail(list.from(arguments));                                                                    // 1699
                                                                                                                     // 1700
      var splits = namespace.split('.');                                                                             // 1701
      var hasSeparator = splits.length > 1;                                                                          // 1702
      var moduleName = hasSeparator && list.head(splits);                                                            // 1703
      var methodName = hasSeparator ? list.last(splits) : list.head(splits);                                         // 1704
                                                                                                                     // 1705
      var module = this.modules[moduleName || 'editor'];                                                             // 1706
      if (!moduleName && this[methodName]) {                                                                         // 1707
        return this[methodName].apply(this, args);                                                                   // 1708
      } else if (module && module[methodName] && module.shouldInitialize()) {                                        // 1709
        return module[methodName].apply(module, args);                                                               // 1710
      }                                                                                                              // 1711
    };                                                                                                               // 1712
                                                                                                                     // 1713
    return this.initialize();                                                                                        // 1714
  };                                                                                                                 // 1715
                                                                                                                     // 1716
  $.fn.extend({                                                                                                      // 1717
    /**                                                                                                              // 1718
     * Summernote API                                                                                                // 1719
     *                                                                                                               // 1720
     * @param {Object|String}                                                                                        // 1721
     * @return {this}                                                                                                // 1722
     */                                                                                                              // 1723
    summernote: function () {                                                                                        // 1724
      var type = $.type(list.head(arguments));                                                                       // 1725
      var isExternalAPICalled = type === 'string';                                                                   // 1726
      var hasInitOptions = type === 'object';                                                                        // 1727
                                                                                                                     // 1728
      var options = hasInitOptions ? list.head(arguments) : {};                                                      // 1729
                                                                                                                     // 1730
      options = $.extend({}, $.summernote.options, options);                                                         // 1731
      options.langInfo = $.extend(true, {}, $.summernote.lang['en-US'], $.summernote.lang[options.lang]);            // 1732
                                                                                                                     // 1733
      this.each(function (idx, note) {                                                                               // 1734
        var $note = $(note);                                                                                         // 1735
        if (!$note.data('summernote')) {                                                                             // 1736
          var context = new Context($note, options);                                                                 // 1737
          $note.data('summernote', context);                                                                         // 1738
          $note.data('summernote').triggerEvent('init', context.layoutInfo);                                         // 1739
        }                                                                                                            // 1740
      });                                                                                                            // 1741
                                                                                                                     // 1742
      var $note = this.first();                                                                                      // 1743
      if ($note.length) {                                                                                            // 1744
        var context = $note.data('summernote');                                                                      // 1745
        if (isExternalAPICalled) {                                                                                   // 1746
          return context.invoke.apply(context, list.from(arguments));                                                // 1747
        } else if (options.focus) {                                                                                  // 1748
          context.invoke('editor.focus');                                                                            // 1749
        }                                                                                                            // 1750
      }                                                                                                              // 1751
                                                                                                                     // 1752
      return this;                                                                                                   // 1753
    }                                                                                                                // 1754
  });                                                                                                                // 1755
                                                                                                                     // 1756
                                                                                                                     // 1757
  var Renderer = function (markup, children, options, callback) {                                                    // 1758
    this.render = function ($parent) {                                                                               // 1759
      var $node = $(markup);                                                                                         // 1760
                                                                                                                     // 1761
      if (options && options.contents) {                                                                             // 1762
        $node.html(options.contents);                                                                                // 1763
      }                                                                                                              // 1764
                                                                                                                     // 1765
      if (options && options.className) {                                                                            // 1766
        $node.addClass(options.className);                                                                           // 1767
      }                                                                                                              // 1768
                                                                                                                     // 1769
      if (options && options.data) {                                                                                 // 1770
        $.each(options.data, function (k, v) {                                                                       // 1771
          $node.attr('data-' + k, v);                                                                                // 1772
        });                                                                                                          // 1773
      }                                                                                                              // 1774
                                                                                                                     // 1775
      if (options && options.click) {                                                                                // 1776
        $node.on('click', options.click);                                                                            // 1777
      }                                                                                                              // 1778
                                                                                                                     // 1779
      if (children) {                                                                                                // 1780
        var $container = $node.find('.note-children-container');                                                     // 1781
        children.forEach(function (child) {                                                                          // 1782
          child.render($container.length ? $container : $node);                                                      // 1783
        });                                                                                                          // 1784
      }                                                                                                              // 1785
                                                                                                                     // 1786
      if (callback) {                                                                                                // 1787
        callback($node, options);                                                                                    // 1788
      }                                                                                                              // 1789
                                                                                                                     // 1790
      if (options && options.callback) {                                                                             // 1791
        options.callback($node);                                                                                     // 1792
      }                                                                                                              // 1793
                                                                                                                     // 1794
      if ($parent) {                                                                                                 // 1795
        $parent.append($node);                                                                                       // 1796
      }                                                                                                              // 1797
                                                                                                                     // 1798
      return $node;                                                                                                  // 1799
    };                                                                                                               // 1800
  };                                                                                                                 // 1801
                                                                                                                     // 1802
  var renderer = {                                                                                                   // 1803
    create: function (markup, callback) {                                                                            // 1804
      return function () {                                                                                           // 1805
        var children = $.isArray(arguments[0]) ? arguments[0] : [];                                                  // 1806
        var options = typeof arguments[1] === 'object' ? arguments[1] : arguments[0];                                // 1807
        if (options && options.children) {                                                                           // 1808
          children = options.children;                                                                               // 1809
        }                                                                                                            // 1810
        return new Renderer(markup, children, options, callback);                                                    // 1811
      };                                                                                                             // 1812
    }                                                                                                                // 1813
  };                                                                                                                 // 1814
                                                                                                                     // 1815
  var editor = renderer.create('<div class="note-editor note-frame panel panel-default"/>');                         // 1816
  var toolbar = renderer.create('<div class="note-toolbar panel-heading"/>');                                        // 1817
  var editingArea = renderer.create('<div class="note-editing-area"/>');                                             // 1818
  var codable = renderer.create('<textarea class="note-codable"/>');                                                 // 1819
  var editable = renderer.create('<div class="note-editable panel-body" contentEditable="true"/>');                  // 1820
  var statusbar = renderer.create([                                                                                  // 1821
    '<div class="note-statusbar">',                                                                                  // 1822
    '  <div class="note-resizebar">',                                                                                // 1823
    '    <div class="note-icon-bar"/>',                                                                              // 1824
    '    <div class="note-icon-bar"/>',                                                                              // 1825
    '    <div class="note-icon-bar"/>',                                                                              // 1826
    '  </div>',                                                                                                      // 1827
    '</div>'                                                                                                         // 1828
  ].join(''));                                                                                                       // 1829
                                                                                                                     // 1830
  var airEditor = renderer.create('<div class="note-editor"/>');                                                     // 1831
  var airEditable = renderer.create('<div class="note-editable" contentEditable="true"/>');                          // 1832
                                                                                                                     // 1833
  var buttonGroup = renderer.create('<div class="note-btn-group btn-group">');                                       // 1834
  var button = renderer.create('<button type="button" class="note-btn btn btn-default btn-sm">', function ($node, options) {
    if (options && options.tooltip) {                                                                                // 1836
      $node.attr({                                                                                                   // 1837
        title: options.tooltip                                                                                       // 1838
      }).tooltip({                                                                                                   // 1839
        container: 'body',                                                                                           // 1840
        trigger: 'hover',                                                                                            // 1841
        placement: 'bottom'                                                                                          // 1842
      });                                                                                                            // 1843
    }                                                                                                                // 1844
  });                                                                                                                // 1845
                                                                                                                     // 1846
  var dropdown = renderer.create('<div class="dropdown-menu">', function ($node, options) {                          // 1847
    var markup = $.isArray(options.items) ? options.items.map(function (item) {                                      // 1848
      var value = (typeof item === 'string') ? item : (item.value || '');                                            // 1849
      var content = options.template ? options.template(item) : item;                                                // 1850
      return '<li><a href="#" data-value="' + value + '">' + content + '</a></li>';                                  // 1851
    }).join('') : options.items;                                                                                     // 1852
                                                                                                                     // 1853
    $node.html(markup);                                                                                              // 1854
  });                                                                                                                // 1855
                                                                                                                     // 1856
  var dropdownCheck = renderer.create('<div class="dropdown-menu note-check">', function ($node, options) {          // 1857
    var markup = $.isArray(options.items) ? options.items.map(function (item) {                                      // 1858
      var value = (typeof item === 'string') ? item : (item.value || '');                                            // 1859
      var content = options.template ? options.template(item) : item;                                                // 1860
      return '<li><a href="#" data-value="' + value + '">' + icon(options.checkClassName) + ' ' + content + '</a></li>';
    }).join('') : options.items;                                                                                     // 1862
    $node.html(markup);                                                                                              // 1863
  });                                                                                                                // 1864
                                                                                                                     // 1865
  var palette = renderer.create('<div class="note-color-palette"/>', function ($node, options) {                     // 1866
    var contents = [];                                                                                               // 1867
    for (var row = 0, rowSize = options.colors.length; row < rowSize; row++) {                                       // 1868
      var eventName = options.eventName;                                                                             // 1869
      var colors = options.colors[row];                                                                              // 1870
      var buttons = [];                                                                                              // 1871
      for (var col = 0, colSize = colors.length; col < colSize; col++) {                                             // 1872
        var color = colors[col];                                                                                     // 1873
        buttons.push([                                                                                               // 1874
          '<button type="button" class="note-color-btn"',                                                            // 1875
          'style="background-color:', color, '" ',                                                                   // 1876
          'data-event="', eventName, '" ',                                                                           // 1877
          'data-value="', color, '" ',                                                                               // 1878
          'title="', color, '" ',                                                                                    // 1879
          'data-toggle="button" tabindex="-1"></button>'                                                             // 1880
        ].join(''));                                                                                                 // 1881
      }                                                                                                              // 1882
      contents.push('<div class="note-color-row">' + buttons.join('') + '</div>');                                   // 1883
    }                                                                                                                // 1884
    $node.html(contents.join(''));                                                                                   // 1885
                                                                                                                     // 1886
    $node.find('.note-color-btn').tooltip({                                                                          // 1887
      container: 'body',                                                                                             // 1888
      trigger: 'hover',                                                                                              // 1889
      placement: 'bottom'                                                                                            // 1890
    });                                                                                                              // 1891
  });                                                                                                                // 1892
                                                                                                                     // 1893
  var dialog = renderer.create('<div class="modal" aria-hidden="false" tabindex="-1"/>', function ($node, options) {
    if (options.fade) {                                                                                              // 1895
      $node.addClass('fade');                                                                                        // 1896
    }                                                                                                                // 1897
    $node.html([                                                                                                     // 1898
      '<div class="modal-dialog">',                                                                                  // 1899
      '  <div class="modal-content">',                                                                               // 1900
      (options.title ?                                                                                               // 1901
      '    <div class="modal-header">' +                                                                             // 1902
      '      <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
      '      <h4 class="modal-title">' + options.title + '</h4>' +                                                   // 1904
      '    </div>' : ''                                                                                              // 1905
      ),                                                                                                             // 1906
      '    <div class="modal-body">' + options.body + '</div>',                                                      // 1907
      (options.footer ?                                                                                              // 1908
      '    <div class="modal-footer">' + options.footer + '</div>' : ''                                              // 1909
      ),                                                                                                             // 1910
      '  </div>',                                                                                                    // 1911
      '</div>'                                                                                                       // 1912
    ].join(''));                                                                                                     // 1913
  });                                                                                                                // 1914
                                                                                                                     // 1915
  var popover = renderer.create([                                                                                    // 1916
    '<div class="note-popover popover in">',                                                                         // 1917
    '  <div class="arrow"/>',                                                                                        // 1918
    '  <div class="popover-content note-children-container"/>',                                                      // 1919
    '</div>'                                                                                                         // 1920
  ].join(''), function ($node, options) {                                                                            // 1921
    var direction = typeof options.direction !== 'undefined' ? options.direction : 'bottom';                         // 1922
                                                                                                                     // 1923
    $node.addClass(direction);                                                                                       // 1924
                                                                                                                     // 1925
    if (options.hideArrow) {                                                                                         // 1926
      $node.find('.arrow').hide();                                                                                   // 1927
    }                                                                                                                // 1928
  });                                                                                                                // 1929
                                                                                                                     // 1930
  var icon = function (iconClassName, tagName) {                                                                     // 1931
    tagName = tagName || 'i';                                                                                        // 1932
    return '<' + tagName + ' class="' + iconClassName + '"/>';                                                       // 1933
  };                                                                                                                 // 1934
                                                                                                                     // 1935
  var ui = {                                                                                                         // 1936
    editor: editor,                                                                                                  // 1937
    toolbar: toolbar,                                                                                                // 1938
    editingArea: editingArea,                                                                                        // 1939
    codable: codable,                                                                                                // 1940
    editable: editable,                                                                                              // 1941
    statusbar: statusbar,                                                                                            // 1942
    airEditor: airEditor,                                                                                            // 1943
    airEditable: airEditable,                                                                                        // 1944
    buttonGroup: buttonGroup,                                                                                        // 1945
    button: button,                                                                                                  // 1946
    dropdown: dropdown,                                                                                              // 1947
    dropdownCheck: dropdownCheck,                                                                                    // 1948
    palette: palette,                                                                                                // 1949
    dialog: dialog,                                                                                                  // 1950
    popover: popover,                                                                                                // 1951
    icon: icon,                                                                                                      // 1952
                                                                                                                     // 1953
    toggleBtn: function ($btn, isEnable) {                                                                           // 1954
      $btn.toggleClass('disabled', !isEnable);                                                                       // 1955
      $btn.attr('disabled', !isEnable);                                                                              // 1956
    },                                                                                                               // 1957
                                                                                                                     // 1958
    toggleBtnActive: function ($btn, isActive) {                                                                     // 1959
      $btn.toggleClass('active', isActive);                                                                          // 1960
    },                                                                                                               // 1961
                                                                                                                     // 1962
    onDialogShown: function ($dialog, handler) {                                                                     // 1963
      $dialog.one('shown.bs.modal', handler);                                                                        // 1964
    },                                                                                                               // 1965
                                                                                                                     // 1966
    onDialogHidden: function ($dialog, handler) {                                                                    // 1967
      $dialog.one('hidden.bs.modal', handler);                                                                       // 1968
    },                                                                                                               // 1969
                                                                                                                     // 1970
    showDialog: function ($dialog) {                                                                                 // 1971
      $dialog.modal('show');                                                                                         // 1972
    },                                                                                                               // 1973
                                                                                                                     // 1974
    hideDialog: function ($dialog) {                                                                                 // 1975
      $dialog.modal('hide');                                                                                         // 1976
    },                                                                                                               // 1977
                                                                                                                     // 1978
    createLayout: function ($note, options) {                                                                        // 1979
      var $editor = (options.airMode ? ui.airEditor([                                                                // 1980
        ui.editingArea([                                                                                             // 1981
          ui.airEditable()                                                                                           // 1982
        ])                                                                                                           // 1983
      ]) : ui.editor([                                                                                               // 1984
        ui.toolbar(),                                                                                                // 1985
        ui.editingArea([                                                                                             // 1986
          ui.codable(),                                                                                              // 1987
          ui.editable()                                                                                              // 1988
        ]),                                                                                                          // 1989
        ui.statusbar()                                                                                               // 1990
      ])).render();                                                                                                  // 1991
                                                                                                                     // 1992
      $editor.insertAfter($note);                                                                                    // 1993
                                                                                                                     // 1994
      return {                                                                                                       // 1995
        note: $note,                                                                                                 // 1996
        editor: $editor,                                                                                             // 1997
        toolbar: $editor.find('.note-toolbar'),                                                                      // 1998
        editingArea: $editor.find('.note-editing-area'),                                                             // 1999
        editable: $editor.find('.note-editable'),                                                                    // 2000
        codable: $editor.find('.note-codable'),                                                                      // 2001
        statusbar: $editor.find('.note-statusbar')                                                                   // 2002
      };                                                                                                             // 2003
    },                                                                                                               // 2004
                                                                                                                     // 2005
    removeLayout: function ($note, layoutInfo) {                                                                     // 2006
      $note.html(layoutInfo.editable.html());                                                                        // 2007
      layoutInfo.editor.remove();                                                                                    // 2008
      $note.show();                                                                                                  // 2009
    }                                                                                                                // 2010
  };                                                                                                                 // 2011
                                                                                                                     // 2012
  $.summernote = $.summernote || {                                                                                   // 2013
    lang: {}                                                                                                         // 2014
  };                                                                                                                 // 2015
                                                                                                                     // 2016
  $.extend($.summernote.lang, {                                                                                      // 2017
    'en-US': {                                                                                                       // 2018
      font: {                                                                                                        // 2019
        bold: 'Bold',                                                                                                // 2020
        italic: 'Italic',                                                                                            // 2021
        underline: 'Underline',                                                                                      // 2022
        clear: 'Remove Font Style',                                                                                  // 2023
        height: 'Line Height',                                                                                       // 2024
        name: 'Font Family',                                                                                         // 2025
        strikethrough: 'Strikethrough',                                                                              // 2026
        subscript: 'Subscript',                                                                                      // 2027
        superscript: 'Superscript',                                                                                  // 2028
        size: 'Font Size'                                                                                            // 2029
      },                                                                                                             // 2030
      image: {                                                                                                       // 2031
        image: 'Picture',                                                                                            // 2032
        insert: 'Insert Image',                                                                                      // 2033
        resizeFull: 'Resize Full',                                                                                   // 2034
        resizeHalf: 'Resize Half',                                                                                   // 2035
        resizeQuarter: 'Resize Quarter',                                                                             // 2036
        floatLeft: 'Float Left',                                                                                     // 2037
        floatRight: 'Float Right',                                                                                   // 2038
        floatNone: 'Float None',                                                                                     // 2039
        shapeRounded: 'Shape: Rounded',                                                                              // 2040
        shapeCircle: 'Shape: Circle',                                                                                // 2041
        shapeThumbnail: 'Shape: Thumbnail',                                                                          // 2042
        shapeNone: 'Shape: None',                                                                                    // 2043
        dragImageHere: 'Drag image or text here',                                                                    // 2044
        dropImage: 'Drop image or Text',                                                                             // 2045
        selectFromFiles: 'Select from files',                                                                        // 2046
        maximumFileSize: 'Maximum file size',                                                                        // 2047
        maximumFileSizeError: 'Maximum file size exceeded.',                                                         // 2048
        url: 'Image URL',                                                                                            // 2049
        remove: 'Remove Image'                                                                                       // 2050
      },                                                                                                             // 2051
      video: {                                                                                                       // 2052
        video: 'Video',                                                                                              // 2053
        videoLink: 'Video Link',                                                                                     // 2054
        insert: 'Insert Video',                                                                                      // 2055
        url: 'Video URL?',                                                                                           // 2056
        providers: '(YouTube, Vimeo, Vine, Instagram, DailyMotion or Youku)'                                         // 2057
      },                                                                                                             // 2058
      link: {                                                                                                        // 2059
        link: 'Link',                                                                                                // 2060
        insert: 'Insert Link',                                                                                       // 2061
        unlink: 'Unlink',                                                                                            // 2062
        edit: 'Edit',                                                                                                // 2063
        textToDisplay: 'Text to display',                                                                            // 2064
        url: 'To what URL should this link go?',                                                                     // 2065
        openInNewWindow: 'Open in new window'                                                                        // 2066
      },                                                                                                             // 2067
      table: {                                                                                                       // 2068
        table: 'Table'                                                                                               // 2069
      },                                                                                                             // 2070
      hr: {                                                                                                          // 2071
        insert: 'Insert Horizontal Rule'                                                                             // 2072
      },                                                                                                             // 2073
      style: {                                                                                                       // 2074
        style: 'Style',                                                                                              // 2075
        normal: 'Normal',                                                                                            // 2076
        blockquote: 'Quote',                                                                                         // 2077
        pre: 'Code',                                                                                                 // 2078
        h1: 'Header 1',                                                                                              // 2079
        h2: 'Header 2',                                                                                              // 2080
        h3: 'Header 3',                                                                                              // 2081
        h4: 'Header 4',                                                                                              // 2082
        h5: 'Header 5',                                                                                              // 2083
        h6: 'Header 6'                                                                                               // 2084
      },                                                                                                             // 2085
      lists: {                                                                                                       // 2086
        unordered: 'Unordered list',                                                                                 // 2087
        ordered: 'Ordered list'                                                                                      // 2088
      },                                                                                                             // 2089
      options: {                                                                                                     // 2090
        help: 'Help',                                                                                                // 2091
        fullscreen: 'Full Screen',                                                                                   // 2092
        codeview: 'Code View'                                                                                        // 2093
      },                                                                                                             // 2094
      paragraph: {                                                                                                   // 2095
        paragraph: 'Paragraph',                                                                                      // 2096
        outdent: 'Outdent',                                                                                          // 2097
        indent: 'Indent',                                                                                            // 2098
        left: 'Align left',                                                                                          // 2099
        center: 'Align center',                                                                                      // 2100
        right: 'Align right',                                                                                        // 2101
        justify: 'Justify full'                                                                                      // 2102
      },                                                                                                             // 2103
      color: {                                                                                                       // 2104
        recent: 'Recent Color',                                                                                      // 2105
        more: 'More Color',                                                                                          // 2106
        background: 'Background Color',                                                                              // 2107
        foreground: 'Foreground Color',                                                                              // 2108
        transparent: 'Transparent',                                                                                  // 2109
        setTransparent: 'Set transparent',                                                                           // 2110
        reset: 'Reset',                                                                                              // 2111
        resetToDefault: 'Reset to default'                                                                           // 2112
      },                                                                                                             // 2113
      shortcut: {                                                                                                    // 2114
        shortcuts: 'Keyboard shortcuts',                                                                             // 2115
        close: 'Close',                                                                                              // 2116
        textFormatting: 'Text formatting',                                                                           // 2117
        action: 'Action',                                                                                            // 2118
        paragraphFormatting: 'Paragraph formatting',                                                                 // 2119
        documentStyle: 'Document Style',                                                                             // 2120
        extraKeys: 'Extra keys'                                                                                      // 2121
      },                                                                                                             // 2122
      help: {                                                                                                        // 2123
        'insertParagraph': 'Insert Paragraph',                                                                       // 2124
        'undo': 'Undoes the last command',                                                                           // 2125
        'redo': 'Redoes the last command',                                                                           // 2126
        'tab': 'Tab',                                                                                                // 2127
        'untab': 'Untab',                                                                                            // 2128
        'bold': 'Set a bold style',                                                                                  // 2129
        'italic': 'Set a italic style',                                                                              // 2130
        'underline': 'Set a underline style',                                                                        // 2131
        'strikethrough': 'Set a strikethrough style',                                                                // 2132
        'removeFormat': 'Clean a style',                                                                             // 2133
        'justifyLeft': 'Set left align',                                                                             // 2134
        'justifyCenter': 'Set center align',                                                                         // 2135
        'justifyRight': 'Set right align',                                                                           // 2136
        'justifyFull': 'Set full align',                                                                             // 2137
        'insertUnorderedList': 'Toggle unordered list',                                                              // 2138
        'insertOrderedList': 'Toggle ordered list',                                                                  // 2139
        'outdent': 'Outdent on current paragraph',                                                                   // 2140
        'indent': 'Indent on current paragraph',                                                                     // 2141
        'formatPara': 'Change current block\'s format as a paragraph(P tag)',                                        // 2142
        'formatH1': 'Change current block\'s format as H1',                                                          // 2143
        'formatH2': 'Change current block\'s format as H2',                                                          // 2144
        'formatH3': 'Change current block\'s format as H3',                                                          // 2145
        'formatH4': 'Change current block\'s format as H4',                                                          // 2146
        'formatH5': 'Change current block\'s format as H5',                                                          // 2147
        'formatH6': 'Change current block\'s format as H6',                                                          // 2148
        'insertHorizontalRule': 'Insert horizontal rule',                                                            // 2149
        'linkDialog.show': 'Show Link Dialog'                                                                        // 2150
      },                                                                                                             // 2151
      history: {                                                                                                     // 2152
        undo: 'Undo',                                                                                                // 2153
        redo: 'Redo'                                                                                                 // 2154
      },                                                                                                             // 2155
      specialChar: {                                                                                                 // 2156
        specialChar: 'SPECIAL CHARACTERS',                                                                           // 2157
        select: 'Select Special characters'                                                                          // 2158
      }                                                                                                              // 2159
    }                                                                                                                // 2160
  });                                                                                                                // 2161
                                                                                                                     // 2162
                                                                                                                     // 2163
  /**                                                                                                                // 2164
   * @class core.key                                                                                                 // 2165
   *                                                                                                                 // 2166
   * Object for keycodes.                                                                                            // 2167
   *                                                                                                                 // 2168
   * @singleton                                                                                                      // 2169
   * @alternateClassName key                                                                                         // 2170
   */                                                                                                                // 2171
  var key = (function () {                                                                                           // 2172
    var keyMap = {                                                                                                   // 2173
      'BACKSPACE': 8,                                                                                                // 2174
      'TAB': 9,                                                                                                      // 2175
      'ENTER': 13,                                                                                                   // 2176
      'SPACE': 32,                                                                                                   // 2177
                                                                                                                     // 2178
      // Arrow                                                                                                       // 2179
      'LEFT': 37,                                                                                                    // 2180
      'UP': 38,                                                                                                      // 2181
      'RIGHT': 39,                                                                                                   // 2182
      'DOWN': 40,                                                                                                    // 2183
                                                                                                                     // 2184
      // Number: 0-9                                                                                                 // 2185
      'NUM0': 48,                                                                                                    // 2186
      'NUM1': 49,                                                                                                    // 2187
      'NUM2': 50,                                                                                                    // 2188
      'NUM3': 51,                                                                                                    // 2189
      'NUM4': 52,                                                                                                    // 2190
      'NUM5': 53,                                                                                                    // 2191
      'NUM6': 54,                                                                                                    // 2192
      'NUM7': 55,                                                                                                    // 2193
      'NUM8': 56,                                                                                                    // 2194
                                                                                                                     // 2195
      // Alphabet: a-z                                                                                               // 2196
      'B': 66,                                                                                                       // 2197
      'E': 69,                                                                                                       // 2198
      'I': 73,                                                                                                       // 2199
      'J': 74,                                                                                                       // 2200
      'K': 75,                                                                                                       // 2201
      'L': 76,                                                                                                       // 2202
      'R': 82,                                                                                                       // 2203
      'S': 83,                                                                                                       // 2204
      'U': 85,                                                                                                       // 2205
      'V': 86,                                                                                                       // 2206
      'Y': 89,                                                                                                       // 2207
      'Z': 90,                                                                                                       // 2208
                                                                                                                     // 2209
      'SLASH': 191,                                                                                                  // 2210
      'LEFTBRACKET': 219,                                                                                            // 2211
      'BACKSLASH': 220,                                                                                              // 2212
      'RIGHTBRACKET': 221                                                                                            // 2213
    };                                                                                                               // 2214
                                                                                                                     // 2215
    return {                                                                                                         // 2216
      /**                                                                                                            // 2217
       * @method isEdit                                                                                              // 2218
       *                                                                                                             // 2219
       * @param {Number} keyCode                                                                                     // 2220
       * @return {Boolean}                                                                                           // 2221
       */                                                                                                            // 2222
      isEdit: function (keyCode) {                                                                                   // 2223
        return list.contains([                                                                                       // 2224
          keyMap.BACKSPACE,                                                                                          // 2225
          keyMap.TAB,                                                                                                // 2226
          keyMap.ENTER,                                                                                              // 2227
          keyMap.SPACE                                                                                               // 2228
        ], keyCode);                                                                                                 // 2229
      },                                                                                                             // 2230
      /**                                                                                                            // 2231
       * @method isMove                                                                                              // 2232
       *                                                                                                             // 2233
       * @param {Number} keyCode                                                                                     // 2234
       * @return {Boolean}                                                                                           // 2235
       */                                                                                                            // 2236
      isMove: function (keyCode) {                                                                                   // 2237
        return list.contains([                                                                                       // 2238
          keyMap.LEFT,                                                                                               // 2239
          keyMap.UP,                                                                                                 // 2240
          keyMap.RIGHT,                                                                                              // 2241
          keyMap.DOWN                                                                                                // 2242
        ], keyCode);                                                                                                 // 2243
      },                                                                                                             // 2244
      /**                                                                                                            // 2245
       * @property {Object} nameFromCode                                                                             // 2246
       * @property {String} nameFromCode.8 "BACKSPACE"                                                               // 2247
       */                                                                                                            // 2248
      nameFromCode: func.invertObject(keyMap),                                                                       // 2249
      code: keyMap                                                                                                   // 2250
    };                                                                                                               // 2251
  })();                                                                                                              // 2252
                                                                                                                     // 2253
  var range = (function () {                                                                                         // 2254
                                                                                                                     // 2255
    /**                                                                                                              // 2256
     * return boundaryPoint from TextRange, inspired by Andy Na's HuskyRange.js                                      // 2257
     *                                                                                                               // 2258
     * @param {TextRange} textRange                                                                                  // 2259
     * @param {Boolean} isStart                                                                                      // 2260
     * @return {BoundaryPoint}                                                                                       // 2261
     *                                                                                                               // 2262
     * @see http://msdn.microsoft.com/en-us/library/ie/ms535872(v=vs.85).aspx                                        // 2263
     */                                                                                                              // 2264
    var textRangeToPoint = function (textRange, isStart) {                                                           // 2265
      var container = textRange.parentElement(), offset;                                                             // 2266
                                                                                                                     // 2267
      var tester = document.body.createTextRange(), prevContainer;                                                   // 2268
      var childNodes = list.from(container.childNodes);                                                              // 2269
      for (offset = 0; offset < childNodes.length; offset++) {                                                       // 2270
        if (dom.isText(childNodes[offset])) {                                                                        // 2271
          continue;                                                                                                  // 2272
        }                                                                                                            // 2273
        tester.moveToElementText(childNodes[offset]);                                                                // 2274
        if (tester.compareEndPoints('StartToStart', textRange) >= 0) {                                               // 2275
          break;                                                                                                     // 2276
        }                                                                                                            // 2277
        prevContainer = childNodes[offset];                                                                          // 2278
      }                                                                                                              // 2279
                                                                                                                     // 2280
      if (offset !== 0 && dom.isText(childNodes[offset - 1])) {                                                      // 2281
        var textRangeStart = document.body.createTextRange(), curTextNode = null;                                    // 2282
        textRangeStart.moveToElementText(prevContainer || container);                                                // 2283
        textRangeStart.collapse(!prevContainer);                                                                     // 2284
        curTextNode = prevContainer ? prevContainer.nextSibling : container.firstChild;                              // 2285
                                                                                                                     // 2286
        var pointTester = textRange.duplicate();                                                                     // 2287
        pointTester.setEndPoint('StartToStart', textRangeStart);                                                     // 2288
        var textCount = pointTester.text.replace(/[\r\n]/g, '').length;                                              // 2289
                                                                                                                     // 2290
        while (textCount > curTextNode.nodeValue.length && curTextNode.nextSibling) {                                // 2291
          textCount -= curTextNode.nodeValue.length;                                                                 // 2292
          curTextNode = curTextNode.nextSibling;                                                                     // 2293
        }                                                                                                            // 2294
                                                                                                                     // 2295
        /* jshint ignore:start */                                                                                    // 2296
        var dummy = curTextNode.nodeValue; // enforce IE to re-reference curTextNode, hack                           // 2297
        /* jshint ignore:end */                                                                                      // 2298
                                                                                                                     // 2299
        if (isStart && curTextNode.nextSibling && dom.isText(curTextNode.nextSibling) &&                             // 2300
            textCount === curTextNode.nodeValue.length) {                                                            // 2301
          textCount -= curTextNode.nodeValue.length;                                                                 // 2302
          curTextNode = curTextNode.nextSibling;                                                                     // 2303
        }                                                                                                            // 2304
                                                                                                                     // 2305
        container = curTextNode;                                                                                     // 2306
        offset = textCount;                                                                                          // 2307
      }                                                                                                              // 2308
                                                                                                                     // 2309
      return {                                                                                                       // 2310
        cont: container,                                                                                             // 2311
        offset: offset                                                                                               // 2312
      };                                                                                                             // 2313
    };                                                                                                               // 2314
                                                                                                                     // 2315
    /**                                                                                                              // 2316
     * return TextRange from boundary point (inspired by google closure-library)                                     // 2317
     * @param {BoundaryPoint} point                                                                                  // 2318
     * @return {TextRange}                                                                                           // 2319
     */                                                                                                              // 2320
    var pointToTextRange = function (point) {                                                                        // 2321
      var textRangeInfo = function (container, offset) {                                                             // 2322
        var node, isCollapseToStart;                                                                                 // 2323
                                                                                                                     // 2324
        if (dom.isText(container)) {                                                                                 // 2325
          var prevTextNodes = dom.listPrev(container, func.not(dom.isText));                                         // 2326
          var prevContainer = list.last(prevTextNodes).previousSibling;                                              // 2327
          node =  prevContainer || container.parentNode;                                                             // 2328
          offset += list.sum(list.tail(prevTextNodes), dom.nodeLength);                                              // 2329
          isCollapseToStart = !prevContainer;                                                                        // 2330
        } else {                                                                                                     // 2331
          node = container.childNodes[offset] || container;                                                          // 2332
          if (dom.isText(node)) {                                                                                    // 2333
            return textRangeInfo(node, 0);                                                                           // 2334
          }                                                                                                          // 2335
                                                                                                                     // 2336
          offset = 0;                                                                                                // 2337
          isCollapseToStart = false;                                                                                 // 2338
        }                                                                                                            // 2339
                                                                                                                     // 2340
        return {                                                                                                     // 2341
          node: node,                                                                                                // 2342
          collapseToStart: isCollapseToStart,                                                                        // 2343
          offset: offset                                                                                             // 2344
        };                                                                                                           // 2345
      };                                                                                                             // 2346
                                                                                                                     // 2347
      var textRange = document.body.createTextRange();                                                               // 2348
      var info = textRangeInfo(point.node, point.offset);                                                            // 2349
                                                                                                                     // 2350
      textRange.moveToElementText(info.node);                                                                        // 2351
      textRange.collapse(info.collapseToStart);                                                                      // 2352
      textRange.moveStart('character', info.offset);                                                                 // 2353
      return textRange;                                                                                              // 2354
    };                                                                                                               // 2355
                                                                                                                     // 2356
    /**                                                                                                              // 2357
     * Wrapped Range                                                                                                 // 2358
     *                                                                                                               // 2359
     * @constructor                                                                                                  // 2360
     * @param {Node} sc - start container                                                                            // 2361
     * @param {Number} so - start offset                                                                             // 2362
     * @param {Node} ec - end container                                                                              // 2363
     * @param {Number} eo - end offset                                                                               // 2364
     */                                                                                                              // 2365
    var WrappedRange = function (sc, so, ec, eo) {                                                                   // 2366
      this.sc = sc;                                                                                                  // 2367
      this.so = so;                                                                                                  // 2368
      this.ec = ec;                                                                                                  // 2369
      this.eo = eo;                                                                                                  // 2370
                                                                                                                     // 2371
      // nativeRange: get nativeRange from sc, so, ec, eo                                                            // 2372
      var nativeRange = function () {                                                                                // 2373
        if (agent.isW3CRangeSupport) {                                                                               // 2374
          var w3cRange = document.createRange();                                                                     // 2375
          w3cRange.setStart(sc, so);                                                                                 // 2376
          w3cRange.setEnd(ec, eo);                                                                                   // 2377
                                                                                                                     // 2378
          return w3cRange;                                                                                           // 2379
        } else {                                                                                                     // 2380
          var textRange = pointToTextRange({                                                                         // 2381
            node: sc,                                                                                                // 2382
            offset: so                                                                                               // 2383
          });                                                                                                        // 2384
                                                                                                                     // 2385
          textRange.setEndPoint('EndToEnd', pointToTextRange({                                                       // 2386
            node: ec,                                                                                                // 2387
            offset: eo                                                                                               // 2388
          }));                                                                                                       // 2389
                                                                                                                     // 2390
          return textRange;                                                                                          // 2391
        }                                                                                                            // 2392
      };                                                                                                             // 2393
                                                                                                                     // 2394
      this.getPoints = function () {                                                                                 // 2395
        return {                                                                                                     // 2396
          sc: sc,                                                                                                    // 2397
          so: so,                                                                                                    // 2398
          ec: ec,                                                                                                    // 2399
          eo: eo                                                                                                     // 2400
        };                                                                                                           // 2401
      };                                                                                                             // 2402
                                                                                                                     // 2403
      this.getStartPoint = function () {                                                                             // 2404
        return {                                                                                                     // 2405
          node: sc,                                                                                                  // 2406
          offset: so                                                                                                 // 2407
        };                                                                                                           // 2408
      };                                                                                                             // 2409
                                                                                                                     // 2410
      this.getEndPoint = function () {                                                                               // 2411
        return {                                                                                                     // 2412
          node: ec,                                                                                                  // 2413
          offset: eo                                                                                                 // 2414
        };                                                                                                           // 2415
      };                                                                                                             // 2416
                                                                                                                     // 2417
      /**                                                                                                            // 2418
       * select update visible range                                                                                 // 2419
       */                                                                                                            // 2420
      this.select = function () {                                                                                    // 2421
        var nativeRng = nativeRange();                                                                               // 2422
        if (agent.isW3CRangeSupport) {                                                                               // 2423
          var selection = document.getSelection();                                                                   // 2424
          if (selection.rangeCount > 0) {                                                                            // 2425
            selection.removeAllRanges();                                                                             // 2426
          }                                                                                                          // 2427
          selection.addRange(nativeRng);                                                                             // 2428
        } else {                                                                                                     // 2429
          nativeRng.select();                                                                                        // 2430
        }                                                                                                            // 2431
                                                                                                                     // 2432
        return this;                                                                                                 // 2433
      };                                                                                                             // 2434
                                                                                                                     // 2435
      /**                                                                                                            // 2436
       * Moves the scrollbar to start container(sc) of current range                                                 // 2437
       *                                                                                                             // 2438
       * @return {WrappedRange}                                                                                      // 2439
       */                                                                                                            // 2440
      this.scrollIntoView = function (container) {                                                                   // 2441
        var height = $(container).height();                                                                          // 2442
        if (container.scrollTop + height < this.sc.offsetTop) {                                                      // 2443
          container.scrollTop += Math.abs(container.scrollTop + height - this.sc.offsetTop);                         // 2444
        }                                                                                                            // 2445
                                                                                                                     // 2446
        return this;                                                                                                 // 2447
      };                                                                                                             // 2448
                                                                                                                     // 2449
      /**                                                                                                            // 2450
       * @return {WrappedRange}                                                                                      // 2451
       */                                                                                                            // 2452
      this.normalize = function () {                                                                                 // 2453
                                                                                                                     // 2454
        /**                                                                                                          // 2455
         * @param {BoundaryPoint} point                                                                              // 2456
         * @param {Boolean} isLeftToRight                                                                            // 2457
         * @return {BoundaryPoint}                                                                                   // 2458
         */                                                                                                          // 2459
        var getVisiblePoint = function (point, isLeftToRight) {                                                      // 2460
          if ((dom.isVisiblePoint(point) && !dom.isEdgePoint(point)) ||                                              // 2461
              (dom.isVisiblePoint(point) && dom.isRightEdgePoint(point) && !isLeftToRight) ||                        // 2462
              (dom.isVisiblePoint(point) && dom.isLeftEdgePoint(point) && isLeftToRight) ||                          // 2463
              (dom.isVisiblePoint(point) && dom.isBlock(point.node) && dom.isEmpty(point.node))) {                   // 2464
            return point;                                                                                            // 2465
          }                                                                                                          // 2466
                                                                                                                     // 2467
          // point on block's edge                                                                                   // 2468
          var block = dom.ancestor(point.node, dom.isBlock);                                                         // 2469
          if (((dom.isLeftEdgePointOf(point, block) || dom.isVoid(dom.prevPoint(point).node)) && !isLeftToRight) ||  // 2470
              ((dom.isRightEdgePointOf(point, block) || dom.isVoid(dom.nextPoint(point).node)) && isLeftToRight)) {  // 2471
                                                                                                                     // 2472
            // returns point already on visible point                                                                // 2473
            if (dom.isVisiblePoint(point)) {                                                                         // 2474
              return point;                                                                                          // 2475
            }                                                                                                        // 2476
            // reverse direction                                                                                     // 2477
            isLeftToRight = !isLeftToRight;                                                                          // 2478
          }                                                                                                          // 2479
                                                                                                                     // 2480
          var nextPoint = isLeftToRight ? dom.nextPointUntil(dom.nextPoint(point), dom.isVisiblePoint) :             // 2481
                                          dom.prevPointUntil(dom.prevPoint(point), dom.isVisiblePoint);              // 2482
          return nextPoint || point;                                                                                 // 2483
        };                                                                                                           // 2484
                                                                                                                     // 2485
        var endPoint = getVisiblePoint(this.getEndPoint(), false);                                                   // 2486
        var startPoint = this.isCollapsed() ? endPoint : getVisiblePoint(this.getStartPoint(), true);                // 2487
                                                                                                                     // 2488
        return new WrappedRange(                                                                                     // 2489
          startPoint.node,                                                                                           // 2490
          startPoint.offset,                                                                                         // 2491
          endPoint.node,                                                                                             // 2492
          endPoint.offset                                                                                            // 2493
        );                                                                                                           // 2494
      };                                                                                                             // 2495
                                                                                                                     // 2496
      /**                                                                                                            // 2497
       * returns matched nodes on range                                                                              // 2498
       *                                                                                                             // 2499
       * @param {Function} [pred] - predicate function                                                               // 2500
       * @param {Object} [options]                                                                                   // 2501
       * @param {Boolean} [options.includeAncestor]                                                                  // 2502
       * @param {Boolean} [options.fullyContains]                                                                    // 2503
       * @return {Node[]}                                                                                            // 2504
       */                                                                                                            // 2505
      this.nodes = function (pred, options) {                                                                        // 2506
        pred = pred || func.ok;                                                                                      // 2507
                                                                                                                     // 2508
        var includeAncestor = options && options.includeAncestor;                                                    // 2509
        var fullyContains = options && options.fullyContains;                                                        // 2510
                                                                                                                     // 2511
        // TODO compare points and sort                                                                              // 2512
        var startPoint = this.getStartPoint();                                                                       // 2513
        var endPoint = this.getEndPoint();                                                                           // 2514
                                                                                                                     // 2515
        var nodes = [];                                                                                              // 2516
        var leftEdgeNodes = [];                                                                                      // 2517
                                                                                                                     // 2518
        dom.walkPoint(startPoint, endPoint, function (point) {                                                       // 2519
          if (dom.isEditable(point.node)) {                                                                          // 2520
            return;                                                                                                  // 2521
          }                                                                                                          // 2522
                                                                                                                     // 2523
          var node;                                                                                                  // 2524
          if (fullyContains) {                                                                                       // 2525
            if (dom.isLeftEdgePoint(point)) {                                                                        // 2526
              leftEdgeNodes.push(point.node);                                                                        // 2527
            }                                                                                                        // 2528
            if (dom.isRightEdgePoint(point) && list.contains(leftEdgeNodes, point.node)) {                           // 2529
              node = point.node;                                                                                     // 2530
            }                                                                                                        // 2531
          } else if (includeAncestor) {                                                                              // 2532
            node = dom.ancestor(point.node, pred);                                                                   // 2533
          } else {                                                                                                   // 2534
            node = point.node;                                                                                       // 2535
          }                                                                                                          // 2536
                                                                                                                     // 2537
          if (node && pred(node)) {                                                                                  // 2538
            nodes.push(node);                                                                                        // 2539
          }                                                                                                          // 2540
        }, true);                                                                                                    // 2541
                                                                                                                     // 2542
        return list.unique(nodes);                                                                                   // 2543
      };                                                                                                             // 2544
                                                                                                                     // 2545
      /**                                                                                                            // 2546
       * returns commonAncestor of range                                                                             // 2547
       * @return {Element} - commonAncestor                                                                          // 2548
       */                                                                                                            // 2549
      this.commonAncestor = function () {                                                                            // 2550
        return dom.commonAncestor(sc, ec);                                                                           // 2551
      };                                                                                                             // 2552
                                                                                                                     // 2553
      /**                                                                                                            // 2554
       * returns expanded range by pred                                                                              // 2555
       *                                                                                                             // 2556
       * @param {Function} pred - predicate function                                                                 // 2557
       * @return {WrappedRange}                                                                                      // 2558
       */                                                                                                            // 2559
      this.expand = function (pred) {                                                                                // 2560
        var startAncestor = dom.ancestor(sc, pred);                                                                  // 2561
        var endAncestor = dom.ancestor(ec, pred);                                                                    // 2562
                                                                                                                     // 2563
        if (!startAncestor && !endAncestor) {                                                                        // 2564
          return new WrappedRange(sc, so, ec, eo);                                                                   // 2565
        }                                                                                                            // 2566
                                                                                                                     // 2567
        var boundaryPoints = this.getPoints();                                                                       // 2568
                                                                                                                     // 2569
        if (startAncestor) {                                                                                         // 2570
          boundaryPoints.sc = startAncestor;                                                                         // 2571
          boundaryPoints.so = 0;                                                                                     // 2572
        }                                                                                                            // 2573
                                                                                                                     // 2574
        if (endAncestor) {                                                                                           // 2575
          boundaryPoints.ec = endAncestor;                                                                           // 2576
          boundaryPoints.eo = dom.nodeLength(endAncestor);                                                           // 2577
        }                                                                                                            // 2578
                                                                                                                     // 2579
        return new WrappedRange(                                                                                     // 2580
          boundaryPoints.sc,                                                                                         // 2581
          boundaryPoints.so,                                                                                         // 2582
          boundaryPoints.ec,                                                                                         // 2583
          boundaryPoints.eo                                                                                          // 2584
        );                                                                                                           // 2585
      };                                                                                                             // 2586
                                                                                                                     // 2587
      /**                                                                                                            // 2588
       * @param {Boolean} isCollapseToStart                                                                          // 2589
       * @return {WrappedRange}                                                                                      // 2590
       */                                                                                                            // 2591
      this.collapse = function (isCollapseToStart) {                                                                 // 2592
        if (isCollapseToStart) {                                                                                     // 2593
          return new WrappedRange(sc, so, sc, so);                                                                   // 2594
        } else {                                                                                                     // 2595
          return new WrappedRange(ec, eo, ec, eo);                                                                   // 2596
        }                                                                                                            // 2597
      };                                                                                                             // 2598
                                                                                                                     // 2599
      /**                                                                                                            // 2600
       * splitText on range                                                                                          // 2601
       */                                                                                                            // 2602
      this.splitText = function () {                                                                                 // 2603
        var isSameContainer = sc === ec;                                                                             // 2604
        var boundaryPoints = this.getPoints();                                                                       // 2605
                                                                                                                     // 2606
        if (dom.isText(ec) && !dom.isEdgePoint(this.getEndPoint())) {                                                // 2607
          ec.splitText(eo);                                                                                          // 2608
        }                                                                                                            // 2609
                                                                                                                     // 2610
        if (dom.isText(sc) && !dom.isEdgePoint(this.getStartPoint())) {                                              // 2611
          boundaryPoints.sc = sc.splitText(so);                                                                      // 2612
          boundaryPoints.so = 0;                                                                                     // 2613
                                                                                                                     // 2614
          if (isSameContainer) {                                                                                     // 2615
            boundaryPoints.ec = boundaryPoints.sc;                                                                   // 2616
            boundaryPoints.eo = eo - so;                                                                             // 2617
          }                                                                                                          // 2618
        }                                                                                                            // 2619
                                                                                                                     // 2620
        return new WrappedRange(                                                                                     // 2621
          boundaryPoints.sc,                                                                                         // 2622
          boundaryPoints.so,                                                                                         // 2623
          boundaryPoints.ec,                                                                                         // 2624
          boundaryPoints.eo                                                                                          // 2625
        );                                                                                                           // 2626
      };                                                                                                             // 2627
                                                                                                                     // 2628
      /**                                                                                                            // 2629
       * delete contents on range                                                                                    // 2630
       * @return {WrappedRange}                                                                                      // 2631
       */                                                                                                            // 2632
      this.deleteContents = function () {                                                                            // 2633
        if (this.isCollapsed()) {                                                                                    // 2634
          return this;                                                                                               // 2635
        }                                                                                                            // 2636
                                                                                                                     // 2637
        var rng = this.splitText();                                                                                  // 2638
        var nodes = rng.nodes(null, {                                                                                // 2639
          fullyContains: true                                                                                        // 2640
        });                                                                                                          // 2641
                                                                                                                     // 2642
        // find new cursor point                                                                                     // 2643
        var point = dom.prevPointUntil(rng.getStartPoint(), function (point) {                                       // 2644
          return !list.contains(nodes, point.node);                                                                  // 2645
        });                                                                                                          // 2646
                                                                                                                     // 2647
        var emptyParents = [];                                                                                       // 2648
        $.each(nodes, function (idx, node) {                                                                         // 2649
          // find empty parents                                                                                      // 2650
          var parent = node.parentNode;                                                                              // 2651
          if (point.node !== parent && dom.nodeLength(parent) === 1) {                                               // 2652
            emptyParents.push(parent);                                                                               // 2653
          }                                                                                                          // 2654
          dom.remove(node, false);                                                                                   // 2655
        });                                                                                                          // 2656
                                                                                                                     // 2657
        // remove empty parents                                                                                      // 2658
        $.each(emptyParents, function (idx, node) {                                                                  // 2659
          dom.remove(node, false);                                                                                   // 2660
        });                                                                                                          // 2661
                                                                                                                     // 2662
        return new WrappedRange(                                                                                     // 2663
          point.node,                                                                                                // 2664
          point.offset,                                                                                              // 2665
          point.node,                                                                                                // 2666
          point.offset                                                                                               // 2667
        ).normalize();                                                                                               // 2668
      };                                                                                                             // 2669
                                                                                                                     // 2670
      /**                                                                                                            // 2671
       * makeIsOn: return isOn(pred) function                                                                        // 2672
       */                                                                                                            // 2673
      var makeIsOn = function (pred) {                                                                               // 2674
        return function () {                                                                                         // 2675
          var ancestor = dom.ancestor(sc, pred);                                                                     // 2676
          return !!ancestor && (ancestor === dom.ancestor(ec, pred));                                                // 2677
        };                                                                                                           // 2678
      };                                                                                                             // 2679
                                                                                                                     // 2680
      // isOnEditable: judge whether range is on editable or not                                                     // 2681
      this.isOnEditable = makeIsOn(dom.isEditable);                                                                  // 2682
      // isOnList: judge whether range is on list node or not                                                        // 2683
      this.isOnList = makeIsOn(dom.isList);                                                                          // 2684
      // isOnAnchor: judge whether range is on anchor node or not                                                    // 2685
      this.isOnAnchor = makeIsOn(dom.isAnchor);                                                                      // 2686
      // isOnAnchor: judge whether range is on cell node or not                                                      // 2687
      this.isOnCell = makeIsOn(dom.isCell);                                                                          // 2688
                                                                                                                     // 2689
      /**                                                                                                            // 2690
       * @param {Function} pred                                                                                      // 2691
       * @return {Boolean}                                                                                           // 2692
       */                                                                                                            // 2693
      this.isLeftEdgeOf = function (pred) {                                                                          // 2694
        if (!dom.isLeftEdgePoint(this.getStartPoint())) {                                                            // 2695
          return false;                                                                                              // 2696
        }                                                                                                            // 2697
                                                                                                                     // 2698
        var node = dom.ancestor(this.sc, pred);                                                                      // 2699
        return node && dom.isLeftEdgeOf(this.sc, node);                                                              // 2700
      };                                                                                                             // 2701
                                                                                                                     // 2702
      /**                                                                                                            // 2703
       * returns whether range was collapsed or not                                                                  // 2704
       */                                                                                                            // 2705
      this.isCollapsed = function () {                                                                               // 2706
        return sc === ec && so === eo;                                                                               // 2707
      };                                                                                                             // 2708
                                                                                                                     // 2709
      /**                                                                                                            // 2710
       * wrap inline nodes which children of body with paragraph                                                     // 2711
       *                                                                                                             // 2712
       * @return {WrappedRange}                                                                                      // 2713
       */                                                                                                            // 2714
      this.wrapBodyInlineWithPara = function () {                                                                    // 2715
        if (dom.isBodyContainer(sc) && dom.isEmpty(sc)) {                                                            // 2716
          sc.innerHTML = dom.emptyPara;                                                                              // 2717
          return new WrappedRange(sc.firstChild, 0, sc.firstChild, 0);                                               // 2718
        }                                                                                                            // 2719
                                                                                                                     // 2720
        /**                                                                                                          // 2721
         * [workaround] firefox often create range on not visible point. so normalize here.                          // 2722
         *  - firefox: |<p>text</p>|                                                                                 // 2723
         *  - chrome: <p>|text|</p>                                                                                  // 2724
         */                                                                                                          // 2725
        var rng = this.normalize();                                                                                  // 2726
        if (dom.isParaInline(sc) || dom.isPara(sc)) {                                                                // 2727
          return rng;                                                                                                // 2728
        }                                                                                                            // 2729
                                                                                                                     // 2730
        // find inline top ancestor                                                                                  // 2731
        var topAncestor;                                                                                             // 2732
        if (dom.isInline(rng.sc)) {                                                                                  // 2733
          var ancestors = dom.listAncestor(rng.sc, func.not(dom.isInline));                                          // 2734
          topAncestor = list.last(ancestors);                                                                        // 2735
          if (!dom.isInline(topAncestor)) {                                                                          // 2736
            topAncestor = ancestors[ancestors.length - 2] || rng.sc.childNodes[rng.so];                              // 2737
          }                                                                                                          // 2738
        } else {                                                                                                     // 2739
          topAncestor = rng.sc.childNodes[rng.so > 0 ? rng.so - 1 : 0];                                              // 2740
        }                                                                                                            // 2741
                                                                                                                     // 2742
        // siblings not in paragraph                                                                                 // 2743
        var inlineSiblings = dom.listPrev(topAncestor, dom.isParaInline).reverse();                                  // 2744
        inlineSiblings = inlineSiblings.concat(dom.listNext(topAncestor.nextSibling, dom.isParaInline));             // 2745
                                                                                                                     // 2746
        // wrap with paragraph                                                                                       // 2747
        if (inlineSiblings.length) {                                                                                 // 2748
          var para = dom.wrap(list.head(inlineSiblings), 'p');                                                       // 2749
          dom.appendChildNodes(para, list.tail(inlineSiblings));                                                     // 2750
        }                                                                                                            // 2751
                                                                                                                     // 2752
        return this.normalize();                                                                                     // 2753
      };                                                                                                             // 2754
                                                                                                                     // 2755
      /**                                                                                                            // 2756
       * insert node at current cursor                                                                               // 2757
       *                                                                                                             // 2758
       * @param {Node} node                                                                                          // 2759
       * @return {Node}                                                                                              // 2760
       */                                                                                                            // 2761
      this.insertNode = function (node) {                                                                            // 2762
        var rng = this.wrapBodyInlineWithPara().deleteContents();                                                    // 2763
        var info = dom.splitPoint(rng.getStartPoint(), dom.isInline(node));                                          // 2764
                                                                                                                     // 2765
        if (info.rightNode) {                                                                                        // 2766
          info.rightNode.parentNode.insertBefore(node, info.rightNode);                                              // 2767
        } else {                                                                                                     // 2768
          info.container.appendChild(node);                                                                          // 2769
        }                                                                                                            // 2770
                                                                                                                     // 2771
        return node;                                                                                                 // 2772
      };                                                                                                             // 2773
                                                                                                                     // 2774
      /**                                                                                                            // 2775
       * insert html at current cursor                                                                               // 2776
       */                                                                                                            // 2777
      this.pasteHTML = function (markup) {                                                                           // 2778
        var contentsContainer = $('<div></div>').html(markup)[0];                                                    // 2779
        var childNodes = list.from(contentsContainer.childNodes);                                                    // 2780
                                                                                                                     // 2781
        var rng = this.wrapBodyInlineWithPara().deleteContents();                                                    // 2782
                                                                                                                     // 2783
        return childNodes.reverse().map(function (childNode) {                                                       // 2784
          return rng.insertNode(childNode);                                                                          // 2785
        }).reverse();                                                                                                // 2786
      };                                                                                                             // 2787
                                                                                                                     // 2788
      /**                                                                                                            // 2789
       * returns text in range                                                                                       // 2790
       *                                                                                                             // 2791
       * @return {String}                                                                                            // 2792
       */                                                                                                            // 2793
      this.toString = function () {                                                                                  // 2794
        var nativeRng = nativeRange();                                                                               // 2795
        return agent.isW3CRangeSupport ? nativeRng.toString() : nativeRng.text;                                      // 2796
      };                                                                                                             // 2797
                                                                                                                     // 2798
      /**                                                                                                            // 2799
       * returns range for word before cursor                                                                        // 2800
       *                                                                                                             // 2801
       * @param {Boolean} [findAfter] - find after cursor, default: false                                            // 2802
       * @return {WrappedRange}                                                                                      // 2803
       */                                                                                                            // 2804
      this.getWordRange = function (findAfter) {                                                                     // 2805
        var endPoint = this.getEndPoint();                                                                           // 2806
                                                                                                                     // 2807
        if (!dom.isCharPoint(endPoint)) {                                                                            // 2808
          return this;                                                                                               // 2809
        }                                                                                                            // 2810
                                                                                                                     // 2811
        var startPoint = dom.prevPointUntil(endPoint, function (point) {                                             // 2812
          return !dom.isCharPoint(point);                                                                            // 2813
        });                                                                                                          // 2814
                                                                                                                     // 2815
        if (findAfter) {                                                                                             // 2816
          endPoint = dom.nextPointUntil(endPoint, function (point) {                                                 // 2817
            return !dom.isCharPoint(point);                                                                          // 2818
          });                                                                                                        // 2819
        }                                                                                                            // 2820
                                                                                                                     // 2821
        return new WrappedRange(                                                                                     // 2822
          startPoint.node,                                                                                           // 2823
          startPoint.offset,                                                                                         // 2824
          endPoint.node,                                                                                             // 2825
          endPoint.offset                                                                                            // 2826
        );                                                                                                           // 2827
      };                                                                                                             // 2828
                                                                                                                     // 2829
      /**                                                                                                            // 2830
       * create offsetPath bookmark                                                                                  // 2831
       *                                                                                                             // 2832
       * @param {Node} editable                                                                                      // 2833
       */                                                                                                            // 2834
      this.bookmark = function (editable) {                                                                          // 2835
        return {                                                                                                     // 2836
          s: {                                                                                                       // 2837
            path: dom.makeOffsetPath(editable, sc),                                                                  // 2838
            offset: so                                                                                               // 2839
          },                                                                                                         // 2840
          e: {                                                                                                       // 2841
            path: dom.makeOffsetPath(editable, ec),                                                                  // 2842
            offset: eo                                                                                               // 2843
          }                                                                                                          // 2844
        };                                                                                                           // 2845
      };                                                                                                             // 2846
                                                                                                                     // 2847
      /**                                                                                                            // 2848
       * create offsetPath bookmark base on paragraph                                                                // 2849
       *                                                                                                             // 2850
       * @param {Node[]} paras                                                                                       // 2851
       */                                                                                                            // 2852
      this.paraBookmark = function (paras) {                                                                         // 2853
        return {                                                                                                     // 2854
          s: {                                                                                                       // 2855
            path: list.tail(dom.makeOffsetPath(list.head(paras), sc)),                                               // 2856
            offset: so                                                                                               // 2857
          },                                                                                                         // 2858
          e: {                                                                                                       // 2859
            path: list.tail(dom.makeOffsetPath(list.last(paras), ec)),                                               // 2860
            offset: eo                                                                                               // 2861
          }                                                                                                          // 2862
        };                                                                                                           // 2863
      };                                                                                                             // 2864
                                                                                                                     // 2865
      /**                                                                                                            // 2866
       * getClientRects                                                                                              // 2867
       * @return {Rect[]}                                                                                            // 2868
       */                                                                                                            // 2869
      this.getClientRects = function () {                                                                            // 2870
        var nativeRng = nativeRange();                                                                               // 2871
        return nativeRng.getClientRects();                                                                           // 2872
      };                                                                                                             // 2873
    };                                                                                                               // 2874
                                                                                                                     // 2875
  /**                                                                                                                // 2876
   * @class core.range                                                                                               // 2877
   *                                                                                                                 // 2878
   * Data structure                                                                                                  // 2879
   *  * BoundaryPoint: a point of dom tree                                                                           // 2880
   *  * BoundaryPoints: two boundaryPoints corresponding to the start and the end of the Range                       // 2881
   *                                                                                                                 // 2882
   * See to http://www.w3.org/TR/DOM-Level-2-Traversal-Range/ranges.html#Level-2-Range-Position                      // 2883
   *                                                                                                                 // 2884
   * @singleton                                                                                                      // 2885
   * @alternateClassName range                                                                                       // 2886
   */                                                                                                                // 2887
    return {                                                                                                         // 2888
      /**                                                                                                            // 2889
       * create Range Object From arguments or Browser Selection                                                     // 2890
       *                                                                                                             // 2891
       * @param {Node} sc - start container                                                                          // 2892
       * @param {Number} so - start offset                                                                           // 2893
       * @param {Node} ec - end container                                                                            // 2894
       * @param {Number} eo - end offset                                                                             // 2895
       * @return {WrappedRange}                                                                                      // 2896
       */                                                                                                            // 2897
      create: function (sc, so, ec, eo) {                                                                            // 2898
        if (arguments.length === 4) {                                                                                // 2899
          return new WrappedRange(sc, so, ec, eo);                                                                   // 2900
        } else if (arguments.length === 2) { //collapsed                                                             // 2901
          ec = sc;                                                                                                   // 2902
          eo = so;                                                                                                   // 2903
          return new WrappedRange(sc, so, ec, eo);                                                                   // 2904
        } else {                                                                                                     // 2905
          var wrappedRange = this.createFromSelection();                                                             // 2906
          if (!wrappedRange && arguments.length === 1) {                                                             // 2907
            wrappedRange = this.createFromNode(arguments[0]);                                                        // 2908
            return wrappedRange.collapse(dom.emptyPara === arguments[0].innerHTML);                                  // 2909
          }                                                                                                          // 2910
          return wrappedRange;                                                                                       // 2911
        }                                                                                                            // 2912
      },                                                                                                             // 2913
                                                                                                                     // 2914
      createFromSelection: function () {                                                                             // 2915
        var sc, so, ec, eo;                                                                                          // 2916
        if (agent.isW3CRangeSupport) {                                                                               // 2917
          var selection = document.getSelection();                                                                   // 2918
          if (!selection || selection.rangeCount === 0) {                                                            // 2919
            return null;                                                                                             // 2920
          } else if (dom.isBody(selection.anchorNode)) {                                                             // 2921
            // Firefox: returns entire body as range on initialization.                                              // 2922
            // We won't never need it.                                                                               // 2923
            return null;                                                                                             // 2924
          }                                                                                                          // 2925
                                                                                                                     // 2926
          var nativeRng = selection.getRangeAt(0);                                                                   // 2927
          sc = nativeRng.startContainer;                                                                             // 2928
          so = nativeRng.startOffset;                                                                                // 2929
          ec = nativeRng.endContainer;                                                                               // 2930
          eo = nativeRng.endOffset;                                                                                  // 2931
        } else { // IE8: TextRange                                                                                   // 2932
          var textRange = document.selection.createRange();                                                          // 2933
          var textRangeEnd = textRange.duplicate();                                                                  // 2934
          textRangeEnd.collapse(false);                                                                              // 2935
          var textRangeStart = textRange;                                                                            // 2936
          textRangeStart.collapse(true);                                                                             // 2937
                                                                                                                     // 2938
          var startPoint = textRangeToPoint(textRangeStart, true),                                                   // 2939
          endPoint = textRangeToPoint(textRangeEnd, false);                                                          // 2940
                                                                                                                     // 2941
          // same visible point case: range was collapsed.                                                           // 2942
          if (dom.isText(startPoint.node) && dom.isLeftEdgePoint(startPoint) &&                                      // 2943
              dom.isTextNode(endPoint.node) && dom.isRightEdgePoint(endPoint) &&                                     // 2944
              endPoint.node.nextSibling === startPoint.node) {                                                       // 2945
            startPoint = endPoint;                                                                                   // 2946
          }                                                                                                          // 2947
                                                                                                                     // 2948
          sc = startPoint.cont;                                                                                      // 2949
          so = startPoint.offset;                                                                                    // 2950
          ec = endPoint.cont;                                                                                        // 2951
          eo = endPoint.offset;                                                                                      // 2952
        }                                                                                                            // 2953
                                                                                                                     // 2954
        return new WrappedRange(sc, so, ec, eo);                                                                     // 2955
      },                                                                                                             // 2956
                                                                                                                     // 2957
      /**                                                                                                            // 2958
       * @method                                                                                                     // 2959
       *                                                                                                             // 2960
       * create WrappedRange from node                                                                               // 2961
       *                                                                                                             // 2962
       * @param {Node} node                                                                                          // 2963
       * @return {WrappedRange}                                                                                      // 2964
       */                                                                                                            // 2965
      createFromNode: function (node) {                                                                              // 2966
        var sc = node;                                                                                               // 2967
        var so = 0;                                                                                                  // 2968
        var ec = node;                                                                                               // 2969
        var eo = dom.nodeLength(ec);                                                                                 // 2970
                                                                                                                     // 2971
        // browsers can't target a picture or void node                                                              // 2972
        if (dom.isVoid(sc)) {                                                                                        // 2973
          so = dom.listPrev(sc).length - 1;                                                                          // 2974
          sc = sc.parentNode;                                                                                        // 2975
        }                                                                                                            // 2976
        if (dom.isBR(ec)) {                                                                                          // 2977
          eo = dom.listPrev(ec).length - 1;                                                                          // 2978
          ec = ec.parentNode;                                                                                        // 2979
        } else if (dom.isVoid(ec)) {                                                                                 // 2980
          eo = dom.listPrev(ec).length;                                                                              // 2981
          ec = ec.parentNode;                                                                                        // 2982
        }                                                                                                            // 2983
                                                                                                                     // 2984
        return this.create(sc, so, ec, eo);                                                                          // 2985
      },                                                                                                             // 2986
                                                                                                                     // 2987
      /**                                                                                                            // 2988
       * create WrappedRange from node after position                                                                // 2989
       *                                                                                                             // 2990
       * @param {Node} node                                                                                          // 2991
       * @return {WrappedRange}                                                                                      // 2992
       */                                                                                                            // 2993
      createFromNodeBefore: function (node) {                                                                        // 2994
        return this.createFromNode(node).collapse(true);                                                             // 2995
      },                                                                                                             // 2996
                                                                                                                     // 2997
      /**                                                                                                            // 2998
       * create WrappedRange from node after position                                                                // 2999
       *                                                                                                             // 3000
       * @param {Node} node                                                                                          // 3001
       * @return {WrappedRange}                                                                                      // 3002
       */                                                                                                            // 3003
      createFromNodeAfter: function (node) {                                                                         // 3004
        return this.createFromNode(node).collapse();                                                                 // 3005
      },                                                                                                             // 3006
                                                                                                                     // 3007
      /**                                                                                                            // 3008
       * @method                                                                                                     // 3009
       *                                                                                                             // 3010
       * create WrappedRange from bookmark                                                                           // 3011
       *                                                                                                             // 3012
       * @param {Node} editable                                                                                      // 3013
       * @param {Object} bookmark                                                                                    // 3014
       * @return {WrappedRange}                                                                                      // 3015
       */                                                                                                            // 3016
      createFromBookmark: function (editable, bookmark) {                                                            // 3017
        var sc = dom.fromOffsetPath(editable, bookmark.s.path);                                                      // 3018
        var so = bookmark.s.offset;                                                                                  // 3019
        var ec = dom.fromOffsetPath(editable, bookmark.e.path);                                                      // 3020
        var eo = bookmark.e.offset;                                                                                  // 3021
        return new WrappedRange(sc, so, ec, eo);                                                                     // 3022
      },                                                                                                             // 3023
                                                                                                                     // 3024
      /**                                                                                                            // 3025
       * @method                                                                                                     // 3026
       *                                                                                                             // 3027
       * create WrappedRange from paraBookmark                                                                       // 3028
       *                                                                                                             // 3029
       * @param {Object} bookmark                                                                                    // 3030
       * @param {Node[]} paras                                                                                       // 3031
       * @return {WrappedRange}                                                                                      // 3032
       */                                                                                                            // 3033
      createFromParaBookmark: function (bookmark, paras) {                                                           // 3034
        var so = bookmark.s.offset;                                                                                  // 3035
        var eo = bookmark.e.offset;                                                                                  // 3036
        var sc = dom.fromOffsetPath(list.head(paras), bookmark.s.path);                                              // 3037
        var ec = dom.fromOffsetPath(list.last(paras), bookmark.e.path);                                              // 3038
                                                                                                                     // 3039
        return new WrappedRange(sc, so, ec, eo);                                                                     // 3040
      }                                                                                                              // 3041
    };                                                                                                               // 3042
  })();                                                                                                              // 3043
                                                                                                                     // 3044
  /**                                                                                                                // 3045
   * @class core.async                                                                                               // 3046
   *                                                                                                                 // 3047
   * Async functions which returns `Promise`                                                                         // 3048
   *                                                                                                                 // 3049
   * @singleton                                                                                                      // 3050
   * @alternateClassName async                                                                                       // 3051
   */                                                                                                                // 3052
  var async = (function () {                                                                                         // 3053
    /**                                                                                                              // 3054
     * @method readFileAsDataURL                                                                                     // 3055
     *                                                                                                               // 3056
     * read contents of file as representing URL                                                                     // 3057
     *                                                                                                               // 3058
     * @param {File} file                                                                                            // 3059
     * @return {Promise} - then: dataUrl                                                                             // 3060
     */                                                                                                              // 3061
    var readFileAsDataURL = function (file) {                                                                        // 3062
      return $.Deferred(function (deferred) {                                                                        // 3063
        $.extend(new FileReader(), {                                                                                 // 3064
          onload: function (e) {                                                                                     // 3065
            var dataURL = e.target.result;                                                                           // 3066
            deferred.resolve(dataURL);                                                                               // 3067
          },                                                                                                         // 3068
          onerror: function () {                                                                                     // 3069
            deferred.reject(this);                                                                                   // 3070
          }                                                                                                          // 3071
        }).readAsDataURL(file);                                                                                      // 3072
      }).promise();                                                                                                  // 3073
    };                                                                                                               // 3074
                                                                                                                     // 3075
    /**                                                                                                              // 3076
     * @method createImage                                                                                           // 3077
     *                                                                                                               // 3078
     * create `<image>` from url string                                                                              // 3079
     *                                                                                                               // 3080
     * @param {String} url                                                                                           // 3081
     * @return {Promise} - then: $image                                                                              // 3082
     */                                                                                                              // 3083
    var createImage = function (url) {                                                                               // 3084
      return $.Deferred(function (deferred) {                                                                        // 3085
        var $img = $('<img>');                                                                                       // 3086
                                                                                                                     // 3087
        $img.one('load', function () {                                                                               // 3088
          $img.off('error abort');                                                                                   // 3089
          deferred.resolve($img);                                                                                    // 3090
        }).one('error abort', function () {                                                                          // 3091
          $img.off('load').detach();                                                                                 // 3092
          deferred.reject($img);                                                                                     // 3093
        }).css({                                                                                                     // 3094
          display: 'none'                                                                                            // 3095
        }).appendTo(document.body).attr('src', url);                                                                 // 3096
      }).promise();                                                                                                  // 3097
    };                                                                                                               // 3098
                                                                                                                     // 3099
    return {                                                                                                         // 3100
      readFileAsDataURL: readFileAsDataURL,                                                                          // 3101
      createImage: createImage                                                                                       // 3102
    };                                                                                                               // 3103
  })();                                                                                                              // 3104
                                                                                                                     // 3105
  /**                                                                                                                // 3106
   * @class editing.History                                                                                          // 3107
   *                                                                                                                 // 3108
   * Editor History                                                                                                  // 3109
   *                                                                                                                 // 3110
   */                                                                                                                // 3111
  var History = function ($editable) {                                                                               // 3112
    var stack = [], stackOffset = -1;                                                                                // 3113
    var editable = $editable[0];                                                                                     // 3114
                                                                                                                     // 3115
    var makeSnapshot = function () {                                                                                 // 3116
      var rng = range.create(editable);                                                                              // 3117
      var emptyBookmark = {s: {path: [], offset: 0}, e: {path: [], offset: 0}};                                      // 3118
                                                                                                                     // 3119
      return {                                                                                                       // 3120
        contents: $editable.html(),                                                                                  // 3121
        bookmark: (rng ? rng.bookmark(editable) : emptyBookmark)                                                     // 3122
      };                                                                                                             // 3123
    };                                                                                                               // 3124
                                                                                                                     // 3125
    var applySnapshot = function (snapshot) {                                                                        // 3126
      if (snapshot.contents !== null) {                                                                              // 3127
        $editable.html(snapshot.contents);                                                                           // 3128
      }                                                                                                              // 3129
      if (snapshot.bookmark !== null) {                                                                              // 3130
        range.createFromBookmark(editable, snapshot.bookmark).select();                                              // 3131
      }                                                                                                              // 3132
    };                                                                                                               // 3133
                                                                                                                     // 3134
    /**                                                                                                              // 3135
    * @method rewind                                                                                                 // 3136
    * Rewinds the history stack back to the first snapshot taken.                                                    // 3137
    * Leaves the stack intact, so that "Redo" can still be used.                                                     // 3138
    */                                                                                                               // 3139
    this.rewind = function () {                                                                                      // 3140
      // Create snap shot if not yet recorded                                                                        // 3141
      if ($editable.html() !== stack[stackOffset].contents) {                                                        // 3142
        this.recordUndo();                                                                                           // 3143
      }                                                                                                              // 3144
                                                                                                                     // 3145
      // Return to the first available snapshot.                                                                     // 3146
      stackOffset = 0;                                                                                               // 3147
                                                                                                                     // 3148
      // Apply that snapshot.                                                                                        // 3149
      applySnapshot(stack[stackOffset]);                                                                             // 3150
    };                                                                                                               // 3151
                                                                                                                     // 3152
    /**                                                                                                              // 3153
    * @method reset                                                                                                  // 3154
    * Resets the history stack completely; reverting to an empty editor.                                             // 3155
    */                                                                                                               // 3156
    this.reset = function () {                                                                                       // 3157
      // Clear the stack.                                                                                            // 3158
      stack = [];                                                                                                    // 3159
                                                                                                                     // 3160
      // Restore stackOffset to its original value.                                                                  // 3161
      stackOffset = -1;                                                                                              // 3162
                                                                                                                     // 3163
      // Clear the editable area.                                                                                    // 3164
      $editable.html('');                                                                                            // 3165
                                                                                                                     // 3166
      // Record our first snapshot (of nothing).                                                                     // 3167
      this.recordUndo();                                                                                             // 3168
    };                                                                                                               // 3169
                                                                                                                     // 3170
    /**                                                                                                              // 3171
     * undo                                                                                                          // 3172
     */                                                                                                              // 3173
    this.undo = function () {                                                                                        // 3174
      // Create snap shot if not yet recorded                                                                        // 3175
      if ($editable.html() !== stack[stackOffset].contents) {                                                        // 3176
        this.recordUndo();                                                                                           // 3177
      }                                                                                                              // 3178
                                                                                                                     // 3179
      if (0 < stackOffset) {                                                                                         // 3180
        stackOffset--;                                                                                               // 3181
        applySnapshot(stack[stackOffset]);                                                                           // 3182
      }                                                                                                              // 3183
    };                                                                                                               // 3184
                                                                                                                     // 3185
    /**                                                                                                              // 3186
     * redo                                                                                                          // 3187
     */                                                                                                              // 3188
    this.redo = function () {                                                                                        // 3189
      if (stack.length - 1 > stackOffset) {                                                                          // 3190
        stackOffset++;                                                                                               // 3191
        applySnapshot(stack[stackOffset]);                                                                           // 3192
      }                                                                                                              // 3193
    };                                                                                                               // 3194
                                                                                                                     // 3195
    /**                                                                                                              // 3196
     * recorded undo                                                                                                 // 3197
     */                                                                                                              // 3198
    this.recordUndo = function () {                                                                                  // 3199
      stackOffset++;                                                                                                 // 3200
                                                                                                                     // 3201
      // Wash out stack after stackOffset                                                                            // 3202
      if (stack.length > stackOffset) {                                                                              // 3203
        stack = stack.slice(0, stackOffset);                                                                         // 3204
      }                                                                                                              // 3205
                                                                                                                     // 3206
      // Create new snapshot and push it to the end                                                                  // 3207
      stack.push(makeSnapshot());                                                                                    // 3208
    };                                                                                                               // 3209
  };                                                                                                                 // 3210
                                                                                                                     // 3211
  /**                                                                                                                // 3212
   * @class editing.Style                                                                                            // 3213
   *                                                                                                                 // 3214
   * Style                                                                                                           // 3215
   *                                                                                                                 // 3216
   */                                                                                                                // 3217
  var Style = function () {                                                                                          // 3218
    /**                                                                                                              // 3219
     * @method jQueryCSS                                                                                             // 3220
     *                                                                                                               // 3221
     * [workaround] for old jQuery                                                                                   // 3222
     * passing an array of style properties to .css()                                                                // 3223
     * will result in an object of property-value pairs.                                                             // 3224
     * (compability with version < 1.9)                                                                              // 3225
     *                                                                                                               // 3226
     * @private                                                                                                      // 3227
     * @param  {jQuery} $obj                                                                                         // 3228
     * @param  {Array} propertyNames - An array of one or more CSS properties.                                       // 3229
     * @return {Object}                                                                                              // 3230
     */                                                                                                              // 3231
    var jQueryCSS = function ($obj, propertyNames) {                                                                 // 3232
      if (agent.jqueryVersion < 1.9) {                                                                               // 3233
        var result = {};                                                                                             // 3234
        $.each(propertyNames, function (idx, propertyName) {                                                         // 3235
          result[propertyName] = $obj.css(propertyName);                                                             // 3236
        });                                                                                                          // 3237
        return result;                                                                                               // 3238
      }                                                                                                              // 3239
      return $obj.css.call($obj, propertyNames);                                                                     // 3240
    };                                                                                                               // 3241
                                                                                                                     // 3242
    /**                                                                                                              // 3243
     * returns style object from node                                                                                // 3244
     *                                                                                                               // 3245
     * @param {jQuery} $node                                                                                         // 3246
     * @return {Object}                                                                                              // 3247
     */                                                                                                              // 3248
    this.fromNode = function ($node) {                                                                               // 3249
      var properties = ['font-family', 'font-size', 'text-align', 'list-style-type', 'line-height'];                 // 3250
      var styleInfo = jQueryCSS($node, properties) || {};                                                            // 3251
      styleInfo['font-size'] = parseInt(styleInfo['font-size'], 10);                                                 // 3252
      return styleInfo;                                                                                              // 3253
    };                                                                                                               // 3254
                                                                                                                     // 3255
    /**                                                                                                              // 3256
     * paragraph level style                                                                                         // 3257
     *                                                                                                               // 3258
     * @param {WrappedRange} rng                                                                                     // 3259
     * @param {Object} styleInfo                                                                                     // 3260
     */                                                                                                              // 3261
    this.stylePara = function (rng, styleInfo) {                                                                     // 3262
      $.each(rng.nodes(dom.isPara, {                                                                                 // 3263
        includeAncestor: true                                                                                        // 3264
      }), function (idx, para) {                                                                                     // 3265
        $(para).css(styleInfo);                                                                                      // 3266
      });                                                                                                            // 3267
    };                                                                                                               // 3268
                                                                                                                     // 3269
    /**                                                                                                              // 3270
     * insert and returns styleNodes on range.                                                                       // 3271
     *                                                                                                               // 3272
     * @param {WrappedRange} rng                                                                                     // 3273
     * @param {Object} [options] - options for styleNodes                                                            // 3274
     * @param {String} [options.nodeName] - default: `SPAN`                                                          // 3275
     * @param {Boolean} [options.expandClosestSibling] - default: `false`                                            // 3276
     * @param {Boolean} [options.onlyPartialContains] - default: `false`                                             // 3277
     * @return {Node[]}                                                                                              // 3278
     */                                                                                                              // 3279
    this.styleNodes = function (rng, options) {                                                                      // 3280
      rng = rng.splitText();                                                                                         // 3281
                                                                                                                     // 3282
      var nodeName = options && options.nodeName || 'SPAN';                                                          // 3283
      var expandClosestSibling = !!(options && options.expandClosestSibling);                                        // 3284
      var onlyPartialContains = !!(options && options.onlyPartialContains);                                          // 3285
                                                                                                                     // 3286
      if (rng.isCollapsed()) {                                                                                       // 3287
        return [rng.insertNode(dom.create(nodeName))];                                                               // 3288
      }                                                                                                              // 3289
                                                                                                                     // 3290
      var pred = dom.makePredByNodeName(nodeName);                                                                   // 3291
      var nodes = rng.nodes(dom.isText, {                                                                            // 3292
        fullyContains: true                                                                                          // 3293
      }).map(function (text) {                                                                                       // 3294
        return dom.singleChildAncestor(text, pred) || dom.wrap(text, nodeName);                                      // 3295
      });                                                                                                            // 3296
                                                                                                                     // 3297
      if (expandClosestSibling) {                                                                                    // 3298
        if (onlyPartialContains) {                                                                                   // 3299
          var nodesInRange = rng.nodes();                                                                            // 3300
          // compose with partial contains predication                                                               // 3301
          pred = func.and(pred, function (node) {                                                                    // 3302
            return list.contains(nodesInRange, node);                                                                // 3303
          });                                                                                                        // 3304
        }                                                                                                            // 3305
                                                                                                                     // 3306
        return nodes.map(function (node) {                                                                           // 3307
          var siblings = dom.withClosestSiblings(node, pred);                                                        // 3308
          var head = list.head(siblings);                                                                            // 3309
          var tails = list.tail(siblings);                                                                           // 3310
          $.each(tails, function (idx, elem) {                                                                       // 3311
            dom.appendChildNodes(head, elem.childNodes);                                                             // 3312
            dom.remove(elem);                                                                                        // 3313
          });                                                                                                        // 3314
          return list.head(siblings);                                                                                // 3315
        });                                                                                                          // 3316
      } else {                                                                                                       // 3317
        return nodes;                                                                                                // 3318
      }                                                                                                              // 3319
    };                                                                                                               // 3320
                                                                                                                     // 3321
    /**                                                                                                              // 3322
     * get current style on cursor                                                                                   // 3323
     *                                                                                                               // 3324
     * @param {WrappedRange} rng                                                                                     // 3325
     * @return {Object} - object contains style properties.                                                          // 3326
     */                                                                                                              // 3327
    this.current = function (rng) {                                                                                  // 3328
      var $cont = $(!dom.isElement(rng.sc) ? rng.sc.parentNode : rng.sc);                                            // 3329
      var styleInfo = this.fromNode($cont);                                                                          // 3330
                                                                                                                     // 3331
      // document.queryCommandState for toggle state                                                                 // 3332
      // [workaround] prevent Firefox nsresult: "0x80004005 (NS_ERROR_FAILURE)"                                      // 3333
      try {                                                                                                          // 3334
        styleInfo = $.extend(styleInfo, {                                                                            // 3335
          'font-bold': document.queryCommandState('bold') ? 'bold' : 'normal',                                       // 3336
          'font-italic': document.queryCommandState('italic') ? 'italic' : 'normal',                                 // 3337
          'font-underline': document.queryCommandState('underline') ? 'underline' : 'normal',                        // 3338
          'font-subscript': document.queryCommandState('subscript') ? 'subscript' : 'normal',                        // 3339
          'font-superscript': document.queryCommandState('superscript') ? 'superscript' : 'normal',                  // 3340
          'font-strikethrough': document.queryCommandState('strikethrough') ? 'strikethrough' : 'normal'             // 3341
        });                                                                                                          // 3342
      } catch (e) {}                                                                                                 // 3343
                                                                                                                     // 3344
      // list-style-type to list-style(unordered, ordered)                                                           // 3345
      if (!rng.isOnList()) {                                                                                         // 3346
        styleInfo['list-style'] = 'none';                                                                            // 3347
      } else {                                                                                                       // 3348
        var orderedTypes = ['circle', 'disc', 'disc-leading-zero', 'square'];                                        // 3349
        var isUnordered = $.inArray(styleInfo['list-style-type'], orderedTypes) > -1;                                // 3350
        styleInfo['list-style'] = isUnordered ? 'unordered' : 'ordered';                                             // 3351
      }                                                                                                              // 3352
                                                                                                                     // 3353
      var para = dom.ancestor(rng.sc, dom.isPara);                                                                   // 3354
      if (para && para.style['line-height']) {                                                                       // 3355
        styleInfo['line-height'] = para.style.lineHeight;                                                            // 3356
      } else {                                                                                                       // 3357
        var lineHeight = parseInt(styleInfo['line-height'], 10) / parseInt(styleInfo['font-size'], 10);              // 3358
        styleInfo['line-height'] = lineHeight.toFixed(1);                                                            // 3359
      }                                                                                                              // 3360
                                                                                                                     // 3361
      styleInfo.anchor = rng.isOnAnchor() && dom.ancestor(rng.sc, dom.isAnchor);                                     // 3362
      styleInfo.ancestors = dom.listAncestor(rng.sc, dom.isEditable);                                                // 3363
      styleInfo.range = rng;                                                                                         // 3364
                                                                                                                     // 3365
      return styleInfo;                                                                                              // 3366
    };                                                                                                               // 3367
  };                                                                                                                 // 3368
                                                                                                                     // 3369
                                                                                                                     // 3370
  /**                                                                                                                // 3371
   * @class editing.Bullet                                                                                           // 3372
   *                                                                                                                 // 3373
   * @alternateClassName Bullet                                                                                      // 3374
   */                                                                                                                // 3375
  var Bullet = function () {                                                                                         // 3376
    var self = this;                                                                                                 // 3377
                                                                                                                     // 3378
    /**                                                                                                              // 3379
     * toggle ordered list                                                                                           // 3380
     */                                                                                                              // 3381
    this.insertOrderedList = function (editable) {                                                                   // 3382
      this.toggleList('OL', editable);                                                                               // 3383
    };                                                                                                               // 3384
                                                                                                                     // 3385
    /**                                                                                                              // 3386
     * toggle unordered list                                                                                         // 3387
     */                                                                                                              // 3388
    this.insertUnorderedList = function (editable) {                                                                 // 3389
      this.toggleList('UL', editable);                                                                               // 3390
    };                                                                                                               // 3391
                                                                                                                     // 3392
    /**                                                                                                              // 3393
     * indent                                                                                                        // 3394
     */                                                                                                              // 3395
    this.indent = function (editable) {                                                                              // 3396
      var self = this;                                                                                               // 3397
      var rng = range.create(editable).wrapBodyInlineWithPara();                                                     // 3398
                                                                                                                     // 3399
      var paras = rng.nodes(dom.isPara, { includeAncestor: true });                                                  // 3400
      var clustereds = list.clusterBy(paras, func.peq2('parentNode'));                                               // 3401
                                                                                                                     // 3402
      $.each(clustereds, function (idx, paras) {                                                                     // 3403
        var head = list.head(paras);                                                                                 // 3404
        if (dom.isLi(head)) {                                                                                        // 3405
          self.wrapList(paras, head.parentNode.nodeName);                                                            // 3406
        } else {                                                                                                     // 3407
          $.each(paras, function (idx, para) {                                                                       // 3408
            $(para).css('marginLeft', function (idx, val) {                                                          // 3409
              return (parseInt(val, 10) || 0) + 25;                                                                  // 3410
            });                                                                                                      // 3411
          });                                                                                                        // 3412
        }                                                                                                            // 3413
      });                                                                                                            // 3414
                                                                                                                     // 3415
      rng.select();                                                                                                  // 3416
    };                                                                                                               // 3417
                                                                                                                     // 3418
    /**                                                                                                              // 3419
     * outdent                                                                                                       // 3420
     */                                                                                                              // 3421
    this.outdent = function (editable) {                                                                             // 3422
      var self = this;                                                                                               // 3423
      var rng = range.create(editable).wrapBodyInlineWithPara();                                                     // 3424
                                                                                                                     // 3425
      var paras = rng.nodes(dom.isPara, { includeAncestor: true });                                                  // 3426
      var clustereds = list.clusterBy(paras, func.peq2('parentNode'));                                               // 3427
                                                                                                                     // 3428
      $.each(clustereds, function (idx, paras) {                                                                     // 3429
        var head = list.head(paras);                                                                                 // 3430
        if (dom.isLi(head)) {                                                                                        // 3431
          self.releaseList([paras]);                                                                                 // 3432
        } else {                                                                                                     // 3433
          $.each(paras, function (idx, para) {                                                                       // 3434
            $(para).css('marginLeft', function (idx, val) {                                                          // 3435
              val = (parseInt(val, 10) || 0);                                                                        // 3436
              return val > 25 ? val - 25 : '';                                                                       // 3437
            });                                                                                                      // 3438
          });                                                                                                        // 3439
        }                                                                                                            // 3440
      });                                                                                                            // 3441
                                                                                                                     // 3442
      rng.select();                                                                                                  // 3443
    };                                                                                                               // 3444
                                                                                                                     // 3445
    /**                                                                                                              // 3446
     * toggle list                                                                                                   // 3447
     *                                                                                                               // 3448
     * @param {String} listName - OL or UL                                                                           // 3449
     */                                                                                                              // 3450
    this.toggleList = function (listName, editable) {                                                                // 3451
      var rng = range.create(editable).wrapBodyInlineWithPara();                                                     // 3452
                                                                                                                     // 3453
      var paras = rng.nodes(dom.isPara, { includeAncestor: true });                                                  // 3454
      var bookmark = rng.paraBookmark(paras);                                                                        // 3455
      var clustereds = list.clusterBy(paras, func.peq2('parentNode'));                                               // 3456
                                                                                                                     // 3457
      // paragraph to list                                                                                           // 3458
      if (list.find(paras, dom.isPurePara)) {                                                                        // 3459
        var wrappedParas = [];                                                                                       // 3460
        $.each(clustereds, function (idx, paras) {                                                                   // 3461
          wrappedParas = wrappedParas.concat(self.wrapList(paras, listName));                                        // 3462
        });                                                                                                          // 3463
        paras = wrappedParas;                                                                                        // 3464
      // list to paragraph or change list style                                                                      // 3465
      } else {                                                                                                       // 3466
        var diffLists = rng.nodes(dom.isList, {                                                                      // 3467
          includeAncestor: true                                                                                      // 3468
        }).filter(function (listNode) {                                                                              // 3469
          return !$.nodeName(listNode, listName);                                                                    // 3470
        });                                                                                                          // 3471
                                                                                                                     // 3472
        if (diffLists.length) {                                                                                      // 3473
          $.each(diffLists, function (idx, listNode) {                                                               // 3474
            dom.replace(listNode, listName);                                                                         // 3475
          });                                                                                                        // 3476
        } else {                                                                                                     // 3477
          paras = this.releaseList(clustereds, true);                                                                // 3478
        }                                                                                                            // 3479
      }                                                                                                              // 3480
                                                                                                                     // 3481
      range.createFromParaBookmark(bookmark, paras).select();                                                        // 3482
    };                                                                                                               // 3483
                                                                                                                     // 3484
    /**                                                                                                              // 3485
     * @param {Node[]} paras                                                                                         // 3486
     * @param {String} listName                                                                                      // 3487
     * @return {Node[]}                                                                                              // 3488
     */                                                                                                              // 3489
    this.wrapList = function (paras, listName) {                                                                     // 3490
      var head = list.head(paras);                                                                                   // 3491
      var last = list.last(paras);                                                                                   // 3492
                                                                                                                     // 3493
      var prevList = dom.isList(head.previousSibling) && head.previousSibling;                                       // 3494
      var nextList = dom.isList(last.nextSibling) && last.nextSibling;                                               // 3495
                                                                                                                     // 3496
      var listNode = prevList || dom.insertAfter(dom.create(listName || 'UL'), last);                                // 3497
                                                                                                                     // 3498
      // P to LI                                                                                                     // 3499
      paras = paras.map(function (para) {                                                                            // 3500
        return dom.isPurePara(para) ? dom.replace(para, 'LI') : para;                                                // 3501
      });                                                                                                            // 3502
                                                                                                                     // 3503
      // append to list(<ul>, <ol>)                                                                                  // 3504
      dom.appendChildNodes(listNode, paras);                                                                         // 3505
                                                                                                                     // 3506
      if (nextList) {                                                                                                // 3507
        dom.appendChildNodes(listNode, list.from(nextList.childNodes));                                              // 3508
        dom.remove(nextList);                                                                                        // 3509
      }                                                                                                              // 3510
                                                                                                                     // 3511
      return paras;                                                                                                  // 3512
    };                                                                                                               // 3513
                                                                                                                     // 3514
    /**                                                                                                              // 3515
     * @method releaseList                                                                                           // 3516
     *                                                                                                               // 3517
     * @param {Array[]} clustereds                                                                                   // 3518
     * @param {Boolean} isEscapseToBody                                                                              // 3519
     * @return {Node[]}                                                                                              // 3520
     */                                                                                                              // 3521
    this.releaseList = function (clustereds, isEscapseToBody) {                                                      // 3522
      var releasedParas = [];                                                                                        // 3523
                                                                                                                     // 3524
      $.each(clustereds, function (idx, paras) {                                                                     // 3525
        var head = list.head(paras);                                                                                 // 3526
        var last = list.last(paras);                                                                                 // 3527
                                                                                                                     // 3528
        var headList = isEscapseToBody ? dom.lastAncestor(head, dom.isList) :                                        // 3529
                                         head.parentNode;                                                            // 3530
        var lastList = headList.childNodes.length > 1 ? dom.splitTree(headList, {                                    // 3531
          node: last.parentNode,                                                                                     // 3532
          offset: dom.position(last) + 1                                                                             // 3533
        }, {                                                                                                         // 3534
          isSkipPaddingBlankHTML: true                                                                               // 3535
        }) : null;                                                                                                   // 3536
                                                                                                                     // 3537
        var middleList = dom.splitTree(headList, {                                                                   // 3538
          node: head.parentNode,                                                                                     // 3539
          offset: dom.position(head)                                                                                 // 3540
        }, {                                                                                                         // 3541
          isSkipPaddingBlankHTML: true                                                                               // 3542
        });                                                                                                          // 3543
                                                                                                                     // 3544
        paras = isEscapseToBody ? dom.listDescendant(middleList, dom.isLi) :                                         // 3545
                                  list.from(middleList.childNodes).filter(dom.isLi);                                 // 3546
                                                                                                                     // 3547
        // LI to P                                                                                                   // 3548
        if (isEscapseToBody || !dom.isList(headList.parentNode)) {                                                   // 3549
          paras = paras.map(function (para) {                                                                        // 3550
            return dom.replace(para, 'P');                                                                           // 3551
          });                                                                                                        // 3552
        }                                                                                                            // 3553
                                                                                                                     // 3554
        $.each(list.from(paras).reverse(), function (idx, para) {                                                    // 3555
          dom.insertAfter(para, headList);                                                                           // 3556
        });                                                                                                          // 3557
                                                                                                                     // 3558
        // remove empty lists                                                                                        // 3559
        var rootLists = list.compact([headList, middleList, lastList]);                                              // 3560
        $.each(rootLists, function (idx, rootList) {                                                                 // 3561
          var listNodes = [rootList].concat(dom.listDescendant(rootList, dom.isList));                               // 3562
          $.each(listNodes.reverse(), function (idx, listNode) {                                                     // 3563
            if (!dom.nodeLength(listNode)) {                                                                         // 3564
              dom.remove(listNode, true);                                                                            // 3565
            }                                                                                                        // 3566
          });                                                                                                        // 3567
        });                                                                                                          // 3568
                                                                                                                     // 3569
        releasedParas = releasedParas.concat(paras);                                                                 // 3570
      });                                                                                                            // 3571
                                                                                                                     // 3572
      return releasedParas;                                                                                          // 3573
    };                                                                                                               // 3574
  };                                                                                                                 // 3575
                                                                                                                     // 3576
                                                                                                                     // 3577
  /**                                                                                                                // 3578
   * @class editing.Typing                                                                                           // 3579
   *                                                                                                                 // 3580
   * Typing                                                                                                          // 3581
   *                                                                                                                 // 3582
   */                                                                                                                // 3583
  var Typing = function () {                                                                                         // 3584
                                                                                                                     // 3585
    // a Bullet instance to toggle lists off                                                                         // 3586
    var bullet = new Bullet();                                                                                       // 3587
                                                                                                                     // 3588
    /**                                                                                                              // 3589
     * insert tab                                                                                                    // 3590
     *                                                                                                               // 3591
     * @param {WrappedRange} rng                                                                                     // 3592
     * @param {Number} tabsize                                                                                       // 3593
     */                                                                                                              // 3594
    this.insertTab = function (rng, tabsize) {                                                                       // 3595
      var tab = dom.createText(new Array(tabsize + 1).join(dom.NBSP_CHAR));                                          // 3596
      rng = rng.deleteContents();                                                                                    // 3597
      rng.insertNode(tab, true);                                                                                     // 3598
                                                                                                                     // 3599
      rng = range.create(tab, tabsize);                                                                              // 3600
      rng.select();                                                                                                  // 3601
    };                                                                                                               // 3602
                                                                                                                     // 3603
    /**                                                                                                              // 3604
     * insert paragraph                                                                                              // 3605
     */                                                                                                              // 3606
    this.insertParagraph = function (editable) {                                                                     // 3607
      var rng = range.create(editable);                                                                              // 3608
                                                                                                                     // 3609
      // deleteContents on range.                                                                                    // 3610
      rng = rng.deleteContents();                                                                                    // 3611
                                                                                                                     // 3612
      // Wrap range if it needs to be wrapped by paragraph                                                           // 3613
      rng = rng.wrapBodyInlineWithPara();                                                                            // 3614
                                                                                                                     // 3615
      // finding paragraph                                                                                           // 3616
      var splitRoot = dom.ancestor(rng.sc, dom.isPara);                                                              // 3617
                                                                                                                     // 3618
      var nextPara;                                                                                                  // 3619
      // on paragraph: split paragraph                                                                               // 3620
      if (splitRoot) {                                                                                               // 3621
        // if it is an empty line with li                                                                            // 3622
        if (dom.isEmpty(splitRoot) && dom.isLi(splitRoot)) {                                                         // 3623
          // toogle UL/OL and escape                                                                                 // 3624
          bullet.toggleList(splitRoot.parentNode.nodeName);                                                          // 3625
          return;                                                                                                    // 3626
        // if it is an empty line with para on blockquote                                                            // 3627
        } else if (dom.isEmpty(splitRoot) && dom.isPara(splitRoot) && dom.isBlockquote(splitRoot.parentNode)) {      // 3628
          // escape blockquote                                                                                       // 3629
          dom.insertAfter(splitRoot, splitRoot.parentNode);                                                          // 3630
          nextPara = splitRoot;                                                                                      // 3631
        // if new line has content (not a line break)                                                                // 3632
        } else {                                                                                                     // 3633
          nextPara = dom.splitTree(splitRoot, rng.getStartPoint());                                                  // 3634
                                                                                                                     // 3635
          var emptyAnchors = dom.listDescendant(splitRoot, dom.isEmptyAnchor);                                       // 3636
          emptyAnchors = emptyAnchors.concat(dom.listDescendant(nextPara, dom.isEmptyAnchor));                       // 3637
                                                                                                                     // 3638
          $.each(emptyAnchors, function (idx, anchor) {                                                              // 3639
            dom.remove(anchor);                                                                                      // 3640
          });                                                                                                        // 3641
                                                                                                                     // 3642
          // replace empty heading or pre with P tag                                                                 // 3643
          if ((dom.isHeading(nextPara) || dom.isPre(nextPara)) && dom.isEmpty(nextPara)) {                           // 3644
            nextPara = dom.replace(nextPara, 'p');                                                                   // 3645
          }                                                                                                          // 3646
        }                                                                                                            // 3647
      // no paragraph: insert empty paragraph                                                                        // 3648
      } else {                                                                                                       // 3649
        var next = rng.sc.childNodes[rng.so];                                                                        // 3650
        nextPara = $(dom.emptyPara)[0];                                                                              // 3651
        if (next) {                                                                                                  // 3652
          rng.sc.insertBefore(nextPara, next);                                                                       // 3653
        } else {                                                                                                     // 3654
          rng.sc.appendChild(nextPara);                                                                              // 3655
        }                                                                                                            // 3656
      }                                                                                                              // 3657
                                                                                                                     // 3658
      range.create(nextPara, 0).normalize().select().scrollIntoView(editable);                                       // 3659
    };                                                                                                               // 3660
  };                                                                                                                 // 3661
                                                                                                                     // 3662
  /**                                                                                                                // 3663
   * @class editing.Table                                                                                            // 3664
   *                                                                                                                 // 3665
   * Table                                                                                                           // 3666
   *                                                                                                                 // 3667
   */                                                                                                                // 3668
  var Table = function () {                                                                                          // 3669
    /**                                                                                                              // 3670
     * handle tab key                                                                                                // 3671
     *                                                                                                               // 3672
     * @param {WrappedRange} rng                                                                                     // 3673
     * @param {Boolean} isShift                                                                                      // 3674
     */                                                                                                              // 3675
    this.tab = function (rng, isShift) {                                                                             // 3676
      var cell = dom.ancestor(rng.commonAncestor(), dom.isCell);                                                     // 3677
      var table = dom.ancestor(cell, dom.isTable);                                                                   // 3678
      var cells = dom.listDescendant(table, dom.isCell);                                                             // 3679
                                                                                                                     // 3680
      var nextCell = list[isShift ? 'prev' : 'next'](cells, cell);                                                   // 3681
      if (nextCell) {                                                                                                // 3682
        range.create(nextCell, 0).select();                                                                          // 3683
      }                                                                                                              // 3684
    };                                                                                                               // 3685
                                                                                                                     // 3686
    /**                                                                                                              // 3687
     * create empty table element                                                                                    // 3688
     *                                                                                                               // 3689
     * @param {Number} rowCount                                                                                      // 3690
     * @param {Number} colCount                                                                                      // 3691
     * @return {Node}                                                                                                // 3692
     */                                                                                                              // 3693
    this.createTable = function (colCount, rowCount, options) {                                                      // 3694
      var tds = [], tdHTML;                                                                                          // 3695
      for (var idxCol = 0; idxCol < colCount; idxCol++) {                                                            // 3696
        tds.push('<td>' + dom.blank + '</td>');                                                                      // 3697
      }                                                                                                              // 3698
      tdHTML = tds.join('');                                                                                         // 3699
                                                                                                                     // 3700
      var trs = [], trHTML;                                                                                          // 3701
      for (var idxRow = 0; idxRow < rowCount; idxRow++) {                                                            // 3702
        trs.push('<tr>' + tdHTML + '</tr>');                                                                         // 3703
      }                                                                                                              // 3704
      trHTML = trs.join('');                                                                                         // 3705
      var $table = $('<table>' + trHTML + '</table>');                                                               // 3706
      if (options && options.tableClassName) {                                                                       // 3707
        $table.addClass(options.tableClassName);                                                                     // 3708
      }                                                                                                              // 3709
                                                                                                                     // 3710
      return $table[0];                                                                                              // 3711
    };                                                                                                               // 3712
  };                                                                                                                 // 3713
                                                                                                                     // 3714
                                                                                                                     // 3715
  var KEY_BOGUS = 'bogus';                                                                                           // 3716
                                                                                                                     // 3717
  /**                                                                                                                // 3718
   * @class Editor                                                                                                   // 3719
   */                                                                                                                // 3720
  var Editor = function (context) {                                                                                  // 3721
    var self = this;                                                                                                 // 3722
                                                                                                                     // 3723
    var $note = context.layoutInfo.note;                                                                             // 3724
    var $editor = context.layoutInfo.editor;                                                                         // 3725
    var $editable = context.layoutInfo.editable;                                                                     // 3726
    var options = context.options;                                                                                   // 3727
    var lang = options.langInfo;                                                                                     // 3728
                                                                                                                     // 3729
    var editable = $editable[0];                                                                                     // 3730
    var lastRange = null;                                                                                            // 3731
                                                                                                                     // 3732
    var style = new Style();                                                                                         // 3733
    var table = new Table();                                                                                         // 3734
    var typing = new Typing();                                                                                       // 3735
    var bullet = new Bullet();                                                                                       // 3736
    var history = new History($editable);                                                                            // 3737
                                                                                                                     // 3738
    this.initialize = function () {                                                                                  // 3739
      // bind custom events                                                                                          // 3740
      $editable.on('keydown', function (event) {                                                                     // 3741
        if (event.keyCode === key.code.ENTER) {                                                                      // 3742
          context.triggerEvent('enter', event);                                                                      // 3743
        }                                                                                                            // 3744
        context.triggerEvent('keydown', event);                                                                      // 3745
                                                                                                                     // 3746
        if (options.shortcuts && !event.isDefaultPrevented()) {                                                      // 3747
          self.handleKeyMap(event);                                                                                  // 3748
        }                                                                                                            // 3749
      }).on('keyup', function (event) {                                                                              // 3750
        context.triggerEvent('keyup', event);                                                                        // 3751
      }).on('focus', function (event) {                                                                              // 3752
        context.triggerEvent('focus', event);                                                                        // 3753
      }).on('blur', function (event) {                                                                               // 3754
        context.triggerEvent('blur', event);                                                                         // 3755
      }).on('mousedown', function (event) {                                                                          // 3756
        context.triggerEvent('mousedown', event);                                                                    // 3757
      }).on('mouseup', function (event) {                                                                            // 3758
        context.triggerEvent('mouseup', event);                                                                      // 3759
      }).on('scroll', function (event) {                                                                             // 3760
        context.triggerEvent('scroll', event);                                                                       // 3761
      }).on('paste', function (event) {                                                                              // 3762
        context.triggerEvent('paste', event);                                                                        // 3763
      });                                                                                                            // 3764
                                                                                                                     // 3765
      // init content before set event                                                                               // 3766
      $editable.html(dom.html($note) || dom.emptyPara);                                                              // 3767
                                                                                                                     // 3768
      // [workaround] IE doesn't have input events for contentEditable                                               // 3769
      // - see: https://goo.gl/4bfIvA                                                                                // 3770
      var changeEventName = agent.isMSIE ? 'DOMCharacterDataModified DOMSubtreeModified DOMNodeInserted' : 'input';  // 3771
      $editable.on(changeEventName, function () {                                                                    // 3772
        context.triggerEvent('change', $editable.html());                                                            // 3773
      });                                                                                                            // 3774
                                                                                                                     // 3775
      $editor.on('focusin', function (event) {                                                                       // 3776
        context.triggerEvent('focusin', event);                                                                      // 3777
      }).on('focusout', function (event) {                                                                           // 3778
        context.triggerEvent('focusout', event);                                                                     // 3779
      });                                                                                                            // 3780
                                                                                                                     // 3781
      if (!options.airMode && options.height) {                                                                      // 3782
        this.setHeight(options.height);                                                                              // 3783
      }                                                                                                              // 3784
      if (!options.airMode && options.maxHeight) {                                                                   // 3785
        $editable.css('max-height', options.maxHeight);                                                              // 3786
      }                                                                                                              // 3787
      if (!options.airMode && options.minHeight) {                                                                   // 3788
        $editable.css('min-height', options.minHeight);                                                              // 3789
      }                                                                                                              // 3790
                                                                                                                     // 3791
      history.recordUndo();                                                                                          // 3792
    };                                                                                                               // 3793
                                                                                                                     // 3794
    this.destroy = function () {                                                                                     // 3795
      $editable.off();                                                                                               // 3796
    };                                                                                                               // 3797
                                                                                                                     // 3798
    this.handleKeyMap = function (event) {                                                                           // 3799
      var keyMap = options.keyMap[agent.isMac ? 'mac' : 'pc'];                                                       // 3800
      var keys = [];                                                                                                 // 3801
                                                                                                                     // 3802
      if (event.metaKey) { keys.push('CMD'); }                                                                       // 3803
      if (event.ctrlKey && !event.altKey) { keys.push('CTRL'); }                                                     // 3804
      if (event.shiftKey) { keys.push('SHIFT'); }                                                                    // 3805
                                                                                                                     // 3806
      var keyName = key.nameFromCode[event.keyCode];                                                                 // 3807
      if (keyName) {                                                                                                 // 3808
        keys.push(keyName);                                                                                          // 3809
      }                                                                                                              // 3810
                                                                                                                     // 3811
      var eventName = keyMap[keys.join('+')];                                                                        // 3812
      if (eventName) {                                                                                               // 3813
        event.preventDefault();                                                                                      // 3814
        context.invoke(eventName);                                                                                   // 3815
      } else if (key.isEdit(event.keyCode)) {                                                                        // 3816
        this.afterCommand();                                                                                         // 3817
      }                                                                                                              // 3818
    };                                                                                                               // 3819
                                                                                                                     // 3820
    /**                                                                                                              // 3821
     * create range                                                                                                  // 3822
     * @return {WrappedRange}                                                                                        // 3823
     */                                                                                                              // 3824
    this.createRange = function () {                                                                                 // 3825
      this.focus();                                                                                                  // 3826
      return range.create(editable);                                                                                 // 3827
    };                                                                                                               // 3828
                                                                                                                     // 3829
    /**                                                                                                              // 3830
     * saveRange                                                                                                     // 3831
     *                                                                                                               // 3832
     * save current range                                                                                            // 3833
     *                                                                                                               // 3834
     * @param {Boolean} [thenCollapse=false]                                                                         // 3835
     */                                                                                                              // 3836
    this.saveRange = function (thenCollapse) {                                                                       // 3837
      lastRange = this.createRange();                                                                                // 3838
      if (thenCollapse) {                                                                                            // 3839
        lastRange.collapse().select();                                                                               // 3840
      }                                                                                                              // 3841
    };                                                                                                               // 3842
                                                                                                                     // 3843
    /**                                                                                                              // 3844
     * restoreRange                                                                                                  // 3845
     *                                                                                                               // 3846
     * restore lately range                                                                                          // 3847
     */                                                                                                              // 3848
    this.restoreRange = function () {                                                                                // 3849
      if (lastRange) {                                                                                               // 3850
        lastRange.select();                                                                                          // 3851
        this.focus();                                                                                                // 3852
      }                                                                                                              // 3853
    };                                                                                                               // 3854
                                                                                                                     // 3855
    this.saveTarget = function (node) {                                                                              // 3856
      $editable.data('target', node);                                                                                // 3857
    };                                                                                                               // 3858
                                                                                                                     // 3859
    this.clearTarget = function () {                                                                                 // 3860
      $editable.removeData('target');                                                                                // 3861
    };                                                                                                               // 3862
                                                                                                                     // 3863
    this.restoreTarget = function () {                                                                               // 3864
      return $editable.data('target');                                                                               // 3865
    };                                                                                                               // 3866
                                                                                                                     // 3867
    /**                                                                                                              // 3868
     * currentStyle                                                                                                  // 3869
     *                                                                                                               // 3870
     * current style                                                                                                 // 3871
     * @return {Object|Boolean} unfocus                                                                              // 3872
     */                                                                                                              // 3873
    this.currentStyle = function () {                                                                                // 3874
      var rng = range.create();                                                                                      // 3875
      if (rng) {                                                                                                     // 3876
        rng = rng.normalize();                                                                                       // 3877
      }                                                                                                              // 3878
      return rng ? style.current(rng) : style.fromNode($editable);                                                   // 3879
    };                                                                                                               // 3880
                                                                                                                     // 3881
    /**                                                                                                              // 3882
     * style from node                                                                                               // 3883
     *                                                                                                               // 3884
     * @param {jQuery} $node                                                                                         // 3885
     * @return {Object}                                                                                              // 3886
     */                                                                                                              // 3887
    this.styleFromNode = function ($node) {                                                                          // 3888
      return style.fromNode($node);                                                                                  // 3889
    };                                                                                                               // 3890
                                                                                                                     // 3891
    /**                                                                                                              // 3892
     * undo                                                                                                          // 3893
     */                                                                                                              // 3894
    this.undo = function () {                                                                                        // 3895
      context.triggerEvent('before.command', $editable.html());                                                      // 3896
      history.undo();                                                                                                // 3897
      context.triggerEvent('change', $editable.html());                                                              // 3898
    };                                                                                                               // 3899
    context.memo('help.undo', lang.help.undo);                                                                       // 3900
                                                                                                                     // 3901
    /**                                                                                                              // 3902
     * redo                                                                                                          // 3903
     */                                                                                                              // 3904
    this.redo = function () {                                                                                        // 3905
      context.triggerEvent('before.command', $editable.html());                                                      // 3906
      history.redo();                                                                                                // 3907
      context.triggerEvent('change', $editable.html());                                                              // 3908
    };                                                                                                               // 3909
    context.memo('help.redo', lang.help.redo);                                                                       // 3910
                                                                                                                     // 3911
    /**                                                                                                              // 3912
     * before command                                                                                                // 3913
     */                                                                                                              // 3914
    var beforeCommand = this.beforeCommand = function () {                                                           // 3915
      context.triggerEvent('before.command', $editable.html());                                                      // 3916
      // keep focus on editable before command execution                                                             // 3917
      self.focus();                                                                                                  // 3918
    };                                                                                                               // 3919
                                                                                                                     // 3920
    /**                                                                                                              // 3921
     * after command                                                                                                 // 3922
     * @param {Boolean} isPreventTrigger                                                                             // 3923
     */                                                                                                              // 3924
    var afterCommand = this.afterCommand = function (isPreventTrigger) {                                             // 3925
      history.recordUndo();                                                                                          // 3926
      if (!isPreventTrigger) {                                                                                       // 3927
        context.triggerEvent('change', $editable.html());                                                            // 3928
      }                                                                                                              // 3929
    };                                                                                                               // 3930
                                                                                                                     // 3931
    /* jshint ignore:start */                                                                                        // 3932
    // native commands(with execCommand), generate function for execCommand                                          // 3933
    var commands = ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript',                      // 3934
                    'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull',                                   // 3935
                    'formatBlock', 'removeFormat',                                                                   // 3936
                    'backColor', 'foreColor', 'fontName'];                                                           // 3937
                                                                                                                     // 3938
    for (var idx = 0, len = commands.length; idx < len; idx ++) {                                                    // 3939
      this[commands[idx]] = (function (sCmd) {                                                                       // 3940
        return function (value) {                                                                                    // 3941
          beforeCommand();                                                                                           // 3942
          document.execCommand(sCmd, false, value);                                                                  // 3943
          afterCommand(true);                                                                                        // 3944
        };                                                                                                           // 3945
      })(commands[idx]);                                                                                             // 3946
      context.memo('help.' + commands[idx], lang.help[commands[idx]]);                                               // 3947
    }                                                                                                                // 3948
    /* jshint ignore:end */                                                                                          // 3949
                                                                                                                     // 3950
    /**                                                                                                              // 3951
     * handle tab key                                                                                                // 3952
     */                                                                                                              // 3953
    this.tab = function () {                                                                                         // 3954
      var rng = this.createRange();                                                                                  // 3955
      if (rng.isCollapsed() && rng.isOnCell()) {                                                                     // 3956
        table.tab(rng);                                                                                              // 3957
      } else {                                                                                                       // 3958
        beforeCommand();                                                                                             // 3959
        typing.insertTab(rng, options.tabSize);                                                                      // 3960
        afterCommand();                                                                                              // 3961
      }                                                                                                              // 3962
    };                                                                                                               // 3963
    context.memo('help.tab', lang.help.tab);                                                                         // 3964
                                                                                                                     // 3965
    /**                                                                                                              // 3966
     * handle shift+tab key                                                                                          // 3967
     */                                                                                                              // 3968
    this.untab = function () {                                                                                       // 3969
      var rng = this.createRange();                                                                                  // 3970
      if (rng.isCollapsed() && rng.isOnCell()) {                                                                     // 3971
        table.tab(rng, true);                                                                                        // 3972
      }                                                                                                              // 3973
    };                                                                                                               // 3974
    context.memo('help.untab', lang.help.untab);                                                                     // 3975
                                                                                                                     // 3976
    /**                                                                                                              // 3977
     * run given function between beforeCommand and afterCommand                                                     // 3978
     */                                                                                                              // 3979
    this.wrapCommand = function (fn) {                                                                               // 3980
      return function () {                                                                                           // 3981
        beforeCommand();                                                                                             // 3982
        fn.apply(self, arguments);                                                                                   // 3983
        afterCommand();                                                                                              // 3984
      };                                                                                                             // 3985
    };                                                                                                               // 3986
                                                                                                                     // 3987
    /**                                                                                                              // 3988
     * insert paragraph                                                                                              // 3989
     */                                                                                                              // 3990
    this.insertParagraph = this.wrapCommand(function () {                                                            // 3991
      typing.insertParagraph(editable);                                                                              // 3992
    });                                                                                                              // 3993
    context.memo('help.insertParagraph', lang.help.insertParagraph);                                                 // 3994
                                                                                                                     // 3995
    this.insertOrderedList = this.wrapCommand(function () {                                                          // 3996
      bullet.insertOrderedList(editable);                                                                            // 3997
    });                                                                                                              // 3998
    context.memo('help.insertOrderedList', lang.help.insertOrderedList);                                             // 3999
                                                                                                                     // 4000
    this.insertUnorderedList = this.wrapCommand(function () {                                                        // 4001
      bullet.insertUnorderedList(editable);                                                                          // 4002
    });                                                                                                              // 4003
    context.memo('help.insertUnorderedList', lang.help.insertUnorderedList);                                         // 4004
                                                                                                                     // 4005
    this.indent = this.wrapCommand(function () {                                                                     // 4006
      bullet.indent(editable);                                                                                       // 4007
    });                                                                                                              // 4008
    context.memo('help.indent', lang.help.indent);                                                                   // 4009
                                                                                                                     // 4010
    this.outdent = this.wrapCommand(function () {                                                                    // 4011
      bullet.outdent(editable);                                                                                      // 4012
    });                                                                                                              // 4013
    context.memo('help.outdent', lang.help.outdent);                                                                 // 4014
                                                                                                                     // 4015
    /**                                                                                                              // 4016
     * insert image                                                                                                  // 4017
     *                                                                                                               // 4018
     * @param {String} src                                                                                           // 4019
     * @param {String|Function} param                                                                                // 4020
     * @return {Promise}                                                                                             // 4021
     */                                                                                                              // 4022
    this.insertImage = function (src, param) {                                                                       // 4023
      return async.createImage(src, param).then(function ($image) {                                                  // 4024
        beforeCommand();                                                                                             // 4025
                                                                                                                     // 4026
        if (typeof param === 'function') {                                                                           // 4027
          param($image);                                                                                             // 4028
        } else {                                                                                                     // 4029
          if (typeof param === 'string') {                                                                           // 4030
            $image.attr('data-filename', param);                                                                     // 4031
          }                                                                                                          // 4032
          $image.css('width', Math.min($editable.width(), $image.width()));                                          // 4033
        }                                                                                                            // 4034
                                                                                                                     // 4035
        $image.show();                                                                                               // 4036
        range.create(editable).insertNode($image[0]);                                                                // 4037
        range.createFromNodeAfter($image[0]).select();                                                               // 4038
        afterCommand();                                                                                              // 4039
      }).fail(function (e) {                                                                                         // 4040
        context.triggerEvent('image.upload.error', e);                                                               // 4041
      });                                                                                                            // 4042
    };                                                                                                               // 4043
                                                                                                                     // 4044
    /**                                                                                                              // 4045
     * insertImages                                                                                                  // 4046
     * @param {File[]} files                                                                                         // 4047
     */                                                                                                              // 4048
    this.insertImages = function (files) {                                                                           // 4049
      $.each(files, function (idx, file) {                                                                           // 4050
        var filename = file.name;                                                                                    // 4051
        if (options.maximumImageFileSize && options.maximumImageFileSize < file.size) {                              // 4052
          context.triggerEvent('image.upload.error', lang.image.maximumFileSizeError);                               // 4053
        } else {                                                                                                     // 4054
          async.readFileAsDataURL(file).then(function (dataURL) {                                                    // 4055
            return self.insertImage(dataURL, filename);                                                              // 4056
          }).fail(function () {                                                                                      // 4057
            context.triggerEvent('image.upload.error');                                                              // 4058
          });                                                                                                        // 4059
        }                                                                                                            // 4060
      });                                                                                                            // 4061
    };                                                                                                               // 4062
                                                                                                                     // 4063
    /**                                                                                                              // 4064
     * insertImagesOrCallback                                                                                        // 4065
     * @param {File[]} files                                                                                         // 4066
     */                                                                                                              // 4067
    this.insertImagesOrCallback = function (files) {                                                                 // 4068
      var callbacks = options.callbacks;                                                                             // 4069
                                                                                                                     // 4070
      // If onImageUpload options setted                                                                             // 4071
      if (callbacks.onImageUpload) {                                                                                 // 4072
        context.triggerEvent('image.upload', files);                                                                 // 4073
      // else insert Image as dataURL                                                                                // 4074
      } else {                                                                                                       // 4075
        this.insertImages(files);                                                                                    // 4076
      }                                                                                                              // 4077
    };                                                                                                               // 4078
                                                                                                                     // 4079
    /**                                                                                                              // 4080
     * insertNode                                                                                                    // 4081
     * insert node                                                                                                   // 4082
     * @param {Node} node                                                                                            // 4083
     */                                                                                                              // 4084
    this.insertNode = this.wrapCommand(function (node) {                                                             // 4085
      var rng = this.createRange();                                                                                  // 4086
      rng.insertNode(node);                                                                                          // 4087
      range.createFromNodeAfter(node).select();                                                                      // 4088
    });                                                                                                              // 4089
                                                                                                                     // 4090
    /**                                                                                                              // 4091
     * insert text                                                                                                   // 4092
     * @param {String} text                                                                                          // 4093
     */                                                                                                              // 4094
    this.insertText = this.wrapCommand(function (text) {                                                             // 4095
      var rng = this.createRange();                                                                                  // 4096
      var textNode = rng.insertNode(dom.createText(text));                                                           // 4097
      range.create(textNode, dom.nodeLength(textNode)).select();                                                     // 4098
    });                                                                                                              // 4099
                                                                                                                     // 4100
    /**                                                                                                              // 4101
     * return selected plain text                                                                                    // 4102
     * @return {String} text                                                                                         // 4103
     */                                                                                                              // 4104
    this.getSelectedText = function () {                                                                             // 4105
      var rng = this.createRange();                                                                                  // 4106
                                                                                                                     // 4107
      // if range on anchor, expand range with anchor                                                                // 4108
      if (rng.isOnAnchor()) {                                                                                        // 4109
        rng = range.createFromNode(dom.ancestor(rng.sc, dom.isAnchor));                                              // 4110
      }                                                                                                              // 4111
                                                                                                                     // 4112
      return rng.toString();                                                                                         // 4113
    };                                                                                                               // 4114
                                                                                                                     // 4115
    /**                                                                                                              // 4116
     * paste HTML                                                                                                    // 4117
     * @param {String} markup                                                                                        // 4118
     */                                                                                                              // 4119
    this.pasteHTML = this.wrapCommand(function (markup) {                                                            // 4120
      var contents = this.createRange().pasteHTML(markup);                                                           // 4121
      range.createFromNodeAfter(list.last(contents)).select();                                                       // 4122
    });                                                                                                              // 4123
                                                                                                                     // 4124
    /**                                                                                                              // 4125
     * formatBlock                                                                                                   // 4126
     *                                                                                                               // 4127
     * @param {String} tagName                                                                                       // 4128
     */                                                                                                              // 4129
    this.formatBlock = this.wrapCommand(function (tagName) {                                                         // 4130
      // [workaround] for MSIE, IE need `<`                                                                          // 4131
      tagName = agent.isMSIE ? '<' + tagName + '>' : tagName;                                                        // 4132
      document.execCommand('FormatBlock', false, tagName);                                                           // 4133
    });                                                                                                              // 4134
                                                                                                                     // 4135
    this.formatPara = function () {                                                                                  // 4136
      this.formatBlock('P');                                                                                         // 4137
    };                                                                                                               // 4138
    context.memo('help.formatPara', lang.help.formatPara);                                                           // 4139
                                                                                                                     // 4140
    /* jshint ignore:start */                                                                                        // 4141
    for (var idx = 1; idx <= 6; idx ++) {                                                                            // 4142
      this['formatH' + idx] = function (idx) {                                                                       // 4143
        return function () {                                                                                         // 4144
          this.formatBlock('H' + idx);                                                                               // 4145
        };                                                                                                           // 4146
      }(idx);                                                                                                        // 4147
      context.memo('help.formatH'+idx, lang.help['formatH' + idx]);                                                  // 4148
    };                                                                                                               // 4149
    /* jshint ignore:end */                                                                                          // 4150
                                                                                                                     // 4151
    /**                                                                                                              // 4152
     * fontSize                                                                                                      // 4153
     *                                                                                                               // 4154
     * @param {String} value - px                                                                                    // 4155
     */                                                                                                              // 4156
    this.fontSize = function (value) {                                                                               // 4157
      var rng = this.createRange();                                                                                  // 4158
                                                                                                                     // 4159
      if (rng && rng.isCollapsed()) {                                                                                // 4160
        var spans = style.styleNodes(rng);                                                                           // 4161
        var firstSpan = list.head(spans);                                                                            // 4162
                                                                                                                     // 4163
        $(spans).css({                                                                                               // 4164
          'font-size': value + 'px'                                                                                  // 4165
        });                                                                                                          // 4166
                                                                                                                     // 4167
        // [workaround] added styled bogus span for style                                                            // 4168
        //  - also bogus character needed for cursor position                                                        // 4169
        if (firstSpan && !dom.nodeLength(firstSpan)) {                                                               // 4170
          firstSpan.innerHTML = dom.ZERO_WIDTH_NBSP_CHAR;                                                            // 4171
          range.createFromNodeAfter(firstSpan.firstChild).select();                                                  // 4172
          $editable.data(KEY_BOGUS, firstSpan);                                                                      // 4173
        }                                                                                                            // 4174
      } else {                                                                                                       // 4175
        beforeCommand();                                                                                             // 4176
        $(style.styleNodes(rng)).css({                                                                               // 4177
          'font-size': value + 'px'                                                                                  // 4178
        });                                                                                                          // 4179
        afterCommand();                                                                                              // 4180
      }                                                                                                              // 4181
    };                                                                                                               // 4182
                                                                                                                     // 4183
    /**                                                                                                              // 4184
     * insert horizontal rule                                                                                        // 4185
     */                                                                                                              // 4186
    this.insertHorizontalRule = this.wrapCommand(function () {                                                       // 4187
      var hrNode = this.createRange().insertNode(dom.create('HR'));                                                  // 4188
      if (hrNode.nextSibling) {                                                                                      // 4189
        range.create(hrNode.nextSibling, 0).normalize().select();                                                    // 4190
      }                                                                                                              // 4191
    });                                                                                                              // 4192
    context.memo('help.insertHorizontalRule', lang.help.insertHorizontalRule);                                       // 4193
                                                                                                                     // 4194
    /**                                                                                                              // 4195
     * remove bogus node and character                                                                               // 4196
     */                                                                                                              // 4197
    this.removeBogus = function () {                                                                                 // 4198
      var bogusNode = $editable.data(KEY_BOGUS);                                                                     // 4199
      if (!bogusNode) {                                                                                              // 4200
        return;                                                                                                      // 4201
      }                                                                                                              // 4202
                                                                                                                     // 4203
      var textNode = list.find(list.from(bogusNode.childNodes), dom.isText);                                         // 4204
                                                                                                                     // 4205
      var bogusCharIdx = textNode.nodeValue.indexOf(dom.ZERO_WIDTH_NBSP_CHAR);                                       // 4206
      if (bogusCharIdx !== -1) {                                                                                     // 4207
        textNode.deleteData(bogusCharIdx, 1);                                                                        // 4208
      }                                                                                                              // 4209
                                                                                                                     // 4210
      if (dom.isEmpty(bogusNode)) {                                                                                  // 4211
        dom.remove(bogusNode);                                                                                       // 4212
      }                                                                                                              // 4213
                                                                                                                     // 4214
      $editable.removeData(KEY_BOGUS);                                                                               // 4215
    };                                                                                                               // 4216
                                                                                                                     // 4217
    /**                                                                                                              // 4218
     * lineHeight                                                                                                    // 4219
     * @param {String} value                                                                                         // 4220
     */                                                                                                              // 4221
    this.lineHeight = this.wrapCommand(function (value) {                                                            // 4222
      style.stylePara(this.createRange(), {                                                                          // 4223
        lineHeight: value                                                                                            // 4224
      });                                                                                                            // 4225
    });                                                                                                              // 4226
                                                                                                                     // 4227
    /**                                                                                                              // 4228
     * unlink                                                                                                        // 4229
     *                                                                                                               // 4230
     * @type command                                                                                                 // 4231
     */                                                                                                              // 4232
    this.unlink = function () {                                                                                      // 4233
      var rng = this.createRange();                                                                                  // 4234
      if (rng.isOnAnchor()) {                                                                                        // 4235
        var anchor = dom.ancestor(rng.sc, dom.isAnchor);                                                             // 4236
        rng = range.createFromNode(anchor);                                                                          // 4237
        rng.select();                                                                                                // 4238
                                                                                                                     // 4239
        beforeCommand();                                                                                             // 4240
        document.execCommand('unlink');                                                                              // 4241
        afterCommand();                                                                                              // 4242
      }                                                                                                              // 4243
    };                                                                                                               // 4244
                                                                                                                     // 4245
    /**                                                                                                              // 4246
     * create link (command)                                                                                         // 4247
     *                                                                                                               // 4248
     * @param {Object} linkInfo                                                                                      // 4249
     */                                                                                                              // 4250
    this.createLink = this.wrapCommand(function (linkInfo) {                                                         // 4251
      var linkUrl = linkInfo.url;                                                                                    // 4252
      var linkText = linkInfo.text;                                                                                  // 4253
      var isNewWindow = linkInfo.isNewWindow;                                                                        // 4254
      var rng = linkInfo.range || this.createRange();                                                                // 4255
      var isTextChanged = rng.toString() !== linkText;                                                               // 4256
                                                                                                                     // 4257
      if (options.onCreateLink) {                                                                                    // 4258
        linkUrl = options.onCreateLink(linkUrl);                                                                     // 4259
      }                                                                                                              // 4260
                                                                                                                     // 4261
      var anchors = [];                                                                                              // 4262
      if (isTextChanged) {                                                                                           // 4263
        rng = rng.deleteContents();                                                                                  // 4264
        var anchor = rng.insertNode($('<A>' + linkText + '</A>')[0]);                                                // 4265
        anchors.push(anchor);                                                                                        // 4266
      } else {                                                                                                       // 4267
        anchors = style.styleNodes(rng, {                                                                            // 4268
          nodeName: 'A',                                                                                             // 4269
          expandClosestSibling: true,                                                                                // 4270
          onlyPartialContains: true                                                                                  // 4271
        });                                                                                                          // 4272
      }                                                                                                              // 4273
                                                                                                                     // 4274
      $.each(anchors, function (idx, anchor) {                                                                       // 4275
        $(anchor).attr('href', linkUrl);                                                                             // 4276
        if (isNewWindow) {                                                                                           // 4277
          $(anchor).attr('target', '_blank');                                                                        // 4278
        } else {                                                                                                     // 4279
          $(anchor).removeAttr('target');                                                                            // 4280
        }                                                                                                            // 4281
      });                                                                                                            // 4282
                                                                                                                     // 4283
      var startRange = range.createFromNodeBefore(list.head(anchors));                                               // 4284
      var startPoint = startRange.getStartPoint();                                                                   // 4285
      var endRange = range.createFromNodeAfter(list.last(anchors));                                                  // 4286
      var endPoint = endRange.getEndPoint();                                                                         // 4287
                                                                                                                     // 4288
      range.create(                                                                                                  // 4289
        startPoint.node,                                                                                             // 4290
        startPoint.offset,                                                                                           // 4291
        endPoint.node,                                                                                               // 4292
        endPoint.offset                                                                                              // 4293
      ).select();                                                                                                    // 4294
    });                                                                                                              // 4295
                                                                                                                     // 4296
    /**                                                                                                              // 4297
     * returns link info                                                                                             // 4298
     *                                                                                                               // 4299
     * @return {Object}                                                                                              // 4300
     * @return {WrappedRange} return.range                                                                           // 4301
     * @return {String} return.text                                                                                  // 4302
     * @return {Boolean} [return.isNewWindow=true]                                                                   // 4303
     * @return {String} [return.url=""]                                                                              // 4304
     */                                                                                                              // 4305
    this.getLinkInfo = function () {                                                                                 // 4306
      var rng = this.createRange().expand(dom.isAnchor);                                                             // 4307
                                                                                                                     // 4308
      // Get the first anchor on range(for edit).                                                                    // 4309
      var $anchor = $(list.head(rng.nodes(dom.isAnchor)));                                                           // 4310
                                                                                                                     // 4311
      return {                                                                                                       // 4312
        range: rng,                                                                                                  // 4313
        text: rng.toString(),                                                                                        // 4314
        isNewWindow: $anchor.length ? $anchor.attr('target') === '_blank' : false,                                   // 4315
        url: $anchor.length ? $anchor.attr('href') : ''                                                              // 4316
      };                                                                                                             // 4317
    };                                                                                                               // 4318
                                                                                                                     // 4319
    /**                                                                                                              // 4320
     * setting color                                                                                                 // 4321
     *                                                                                                               // 4322
     * @param {Object} sObjColor  color code                                                                         // 4323
     * @param {String} sObjColor.foreColor foreground color                                                          // 4324
     * @param {String} sObjColor.backColor background color                                                          // 4325
     */                                                                                                              // 4326
    this.color = this.wrapCommand(function (colorInfo) {                                                             // 4327
      var foreColor = colorInfo.foreColor;                                                                           // 4328
      var backColor = colorInfo.backColor;                                                                           // 4329
                                                                                                                     // 4330
      if (foreColor) { document.execCommand('foreColor', false, foreColor); }                                        // 4331
      if (backColor) { document.execCommand('backColor', false, backColor); }                                        // 4332
    });                                                                                                              // 4333
                                                                                                                     // 4334
    /**                                                                                                              // 4335
     * insert Table                                                                                                  // 4336
     *                                                                                                               // 4337
     * @param {String} dimension of table (ex : "5x5")                                                               // 4338
     */                                                                                                              // 4339
    this.insertTable = this.wrapCommand(function (dim) {                                                             // 4340
      var dimension = dim.split('x');                                                                                // 4341
                                                                                                                     // 4342
      var rng = this.createRange().deleteContents();                                                                 // 4343
      rng.insertNode(table.createTable(dimension[0], dimension[1], options));                                        // 4344
    });                                                                                                              // 4345
                                                                                                                     // 4346
    /**                                                                                                              // 4347
     * float me                                                                                                      // 4348
     *                                                                                                               // 4349
     * @param {String} value                                                                                         // 4350
     */                                                                                                              // 4351
    this.floatMe = this.wrapCommand(function (value) {                                                               // 4352
      var $target = $(this.restoreTarget());                                                                         // 4353
      $target.css('float', value);                                                                                   // 4354
    });                                                                                                              // 4355
                                                                                                                     // 4356
    /**                                                                                                              // 4357
     * resize overlay element                                                                                        // 4358
     * @param {String} value                                                                                         // 4359
     */                                                                                                              // 4360
    this.resize = this.wrapCommand(function (value) {                                                                // 4361
      var $target = $(this.restoreTarget());                                                                         // 4362
      $target.css({                                                                                                  // 4363
        width: value * 100 + '%',                                                                                    // 4364
        height: ''                                                                                                   // 4365
      });                                                                                                            // 4366
    });                                                                                                              // 4367
                                                                                                                     // 4368
    /**                                                                                                              // 4369
     * @param {Position} pos                                                                                         // 4370
     * @param {jQuery} $target - target element                                                                      // 4371
     * @param {Boolean} [bKeepRatio] - keep ratio                                                                    // 4372
     */                                                                                                              // 4373
    this.resizeTo = function (pos, $target, bKeepRatio) {                                                            // 4374
      var imageSize;                                                                                                 // 4375
      if (bKeepRatio) {                                                                                              // 4376
        var newRatio = pos.y / pos.x;                                                                                // 4377
        var ratio = $target.data('ratio');                                                                           // 4378
        imageSize = {                                                                                                // 4379
          width: ratio > newRatio ? pos.x : pos.y / ratio,                                                           // 4380
          height: ratio > newRatio ? pos.x * ratio : pos.y                                                           // 4381
        };                                                                                                           // 4382
      } else {                                                                                                       // 4383
        imageSize = {                                                                                                // 4384
          width: pos.x,                                                                                              // 4385
          height: pos.y                                                                                              // 4386
        };                                                                                                           // 4387
      }                                                                                                              // 4388
                                                                                                                     // 4389
      $target.css(imageSize);                                                                                        // 4390
    };                                                                                                               // 4391
                                                                                                                     // 4392
    /**                                                                                                              // 4393
     * remove media object                                                                                           // 4394
     */                                                                                                              // 4395
    this.removeMedia = this.wrapCommand(function () {                                                                // 4396
      var $target = $(this.restoreTarget()).detach();                                                                // 4397
      context.triggerEvent('media.delete', $target, $editable);                                                      // 4398
    });                                                                                                              // 4399
                                                                                                                     // 4400
    /**                                                                                                              // 4401
     * returns whether editable area has focus or not.                                                               // 4402
     */                                                                                                              // 4403
    this.hasFocus = function () {                                                                                    // 4404
      return $editable.is(':focus');                                                                                 // 4405
    };                                                                                                               // 4406
                                                                                                                     // 4407
    /**                                                                                                              // 4408
     * set focus                                                                                                     // 4409
     */                                                                                                              // 4410
    this.focus = function () {                                                                                       // 4411
      // [workaround] Screen will move when page is scolled in IE.                                                   // 4412
      //  - do focus when not focused                                                                                // 4413
      if (!this.hasFocus()) {                                                                                        // 4414
        $editable.focus();                                                                                           // 4415
      }                                                                                                              // 4416
    };                                                                                                               // 4417
                                                                                                                     // 4418
    /**                                                                                                              // 4419
     * returns whether contents is empty or not.                                                                     // 4420
     * @return {Boolean}                                                                                             // 4421
     */                                                                                                              // 4422
    this.isEmpty = function () {                                                                                     // 4423
      return dom.isEmpty($editable[0]) || dom.emptyPara === $editable.html();                                        // 4424
    };                                                                                                               // 4425
                                                                                                                     // 4426
    /**                                                                                                              // 4427
     * Removes all contents and restores the editable instance to an _emptyPara_.                                    // 4428
     */                                                                                                              // 4429
    this.empty = function () {                                                                                       // 4430
      context.invoke('code', dom.emptyPara);                                                                         // 4431
    };                                                                                                               // 4432
                                                                                                                     // 4433
    /**                                                                                                              // 4434
     * set height for editable                                                                                       // 4435
     */                                                                                                              // 4436
    this.setHeight = function (height) {                                                                             // 4437
      $editable.outerHeight(height);                                                                                 // 4438
    };                                                                                                               // 4439
  };                                                                                                                 // 4440
                                                                                                                     // 4441
  var Clipboard = function (context) {                                                                               // 4442
    var self = this;                                                                                                 // 4443
                                                                                                                     // 4444
    var $editable = context.layoutInfo.editable;                                                                     // 4445
                                                                                                                     // 4446
    this.events = {                                                                                                  // 4447
      'summernote.keydown': function (we, e) {                                                                       // 4448
        if (self.needKeydownHook()) {                                                                                // 4449
          if ((e.ctrlKey || e.metaKey) && e.keyCode === key.code.V) {                                                // 4450
            context.invoke('editor.saveRange');                                                                      // 4451
            self.$paste.focus();                                                                                     // 4452
                                                                                                                     // 4453
            setTimeout(function () {                                                                                 // 4454
              self.pasteByHook();                                                                                    // 4455
            }, 0);                                                                                                   // 4456
          }                                                                                                          // 4457
        }                                                                                                            // 4458
      }                                                                                                              // 4459
    };                                                                                                               // 4460
                                                                                                                     // 4461
    this.needKeydownHook = function () {                                                                             // 4462
      return (agent.isMSIE && agent.browserVersion > 10) || agent.isFF;                                              // 4463
    };                                                                                                               // 4464
                                                                                                                     // 4465
    this.initialize = function () {                                                                                  // 4466
      // [workaround] getting image from clipboard                                                                   // 4467
      //  - IE11 and Firefox: CTRL+v hook                                                                            // 4468
      //  - Webkit: event.clipboardData                                                                              // 4469
      if (this.needKeydownHook()) {                                                                                  // 4470
        this.$paste = $('<div />').attr('contenteditable', true).css({                                               // 4471
          position: 'absolute',                                                                                      // 4472
          left: -100000,                                                                                             // 4473
          opacity: 0                                                                                                 // 4474
        });                                                                                                          // 4475
        $editable.before(this.$paste);                                                                               // 4476
                                                                                                                     // 4477
        this.$paste.on('paste', function (event) {                                                                   // 4478
          context.triggerEvent('paste', event);                                                                      // 4479
        });                                                                                                          // 4480
      } else {                                                                                                       // 4481
        $editable.on('paste', this.pasteByEvent);                                                                    // 4482
      }                                                                                                              // 4483
    };                                                                                                               // 4484
                                                                                                                     // 4485
    this.destroy = function () {                                                                                     // 4486
      if (this.needKeydownHook()) {                                                                                  // 4487
        this.$paste.remove();                                                                                        // 4488
        this.$paste = null;                                                                                          // 4489
      }                                                                                                              // 4490
    };                                                                                                               // 4491
                                                                                                                     // 4492
    this.pasteByHook = function () {                                                                                 // 4493
      var node = this.$paste[0].firstChild;                                                                          // 4494
                                                                                                                     // 4495
      if (dom.isImg(node)) {                                                                                         // 4496
        var dataURI = node.src;                                                                                      // 4497
        var decodedData = atob(dataURI.split(',')[1]);                                                               // 4498
        var array = new Uint8Array(decodedData.length);                                                              // 4499
        for (var i = 0; i < decodedData.length; i++) {                                                               // 4500
          array[i] = decodedData.charCodeAt(i);                                                                      // 4501
        }                                                                                                            // 4502
                                                                                                                     // 4503
        var blob = new Blob([array], { type: 'image/png' });                                                         // 4504
        blob.name = 'clipboard.png';                                                                                 // 4505
                                                                                                                     // 4506
        context.invoke('editor.restoreRange');                                                                       // 4507
        context.invoke('editor.focus');                                                                              // 4508
        context.invoke('editor.insertImagesOrCallback', [blob]);                                                     // 4509
      } else {                                                                                                       // 4510
        var pasteContent = $('<div />').html(this.$paste.html()).html();                                             // 4511
        context.invoke('editor.restoreRange');                                                                       // 4512
        context.invoke('editor.focus');                                                                              // 4513
                                                                                                                     // 4514
        if (pasteContent) {                                                                                          // 4515
          context.invoke('editor.pasteHTML', pasteContent);                                                          // 4516
        }                                                                                                            // 4517
      }                                                                                                              // 4518
                                                                                                                     // 4519
      this.$paste.empty();                                                                                           // 4520
    };                                                                                                               // 4521
                                                                                                                     // 4522
    /**                                                                                                              // 4523
     * paste by clipboard event                                                                                      // 4524
     *                                                                                                               // 4525
     * @param {Event} event                                                                                          // 4526
     */                                                                                                              // 4527
    this.pasteByEvent = function (event) {                                                                           // 4528
      var clipboardData = event.originalEvent.clipboardData;                                                         // 4529
      if (clipboardData && clipboardData.items && clipboardData.items.length) {                                      // 4530
        var item = list.head(clipboardData.items);                                                                   // 4531
        if (item.kind === 'file' && item.type.indexOf('image/') !== -1) {                                            // 4532
          context.invoke('editor.insertImagesOrCallback', [item.getAsFile()]);                                       // 4533
        }                                                                                                            // 4534
        context.invoke('editor.afterCommand');                                                                       // 4535
      }                                                                                                              // 4536
    };                                                                                                               // 4537
  };                                                                                                                 // 4538
                                                                                                                     // 4539
  var Dropzone = function (context) {                                                                                // 4540
    var $document = $(document);                                                                                     // 4541
    var $editor = context.layoutInfo.editor;                                                                         // 4542
    var $editable = context.layoutInfo.editable;                                                                     // 4543
    var options = context.options;                                                                                   // 4544
    var lang = options.langInfo;                                                                                     // 4545
                                                                                                                     // 4546
    var $dropzone = $([                                                                                              // 4547
      '<div class="note-dropzone">',                                                                                 // 4548
      '  <div class="note-dropzone-message"/>',                                                                      // 4549
      '</div>'                                                                                                       // 4550
    ].join('')).prependTo($editor);                                                                                  // 4551
                                                                                                                     // 4552
    /**                                                                                                              // 4553
     * attach Drag and Drop Events                                                                                   // 4554
     */                                                                                                              // 4555
    this.initialize = function () {                                                                                  // 4556
      if (options.disableDragAndDrop) {                                                                              // 4557
        // prevent default drop event                                                                                // 4558
        $document.on('drop', function (e) {                                                                          // 4559
          e.preventDefault();                                                                                        // 4560
        });                                                                                                          // 4561
      } else {                                                                                                       // 4562
        this.attachDragAndDropEvent();                                                                               // 4563
      }                                                                                                              // 4564
    };                                                                                                               // 4565
                                                                                                                     // 4566
    /**                                                                                                              // 4567
     * attach Drag and Drop Events                                                                                   // 4568
     */                                                                                                              // 4569
    this.attachDragAndDropEvent = function () {                                                                      // 4570
      var collection = $(),                                                                                          // 4571
          $dropzoneMessage = $dropzone.find('.note-dropzone-message');                                               // 4572
                                                                                                                     // 4573
      // show dropzone on dragenter when dragging a object to document                                               // 4574
      // -but only if the editor is visible, i.e. has a positive width and height                                    // 4575
      $document.on('dragenter', function (e) {                                                                       // 4576
        var isCodeview = context.invoke('codeview.isActivated');                                                     // 4577
        var hasEditorSize = $editor.width() > 0 && $editor.height() > 0;                                             // 4578
        if (!isCodeview && !collection.length && hasEditorSize) {                                                    // 4579
          $editor.addClass('dragover');                                                                              // 4580
          $dropzone.width($editor.width());                                                                          // 4581
          $dropzone.height($editor.height());                                                                        // 4582
          $dropzoneMessage.text(lang.image.dragImageHere);                                                           // 4583
        }                                                                                                            // 4584
        collection = collection.add(e.target);                                                                       // 4585
      }).on('dragleave', function (e) {                                                                              // 4586
        collection = collection.not(e.target);                                                                       // 4587
        if (!collection.length) {                                                                                    // 4588
          $editor.removeClass('dragover');                                                                           // 4589
        }                                                                                                            // 4590
      }).on('drop', function () {                                                                                    // 4591
        collection = $();                                                                                            // 4592
        $editor.removeClass('dragover');                                                                             // 4593
      });                                                                                                            // 4594
                                                                                                                     // 4595
      // change dropzone's message on hover.                                                                         // 4596
      $dropzone.on('dragenter', function () {                                                                        // 4597
        $dropzone.addClass('hover');                                                                                 // 4598
        $dropzoneMessage.text(lang.image.dropImage);                                                                 // 4599
      }).on('dragleave', function () {                                                                               // 4600
        $dropzone.removeClass('hover');                                                                              // 4601
        $dropzoneMessage.text(lang.image.dragImageHere);                                                             // 4602
      });                                                                                                            // 4603
                                                                                                                     // 4604
      // attach dropImage                                                                                            // 4605
      $dropzone.on('drop', function (event) {                                                                        // 4606
        var dataTransfer = event.originalEvent.dataTransfer;                                                         // 4607
                                                                                                                     // 4608
        if (dataTransfer && dataTransfer.files && dataTransfer.files.length) {                                       // 4609
          event.preventDefault();                                                                                    // 4610
          $editable.focus();                                                                                         // 4611
          context.invoke('editor.insertImagesOrCallback', dataTransfer.files);                                       // 4612
        } else {                                                                                                     // 4613
          $.each(dataTransfer.types, function (idx, type) {                                                          // 4614
            var content = dataTransfer.getData(type);                                                                // 4615
                                                                                                                     // 4616
            if (type.toLowerCase().indexOf('text') > -1) {                                                           // 4617
              context.invoke('editor.pasteHTML', content);                                                           // 4618
            } else {                                                                                                 // 4619
              $(content).each(function () {                                                                          // 4620
                context.invoke('editor.insertNode', this);                                                           // 4621
              });                                                                                                    // 4622
            }                                                                                                        // 4623
          });                                                                                                        // 4624
        }                                                                                                            // 4625
      }).on('dragover', false); // prevent default dragover event                                                    // 4626
    };                                                                                                               // 4627
  };                                                                                                                 // 4628
                                                                                                                     // 4629
                                                                                                                     // 4630
  var CodeMirror;                                                                                                    // 4631
  if (agent.hasCodeMirror) {                                                                                         // 4632
    if (agent.isSupportAmd) {                                                                                        // 4633
      require(['codemirror'], function (cm) {                                                                        // 4634
        CodeMirror = cm;                                                                                             // 4635
      });                                                                                                            // 4636
    } else {                                                                                                         // 4637
      CodeMirror = window.CodeMirror;                                                                                // 4638
    }                                                                                                                // 4639
  }                                                                                                                  // 4640
                                                                                                                     // 4641
  /**                                                                                                                // 4642
   * @class Codeview                                                                                                 // 4643
   */                                                                                                                // 4644
  var Codeview = function (context) {                                                                                // 4645
    var $editor = context.layoutInfo.editor;                                                                         // 4646
    var $editable = context.layoutInfo.editable;                                                                     // 4647
    var $codable = context.layoutInfo.codable;                                                                       // 4648
    var options = context.options;                                                                                   // 4649
                                                                                                                     // 4650
    this.sync = function () {                                                                                        // 4651
      var isCodeview = this.isActivated();                                                                           // 4652
      if (isCodeview && agent.hasCodeMirror) {                                                                       // 4653
        $codable.data('cmEditor').save();                                                                            // 4654
      }                                                                                                              // 4655
    };                                                                                                               // 4656
                                                                                                                     // 4657
    /**                                                                                                              // 4658
     * @return {Boolean}                                                                                             // 4659
     */                                                                                                              // 4660
    this.isActivated = function () {                                                                                 // 4661
      return $editor.hasClass('codeview');                                                                           // 4662
    };                                                                                                               // 4663
                                                                                                                     // 4664
    /**                                                                                                              // 4665
     * toggle codeview                                                                                               // 4666
     */                                                                                                              // 4667
    this.toggle = function () {                                                                                      // 4668
      if (this.isActivated()) {                                                                                      // 4669
        this.deactivate();                                                                                           // 4670
      } else {                                                                                                       // 4671
        this.activate();                                                                                             // 4672
      }                                                                                                              // 4673
      context.triggerEvent('codeview.toggled');                                                                      // 4674
    };                                                                                                               // 4675
                                                                                                                     // 4676
    /**                                                                                                              // 4677
     * activate code view                                                                                            // 4678
     */                                                                                                              // 4679
    this.activate = function () {                                                                                    // 4680
      $codable.val(dom.html($editable, options.prettifyHtml));                                                       // 4681
      $codable.height($editable.height());                                                                           // 4682
                                                                                                                     // 4683
      context.invoke('toolbar.updateCodeview', true);                                                                // 4684
      $editor.addClass('codeview');                                                                                  // 4685
      $codable.focus();                                                                                              // 4686
                                                                                                                     // 4687
      // activate CodeMirror as codable                                                                              // 4688
      if (agent.hasCodeMirror) {                                                                                     // 4689
        var cmEditor = CodeMirror.fromTextArea($codable[0], options.codemirror);                                     // 4690
                                                                                                                     // 4691
        // CodeMirror TernServer                                                                                     // 4692
        if (options.codemirror.tern) {                                                                               // 4693
          var server = new CodeMirror.TernServer(options.codemirror.tern);                                           // 4694
          cmEditor.ternServer = server;                                                                              // 4695
          cmEditor.on('cursorActivity', function (cm) {                                                              // 4696
            server.updateArgHints(cm);                                                                               // 4697
          });                                                                                                        // 4698
        }                                                                                                            // 4699
                                                                                                                     // 4700
        // CodeMirror hasn't Padding.                                                                                // 4701
        cmEditor.setSize(null, $editable.outerHeight());                                                             // 4702
        $codable.data('cmEditor', cmEditor);                                                                         // 4703
      }                                                                                                              // 4704
    };                                                                                                               // 4705
                                                                                                                     // 4706
    /**                                                                                                              // 4707
     * deactivate code view                                                                                          // 4708
     */                                                                                                              // 4709
    this.deactivate = function () {                                                                                  // 4710
      // deactivate CodeMirror as codable                                                                            // 4711
      if (agent.hasCodeMirror) {                                                                                     // 4712
        var cmEditor = $codable.data('cmEditor');                                                                    // 4713
        $codable.val(cmEditor.getValue());                                                                           // 4714
        cmEditor.toTextArea();                                                                                       // 4715
      }                                                                                                              // 4716
                                                                                                                     // 4717
      var value = dom.value($codable, options.prettifyHtml) || dom.emptyPara;                                        // 4718
      var isChange = $editable.html() !== value;                                                                     // 4719
                                                                                                                     // 4720
      $editable.html(value);                                                                                         // 4721
      $editable.height(options.height ? $codable.height() : 'auto');                                                 // 4722
      $editor.removeClass('codeview');                                                                               // 4723
                                                                                                                     // 4724
      if (isChange) {                                                                                                // 4725
        context.triggerEvent('change', $editable.html(), $editable);                                                 // 4726
      }                                                                                                              // 4727
                                                                                                                     // 4728
      $editable.focus();                                                                                             // 4729
                                                                                                                     // 4730
      context.invoke('toolbar.updateCodeview', false);                                                               // 4731
    };                                                                                                               // 4732
                                                                                                                     // 4733
    this.destroy = function () {                                                                                     // 4734
      if (this.isActivated()) {                                                                                      // 4735
        this.deactivate();                                                                                           // 4736
      }                                                                                                              // 4737
    };                                                                                                               // 4738
  };                                                                                                                 // 4739
                                                                                                                     // 4740
  var EDITABLE_PADDING = 24;                                                                                         // 4741
                                                                                                                     // 4742
  var Statusbar = function (context) {                                                                               // 4743
    var $document = $(document);                                                                                     // 4744
    var $statusbar = context.layoutInfo.statusbar;                                                                   // 4745
    var $editable = context.layoutInfo.editable;                                                                     // 4746
    var options = context.options;                                                                                   // 4747
                                                                                                                     // 4748
    this.initialize = function () {                                                                                  // 4749
      if (options.airMode || options.disableResizeEditor) {                                                          // 4750
        return;                                                                                                      // 4751
      }                                                                                                              // 4752
                                                                                                                     // 4753
      $statusbar.on('mousedown', function (event) {                                                                  // 4754
        event.preventDefault();                                                                                      // 4755
        event.stopPropagation();                                                                                     // 4756
                                                                                                                     // 4757
        var editableTop = $editable.offset().top - $document.scrollTop();                                            // 4758
                                                                                                                     // 4759
        $document.on('mousemove', function (event) {                                                                 // 4760
          var height = event.clientY - (editableTop + EDITABLE_PADDING);                                             // 4761
                                                                                                                     // 4762
          height = (options.minheight > 0) ? Math.max(height, options.minheight) : height;                           // 4763
          height = (options.maxHeight > 0) ? Math.min(height, options.maxHeight) : height;                           // 4764
                                                                                                                     // 4765
          $editable.height(height);                                                                                  // 4766
        }).one('mouseup', function () {                                                                              // 4767
          $document.off('mousemove');                                                                                // 4768
        });                                                                                                          // 4769
      });                                                                                                            // 4770
    };                                                                                                               // 4771
                                                                                                                     // 4772
    this.destroy = function () {                                                                                     // 4773
      $statusbar.off();                                                                                              // 4774
    };                                                                                                               // 4775
  };                                                                                                                 // 4776
                                                                                                                     // 4777
  var Fullscreen = function (context) {                                                                              // 4778
    var $editor = context.layoutInfo.editor;                                                                         // 4779
    var $toolbar = context.layoutInfo.toolbar;                                                                       // 4780
    var $editable = context.layoutInfo.editable;                                                                     // 4781
    var $codable = context.layoutInfo.codable;                                                                       // 4782
                                                                                                                     // 4783
    var $window = $(window);                                                                                         // 4784
    var $scrollbar = $('html, body');                                                                                // 4785
                                                                                                                     // 4786
    /**                                                                                                              // 4787
     * toggle fullscreen                                                                                             // 4788
     */                                                                                                              // 4789
    this.toggle = function () {                                                                                      // 4790
      var resize = function (size) {                                                                                 // 4791
        $editable.css('height', size.h);                                                                             // 4792
        $codable.css('height', size.h);                                                                              // 4793
        if ($codable.data('cmeditor')) {                                                                             // 4794
          $codable.data('cmeditor').setsize(null, size.h);                                                           // 4795
        }                                                                                                            // 4796
      };                                                                                                             // 4797
                                                                                                                     // 4798
      $editor.toggleClass('fullscreen');                                                                             // 4799
      if (this.isFullscreen()) {                                                                                     // 4800
        $editable.data('orgHeight', $editable.css('height'));                                                        // 4801
                                                                                                                     // 4802
        $window.on('resize', function () {                                                                           // 4803
          resize({                                                                                                   // 4804
            h: $window.height() - $toolbar.outerHeight()                                                             // 4805
          });                                                                                                        // 4806
        }).trigger('resize');                                                                                        // 4807
                                                                                                                     // 4808
        $scrollbar.css('overflow', 'hidden');                                                                        // 4809
      } else {                                                                                                       // 4810
        $window.off('resize');                                                                                       // 4811
        resize({                                                                                                     // 4812
          h: $editable.data('orgHeight')                                                                             // 4813
        });                                                                                                          // 4814
        $scrollbar.css('overflow', 'visible');                                                                       // 4815
      }                                                                                                              // 4816
                                                                                                                     // 4817
      context.invoke('toolbar.updateFullscreen', this.isFullscreen());                                               // 4818
    };                                                                                                               // 4819
                                                                                                                     // 4820
    this.isFullscreen = function () {                                                                                // 4821
      return $editor.hasClass('fullscreen');                                                                         // 4822
    };                                                                                                               // 4823
  };                                                                                                                 // 4824
                                                                                                                     // 4825
  var Handle = function (context) {                                                                                  // 4826
    var self = this;                                                                                                 // 4827
                                                                                                                     // 4828
    var $document = $(document);                                                                                     // 4829
    var $editingArea = context.layoutInfo.editingArea;                                                               // 4830
    var options = context.options;                                                                                   // 4831
                                                                                                                     // 4832
    this.events = {                                                                                                  // 4833
      'summernote.mousedown': function (we, e) {                                                                     // 4834
        if (self.update(e.target)) {                                                                                 // 4835
          e.preventDefault();                                                                                        // 4836
        }                                                                                                            // 4837
      },                                                                                                             // 4838
      'summernote.keyup summernote.scroll summernote.change summernote.dialog.shown': function () {                  // 4839
        self.update();                                                                                               // 4840
      }                                                                                                              // 4841
    };                                                                                                               // 4842
                                                                                                                     // 4843
    this.initialize = function () {                                                                                  // 4844
      this.$handle = $([                                                                                             // 4845
        '<div class="note-handle">',                                                                                 // 4846
        '<div class="note-control-selection">',                                                                      // 4847
        '<div class="note-control-selection-bg"></div>',                                                             // 4848
        '<div class="note-control-holder note-control-nw"></div>',                                                   // 4849
        '<div class="note-control-holder note-control-ne"></div>',                                                   // 4850
        '<div class="note-control-holder note-control-sw"></div>',                                                   // 4851
        '<div class="',                                                                                              // 4852
        (options.disableResizeImage ? 'note-control-holder' : 'note-control-sizing'),                                // 4853
        ' note-control-se"></div>',                                                                                  // 4854
        (options.disableResizeImage ? '' : '<div class="note-control-selection-info"></div>'),                       // 4855
        '</div>',                                                                                                    // 4856
        '</div>'                                                                                                     // 4857
      ].join('')).prependTo($editingArea);                                                                           // 4858
                                                                                                                     // 4859
      this.$handle.on('mousedown', function (event) {                                                                // 4860
        if (dom.isControlSizing(event.target)) {                                                                     // 4861
          event.preventDefault();                                                                                    // 4862
          event.stopPropagation();                                                                                   // 4863
                                                                                                                     // 4864
          var $target = self.$handle.find('.note-control-selection').data('target'),                                 // 4865
              posStart = $target.offset(),                                                                           // 4866
              scrollTop = $document.scrollTop();                                                                     // 4867
                                                                                                                     // 4868
          $document.on('mousemove', function (event) {                                                               // 4869
            context.invoke('editor.resizeTo', {                                                                      // 4870
              x: event.clientX - posStart.left,                                                                      // 4871
              y: event.clientY - (posStart.top - scrollTop)                                                          // 4872
            }, $target, !event.shiftKey);                                                                            // 4873
                                                                                                                     // 4874
            self.update($target[0]);                                                                                 // 4875
          }).one('mouseup', function (e) {                                                                           // 4876
            e.preventDefault();                                                                                      // 4877
            $document.off('mousemove');                                                                              // 4878
            context.invoke('editor.afterCommand');                                                                   // 4879
          });                                                                                                        // 4880
                                                                                                                     // 4881
          if (!$target.data('ratio')) { // original ratio.                                                           // 4882
            $target.data('ratio', $target.height() / $target.width());                                               // 4883
          }                                                                                                          // 4884
        }                                                                                                            // 4885
      });                                                                                                            // 4886
    };                                                                                                               // 4887
                                                                                                                     // 4888
    this.destroy = function () {                                                                                     // 4889
      this.$handle.remove();                                                                                         // 4890
    };                                                                                                               // 4891
                                                                                                                     // 4892
    this.update = function (target) {                                                                                // 4893
      var isImage = dom.isImg(target);                                                                               // 4894
      var $selection = this.$handle.find('.note-control-selection');                                                 // 4895
                                                                                                                     // 4896
      context.invoke('imagePopover.update', target);                                                                 // 4897
                                                                                                                     // 4898
      if (isImage) {                                                                                                 // 4899
        var $image = $(target);                                                                                      // 4900
        var pos = $image.position();                                                                                 // 4901
                                                                                                                     // 4902
        // include margin                                                                                            // 4903
        var imageSize = {                                                                                            // 4904
          w: $image.outerWidth(true),                                                                                // 4905
          h: $image.outerHeight(true)                                                                                // 4906
        };                                                                                                           // 4907
                                                                                                                     // 4908
        $selection.css({                                                                                             // 4909
          display: 'block',                                                                                          // 4910
          left: pos.left,                                                                                            // 4911
          top: pos.top,                                                                                              // 4912
          width: imageSize.w,                                                                                        // 4913
          height: imageSize.h                                                                                        // 4914
        }).data('target', $image); // save current image element.                                                    // 4915
                                                                                                                     // 4916
        var sizingText = imageSize.w + 'x' + imageSize.h;                                                            // 4917
        $selection.find('.note-control-selection-info').text(sizingText);                                            // 4918
        context.invoke('editor.saveTarget', target);                                                                 // 4919
      } else {                                                                                                       // 4920
        this.hide();                                                                                                 // 4921
      }                                                                                                              // 4922
                                                                                                                     // 4923
      return isImage;                                                                                                // 4924
    };                                                                                                               // 4925
                                                                                                                     // 4926
    /**                                                                                                              // 4927
     * hide                                                                                                          // 4928
     *                                                                                                               // 4929
     * @param {jQuery} $handle                                                                                       // 4930
     */                                                                                                              // 4931
    this.hide = function () {                                                                                        // 4932
      context.invoke('editor.clearTarget');                                                                          // 4933
      this.$handle.children().hide();                                                                                // 4934
    };                                                                                                               // 4935
  };                                                                                                                 // 4936
                                                                                                                     // 4937
  var AutoLink = function (context) {                                                                                // 4938
    var self = this;                                                                                                 // 4939
    var defaultScheme = 'http://';                                                                                   // 4940
    var linkPattern = /^(https?:\/\/|ssh:\/\/|ftp:\/\/|file:\/|mailto:[A-Z0-9._%+-]+@)?(www\.)?(.+)$/i;              // 4941
                                                                                                                     // 4942
    this.events = {                                                                                                  // 4943
      'summernote.keyup': function (we, e) {                                                                         // 4944
        if (!e.isDefaultPrevented()) {                                                                               // 4945
          self.handleKeyup(e);                                                                                       // 4946
        }                                                                                                            // 4947
      },                                                                                                             // 4948
      'summernote.keydown': function (we, e) {                                                                       // 4949
        self.handleKeydown(e);                                                                                       // 4950
      }                                                                                                              // 4951
    };                                                                                                               // 4952
                                                                                                                     // 4953
    this.initialize = function () {                                                                                  // 4954
      this.lastWordRange = null;                                                                                     // 4955
    };                                                                                                               // 4956
                                                                                                                     // 4957
    this.destroy = function () {                                                                                     // 4958
      this.lastWordRange = null;                                                                                     // 4959
    };                                                                                                               // 4960
                                                                                                                     // 4961
    this.replace = function () {                                                                                     // 4962
      if (!this.lastWordRange) {                                                                                     // 4963
        return;                                                                                                      // 4964
      }                                                                                                              // 4965
                                                                                                                     // 4966
      var keyword = this.lastWordRange.toString();                                                                   // 4967
      var match = keyword.match(linkPattern);                                                                        // 4968
                                                                                                                     // 4969
      if (match && (match[1] || match[2])) {                                                                         // 4970
        var link = match[1] ? keyword : defaultScheme + keyword;                                                     // 4971
        var node = $('<a />').html(keyword).attr('href', link)[0];                                                   // 4972
                                                                                                                     // 4973
        this.lastWordRange.insertNode(node);                                                                         // 4974
        this.lastWordRange = null;                                                                                   // 4975
        context.invoke('editor.focus');                                                                              // 4976
      }                                                                                                              // 4977
                                                                                                                     // 4978
    };                                                                                                               // 4979
                                                                                                                     // 4980
    this.handleKeydown = function (e) {                                                                              // 4981
      if (list.contains([key.code.ENTER, key.code.SPACE], e.keyCode)) {                                              // 4982
        var wordRange = context.invoke('editor.createRange').getWordRange();                                         // 4983
        this.lastWordRange = wordRange;                                                                              // 4984
      }                                                                                                              // 4985
    };                                                                                                               // 4986
                                                                                                                     // 4987
    this.handleKeyup = function (e) {                                                                                // 4988
      if (list.contains([key.code.ENTER, key.code.SPACE], e.keyCode)) {                                              // 4989
        this.replace();                                                                                              // 4990
      }                                                                                                              // 4991
    };                                                                                                               // 4992
  };                                                                                                                 // 4993
                                                                                                                     // 4994
  /**                                                                                                                // 4995
   * textarea auto sync.                                                                                             // 4996
   */                                                                                                                // 4997
  var AutoSync = function (context) {                                                                                // 4998
    var $note = context.layoutInfo.note;                                                                             // 4999
                                                                                                                     // 5000
    this.events = {                                                                                                  // 5001
      'summernote.change': function () {                                                                             // 5002
        $note.val(context.invoke('code'));                                                                           // 5003
      }                                                                                                              // 5004
    };                                                                                                               // 5005
                                                                                                                     // 5006
    this.shouldInitialize = function () {                                                                            // 5007
      return dom.isTextarea($note[0]);                                                                               // 5008
    };                                                                                                               // 5009
  };                                                                                                                 // 5010
                                                                                                                     // 5011
  var Placeholder = function (context) {                                                                             // 5012
    var self = this;                                                                                                 // 5013
    var $editingArea = context.layoutInfo.editingArea;                                                               // 5014
    var options = context.options;                                                                                   // 5015
                                                                                                                     // 5016
    this.events = {                                                                                                  // 5017
      'summernote.init summernote.change': function () {                                                             // 5018
        self.update();                                                                                               // 5019
      },                                                                                                             // 5020
      'summernote.codeview.toggled': function () {                                                                   // 5021
        self.update();                                                                                               // 5022
      }                                                                                                              // 5023
    };                                                                                                               // 5024
                                                                                                                     // 5025
    this.shouldInitialize = function () {                                                                            // 5026
      return !!options.placeholder;                                                                                  // 5027
    };                                                                                                               // 5028
                                                                                                                     // 5029
    this.initialize = function () {                                                                                  // 5030
      this.$placeholder = $('<div class="note-placeholder">');                                                       // 5031
      this.$placeholder.on('click', function () {                                                                    // 5032
        context.invoke('focus');                                                                                     // 5033
      }).text(options.placeholder).prependTo($editingArea);                                                          // 5034
    };                                                                                                               // 5035
                                                                                                                     // 5036
    this.destroy = function () {                                                                                     // 5037
      this.$placeholder.remove();                                                                                    // 5038
    };                                                                                                               // 5039
                                                                                                                     // 5040
    this.update = function () {                                                                                      // 5041
      var isShow = !context.invoke('codeview.isActivated') && context.invoke('editor.isEmpty');                      // 5042
      this.$placeholder.toggle(isShow);                                                                              // 5043
    };                                                                                                               // 5044
  };                                                                                                                 // 5045
                                                                                                                     // 5046
  var Buttons = function (context) {                                                                                 // 5047
    var self = this;                                                                                                 // 5048
    var ui = $.summernote.ui;                                                                                        // 5049
                                                                                                                     // 5050
    var $toolbar = context.layoutInfo.toolbar;                                                                       // 5051
    var options = context.options;                                                                                   // 5052
    var lang = options.langInfo;                                                                                     // 5053
                                                                                                                     // 5054
    var invertedKeyMap = func.invertObject(options.keyMap[agent.isMac ? 'mac' : 'pc']);                              // 5055
                                                                                                                     // 5056
    var representShortcut = this.representShortcut = function (editorMethod) {                                       // 5057
      var shortcut = invertedKeyMap[editorMethod];                                                                   // 5058
      if (agent.isMac) {                                                                                             // 5059
        shortcut = shortcut.replace('CMD', '⌘').replace('SHIFT', '⇧');                                               // 5060
      }                                                                                                              // 5061
                                                                                                                     // 5062
      shortcut = shortcut.replace('BACKSLASH', '\\')                                                                 // 5063
                         .replace('SLASH', '/')                                                                      // 5064
                         .replace('LEFTBRACKET', '[')                                                                // 5065
                         .replace('RIGHTBRACKET', ']');                                                              // 5066
                                                                                                                     // 5067
      return ' (' + shortcut + ')';                                                                                  // 5068
    };                                                                                                               // 5069
                                                                                                                     // 5070
    this.initialize = function () {                                                                                  // 5071
      this.addToolbarButtons();                                                                                      // 5072
      this.addImagePopoverButtons();                                                                                 // 5073
      this.addLinkPopoverButtons();                                                                                  // 5074
      this.fontInstalledMap = {};                                                                                    // 5075
    };                                                                                                               // 5076
                                                                                                                     // 5077
    this.destroy = function () {                                                                                     // 5078
      delete this.fontInstalledMap;                                                                                  // 5079
    };                                                                                                               // 5080
                                                                                                                     // 5081
    this.isFontInstalled = function (name) {                                                                         // 5082
      if (!self.fontInstalledMap.hasOwnProperty(name)) {                                                             // 5083
        self.fontInstalledMap[name] = agent.isFontInstalled(name) ||                                                 // 5084
          list.contains(options.fontNamesIgnoreCheck, name);                                                         // 5085
      }                                                                                                              // 5086
                                                                                                                     // 5087
      return self.fontInstalledMap[name];                                                                            // 5088
    };                                                                                                               // 5089
                                                                                                                     // 5090
    this.addToolbarButtons = function () {                                                                           // 5091
      context.memo('button.style', function () {                                                                     // 5092
        return ui.buttonGroup([                                                                                      // 5093
          ui.button({                                                                                                // 5094
            className: 'dropdown-toggle',                                                                            // 5095
            contents: ui.icon(options.icons.magic) + ' ' + ui.icon(options.icons.caret, 'span'),                     // 5096
            tooltip: lang.style.style,                                                                               // 5097
            data: {                                                                                                  // 5098
              toggle: 'dropdown'                                                                                     // 5099
            }                                                                                                        // 5100
          }),                                                                                                        // 5101
          ui.dropdown({                                                                                              // 5102
            className: 'dropdown-style',                                                                             // 5103
            items: context.options.styleTags,                                                                        // 5104
            template: function (item) {                                                                              // 5105
                                                                                                                     // 5106
              if (typeof item === 'string') {                                                                        // 5107
                item = { tag: item, title: item };                                                                   // 5108
              }                                                                                                      // 5109
                                                                                                                     // 5110
              var tag = item.tag;                                                                                    // 5111
              var title = item.title;                                                                                // 5112
              var style = item.style ? ' style="' + item.style + '" ' : '';                                          // 5113
              var className = item.className ? ' className="' + item.className + '"' : '';                           // 5114
                                                                                                                     // 5115
              return '<' + tag + style + className + '>' + title + '</' + tag +  '>';                                // 5116
            },                                                                                                       // 5117
            click: context.createInvokeHandler('editor.formatBlock')                                                 // 5118
          })                                                                                                         // 5119
        ]).render();                                                                                                 // 5120
      });                                                                                                            // 5121
                                                                                                                     // 5122
      context.memo('button.bold', function () {                                                                      // 5123
        return ui.button({                                                                                           // 5124
          className: 'note-btn-bold',                                                                                // 5125
          contents: ui.icon(options.icons.bold),                                                                     // 5126
          tooltip: lang.font.bold + representShortcut('bold'),                                                       // 5127
          click: context.createInvokeHandler('editor.bold')                                                          // 5128
        }).render();                                                                                                 // 5129
      });                                                                                                            // 5130
                                                                                                                     // 5131
      context.memo('button.italic', function () {                                                                    // 5132
        return ui.button({                                                                                           // 5133
          className: 'note-btn-italic',                                                                              // 5134
          contents: ui.icon(options.icons.italic),                                                                   // 5135
          tooltip: lang.font.italic + representShortcut('italic'),                                                   // 5136
          click: context.createInvokeHandler('editor.italic')                                                        // 5137
        }).render();                                                                                                 // 5138
      });                                                                                                            // 5139
                                                                                                                     // 5140
      context.memo('button.underline', function () {                                                                 // 5141
        return ui.button({                                                                                           // 5142
          className: 'note-btn-underline',                                                                           // 5143
          contents: ui.icon(options.icons.underline),                                                                // 5144
          tooltip: lang.font.underline + representShortcut('underline'),                                             // 5145
          click: context.createInvokeHandler('editor.underline')                                                     // 5146
        }).render();                                                                                                 // 5147
      });                                                                                                            // 5148
                                                                                                                     // 5149
      context.memo('button.clear', function () {                                                                     // 5150
        return ui.button({                                                                                           // 5151
          contents: ui.icon(options.icons.eraser),                                                                   // 5152
          tooltip: lang.font.clear + representShortcut('removeFormat'),                                              // 5153
          click: context.createInvokeHandler('editor.removeFormat')                                                  // 5154
        }).render();                                                                                                 // 5155
      });                                                                                                            // 5156
                                                                                                                     // 5157
      context.memo('button.strikethrough', function () {                                                             // 5158
        return ui.button({                                                                                           // 5159
          className: 'note-btn-strikethrough',                                                                       // 5160
          contents: ui.icon(options.icons.strikethrough),                                                            // 5161
          tooltip: lang.font.strikethrough + representShortcut('strikethrough'),                                     // 5162
          click: context.createInvokeHandler('editor.strikethrough')                                                 // 5163
        }).render();                                                                                                 // 5164
      });                                                                                                            // 5165
                                                                                                                     // 5166
      context.memo('button.superscript', function () {                                                               // 5167
        return ui.button({                                                                                           // 5168
          className: 'note-btn-superscript',                                                                         // 5169
          contents: ui.icon(options.icons.superscript),                                                              // 5170
          tooltip: lang.font.superscript,                                                                            // 5171
          click: context.createInvokeHandler('editor.superscript')                                                   // 5172
        }).render();                                                                                                 // 5173
      });                                                                                                            // 5174
                                                                                                                     // 5175
      context.memo('button.subscript', function () {                                                                 // 5176
        return ui.button({                                                                                           // 5177
          className: 'note-btn-subscript',                                                                           // 5178
          contents: ui.icon(options.icons.subscript),                                                                // 5179
          tooltip: lang.font.subscript,                                                                              // 5180
          click: context.createInvokeHandler('editor.subscript')                                                     // 5181
        }).render();                                                                                                 // 5182
      });                                                                                                            // 5183
                                                                                                                     // 5184
      context.memo('button.fontname', function () {                                                                  // 5185
        return ui.buttonGroup([                                                                                      // 5186
          ui.button({                                                                                                // 5187
            className: 'dropdown-toggle',                                                                            // 5188
            contents: '<span class="note-current-fontname"/> ' + ui.icon(options.icons.caret, 'span'),               // 5189
            tooltip: lang.font.name,                                                                                 // 5190
            data: {                                                                                                  // 5191
              toggle: 'dropdown'                                                                                     // 5192
            }                                                                                                        // 5193
          }),                                                                                                        // 5194
          ui.dropdownCheck({                                                                                         // 5195
            className: 'dropdown-fontname',                                                                          // 5196
            checkClassName: options.icons.menuCheck,                                                                 // 5197
            items: options.fontNames.filter(self.isFontInstalled),                                                   // 5198
            template: function (item) {                                                                              // 5199
              return '<span style="font-family:' + item + '">' + item + '</span>';                                   // 5200
            },                                                                                                       // 5201
            click: context.createInvokeHandler('editor.fontName')                                                    // 5202
          })                                                                                                         // 5203
        ]).render();                                                                                                 // 5204
      });                                                                                                            // 5205
                                                                                                                     // 5206
      context.memo('button.fontsize', function () {                                                                  // 5207
        return ui.buttonGroup([                                                                                      // 5208
          ui.button({                                                                                                // 5209
            className: 'dropdown-toggle',                                                                            // 5210
            contents: '<span class="note-current-fontsize"/>' + ui.icon(options.icons.caret, 'span'),                // 5211
            tooltip: lang.font.size,                                                                                 // 5212
            data: {                                                                                                  // 5213
              toggle: 'dropdown'                                                                                     // 5214
            }                                                                                                        // 5215
          }),                                                                                                        // 5216
          ui.dropdownCheck({                                                                                         // 5217
            className: 'dropdown-fontsize',                                                                          // 5218
            checkClassName: options.icons.menuCheck,                                                                 // 5219
            items: options.fontSizes,                                                                                // 5220
            click: context.createInvokeHandler('editor.fontSize')                                                    // 5221
          })                                                                                                         // 5222
        ]).render();                                                                                                 // 5223
      });                                                                                                            // 5224
                                                                                                                     // 5225
      context.memo('button.color', function () {                                                                     // 5226
        return ui.buttonGroup({                                                                                      // 5227
          className: 'note-color',                                                                                   // 5228
          children: [                                                                                                // 5229
            ui.button({                                                                                              // 5230
              className: 'note-current-color-button',                                                                // 5231
              contents: ui.icon(options.icons.font + ' note-recent-color'),                                          // 5232
              tooltip: lang.color.recent,                                                                            // 5233
              click: function (e) {                                                                                  // 5234
                var $button = $(e.currentTarget);                                                                    // 5235
                context.invoke('editor.color', {                                                                     // 5236
                  backColor: $button.attr('data-backColor'),                                                         // 5237
                  foreColor: $button.attr('data-foreColor')                                                          // 5238
                });                                                                                                  // 5239
              },                                                                                                     // 5240
              callback: function ($button) {                                                                         // 5241
                var $recentColor = $button.find('.note-recent-color');                                               // 5242
                $recentColor.css('background-color', '#FFFF00');                                                     // 5243
                $button.attr('data-backColor', '#FFFF00');                                                           // 5244
              }                                                                                                      // 5245
            }),                                                                                                      // 5246
            ui.button({                                                                                              // 5247
              className: 'dropdown-toggle',                                                                          // 5248
              contents: ui.icon(options.icons.caret, 'span'),                                                        // 5249
              tooltip: lang.color.more,                                                                              // 5250
              data: {                                                                                                // 5251
                toggle: 'dropdown'                                                                                   // 5252
              }                                                                                                      // 5253
            }),                                                                                                      // 5254
            ui.dropdown({                                                                                            // 5255
              items: [                                                                                               // 5256
                '<li>',                                                                                              // 5257
                '<div class="btn-group">',                                                                           // 5258
                '  <div class="note-palette-title">' + lang.color.background + '</div>',                             // 5259
                '  <div>',                                                                                           // 5260
                '    <button type="button" class="note-color-reset btn btn-default" data-event="backColor" data-value="inherit">',
                lang.color.transparent,                                                                              // 5262
                '    </button>',                                                                                     // 5263
                '  </div>',                                                                                          // 5264
                '  <div class="note-holder" data-event="backColor"/>',                                               // 5265
                '</div>',                                                                                            // 5266
                '<div class="btn-group">',                                                                           // 5267
                '  <div class="note-palette-title">' + lang.color.foreground + '</div>',                             // 5268
                '  <div>',                                                                                           // 5269
                '    <button type="button" class="note-color-reset btn btn-default" data-event="removeFormat" data-value="foreColor">',
                lang.color.resetToDefault,                                                                           // 5271
                '    </button>',                                                                                     // 5272
                '  </div>',                                                                                          // 5273
                '  <div class="note-holder" data-event="foreColor"/>',                                               // 5274
                '</div>',                                                                                            // 5275
                '</li>'                                                                                              // 5276
              ].join(''),                                                                                            // 5277
              callback: function ($dropdown) {                                                                       // 5278
                $dropdown.find('.note-holder').each(function () {                                                    // 5279
                  var $holder = $(this);                                                                             // 5280
                  $holder.append(ui.palette({                                                                        // 5281
                    colors: options.colors,                                                                          // 5282
                    eventName: $holder.data('event')                                                                 // 5283
                  }).render());                                                                                      // 5284
                });                                                                                                  // 5285
              },                                                                                                     // 5286
              click: function (event) {                                                                              // 5287
                var $button = $(event.target);                                                                       // 5288
                var eventName = $button.data('event');                                                               // 5289
                var value = $button.data('value');                                                                   // 5290
                                                                                                                     // 5291
                if (eventName && value) {                                                                            // 5292
                  var key = eventName === 'backColor' ? 'background-color' : 'color';                                // 5293
                  var $color = $button.closest('.note-color').find('.note-recent-color');                            // 5294
                  var $currentButton = $button.closest('.note-color').find('.note-current-color-button');            // 5295
                                                                                                                     // 5296
                  $color.css(key, value);                                                                            // 5297
                  $currentButton.attr('data-' + eventName, value);                                                   // 5298
                  context.invoke('editor.' + eventName, value);                                                      // 5299
                }                                                                                                    // 5300
              }                                                                                                      // 5301
            })                                                                                                       // 5302
          ]                                                                                                          // 5303
        }).render();                                                                                                 // 5304
      });                                                                                                            // 5305
                                                                                                                     // 5306
      context.memo('button.ul',  function () {                                                                       // 5307
        return ui.button({                                                                                           // 5308
          contents: ui.icon(options.icons.unorderedlist),                                                            // 5309
          tooltip: lang.lists.unordered + representShortcut('insertUnorderedList'),                                  // 5310
          click: context.createInvokeHandler('editor.insertUnorderedList')                                           // 5311
        }).render();                                                                                                 // 5312
      });                                                                                                            // 5313
                                                                                                                     // 5314
      context.memo('button.ol', function () {                                                                        // 5315
        return ui.button({                                                                                           // 5316
          contents: ui.icon(options.icons.orderedlist),                                                              // 5317
          tooltip: lang.lists.ordered + representShortcut('insertOrderedList'),                                      // 5318
          click:  context.createInvokeHandler('editor.insertOrderedList')                                            // 5319
        }).render();                                                                                                 // 5320
      });                                                                                                            // 5321
                                                                                                                     // 5322
      var justifyLeft = ui.button({                                                                                  // 5323
        contents: ui.icon(options.icons.alignLeft),                                                                  // 5324
        tooltip: lang.paragraph.left + representShortcut('justifyLeft'),                                             // 5325
        click: context.createInvokeHandler('editor.justifyLeft')                                                     // 5326
      });                                                                                                            // 5327
                                                                                                                     // 5328
      var justifyCenter = ui.button({                                                                                // 5329
        contents: ui.icon(options.icons.alignCenter),                                                                // 5330
        tooltip: lang.paragraph.center + representShortcut('justifyCenter'),                                         // 5331
        click: context.createInvokeHandler('editor.justifyCenter')                                                   // 5332
      });                                                                                                            // 5333
                                                                                                                     // 5334
      var justifyRight = ui.button({                                                                                 // 5335
        contents: ui.icon(options.icons.alignRight),                                                                 // 5336
        tooltip: lang.paragraph.right + representShortcut('justifyRight'),                                           // 5337
        click: context.createInvokeHandler('editor.justifyRight')                                                    // 5338
      });                                                                                                            // 5339
                                                                                                                     // 5340
      var justifyFull = ui.button({                                                                                  // 5341
        contents: ui.icon(options.icons.alignJustify),                                                               // 5342
        tooltip: lang.paragraph.justify + representShortcut('justifyFull'),                                          // 5343
        click: context.createInvokeHandler('editor.justifyFull')                                                     // 5344
      });                                                                                                            // 5345
                                                                                                                     // 5346
      var outdent = ui.button({                                                                                      // 5347
        contents: ui.icon(options.icons.outdent),                                                                    // 5348
        tooltip: lang.paragraph.outdent + representShortcut('outdent'),                                              // 5349
        click: context.createInvokeHandler('editor.outdent')                                                         // 5350
      });                                                                                                            // 5351
                                                                                                                     // 5352
      var indent = ui.button({                                                                                       // 5353
        contents: ui.icon(options.icons.indent),                                                                     // 5354
        tooltip: lang.paragraph.indent + representShortcut('indent'),                                                // 5355
        click: context.createInvokeHandler('editor.indent')                                                          // 5356
      });                                                                                                            // 5357
                                                                                                                     // 5358
      context.memo('button.justifyLeft', func.invoke(justifyLeft, 'render'));                                        // 5359
      context.memo('button.justifyCenter', func.invoke(justifyCenter, 'render'));                                    // 5360
      context.memo('button.justifyRight', func.invoke(justifyRight, 'render'));                                      // 5361
      context.memo('button.justifyFull', func.invoke(justifyFull, 'render'));                                        // 5362
      context.memo('button.outdent', func.invoke(outdent, 'render'));                                                // 5363
      context.memo('button.indent', func.invoke(indent, 'render'));                                                  // 5364
                                                                                                                     // 5365
      context.memo('button.paragraph', function () {                                                                 // 5366
        return ui.buttonGroup([                                                                                      // 5367
          ui.button({                                                                                                // 5368
            className: 'dropdown-toggle',                                                                            // 5369
            contents: ui.icon(options.icons.alignLeft) + ' ' + ui.icon(options.icons.caret, 'span'),                 // 5370
            tooltip: lang.paragraph.paragraph,                                                                       // 5371
            data: {                                                                                                  // 5372
              toggle: 'dropdown'                                                                                     // 5373
            }                                                                                                        // 5374
          }),                                                                                                        // 5375
          ui.dropdown([                                                                                              // 5376
            ui.buttonGroup({                                                                                         // 5377
              className: 'note-align',                                                                               // 5378
              children: [justifyLeft, justifyCenter, justifyRight, justifyFull]                                      // 5379
            }),                                                                                                      // 5380
            ui.buttonGroup({                                                                                         // 5381
              className: 'note-list',                                                                                // 5382
              children: [outdent, indent]                                                                            // 5383
            })                                                                                                       // 5384
          ])                                                                                                         // 5385
        ]).render();                                                                                                 // 5386
      });                                                                                                            // 5387
                                                                                                                     // 5388
      context.memo('button.height', function () {                                                                    // 5389
        return ui.buttonGroup([                                                                                      // 5390
          ui.button({                                                                                                // 5391
            className: 'dropdown-toggle',                                                                            // 5392
            contents: ui.icon(options.icons.textHeight) + ' ' + ui.icon(options.icons.caret, 'span'),                // 5393
            tooltip: lang.font.height,                                                                               // 5394
            data: {                                                                                                  // 5395
              toggle: 'dropdown'                                                                                     // 5396
            }                                                                                                        // 5397
          }),                                                                                                        // 5398
          ui.dropdownCheck({                                                                                         // 5399
            items: options.lineHeights,                                                                              // 5400
            checkClassName: options.icons.menuCheck,                                                                 // 5401
            className: 'dropdown-line-height',                                                                       // 5402
            click: context.createInvokeHandler('editor.lineHeight')                                                  // 5403
          })                                                                                                         // 5404
        ]).render();                                                                                                 // 5405
      });                                                                                                            // 5406
                                                                                                                     // 5407
      context.memo('button.table', function () {                                                                     // 5408
        return ui.buttonGroup([                                                                                      // 5409
          ui.button({                                                                                                // 5410
            className: 'dropdown-toggle',                                                                            // 5411
            contents: ui.icon(options.icons.table) + ' ' + ui.icon(options.icons.caret, 'span'),                     // 5412
            tooltip: lang.table.table,                                                                               // 5413
            data: {                                                                                                  // 5414
              toggle: 'dropdown'                                                                                     // 5415
            }                                                                                                        // 5416
          }),                                                                                                        // 5417
          ui.dropdown({                                                                                              // 5418
            className: 'note-table',                                                                                 // 5419
            items: [                                                                                                 // 5420
              '<div class="note-dimension-picker">',                                                                 // 5421
              '  <div class="note-dimension-picker-mousecatcher" data-event="insertTable" data-value="1x1"/>',       // 5422
              '  <div class="note-dimension-picker-highlighted"/>',                                                  // 5423
              '  <div class="note-dimension-picker-unhighlighted"/>',                                                // 5424
              '</div>',                                                                                              // 5425
              '<div class="note-dimension-display">1 x 1</div>'                                                      // 5426
            ].join('')                                                                                               // 5427
          })                                                                                                         // 5428
        ], {                                                                                                         // 5429
          callback: function ($node) {                                                                               // 5430
            var $catcher = $node.find('.note-dimension-picker-mousecatcher');                                        // 5431
            $catcher.css({                                                                                           // 5432
              width: options.insertTableMaxSize.col + 'em',                                                          // 5433
              height: options.insertTableMaxSize.row + 'em'                                                          // 5434
            }).mousedown(context.createInvokeHandler('editor.insertTable'))                                          // 5435
              .on('mousemove', self.tableMoveHandler);                                                               // 5436
          }                                                                                                          // 5437
        }).render();                                                                                                 // 5438
      });                                                                                                            // 5439
                                                                                                                     // 5440
      context.memo('button.link', function () {                                                                      // 5441
        return ui.button({                                                                                           // 5442
          contents: ui.icon(options.icons.link),                                                                     // 5443
          tooltip: lang.link.link,                                                                                   // 5444
          click: context.createInvokeHandler('linkDialog.show')                                                      // 5445
        }).render();                                                                                                 // 5446
      });                                                                                                            // 5447
                                                                                                                     // 5448
      context.memo('button.picture', function () {                                                                   // 5449
        return ui.button({                                                                                           // 5450
          contents: ui.icon(options.icons.picture),                                                                  // 5451
          tooltip: lang.image.image,                                                                                 // 5452
          click: context.createInvokeHandler('imageDialog.show')                                                     // 5453
        }).render();                                                                                                 // 5454
      });                                                                                                            // 5455
                                                                                                                     // 5456
      context.memo('button.video', function () {                                                                     // 5457
        return ui.button({                                                                                           // 5458
          contents: ui.icon(options.icons.video),                                                                    // 5459
          tooltip: lang.video.video,                                                                                 // 5460
          click: context.createInvokeHandler('videoDialog.show')                                                     // 5461
        }).render();                                                                                                 // 5462
      });                                                                                                            // 5463
                                                                                                                     // 5464
      context.memo('button.hr', function () {                                                                        // 5465
        return ui.button({                                                                                           // 5466
          contents: ui.icon(options.icons.minus),                                                                    // 5467
          tooltip: lang.hr.insert + representShortcut('insertHorizontalRule'),                                       // 5468
          click: context.createInvokeHandler('editor.insertHorizontalRule')                                          // 5469
        }).render();                                                                                                 // 5470
      });                                                                                                            // 5471
                                                                                                                     // 5472
      context.memo('button.fullscreen', function () {                                                                // 5473
        return ui.button({                                                                                           // 5474
          className: 'btn-fullscreen',                                                                               // 5475
          contents: ui.icon(options.icons.arrowsAlt),                                                                // 5476
          tooltip: lang.options.fullscreen,                                                                          // 5477
          click: context.createInvokeHandler('fullscreen.toggle')                                                    // 5478
        }).render();                                                                                                 // 5479
      });                                                                                                            // 5480
                                                                                                                     // 5481
      context.memo('button.codeview', function () {                                                                  // 5482
        return ui.button({                                                                                           // 5483
          className: 'btn-codeview',                                                                                 // 5484
          contents: ui.icon(options.icons.code),                                                                     // 5485
          tooltip: lang.options.codeview,                                                                            // 5486
          click: context.createInvokeHandler('codeview.toggle')                                                      // 5487
        }).render();                                                                                                 // 5488
      });                                                                                                            // 5489
                                                                                                                     // 5490
      context.memo('button.redo', function () {                                                                      // 5491
        return ui.button({                                                                                           // 5492
          contents: ui.icon(options.icons.redo),                                                                     // 5493
          tooltip: lang.history.redo + representShortcut('redo'),                                                    // 5494
          click: context.createInvokeHandler('editor.redo')                                                          // 5495
        }).render();                                                                                                 // 5496
      });                                                                                                            // 5497
                                                                                                                     // 5498
      context.memo('button.undo', function () {                                                                      // 5499
        return ui.button({                                                                                           // 5500
          contents: ui.icon(options.icons.undo),                                                                     // 5501
          tooltip: lang.history.undo + representShortcut('undo'),                                                    // 5502
          click: context.createInvokeHandler('editor.undo')                                                          // 5503
        }).render();                                                                                                 // 5504
      });                                                                                                            // 5505
                                                                                                                     // 5506
      context.memo('button.help', function () {                                                                      // 5507
        return ui.button({                                                                                           // 5508
          contents: ui.icon(options.icons.question),                                                                 // 5509
          tooltip: lang.options.help,                                                                                // 5510
          click: context.createInvokeHandler('helpDialog.show')                                                      // 5511
        }).render();                                                                                                 // 5512
      });                                                                                                            // 5513
    };                                                                                                               // 5514
                                                                                                                     // 5515
    /**                                                                                                              // 5516
     * image : [                                                                                                     // 5517
     *   ['imagesize', ['imageSize100', 'imageSize50', 'imageSize25']],                                              // 5518
     *   ['float', ['floatLeft', 'floatRight', 'floatNone' ]],                                                       // 5519
     *   ['remove', ['removeMedia']]                                                                                 // 5520
     * ],                                                                                                            // 5521
     */                                                                                                              // 5522
    this.addImagePopoverButtons = function () {                                                                      // 5523
      // Image Size Buttons                                                                                          // 5524
      context.memo('button.imageSize100', function () {                                                              // 5525
        return ui.button({                                                                                           // 5526
          contents: '<span class="note-fontsize-10">100%</span>',                                                    // 5527
          tooltip: lang.image.resizeFull,                                                                            // 5528
          click: context.createInvokeHandler('editor.resize', '1')                                                   // 5529
        }).render();                                                                                                 // 5530
      });                                                                                                            // 5531
      context.memo('button.imageSize50', function () {                                                               // 5532
        return  ui.button({                                                                                          // 5533
          contents: '<span class="note-fontsize-10">50%</span>',                                                     // 5534
          tooltip: lang.image.resizeHalf,                                                                            // 5535
          click: context.createInvokeHandler('editor.resize', '0.5')                                                 // 5536
        }).render();                                                                                                 // 5537
      });                                                                                                            // 5538
      context.memo('button.imageSize25', function () {                                                               // 5539
        return ui.button({                                                                                           // 5540
          contents: '<span class="note-fontsize-10">25%</span>',                                                     // 5541
          tooltip: lang.image.resizeQuarter,                                                                         // 5542
          click: context.createInvokeHandler('editor.resize', '0.25')                                                // 5543
        }).render();                                                                                                 // 5544
      });                                                                                                            // 5545
                                                                                                                     // 5546
      // Float Buttons                                                                                               // 5547
      context.memo('button.floatLeft', function () {                                                                 // 5548
        return ui.button({                                                                                           // 5549
          contents: ui.icon(options.icons.alignLeft),                                                                // 5550
          tooltip: lang.image.floatLeft,                                                                             // 5551
          click: context.createInvokeHandler('editor.floatMe', 'left')                                               // 5552
        }).render();                                                                                                 // 5553
      });                                                                                                            // 5554
                                                                                                                     // 5555
      context.memo('button.floatRight', function () {                                                                // 5556
        return ui.button({                                                                                           // 5557
          contents: ui.icon(options.icons.alignRight),                                                               // 5558
          tooltip: lang.image.floatRight,                                                                            // 5559
          click: context.createInvokeHandler('editor.floatMe', 'right')                                              // 5560
        }).render();                                                                                                 // 5561
      });                                                                                                            // 5562
                                                                                                                     // 5563
      context.memo('button.floatNone', function () {                                                                 // 5564
        return ui.button({                                                                                           // 5565
          contents: ui.icon(options.icons.alignJustify),                                                             // 5566
          tooltip: lang.image.floatNone,                                                                             // 5567
          click: context.createInvokeHandler('editor.floatMe', 'none')                                               // 5568
        }).render();                                                                                                 // 5569
      });                                                                                                            // 5570
                                                                                                                     // 5571
      // Remove Buttons                                                                                              // 5572
      context.memo('button.removeMedia', function () {                                                               // 5573
        return ui.button({                                                                                           // 5574
          contents: ui.icon(options.icons.trash),                                                                    // 5575
          tooltip: lang.image.remove,                                                                                // 5576
          click: context.createInvokeHandler('editor.removeMedia')                                                   // 5577
        }).render();                                                                                                 // 5578
      });                                                                                                            // 5579
    };                                                                                                               // 5580
                                                                                                                     // 5581
    this.addLinkPopoverButtons = function () {                                                                       // 5582
      context.memo('button.linkDialogShow', function () {                                                            // 5583
        return ui.button({                                                                                           // 5584
          contents: ui.icon(options.icons.link),                                                                     // 5585
          tooltip: lang.link.edit,                                                                                   // 5586
          click: context.createInvokeHandler('linkDialog.show')                                                      // 5587
        }).render();                                                                                                 // 5588
      });                                                                                                            // 5589
                                                                                                                     // 5590
      context.memo('button.unlink', function () {                                                                    // 5591
        return ui.button({                                                                                           // 5592
          contents: ui.icon(options.icons.unlink),                                                                   // 5593
          tooltip: lang.link.unlink,                                                                                 // 5594
          click: context.createInvokeHandler('editor.unlink')                                                        // 5595
        }).render();                                                                                                 // 5596
      });                                                                                                            // 5597
    };                                                                                                               // 5598
                                                                                                                     // 5599
    this.build = function ($container, groups) {                                                                     // 5600
      for (var groupIdx = 0, groupLen = groups.length; groupIdx < groupLen; groupIdx++) {                            // 5601
        var group = groups[groupIdx];                                                                                // 5602
        var groupName = group[0];                                                                                    // 5603
        var buttons = group[1];                                                                                      // 5604
                                                                                                                     // 5605
        var $group = ui.buttonGroup({                                                                                // 5606
          className: 'note-' + groupName                                                                             // 5607
        }).render();                                                                                                 // 5608
                                                                                                                     // 5609
        for (var idx = 0, len = buttons.length; idx < len; idx++) {                                                  // 5610
          var button = context.memo('button.' + buttons[idx]);                                                       // 5611
          if (button) {                                                                                              // 5612
            $group.append(typeof button === 'function' ? button(context) : button);                                  // 5613
          }                                                                                                          // 5614
        }                                                                                                            // 5615
        $group.appendTo($container);                                                                                 // 5616
      }                                                                                                              // 5617
    };                                                                                                               // 5618
                                                                                                                     // 5619
    this.updateCurrentStyle = function () {                                                                          // 5620
      var styleInfo = context.invoke('editor.currentStyle');                                                         // 5621
      this.updateBtnStates({                                                                                         // 5622
        '.note-btn-bold': function () {                                                                              // 5623
          return styleInfo['font-bold'] === 'bold';                                                                  // 5624
        },                                                                                                           // 5625
        '.note-btn-italic': function () {                                                                            // 5626
          return styleInfo['font-italic'] === 'italic';                                                              // 5627
        },                                                                                                           // 5628
        '.note-btn-underline': function () {                                                                         // 5629
          return styleInfo['font-underline'] === 'underline';                                                        // 5630
        },                                                                                                           // 5631
        '.note-btn-subscript': function () {                                                                         // 5632
          return styleInfo['font-subscript'] === 'subscript';                                                        // 5633
        },                                                                                                           // 5634
        '.note-btn-superscript': function () {                                                                       // 5635
          return styleInfo['font-superscript'] === 'superscript';                                                    // 5636
        },                                                                                                           // 5637
        '.note-btn-strikethrough': function () {                                                                     // 5638
          return styleInfo['font-strikethrough'] === 'strikethrough';                                                // 5639
        }                                                                                                            // 5640
      });                                                                                                            // 5641
                                                                                                                     // 5642
      if (styleInfo['font-family']) {                                                                                // 5643
        var fontNames = styleInfo['font-family'].split(',').map(function (name) {                                    // 5644
          return name.replace(/[\'\"]/g, '')                                                                         // 5645
            .replace(/\s+$/, '')                                                                                     // 5646
            .replace(/^\s+/, '');                                                                                    // 5647
        });                                                                                                          // 5648
        var fontName = list.find(fontNames, self.isFontInstalled);                                                   // 5649
                                                                                                                     // 5650
        $toolbar.find('.dropdown-fontname li a').each(function () {                                                  // 5651
          // always compare string to avoid creating another func.                                                   // 5652
          var isChecked = ($(this).data('value') + '') === (fontName + '');                                          // 5653
          this.className = isChecked ? 'checked' : '';                                                               // 5654
        });                                                                                                          // 5655
        $toolbar.find('.note-current-fontname').text(fontName);                                                      // 5656
      }                                                                                                              // 5657
                                                                                                                     // 5658
      if (styleInfo['font-size']) {                                                                                  // 5659
        var fontSize = styleInfo['font-size'];                                                                       // 5660
        $toolbar.find('.dropdown-fontsize li a').each(function () {                                                  // 5661
          // always compare with string to avoid creating another func.                                              // 5662
          var isChecked = ($(this).data('value') + '') === (fontSize + '');                                          // 5663
          this.className = isChecked ? 'checked' : '';                                                               // 5664
        });                                                                                                          // 5665
        $toolbar.find('.note-current-fontsize').text(fontSize);                                                      // 5666
      }                                                                                                              // 5667
                                                                                                                     // 5668
      if (styleInfo['line-height']) {                                                                                // 5669
        var lineHeight = styleInfo['line-height'];                                                                   // 5670
        $toolbar.find('.dropdown-line-height li a').each(function () {                                               // 5671
          // always compare with string to avoid creating another func.                                              // 5672
          var isChecked = ($(this).data('value') + '') === (lineHeight + '');                                        // 5673
          this.className = isChecked ? 'checked' : '';                                                               // 5674
        });                                                                                                          // 5675
      }                                                                                                              // 5676
    };                                                                                                               // 5677
                                                                                                                     // 5678
    this.updateBtnStates = function (infos) {                                                                        // 5679
      $.each(infos, function (selector, pred) {                                                                      // 5680
        ui.toggleBtnActive($toolbar.find(selector), pred());                                                         // 5681
      });                                                                                                            // 5682
    };                                                                                                               // 5683
                                                                                                                     // 5684
    this.tableMoveHandler = function (event) {                                                                       // 5685
      var PX_PER_EM = 18;                                                                                            // 5686
      var $picker = $(event.target.parentNode); // target is mousecatcher                                            // 5687
      var $dimensionDisplay = $picker.next();                                                                        // 5688
      var $catcher = $picker.find('.note-dimension-picker-mousecatcher');                                            // 5689
      var $highlighted = $picker.find('.note-dimension-picker-highlighted');                                         // 5690
      var $unhighlighted = $picker.find('.note-dimension-picker-unhighlighted');                                     // 5691
                                                                                                                     // 5692
      var posOffset;                                                                                                 // 5693
      // HTML5 with jQuery - e.offsetX is undefined in Firefox                                                       // 5694
      if (event.offsetX === undefined) {                                                                             // 5695
        var posCatcher = $(event.target).offset();                                                                   // 5696
        posOffset = {                                                                                                // 5697
          x: event.pageX - posCatcher.left,                                                                          // 5698
          y: event.pageY - posCatcher.top                                                                            // 5699
        };                                                                                                           // 5700
      } else {                                                                                                       // 5701
        posOffset = {                                                                                                // 5702
          x: event.offsetX,                                                                                          // 5703
          y: event.offsetY                                                                                           // 5704
        };                                                                                                           // 5705
      }                                                                                                              // 5706
                                                                                                                     // 5707
      var dim = {                                                                                                    // 5708
        c: Math.ceil(posOffset.x / PX_PER_EM) || 1,                                                                  // 5709
        r: Math.ceil(posOffset.y / PX_PER_EM) || 1                                                                   // 5710
      };                                                                                                             // 5711
                                                                                                                     // 5712
      $highlighted.css({ width: dim.c + 'em', height: dim.r + 'em' });                                               // 5713
      $catcher.data('value', dim.c + 'x' + dim.r);                                                                   // 5714
                                                                                                                     // 5715
      if (3 < dim.c && dim.c < options.insertTableMaxSize.col) {                                                     // 5716
        $unhighlighted.css({ width: dim.c + 1 + 'em'});                                                              // 5717
      }                                                                                                              // 5718
                                                                                                                     // 5719
      if (3 < dim.r && dim.r < options.insertTableMaxSize.row) {                                                     // 5720
        $unhighlighted.css({ height: dim.r + 1 + 'em'});                                                             // 5721
      }                                                                                                              // 5722
                                                                                                                     // 5723
      $dimensionDisplay.html(dim.c + ' x ' + dim.r);                                                                 // 5724
    };                                                                                                               // 5725
  };                                                                                                                 // 5726
                                                                                                                     // 5727
  var Toolbar = function (context) {                                                                                 // 5728
    var ui = $.summernote.ui;                                                                                        // 5729
                                                                                                                     // 5730
    var $note = context.layoutInfo.note;                                                                             // 5731
    var $toolbar = context.layoutInfo.toolbar;                                                                       // 5732
    var options = context.options;                                                                                   // 5733
                                                                                                                     // 5734
    this.shouldInitialize = function () {                                                                            // 5735
      return !options.airMode;                                                                                       // 5736
    };                                                                                                               // 5737
                                                                                                                     // 5738
    this.initialize = function () {                                                                                  // 5739
      options.toolbar = options.toolbar || [];                                                                       // 5740
                                                                                                                     // 5741
      if (!options.toolbar.length) {                                                                                 // 5742
        $toolbar.hide();                                                                                             // 5743
      } else {                                                                                                       // 5744
        context.invoke('buttons.build', $toolbar, options.toolbar);                                                  // 5745
      }                                                                                                              // 5746
                                                                                                                     // 5747
      if (options.toolbarContainer) {                                                                                // 5748
        $toolbar.appendTo(options.toolbarContainer);                                                                 // 5749
      }                                                                                                              // 5750
                                                                                                                     // 5751
      $note.on('summernote.keyup summernote.mouseup summernote.change', function () {                                // 5752
        context.invoke('buttons.updateCurrentStyle');                                                                // 5753
      });                                                                                                            // 5754
                                                                                                                     // 5755
      context.invoke('buttons.updateCurrentStyle');                                                                  // 5756
    };                                                                                                               // 5757
                                                                                                                     // 5758
    this.destroy = function () {                                                                                     // 5759
      $toolbar.children().remove();                                                                                  // 5760
    };                                                                                                               // 5761
                                                                                                                     // 5762
    this.updateFullscreen = function (isFullscreen) {                                                                // 5763
      ui.toggleBtnActive($toolbar.find('.btn-fullscreen'), isFullscreen);                                            // 5764
    };                                                                                                               // 5765
                                                                                                                     // 5766
    this.updateCodeview = function (isCodeview) {                                                                    // 5767
      ui.toggleBtnActive($toolbar.find('.btn-codeview'), isCodeview);                                                // 5768
      if (isCodeview) {                                                                                              // 5769
        this.deactivate();                                                                                           // 5770
      } else {                                                                                                       // 5771
        this.activate();                                                                                             // 5772
      }                                                                                                              // 5773
    };                                                                                                               // 5774
                                                                                                                     // 5775
    this.activate = function (isIncludeCodeview) {                                                                   // 5776
      var $btn = $toolbar.find('button');                                                                            // 5777
      if (!isIncludeCodeview) {                                                                                      // 5778
        $btn = $btn.not('.btn-codeview');                                                                            // 5779
      }                                                                                                              // 5780
      ui.toggleBtn($btn, true);                                                                                      // 5781
    };                                                                                                               // 5782
                                                                                                                     // 5783
    this.deactivate = function (isIncludeCodeview) {                                                                 // 5784
      var $btn = $toolbar.find('button');                                                                            // 5785
      if (!isIncludeCodeview) {                                                                                      // 5786
        $btn = $btn.not('.btn-codeview');                                                                            // 5787
      }                                                                                                              // 5788
      ui.toggleBtn($btn, false);                                                                                     // 5789
    };                                                                                                               // 5790
  };                                                                                                                 // 5791
                                                                                                                     // 5792
  var LinkDialog = function (context) {                                                                              // 5793
    var self = this;                                                                                                 // 5794
    var ui = $.summernote.ui;                                                                                        // 5795
                                                                                                                     // 5796
    var $editor = context.layoutInfo.editor;                                                                         // 5797
    var options = context.options;                                                                                   // 5798
    var lang = options.langInfo;                                                                                     // 5799
                                                                                                                     // 5800
    this.initialize = function () {                                                                                  // 5801
      var $container = options.dialogsInBody ? $(document.body) : $editor;                                           // 5802
                                                                                                                     // 5803
      var body = '<div class="form-group">' +                                                                        // 5804
                   '<label>' + lang.link.textToDisplay + '</label>' +                                                // 5805
                   '<input class="note-link-text form-control" type="text" />' +                                     // 5806
                 '</div>' +                                                                                          // 5807
                 '<div class="form-group">' +                                                                        // 5808
                   '<label>' + lang.link.url + '</label>' +                                                          // 5809
                   '<input class="note-link-url form-control" type="text" value="http://" />' +                      // 5810
                 '</div>' +                                                                                          // 5811
                 (!options.disableLinkTarget ?                                                                       // 5812
                   '<div class="checkbox">' +                                                                        // 5813
                     '<label>' + '<input type="checkbox" checked> ' + lang.link.openInNewWindow + '</label>' +       // 5814
                   '</div>' : ''                                                                                     // 5815
                 );                                                                                                  // 5816
      var footer = '<button href="#" class="btn btn-primary note-link-btn disabled" disabled>' + lang.link.insert + '</button>';
                                                                                                                     // 5818
      this.$dialog = ui.dialog({                                                                                     // 5819
        className: 'link-dialog',                                                                                    // 5820
        title: lang.link.insert,                                                                                     // 5821
        fade: options.dialogsFade,                                                                                   // 5822
        body: body,                                                                                                  // 5823
        footer: footer                                                                                               // 5824
      }).render().appendTo($container);                                                                              // 5825
    };                                                                                                               // 5826
                                                                                                                     // 5827
    this.destroy = function () {                                                                                     // 5828
      ui.hideDialog(this.$dialog);                                                                                   // 5829
      this.$dialog.remove();                                                                                         // 5830
    };                                                                                                               // 5831
                                                                                                                     // 5832
    this.bindEnterKey = function ($input, $btn) {                                                                    // 5833
      $input.on('keypress', function (event) {                                                                       // 5834
        if (event.keyCode === key.code.ENTER) {                                                                      // 5835
          $btn.trigger('click');                                                                                     // 5836
        }                                                                                                            // 5837
      });                                                                                                            // 5838
    };                                                                                                               // 5839
                                                                                                                     // 5840
    /**                                                                                                              // 5841
     * Show link dialog and set event handlers on dialog controls.                                                   // 5842
     *                                                                                                               // 5843
     * @param {Object} linkInfo                                                                                      // 5844
     * @return {Promise}                                                                                             // 5845
     */                                                                                                              // 5846
    this.showLinkDialog = function (linkInfo) {                                                                      // 5847
      return $.Deferred(function (deferred) {                                                                        // 5848
        var $linkText = self.$dialog.find('.note-link-text'),                                                        // 5849
        $linkUrl = self.$dialog.find('.note-link-url'),                                                              // 5850
        $linkBtn = self.$dialog.find('.note-link-btn'),                                                              // 5851
        $openInNewWindow = self.$dialog.find('input[type=checkbox]');                                                // 5852
                                                                                                                     // 5853
        ui.onDialogShown(self.$dialog, function () {                                                                 // 5854
          context.triggerEvent('dialog.shown');                                                                      // 5855
                                                                                                                     // 5856
          $linkText.val(linkInfo.text);                                                                              // 5857
                                                                                                                     // 5858
          $linkText.on('input', function () {                                                                        // 5859
            ui.toggleBtn($linkBtn, $linkText.val() && $linkUrl.val());                                               // 5860
            // if linktext was modified by keyup,                                                                    // 5861
            // stop cloning text from linkUrl                                                                        // 5862
            linkInfo.text = $linkText.val();                                                                         // 5863
          });                                                                                                        // 5864
                                                                                                                     // 5865
          // if no url was given, copy text to url                                                                   // 5866
          if (!linkInfo.url) {                                                                                       // 5867
            linkInfo.url = linkInfo.text || 'http://';                                                               // 5868
            ui.toggleBtn($linkBtn, linkInfo.text);                                                                   // 5869
          }                                                                                                          // 5870
                                                                                                                     // 5871
          $linkUrl.on('input', function () {                                                                         // 5872
            ui.toggleBtn($linkBtn, $linkText.val() && $linkUrl.val());                                               // 5873
            // display same link on `Text to display` input                                                          // 5874
            // when create a new link                                                                                // 5875
            if (!linkInfo.text) {                                                                                    // 5876
              $linkText.val($linkUrl.val());                                                                         // 5877
            }                                                                                                        // 5878
          }).val(linkInfo.url).trigger('focus');                                                                     // 5879
                                                                                                                     // 5880
          self.bindEnterKey($linkUrl, $linkBtn);                                                                     // 5881
          self.bindEnterKey($linkText, $linkBtn);                                                                    // 5882
                                                                                                                     // 5883
          $openInNewWindow.prop('checked', linkInfo.isNewWindow);                                                    // 5884
                                                                                                                     // 5885
          $linkBtn.one('click', function (event) {                                                                   // 5886
            event.preventDefault();                                                                                  // 5887
                                                                                                                     // 5888
            deferred.resolve({                                                                                       // 5889
              range: linkInfo.range,                                                                                 // 5890
              url: $linkUrl.val(),                                                                                   // 5891
              text: $linkText.val(),                                                                                 // 5892
              isNewWindow: $openInNewWindow.is(':checked')                                                           // 5893
            });                                                                                                      // 5894
            self.$dialog.modal('hide');                                                                              // 5895
          });                                                                                                        // 5896
        });                                                                                                          // 5897
                                                                                                                     // 5898
        ui.onDialogHidden(self.$dialog, function () {                                                                // 5899
          // detach events                                                                                           // 5900
          $linkText.off('input keypress');                                                                           // 5901
          $linkUrl.off('input keypress');                                                                            // 5902
          $linkBtn.off('click');                                                                                     // 5903
                                                                                                                     // 5904
          if (deferred.state() === 'pending') {                                                                      // 5905
            deferred.reject();                                                                                       // 5906
          }                                                                                                          // 5907
        });                                                                                                          // 5908
                                                                                                                     // 5909
        ui.showDialog(self.$dialog);                                                                                 // 5910
      }).promise();                                                                                                  // 5911
    };                                                                                                               // 5912
                                                                                                                     // 5913
    /**                                                                                                              // 5914
     * @param {Object} layoutInfo                                                                                    // 5915
     */                                                                                                              // 5916
    this.show = function () {                                                                                        // 5917
      var linkInfo = context.invoke('editor.getLinkInfo');                                                           // 5918
                                                                                                                     // 5919
      context.invoke('editor.saveRange');                                                                            // 5920
      this.showLinkDialog(linkInfo).then(function (linkInfo) {                                                       // 5921
        context.invoke('editor.restoreRange');                                                                       // 5922
        context.invoke('editor.createLink', linkInfo);                                                               // 5923
      }).fail(function () {                                                                                          // 5924
        context.invoke('editor.restoreRange');                                                                       // 5925
      });                                                                                                            // 5926
    };                                                                                                               // 5927
    context.memo('help.linkDialog.show', options.langInfo.help['linkDialog.show']);                                  // 5928
  };                                                                                                                 // 5929
                                                                                                                     // 5930
  var LinkPopover = function (context) {                                                                             // 5931
    var self = this;                                                                                                 // 5932
    var ui = $.summernote.ui;                                                                                        // 5933
                                                                                                                     // 5934
    var options = context.options;                                                                                   // 5935
                                                                                                                     // 5936
    this.events = {                                                                                                  // 5937
      'summernote.keyup summernote.mouseup summernote.change summernote.scroll': function () {                       // 5938
        self.update();                                                                                               // 5939
      },                                                                                                             // 5940
      'summernote.dialog.shown': function () {                                                                       // 5941
        self.hide();                                                                                                 // 5942
      }                                                                                                              // 5943
    };                                                                                                               // 5944
                                                                                                                     // 5945
    this.shouldInitialize = function () {                                                                            // 5946
      return !list.isEmpty(options.popover.link);                                                                    // 5947
    };                                                                                                               // 5948
                                                                                                                     // 5949
    this.initialize = function () {                                                                                  // 5950
      this.$popover = ui.popover({                                                                                   // 5951
        className: 'note-link-popover',                                                                              // 5952
        callback: function ($node) {                                                                                 // 5953
          var $content = $node.find('.popover-content');                                                             // 5954
          $content.prepend('<span><a target="_blank"></a>&nbsp;</span>');                                            // 5955
        }                                                                                                            // 5956
      }).render().appendTo('body');                                                                                  // 5957
      var $content = this.$popover.find('.popover-content');                                                         // 5958
                                                                                                                     // 5959
      context.invoke('buttons.build', $content, options.popover.link);                                               // 5960
    };                                                                                                               // 5961
                                                                                                                     // 5962
    this.destroy = function () {                                                                                     // 5963
      this.$popover.remove();                                                                                        // 5964
    };                                                                                                               // 5965
                                                                                                                     // 5966
    this.update = function () {                                                                                      // 5967
      // Prevent focusing on editable when invoke('code') is executed                                                // 5968
      if (!context.invoke('editor.hasFocus')) {                                                                      // 5969
        this.hide();                                                                                                 // 5970
        return;                                                                                                      // 5971
      }                                                                                                              // 5972
                                                                                                                     // 5973
      var rng = context.invoke('editor.createRange');                                                                // 5974
      if (rng.isCollapsed() && rng.isOnAnchor()) {                                                                   // 5975
        var anchor = dom.ancestor(rng.sc, dom.isAnchor);                                                             // 5976
        var href = $(anchor).attr('href');                                                                           // 5977
        this.$popover.find('a').attr('href', href).html(href);                                                       // 5978
                                                                                                                     // 5979
        var pos = dom.posFromPlaceholder(anchor);                                                                    // 5980
        this.$popover.css({                                                                                          // 5981
          display: 'block',                                                                                          // 5982
          left: pos.left,                                                                                            // 5983
          top: pos.top                                                                                               // 5984
        });                                                                                                          // 5985
      } else {                                                                                                       // 5986
        this.hide();                                                                                                 // 5987
      }                                                                                                              // 5988
    };                                                                                                               // 5989
                                                                                                                     // 5990
    this.hide = function () {                                                                                        // 5991
      this.$popover.hide();                                                                                          // 5992
    };                                                                                                               // 5993
  };                                                                                                                 // 5994
                                                                                                                     // 5995
  var ImageDialog = function (context) {                                                                             // 5996
    var self = this;                                                                                                 // 5997
    var ui = $.summernote.ui;                                                                                        // 5998
                                                                                                                     // 5999
    var $editor = context.layoutInfo.editor;                                                                         // 6000
    var options = context.options;                                                                                   // 6001
    var lang = options.langInfo;                                                                                     // 6002
                                                                                                                     // 6003
    this.initialize = function () {                                                                                  // 6004
      var $container = options.dialogsInBody ? $(document.body) : $editor;                                           // 6005
                                                                                                                     // 6006
      var imageLimitation = '';                                                                                      // 6007
      if (options.maximumImageFileSize) {                                                                            // 6008
        var unit = Math.floor(Math.log(options.maximumImageFileSize) / Math.log(1024));                              // 6009
        var readableSize = (options.maximumImageFileSize / Math.pow(1024, unit)).toFixed(2) * 1 +                    // 6010
                           ' ' + ' KMGTP'[unit] + 'B';                                                               // 6011
        imageLimitation = '<small>' + lang.image.maximumFileSize + ' : ' + readableSize + '</small>';                // 6012
      }                                                                                                              // 6013
                                                                                                                     // 6014
      var body = '<div class="form-group note-group-select-from-files">' +                                           // 6015
                   '<label>' + lang.image.selectFromFiles + '</label>' +                                             // 6016
                   '<input class="note-image-input form-control" type="file" name="files" accept="image/*" multiple="multiple" />' +
                   imageLimitation +                                                                                 // 6018
                 '</div>' +                                                                                          // 6019
                 '<div class="form-group" style="overflow:auto;">' +                                                 // 6020
                   '<label>' + lang.image.url + '</label>' +                                                         // 6021
                   '<input class="note-image-url form-control col-md-12" type="text" />' +                           // 6022
                 '</div>';                                                                                           // 6023
      var footer = '<button href="#" class="btn btn-primary note-image-btn disabled" disabled>' + lang.image.insert + '</button>';
                                                                                                                     // 6025
      this.$dialog = ui.dialog({                                                                                     // 6026
        title: lang.image.insert,                                                                                    // 6027
        fade: options.dialogsFade,                                                                                   // 6028
        body: body,                                                                                                  // 6029
        footer: footer                                                                                               // 6030
      }).render().appendTo($container);                                                                              // 6031
    };                                                                                                               // 6032
                                                                                                                     // 6033
    this.destroy = function () {                                                                                     // 6034
      ui.hideDialog(this.$dialog);                                                                                   // 6035
      this.$dialog.remove();                                                                                         // 6036
    };                                                                                                               // 6037
                                                                                                                     // 6038
    this.bindEnterKey = function ($input, $btn) {                                                                    // 6039
      $input.on('keypress', function (event) {                                                                       // 6040
        if (event.keyCode === key.code.ENTER) {                                                                      // 6041
          $btn.trigger('click');                                                                                     // 6042
        }                                                                                                            // 6043
      });                                                                                                            // 6044
    };                                                                                                               // 6045
                                                                                                                     // 6046
    this.show = function () {                                                                                        // 6047
      context.invoke('editor.saveRange');                                                                            // 6048
      this.showImageDialog().then(function (data) {                                                                  // 6049
        // [workaround] hide dialog before restore range for IE range focus                                          // 6050
        ui.hideDialog(self.$dialog);                                                                                 // 6051
        context.invoke('editor.restoreRange');                                                                       // 6052
                                                                                                                     // 6053
        if (typeof data === 'string') { // image url                                                                 // 6054
          context.invoke('editor.insertImage', data);                                                                // 6055
        } else { // array of files                                                                                   // 6056
          context.invoke('editor.insertImagesOrCallback', data);                                                     // 6057
        }                                                                                                            // 6058
      }).fail(function () {                                                                                          // 6059
        context.invoke('editor.restoreRange');                                                                       // 6060
      });                                                                                                            // 6061
    };                                                                                                               // 6062
                                                                                                                     // 6063
    /**                                                                                                              // 6064
     * show image dialog                                                                                             // 6065
     *                                                                                                               // 6066
     * @param {jQuery} $dialog                                                                                       // 6067
     * @return {Promise}                                                                                             // 6068
     */                                                                                                              // 6069
    this.showImageDialog = function () {                                                                             // 6070
      return $.Deferred(function (deferred) {                                                                        // 6071
        var $imageInput = self.$dialog.find('.note-image-input'),                                                    // 6072
            $imageUrl = self.$dialog.find('.note-image-url'),                                                        // 6073
            $imageBtn = self.$dialog.find('.note-image-btn');                                                        // 6074
                                                                                                                     // 6075
        ui.onDialogShown(self.$dialog, function () {                                                                 // 6076
          context.triggerEvent('dialog.shown');                                                                      // 6077
                                                                                                                     // 6078
          // Cloning imageInput to clear element.                                                                    // 6079
          $imageInput.replaceWith($imageInput.clone()                                                                // 6080
            .on('change', function () {                                                                              // 6081
              deferred.resolve(this.files || this.value);                                                            // 6082
            })                                                                                                       // 6083
            .val('')                                                                                                 // 6084
          );                                                                                                         // 6085
                                                                                                                     // 6086
          $imageBtn.click(function (event) {                                                                         // 6087
            event.preventDefault();                                                                                  // 6088
                                                                                                                     // 6089
            deferred.resolve($imageUrl.val());                                                                       // 6090
          });                                                                                                        // 6091
                                                                                                                     // 6092
          $imageUrl.on('keyup paste', function () {                                                                  // 6093
            var url = $imageUrl.val();                                                                               // 6094
            ui.toggleBtn($imageBtn, url);                                                                            // 6095
          }).val('').trigger('focus');                                                                               // 6096
          self.bindEnterKey($imageUrl, $imageBtn);                                                                   // 6097
        });                                                                                                          // 6098
                                                                                                                     // 6099
        ui.onDialogHidden(self.$dialog, function () {                                                                // 6100
          $imageInput.off('change');                                                                                 // 6101
          $imageUrl.off('keyup paste keypress');                                                                     // 6102
          $imageBtn.off('click');                                                                                    // 6103
                                                                                                                     // 6104
          if (deferred.state() === 'pending') {                                                                      // 6105
            deferred.reject();                                                                                       // 6106
          }                                                                                                          // 6107
        });                                                                                                          // 6108
                                                                                                                     // 6109
        ui.showDialog(self.$dialog);                                                                                 // 6110
      });                                                                                                            // 6111
    };                                                                                                               // 6112
  };                                                                                                                 // 6113
                                                                                                                     // 6114
  var ImagePopover = function (context) {                                                                            // 6115
    var ui = $.summernote.ui;                                                                                        // 6116
                                                                                                                     // 6117
    var options = context.options;                                                                                   // 6118
                                                                                                                     // 6119
    this.shouldInitialize = function () {                                                                            // 6120
      return !list.isEmpty(options.popover.image);                                                                   // 6121
    };                                                                                                               // 6122
                                                                                                                     // 6123
    this.initialize = function () {                                                                                  // 6124
      this.$popover = ui.popover({                                                                                   // 6125
        className: 'note-image-popover'                                                                              // 6126
      }).render().appendTo('body');                                                                                  // 6127
      var $content = this.$popover.find('.popover-content');                                                         // 6128
                                                                                                                     // 6129
      context.invoke('buttons.build', $content, options.popover.image);                                              // 6130
    };                                                                                                               // 6131
                                                                                                                     // 6132
    this.destroy = function () {                                                                                     // 6133
      this.$popover.remove();                                                                                        // 6134
    };                                                                                                               // 6135
                                                                                                                     // 6136
    this.update = function (target) {                                                                                // 6137
      if (dom.isImg(target)) {                                                                                       // 6138
        var pos = dom.posFromPlaceholder(target);                                                                    // 6139
        this.$popover.css({                                                                                          // 6140
          display: 'block',                                                                                          // 6141
          left: pos.left,                                                                                            // 6142
          top: pos.top                                                                                               // 6143
        });                                                                                                          // 6144
      } else {                                                                                                       // 6145
        this.hide();                                                                                                 // 6146
      }                                                                                                              // 6147
    };                                                                                                               // 6148
                                                                                                                     // 6149
    this.hide = function () {                                                                                        // 6150
      this.$popover.hide();                                                                                          // 6151
    };                                                                                                               // 6152
  };                                                                                                                 // 6153
                                                                                                                     // 6154
  var VideoDialog = function (context) {                                                                             // 6155
    var self = this;                                                                                                 // 6156
    var ui = $.summernote.ui;                                                                                        // 6157
                                                                                                                     // 6158
    var $editor = context.layoutInfo.editor;                                                                         // 6159
    var options = context.options;                                                                                   // 6160
    var lang = options.langInfo;                                                                                     // 6161
                                                                                                                     // 6162
    this.initialize = function () {                                                                                  // 6163
      var $container = options.dialogsInBody ? $(document.body) : $editor;                                           // 6164
                                                                                                                     // 6165
      var body = '<div class="form-group row-fluid">' +                                                              // 6166
          '<label>' + lang.video.url + ' <small class="text-muted">' + lang.video.providers + '</small></label>' +   // 6167
          '<input class="note-video-url form-control span12" type="text" />' +                                       // 6168
          '</div>';                                                                                                  // 6169
      var footer = '<button href="#" class="btn btn-primary note-video-btn disabled" disabled>' + lang.video.insert + '</button>';
                                                                                                                     // 6171
      this.$dialog = ui.dialog({                                                                                     // 6172
        title: lang.video.insert,                                                                                    // 6173
        fade: options.dialogsFade,                                                                                   // 6174
        body: body,                                                                                                  // 6175
        footer: footer                                                                                               // 6176
      }).render().appendTo($container);                                                                              // 6177
    };                                                                                                               // 6178
                                                                                                                     // 6179
    this.destroy = function () {                                                                                     // 6180
      ui.hideDialog(this.$dialog);                                                                                   // 6181
      this.$dialog.remove();                                                                                         // 6182
    };                                                                                                               // 6183
                                                                                                                     // 6184
    this.bindEnterKey = function ($input, $btn) {                                                                    // 6185
      $input.on('keypress', function (event) {                                                                       // 6186
        if (event.keyCode === key.code.ENTER) {                                                                      // 6187
          $btn.trigger('click');                                                                                     // 6188
        }                                                                                                            // 6189
      });                                                                                                            // 6190
    };                                                                                                               // 6191
                                                                                                                     // 6192
    this.createVideoNode = function (url) {                                                                          // 6193
      // video url patterns(youtube, instagram, vimeo, dailymotion, youku, mp4, ogg, webm)                           // 6194
      var ytRegExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
      var ytMatch = url.match(ytRegExp);                                                                             // 6196
                                                                                                                     // 6197
      var igRegExp = /\/\/instagram.com\/p\/(.[a-zA-Z0-9_-]*)/;                                                      // 6198
      var igMatch = url.match(igRegExp);                                                                             // 6199
                                                                                                                     // 6200
      var vRegExp = /\/\/vine.co\/v\/(.[a-zA-Z0-9]*)/;                                                               // 6201
      var vMatch = url.match(vRegExp);                                                                               // 6202
                                                                                                                     // 6203
      var vimRegExp = /\/\/(player.)?vimeo.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/;                                     // 6204
      var vimMatch = url.match(vimRegExp);                                                                           // 6205
                                                                                                                     // 6206
      var dmRegExp = /.+dailymotion.com\/(video|hub)\/([^_]+)[^#]*(#video=([^_&]+))?/;                               // 6207
      var dmMatch = url.match(dmRegExp);                                                                             // 6208
                                                                                                                     // 6209
      var youkuRegExp = /\/\/v\.youku\.com\/v_show\/id_(\w+)=*\.html/;                                               // 6210
      var youkuMatch = url.match(youkuRegExp);                                                                       // 6211
                                                                                                                     // 6212
      var mp4RegExp = /^.+.(mp4|m4v)$/;                                                                              // 6213
      var mp4Match = url.match(mp4RegExp);                                                                           // 6214
                                                                                                                     // 6215
      var oggRegExp = /^.+.(ogg|ogv)$/;                                                                              // 6216
      var oggMatch = url.match(oggRegExp);                                                                           // 6217
                                                                                                                     // 6218
      var webmRegExp = /^.+.(webm)$/;                                                                                // 6219
      var webmMatch = url.match(webmRegExp);                                                                         // 6220
                                                                                                                     // 6221
      var $video;                                                                                                    // 6222
      if (ytMatch && ytMatch[1].length === 11) {                                                                     // 6223
        var youtubeId = ytMatch[1];                                                                                  // 6224
        $video = $('<iframe>')                                                                                       // 6225
            .attr('frameborder', 0)                                                                                  // 6226
            .attr('src', '//www.youtube.com/embed/' + youtubeId)                                                     // 6227
            .attr('width', '640').attr('height', '360');                                                             // 6228
      } else if (igMatch && igMatch[0].length) {                                                                     // 6229
        $video = $('<iframe>')                                                                                       // 6230
            .attr('frameborder', 0)                                                                                  // 6231
            .attr('src', igMatch[0] + '/embed/')                                                                     // 6232
            .attr('width', '612').attr('height', '710')                                                              // 6233
            .attr('scrolling', 'no')                                                                                 // 6234
            .attr('allowtransparency', 'true');                                                                      // 6235
      } else if (vMatch && vMatch[0].length) {                                                                       // 6236
        $video = $('<iframe>')                                                                                       // 6237
            .attr('frameborder', 0)                                                                                  // 6238
            .attr('src', vMatch[0] + '/embed/simple')                                                                // 6239
            .attr('width', '600').attr('height', '600')                                                              // 6240
            .attr('class', 'vine-embed');                                                                            // 6241
      } else if (vimMatch && vimMatch[3].length) {                                                                   // 6242
        $video = $('<iframe webkitallowfullscreen mozallowfullscreen allowfullscreen>')                              // 6243
            .attr('frameborder', 0)                                                                                  // 6244
            .attr('src', '//player.vimeo.com/video/' + vimMatch[3])                                                  // 6245
            .attr('width', '640').attr('height', '360');                                                             // 6246
      } else if (dmMatch && dmMatch[2].length) {                                                                     // 6247
        $video = $('<iframe>')                                                                                       // 6248
            .attr('frameborder', 0)                                                                                  // 6249
            .attr('src', '//www.dailymotion.com/embed/video/' + dmMatch[2])                                          // 6250
            .attr('width', '640').attr('height', '360');                                                             // 6251
      } else if (youkuMatch && youkuMatch[1].length) {                                                               // 6252
        $video = $('<iframe webkitallowfullscreen mozallowfullscreen allowfullscreen>')                              // 6253
            .attr('frameborder', 0)                                                                                  // 6254
            .attr('height', '498')                                                                                   // 6255
            .attr('width', '510')                                                                                    // 6256
            .attr('src', '//player.youku.com/embed/' + youkuMatch[1]);                                               // 6257
      } else if (mp4Match || oggMatch || webmMatch) {                                                                // 6258
        $video = $('<video controls>')                                                                               // 6259
            .attr('src', url)                                                                                        // 6260
            .attr('width', '640').attr('height', '360');                                                             // 6261
      } else {                                                                                                       // 6262
        // this is not a known video link. Now what, Cat? Now what?                                                  // 6263
        return false;                                                                                                // 6264
      }                                                                                                              // 6265
                                                                                                                     // 6266
      $video.addClass('note-video-clip');                                                                            // 6267
                                                                                                                     // 6268
      return $video[0];                                                                                              // 6269
    };                                                                                                               // 6270
                                                                                                                     // 6271
    this.show = function () {                                                                                        // 6272
      var text = context.invoke('editor.getSelectedText');                                                           // 6273
      context.invoke('editor.saveRange');                                                                            // 6274
      this.showVideoDialog(text).then(function (url) {                                                               // 6275
        // [workaround] hide dialog before restore range for IE range focus                                          // 6276
        ui.hideDialog(self.$dialog);                                                                                 // 6277
        context.invoke('editor.restoreRange');                                                                       // 6278
                                                                                                                     // 6279
        // build node                                                                                                // 6280
        var $node = self.createVideoNode(url);                                                                       // 6281
                                                                                                                     // 6282
        if ($node) {                                                                                                 // 6283
          // insert video node                                                                                       // 6284
          context.invoke('editor.insertNode', $node);                                                                // 6285
        }                                                                                                            // 6286
      }).fail(function () {                                                                                          // 6287
        context.invoke('editor.restoreRange');                                                                       // 6288
      });                                                                                                            // 6289
    };                                                                                                               // 6290
                                                                                                                     // 6291
    /**                                                                                                              // 6292
     * show image dialog                                                                                             // 6293
     *                                                                                                               // 6294
     * @param {jQuery} $dialog                                                                                       // 6295
     * @return {Promise}                                                                                             // 6296
     */                                                                                                              // 6297
    this.showVideoDialog = function (text) {                                                                         // 6298
      return $.Deferred(function (deferred) {                                                                        // 6299
        var $videoUrl = self.$dialog.find('.note-video-url'),                                                        // 6300
            $videoBtn = self.$dialog.find('.note-video-btn');                                                        // 6301
                                                                                                                     // 6302
        ui.onDialogShown(self.$dialog, function () {                                                                 // 6303
          context.triggerEvent('dialog.shown');                                                                      // 6304
                                                                                                                     // 6305
          $videoUrl.val(text).on('input', function () {                                                              // 6306
            ui.toggleBtn($videoBtn, $videoUrl.val());                                                                // 6307
          }).trigger('focus');                                                                                       // 6308
                                                                                                                     // 6309
          $videoBtn.click(function (event) {                                                                         // 6310
            event.preventDefault();                                                                                  // 6311
                                                                                                                     // 6312
            deferred.resolve($videoUrl.val());                                                                       // 6313
          });                                                                                                        // 6314
                                                                                                                     // 6315
          self.bindEnterKey($videoUrl, $videoBtn);                                                                   // 6316
        });                                                                                                          // 6317
                                                                                                                     // 6318
        ui.onDialogHidden(self.$dialog, function () {                                                                // 6319
          $videoUrl.off('input');                                                                                    // 6320
          $videoBtn.off('click');                                                                                    // 6321
                                                                                                                     // 6322
          if (deferred.state() === 'pending') {                                                                      // 6323
            deferred.reject();                                                                                       // 6324
          }                                                                                                          // 6325
        });                                                                                                          // 6326
                                                                                                                     // 6327
        ui.showDialog(self.$dialog);                                                                                 // 6328
      });                                                                                                            // 6329
    };                                                                                                               // 6330
  };                                                                                                                 // 6331
                                                                                                                     // 6332
  var HelpDialog = function (context) {                                                                              // 6333
    var self = this;                                                                                                 // 6334
    var ui = $.summernote.ui;                                                                                        // 6335
                                                                                                                     // 6336
    var $editor = context.layoutInfo.editor;                                                                         // 6337
    var options = context.options;                                                                                   // 6338
    var lang = options.langInfo;                                                                                     // 6339
                                                                                                                     // 6340
    this.createShortCutList = function () {                                                                          // 6341
      var keyMap = options.keyMap[agent.isMac ? 'mac' : 'pc'];                                                       // 6342
      return Object.keys(keyMap).map(function (key) {                                                                // 6343
        var command = keyMap[key];                                                                                   // 6344
        var $row = $('<div><div class="help-list-item"/></div>');                                                    // 6345
        $row.append($('<label><kbd>' + key + '</kdb></label>').css({                                                 // 6346
          'width': 180,                                                                                              // 6347
          'margin-right': 10                                                                                         // 6348
        })).append($('<span/>').html(context.memo('help.' + command) || command));                                   // 6349
        return $row.html();                                                                                          // 6350
      }).join('');                                                                                                   // 6351
    };                                                                                                               // 6352
                                                                                                                     // 6353
    this.initialize = function () {                                                                                  // 6354
      var $container = options.dialogsInBody ? $(document.body) : $editor;                                           // 6355
                                                                                                                     // 6356
      var body = [                                                                                                   // 6357
        '<p class="text-center">',                                                                                   // 6358
        '<a href="//summernote.org/" target="_blank">Summernote 0.8.1</a> · ',                                       // 6359
        '<a href="//github.com/summernote/summernote" target="_blank">Project</a> · ',                               // 6360
        '<a href="//github.com/summernote/summernote/issues" target="_blank">Issues</a>',                            // 6361
        '</p>'                                                                                                       // 6362
      ].join('');                                                                                                    // 6363
                                                                                                                     // 6364
      this.$dialog = ui.dialog({                                                                                     // 6365
        title: lang.options.help,                                                                                    // 6366
        fade: options.dialogsFade,                                                                                   // 6367
        body: this.createShortCutList(),                                                                             // 6368
        footer: body,                                                                                                // 6369
        callback: function ($node) {                                                                                 // 6370
          $node.find('.modal-body').css({                                                                            // 6371
            'max-height': 300,                                                                                       // 6372
            'overflow': 'scroll'                                                                                     // 6373
          });                                                                                                        // 6374
        }                                                                                                            // 6375
      }).render().appendTo($container);                                                                              // 6376
    };                                                                                                               // 6377
                                                                                                                     // 6378
    this.destroy = function () {                                                                                     // 6379
      ui.hideDialog(this.$dialog);                                                                                   // 6380
      this.$dialog.remove();                                                                                         // 6381
    };                                                                                                               // 6382
                                                                                                                     // 6383
    /**                                                                                                              // 6384
     * show help dialog                                                                                              // 6385
     *                                                                                                               // 6386
     * @return {Promise}                                                                                             // 6387
     */                                                                                                              // 6388
    this.showHelpDialog = function () {                                                                              // 6389
      return $.Deferred(function (deferred) {                                                                        // 6390
        ui.onDialogShown(self.$dialog, function () {                                                                 // 6391
          context.triggerEvent('dialog.shown');                                                                      // 6392
          deferred.resolve();                                                                                        // 6393
        });                                                                                                          // 6394
        ui.showDialog(self.$dialog);                                                                                 // 6395
      }).promise();                                                                                                  // 6396
    };                                                                                                               // 6397
                                                                                                                     // 6398
    this.show = function () {                                                                                        // 6399
      context.invoke('editor.saveRange');                                                                            // 6400
      this.showHelpDialog().then(function () {                                                                       // 6401
        context.invoke('editor.restoreRange');                                                                       // 6402
      });                                                                                                            // 6403
    };                                                                                                               // 6404
  };                                                                                                                 // 6405
                                                                                                                     // 6406
  var AirPopover = function (context) {                                                                              // 6407
    var self = this;                                                                                                 // 6408
    var ui = $.summernote.ui;                                                                                        // 6409
                                                                                                                     // 6410
    var options = context.options;                                                                                   // 6411
                                                                                                                     // 6412
    var AIR_MODE_POPOVER_X_OFFSET = 20;                                                                              // 6413
                                                                                                                     // 6414
    this.events = {                                                                                                  // 6415
      'summernote.keyup summernote.mouseup summernote.scroll': function () {                                         // 6416
        self.update();                                                                                               // 6417
      },                                                                                                             // 6418
      'summernote.change summernote.dialog.shown': function () {                                                     // 6419
        self.hide();                                                                                                 // 6420
      },                                                                                                             // 6421
      'summernote.focusout': function (we, e) {                                                                      // 6422
        // [workaround] Firefox doesn't support relatedTarget on focusout                                            // 6423
        //  - Ignore hide action on focus out in FF.                                                                 // 6424
        if (agent.isFF) {                                                                                            // 6425
          return;                                                                                                    // 6426
        }                                                                                                            // 6427
                                                                                                                     // 6428
        if (!e.relatedTarget || !dom.ancestor(e.relatedTarget, func.eq(self.$popover[0]))) {                         // 6429
          self.hide();                                                                                               // 6430
        }                                                                                                            // 6431
      }                                                                                                              // 6432
    };                                                                                                               // 6433
                                                                                                                     // 6434
    this.shouldInitialize = function () {                                                                            // 6435
      return options.airMode && !list.isEmpty(options.popover.air);                                                  // 6436
    };                                                                                                               // 6437
                                                                                                                     // 6438
    this.initialize = function () {                                                                                  // 6439
      this.$popover = ui.popover({                                                                                   // 6440
        className: 'note-air-popover'                                                                                // 6441
      }).render().appendTo('body');                                                                                  // 6442
      var $content = this.$popover.find('.popover-content');                                                         // 6443
                                                                                                                     // 6444
      context.invoke('buttons.build', $content, options.popover.air);                                                // 6445
    };                                                                                                               // 6446
                                                                                                                     // 6447
    this.destroy = function () {                                                                                     // 6448
      this.$popover.remove();                                                                                        // 6449
    };                                                                                                               // 6450
                                                                                                                     // 6451
    this.update = function () {                                                                                      // 6452
      var styleInfo = context.invoke('editor.currentStyle');                                                         // 6453
      if (styleInfo.range && !styleInfo.range.isCollapsed()) {                                                       // 6454
        var rect = list.last(styleInfo.range.getClientRects());                                                      // 6455
        if (rect) {                                                                                                  // 6456
          var bnd = func.rect2bnd(rect);                                                                             // 6457
          this.$popover.css({                                                                                        // 6458
            display: 'block',                                                                                        // 6459
            left: Math.max(bnd.left + bnd.width / 2, 0) - AIR_MODE_POPOVER_X_OFFSET,                                 // 6460
            top: bnd.top + bnd.height                                                                                // 6461
          });                                                                                                        // 6462
        }                                                                                                            // 6463
      } else {                                                                                                       // 6464
        this.hide();                                                                                                 // 6465
      }                                                                                                              // 6466
    };                                                                                                               // 6467
                                                                                                                     // 6468
    this.hide = function () {                                                                                        // 6469
      this.$popover.hide();                                                                                          // 6470
    };                                                                                                               // 6471
  };                                                                                                                 // 6472
                                                                                                                     // 6473
  var HintPopover = function (context) {                                                                             // 6474
    var self = this;                                                                                                 // 6475
    var ui = $.summernote.ui;                                                                                        // 6476
                                                                                                                     // 6477
    var POPOVER_DIST = 5;                                                                                            // 6478
    var hint = context.options.hint || [];                                                                           // 6479
    var direction = context.options.hintDirection || 'bottom';                                                       // 6480
    var hints = $.isArray(hint) ? hint : [hint];                                                                     // 6481
                                                                                                                     // 6482
    this.events = {                                                                                                  // 6483
      'summernote.keyup': function (we, e) {                                                                         // 6484
        if (!e.isDefaultPrevented()) {                                                                               // 6485
          self.handleKeyup(e);                                                                                       // 6486
        }                                                                                                            // 6487
      },                                                                                                             // 6488
      'summernote.keydown': function (we, e) {                                                                       // 6489
        self.handleKeydown(e);                                                                                       // 6490
      },                                                                                                             // 6491
      'summernote.dialog.shown': function () {                                                                       // 6492
        self.hide();                                                                                                 // 6493
      }                                                                                                              // 6494
    };                                                                                                               // 6495
                                                                                                                     // 6496
    this.shouldInitialize = function () {                                                                            // 6497
      return hints.length > 0;                                                                                       // 6498
    };                                                                                                               // 6499
                                                                                                                     // 6500
    this.initialize = function () {                                                                                  // 6501
      this.lastWordRange = null;                                                                                     // 6502
      this.$popover = ui.popover({                                                                                   // 6503
        className: 'note-hint-popover',                                                                              // 6504
        hideArrow: true,                                                                                             // 6505
        direction: ''                                                                                                // 6506
      }).render().appendTo('body');                                                                                  // 6507
                                                                                                                     // 6508
      this.$popover.hide();                                                                                          // 6509
                                                                                                                     // 6510
      this.$content = this.$popover.find('.popover-content');                                                        // 6511
                                                                                                                     // 6512
      this.$content.on('click', '.note-hint-item', function () {                                                     // 6513
        self.$content.find('.active').removeClass('active');                                                         // 6514
        $(this).addClass('active');                                                                                  // 6515
        self.replace();                                                                                              // 6516
      });                                                                                                            // 6517
    };                                                                                                               // 6518
                                                                                                                     // 6519
    this.destroy = function () {                                                                                     // 6520
      this.$popover.remove();                                                                                        // 6521
    };                                                                                                               // 6522
                                                                                                                     // 6523
    this.selectItem = function ($item) {                                                                             // 6524
      this.$content.find('.active').removeClass('active');                                                           // 6525
      $item.addClass('active');                                                                                      // 6526
                                                                                                                     // 6527
      this.$content[0].scrollTop = $item[0].offsetTop - (this.$content.innerHeight() / 2);                           // 6528
    };                                                                                                               // 6529
                                                                                                                     // 6530
    this.moveDown = function () {                                                                                    // 6531
      var $current = this.$content.find('.note-hint-item.active');                                                   // 6532
      var $next = $current.next();                                                                                   // 6533
                                                                                                                     // 6534
      if ($next.length) {                                                                                            // 6535
        this.selectItem($next);                                                                                      // 6536
      } else {                                                                                                       // 6537
        var $nextGroup = $current.parent().next();                                                                   // 6538
                                                                                                                     // 6539
        if (!$nextGroup.length) {                                                                                    // 6540
          $nextGroup = this.$content.find('.note-hint-group').first();                                               // 6541
        }                                                                                                            // 6542
                                                                                                                     // 6543
        this.selectItem($nextGroup.find('.note-hint-item').first());                                                 // 6544
      }                                                                                                              // 6545
    };                                                                                                               // 6546
                                                                                                                     // 6547
    this.moveUp = function () {                                                                                      // 6548
      var $current = this.$content.find('.note-hint-item.active');                                                   // 6549
      var $prev = $current.prev();                                                                                   // 6550
                                                                                                                     // 6551
      if ($prev.length) {                                                                                            // 6552
        this.selectItem($prev);                                                                                      // 6553
      } else {                                                                                                       // 6554
        var $prevGroup = $current.parent().prev();                                                                   // 6555
                                                                                                                     // 6556
        if (!$prevGroup.length) {                                                                                    // 6557
          $prevGroup = this.$content.find('.note-hint-group').last();                                                // 6558
        }                                                                                                            // 6559
                                                                                                                     // 6560
        this.selectItem($prevGroup.find('.note-hint-item').last());                                                  // 6561
      }                                                                                                              // 6562
    };                                                                                                               // 6563
                                                                                                                     // 6564
    this.replace = function () {                                                                                     // 6565
      var $item = this.$content.find('.note-hint-item.active');                                                      // 6566
                                                                                                                     // 6567
      if ($item.length) {                                                                                            // 6568
        var node = this.nodeFromItem($item);                                                                         // 6569
        this.lastWordRange.insertNode(node);                                                                         // 6570
        range.createFromNode(node).collapse().select();                                                              // 6571
                                                                                                                     // 6572
        this.lastWordRange = null;                                                                                   // 6573
        this.hide();                                                                                                 // 6574
        context.invoke('editor.focus');                                                                              // 6575
      }                                                                                                              // 6576
                                                                                                                     // 6577
    };                                                                                                               // 6578
                                                                                                                     // 6579
    this.nodeFromItem = function ($item) {                                                                           // 6580
      var hint = hints[$item.data('index')];                                                                         // 6581
      var item = $item.data('item');                                                                                 // 6582
      var node = hint.content ? hint.content(item) : item;                                                           // 6583
      if (typeof node === 'string') {                                                                                // 6584
        node = dom.createText(node);                                                                                 // 6585
      }                                                                                                              // 6586
      return node;                                                                                                   // 6587
    };                                                                                                               // 6588
                                                                                                                     // 6589
    this.createItemTemplates = function (hintIdx, items) {                                                           // 6590
      var hint = hints[hintIdx];                                                                                     // 6591
      return items.map(function (item, idx) {                                                                        // 6592
        var $item = $('<div class="note-hint-item"/>');                                                              // 6593
        $item.append(hint.template ? hint.template(item) : item + '');                                               // 6594
        $item.data({                                                                                                 // 6595
          'index': hintIdx,                                                                                          // 6596
          'item': item                                                                                               // 6597
        });                                                                                                          // 6598
                                                                                                                     // 6599
        if (hintIdx === 0 && idx === 0) {                                                                            // 6600
          $item.addClass('active');                                                                                  // 6601
        }                                                                                                            // 6602
        return $item;                                                                                                // 6603
      });                                                                                                            // 6604
    };                                                                                                               // 6605
                                                                                                                     // 6606
    this.handleKeydown = function (e) {                                                                              // 6607
      if (!this.$popover.is(':visible')) {                                                                           // 6608
        return;                                                                                                      // 6609
      }                                                                                                              // 6610
                                                                                                                     // 6611
      if (e.keyCode === key.code.ENTER) {                                                                            // 6612
        e.preventDefault();                                                                                          // 6613
        this.replace();                                                                                              // 6614
      } else if (e.keyCode === key.code.UP) {                                                                        // 6615
        e.preventDefault();                                                                                          // 6616
        this.moveUp();                                                                                               // 6617
      } else if (e.keyCode === key.code.DOWN) {                                                                      // 6618
        e.preventDefault();                                                                                          // 6619
        this.moveDown();                                                                                             // 6620
      }                                                                                                              // 6621
    };                                                                                                               // 6622
                                                                                                                     // 6623
    this.searchKeyword = function (index, keyword, callback) {                                                       // 6624
      var hint = hints[index];                                                                                       // 6625
      if (hint && hint.match.test(keyword) && hint.search) {                                                         // 6626
        var matches = hint.match.exec(keyword);                                                                      // 6627
        hint.search(matches[1], callback);                                                                           // 6628
      } else {                                                                                                       // 6629
        callback();                                                                                                  // 6630
      }                                                                                                              // 6631
    };                                                                                                               // 6632
                                                                                                                     // 6633
    this.createGroup = function (idx, keyword) {                                                                     // 6634
      var $group = $('<div class="note-hint-group note-hint-group-' + idx + '"/>');                                  // 6635
      this.searchKeyword(idx, keyword, function (items) {                                                            // 6636
        items = items || [];                                                                                         // 6637
        if (items.length) {                                                                                          // 6638
          $group.html(self.createItemTemplates(idx, items));                                                         // 6639
          self.show();                                                                                               // 6640
        }                                                                                                            // 6641
      });                                                                                                            // 6642
                                                                                                                     // 6643
      return $group;                                                                                                 // 6644
    };                                                                                                               // 6645
                                                                                                                     // 6646
    this.handleKeyup = function (e) {                                                                                // 6647
      if (list.contains([key.code.ENTER, key.code.UP, key.code.DOWN], e.keyCode)) {                                  // 6648
        if (e.keyCode === key.code.ENTER) {                                                                          // 6649
          if (this.$popover.is(':visible')) {                                                                        // 6650
            return;                                                                                                  // 6651
          }                                                                                                          // 6652
        }                                                                                                            // 6653
      } else {                                                                                                       // 6654
        var wordRange = context.invoke('editor.createRange').getWordRange();                                         // 6655
        var keyword = wordRange.toString();                                                                          // 6656
        if (hints.length && keyword) {                                                                               // 6657
          this.$content.empty();                                                                                     // 6658
                                                                                                                     // 6659
          var bnd = func.rect2bnd(list.last(wordRange.getClientRects()));                                            // 6660
          if (bnd) {                                                                                                 // 6661
                                                                                                                     // 6662
            this.$popover.hide();                                                                                    // 6663
                                                                                                                     // 6664
            this.lastWordRange = wordRange;                                                                          // 6665
                                                                                                                     // 6666
            hints.forEach(function (hint, idx) {                                                                     // 6667
              if (hint.match.test(keyword)) {                                                                        // 6668
                self.createGroup(idx, keyword).appendTo(self.$content);                                              // 6669
              }                                                                                                      // 6670
            });                                                                                                      // 6671
                                                                                                                     // 6672
            // set position for popover after group is created                                                       // 6673
            if (direction === 'top') {                                                                               // 6674
              this.$popover.css({                                                                                    // 6675
                left: bnd.left,                                                                                      // 6676
                top: bnd.top - this.$popover.outerHeight() - POPOVER_DIST                                            // 6677
              });                                                                                                    // 6678
            } else {                                                                                                 // 6679
              this.$popover.css({                                                                                    // 6680
                left: bnd.left,                                                                                      // 6681
                top: bnd.top + bnd.height + POPOVER_DIST                                                             // 6682
              });                                                                                                    // 6683
            }                                                                                                        // 6684
                                                                                                                     // 6685
          }                                                                                                          // 6686
        } else {                                                                                                     // 6687
          this.hide();                                                                                               // 6688
        }                                                                                                            // 6689
      }                                                                                                              // 6690
    };                                                                                                               // 6691
                                                                                                                     // 6692
    this.show = function () {                                                                                        // 6693
      this.$popover.show();                                                                                          // 6694
    };                                                                                                               // 6695
                                                                                                                     // 6696
    this.hide = function () {                                                                                        // 6697
      this.$popover.hide();                                                                                          // 6698
    };                                                                                                               // 6699
  };                                                                                                                 // 6700
                                                                                                                     // 6701
                                                                                                                     // 6702
  $.summernote = $.extend($.summernote, {                                                                            // 6703
    version: '0.8.1',                                                                                                // 6704
    ui: ui,                                                                                                          // 6705
                                                                                                                     // 6706
    plugins: {},                                                                                                     // 6707
                                                                                                                     // 6708
    options: {                                                                                                       // 6709
      modules: {                                                                                                     // 6710
        'editor': Editor,                                                                                            // 6711
        'clipboard': Clipboard,                                                                                      // 6712
        'dropzone': Dropzone,                                                                                        // 6713
        'codeview': Codeview,                                                                                        // 6714
        'statusbar': Statusbar,                                                                                      // 6715
        'fullscreen': Fullscreen,                                                                                    // 6716
        'handle': Handle,                                                                                            // 6717
        // FIXME: HintPopover must be front of autolink                                                              // 6718
        //  - Script error about range when Enter key is pressed on hint popover                                     // 6719
        'hintPopover': HintPopover,                                                                                  // 6720
        'autoLink': AutoLink,                                                                                        // 6721
        'autoSync': AutoSync,                                                                                        // 6722
        'placeholder': Placeholder,                                                                                  // 6723
        'buttons': Buttons,                                                                                          // 6724
        'toolbar': Toolbar,                                                                                          // 6725
        'linkDialog': LinkDialog,                                                                                    // 6726
        'linkPopover': LinkPopover,                                                                                  // 6727
        'imageDialog': ImageDialog,                                                                                  // 6728
        'imagePopover': ImagePopover,                                                                                // 6729
        'videoDialog': VideoDialog,                                                                                  // 6730
        'helpDialog': HelpDialog,                                                                                    // 6731
        'airPopover': AirPopover                                                                                     // 6732
      },                                                                                                             // 6733
                                                                                                                     // 6734
      buttons: {},                                                                                                   // 6735
                                                                                                                     // 6736
      lang: 'en-US',                                                                                                 // 6737
                                                                                                                     // 6738
      // toolbar                                                                                                     // 6739
      toolbar: [                                                                                                     // 6740
        ['style', ['style']],                                                                                        // 6741
        ['font', ['bold', 'underline', 'clear']],                                                                    // 6742
        ['fontname', ['fontname']],                                                                                  // 6743
        ['color', ['color']],                                                                                        // 6744
        ['para', ['ul', 'ol', 'paragraph']],                                                                         // 6745
        ['table', ['table']],                                                                                        // 6746
        ['insert', ['link', 'picture', 'video']],                                                                    // 6747
        ['view', ['fullscreen', 'codeview', 'help']]                                                                 // 6748
      ],                                                                                                             // 6749
                                                                                                                     // 6750
      // popover                                                                                                     // 6751
      popover: {                                                                                                     // 6752
        image: [                                                                                                     // 6753
          ['imagesize', ['imageSize100', 'imageSize50', 'imageSize25']],                                             // 6754
          ['float', ['floatLeft', 'floatRight', 'floatNone']],                                                       // 6755
          ['remove', ['removeMedia']]                                                                                // 6756
        ],                                                                                                           // 6757
        link: [                                                                                                      // 6758
          ['link', ['linkDialogShow', 'unlink']]                                                                     // 6759
        ],                                                                                                           // 6760
        air: [                                                                                                       // 6761
          ['color', ['color']],                                                                                      // 6762
          ['font', ['bold', 'underline', 'clear']],                                                                  // 6763
          ['para', ['ul', 'paragraph']],                                                                             // 6764
          ['table', ['table']],                                                                                      // 6765
          ['insert', ['link', 'picture']]                                                                            // 6766
        ]                                                                                                            // 6767
      },                                                                                                             // 6768
                                                                                                                     // 6769
      // air mode: inline editor                                                                                     // 6770
      airMode: false,                                                                                                // 6771
                                                                                                                     // 6772
      width: null,                                                                                                   // 6773
      height: null,                                                                                                  // 6774
                                                                                                                     // 6775
      focus: false,                                                                                                  // 6776
      tabSize: 4,                                                                                                    // 6777
      styleWithSpan: true,                                                                                           // 6778
      shortcuts: true,                                                                                               // 6779
      textareaAutoSync: true,                                                                                        // 6780
      direction: null,                                                                                               // 6781
                                                                                                                     // 6782
      styleTags: ['p', 'blockquote', 'pre', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],                                     // 6783
                                                                                                                     // 6784
      fontNames: [                                                                                                   // 6785
        'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New',                                                      // 6786
        'Helvetica Neue', 'Helvetica', 'Impact', 'Lucida Grande',                                                    // 6787
        'Tahoma', 'Times New Roman', 'Verdana'                                                                       // 6788
      ],                                                                                                             // 6789
                                                                                                                     // 6790
      fontSizes: ['8', '9', '10', '11', '12', '14', '18', '24', '36'],                                               // 6791
                                                                                                                     // 6792
      // pallete colors(n x n)                                                                                       // 6793
      colors: [                                                                                                      // 6794
        ['#000000', '#424242', '#636363', '#9C9C94', '#CEC6CE', '#EFEFEF', '#F7F7F7', '#FFFFFF'],                    // 6795
        ['#FF0000', '#FF9C00', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF', '#9C00FF', '#FF00FF'],                    // 6796
        ['#F7C6CE', '#FFE7CE', '#FFEFC6', '#D6EFD6', '#CEDEE7', '#CEE7F7', '#D6D6E7', '#E7D6DE'],                    // 6797
        ['#E79C9C', '#FFC69C', '#FFE79C', '#B5D6A5', '#A5C6CE', '#9CC6EF', '#B5A5D6', '#D6A5BD'],                    // 6798
        ['#E76363', '#F7AD6B', '#FFD663', '#94BD7B', '#73A5AD', '#6BADDE', '#8C7BC6', '#C67BA5'],                    // 6799
        ['#CE0000', '#E79439', '#EFC631', '#6BA54A', '#4A7B8C', '#3984C6', '#634AA5', '#A54A7B'],                    // 6800
        ['#9C0000', '#B56308', '#BD9400', '#397B21', '#104A5A', '#085294', '#311873', '#731842'],                    // 6801
        ['#630000', '#7B3900', '#846300', '#295218', '#083139', '#003163', '#21104A', '#4A1031']                     // 6802
      ],                                                                                                             // 6803
                                                                                                                     // 6804
      lineHeights: ['1.0', '1.2', '1.4', '1.5', '1.6', '1.8', '2.0', '3.0'],                                         // 6805
                                                                                                                     // 6806
      tableClassName: 'table table-bordered',                                                                        // 6807
                                                                                                                     // 6808
      insertTableMaxSize: {                                                                                          // 6809
        col: 10,                                                                                                     // 6810
        row: 10                                                                                                      // 6811
      },                                                                                                             // 6812
                                                                                                                     // 6813
      dialogsInBody: false,                                                                                          // 6814
      dialogsFade: false,                                                                                            // 6815
                                                                                                                     // 6816
      maximumImageFileSize: null,                                                                                    // 6817
                                                                                                                     // 6818
      callbacks: {                                                                                                   // 6819
        onInit: null,                                                                                                // 6820
        onFocus: null,                                                                                               // 6821
        onBlur: null,                                                                                                // 6822
        onEnter: null,                                                                                               // 6823
        onKeyup: null,                                                                                               // 6824
        onKeydown: null,                                                                                             // 6825
        onSubmit: null,                                                                                              // 6826
        onImageUpload: null,                                                                                         // 6827
        onImageUploadError: null                                                                                     // 6828
      },                                                                                                             // 6829
                                                                                                                     // 6830
      codemirror: {                                                                                                  // 6831
        mode: 'text/html',                                                                                           // 6832
        htmlMode: true,                                                                                              // 6833
        lineNumbers: true                                                                                            // 6834
      },                                                                                                             // 6835
                                                                                                                     // 6836
      keyMap: {                                                                                                      // 6837
        pc: {                                                                                                        // 6838
          'ENTER': 'insertParagraph',                                                                                // 6839
          'CTRL+Z': 'undo',                                                                                          // 6840
          'CTRL+Y': 'redo',                                                                                          // 6841
          'TAB': 'tab',                                                                                              // 6842
          'SHIFT+TAB': 'untab',                                                                                      // 6843
          'CTRL+B': 'bold',                                                                                          // 6844
          'CTRL+I': 'italic',                                                                                        // 6845
          'CTRL+U': 'underline',                                                                                     // 6846
          'CTRL+SHIFT+S': 'strikethrough',                                                                           // 6847
          'CTRL+BACKSLASH': 'removeFormat',                                                                          // 6848
          'CTRL+SHIFT+L': 'justifyLeft',                                                                             // 6849
          'CTRL+SHIFT+E': 'justifyCenter',                                                                           // 6850
          'CTRL+SHIFT+R': 'justifyRight',                                                                            // 6851
          'CTRL+SHIFT+J': 'justifyFull',                                                                             // 6852
          'CTRL+SHIFT+NUM7': 'insertUnorderedList',                                                                  // 6853
          'CTRL+SHIFT+NUM8': 'insertOrderedList',                                                                    // 6854
          'CTRL+LEFTBRACKET': 'outdent',                                                                             // 6855
          'CTRL+RIGHTBRACKET': 'indent',                                                                             // 6856
          'CTRL+NUM0': 'formatPara',                                                                                 // 6857
          'CTRL+NUM1': 'formatH1',                                                                                   // 6858
          'CTRL+NUM2': 'formatH2',                                                                                   // 6859
          'CTRL+NUM3': 'formatH3',                                                                                   // 6860
          'CTRL+NUM4': 'formatH4',                                                                                   // 6861
          'CTRL+NUM5': 'formatH5',                                                                                   // 6862
          'CTRL+NUM6': 'formatH6',                                                                                   // 6863
          'CTRL+ENTER': 'insertHorizontalRule',                                                                      // 6864
          'CTRL+K': 'linkDialog.show'                                                                                // 6865
        },                                                                                                           // 6866
                                                                                                                     // 6867
        mac: {                                                                                                       // 6868
          'ENTER': 'insertParagraph',                                                                                // 6869
          'CMD+Z': 'undo',                                                                                           // 6870
          'CMD+SHIFT+Z': 'redo',                                                                                     // 6871
          'TAB': 'tab',                                                                                              // 6872
          'SHIFT+TAB': 'untab',                                                                                      // 6873
          'CMD+B': 'bold',                                                                                           // 6874
          'CMD+I': 'italic',                                                                                         // 6875
          'CMD+U': 'underline',                                                                                      // 6876
          'CMD+SHIFT+S': 'strikethrough',                                                                            // 6877
          'CMD+BACKSLASH': 'removeFormat',                                                                           // 6878
          'CMD+SHIFT+L': 'justifyLeft',                                                                              // 6879
          'CMD+SHIFT+E': 'justifyCenter',                                                                            // 6880
          'CMD+SHIFT+R': 'justifyRight',                                                                             // 6881
          'CMD+SHIFT+J': 'justifyFull',                                                                              // 6882
          'CMD+SHIFT+NUM7': 'insertUnorderedList',                                                                   // 6883
          'CMD+SHIFT+NUM8': 'insertOrderedList',                                                                     // 6884
          'CMD+LEFTBRACKET': 'outdent',                                                                              // 6885
          'CMD+RIGHTBRACKET': 'indent',                                                                              // 6886
          'CMD+NUM0': 'formatPara',                                                                                  // 6887
          'CMD+NUM1': 'formatH1',                                                                                    // 6888
          'CMD+NUM2': 'formatH2',                                                                                    // 6889
          'CMD+NUM3': 'formatH3',                                                                                    // 6890
          'CMD+NUM4': 'formatH4',                                                                                    // 6891
          'CMD+NUM5': 'formatH5',                                                                                    // 6892
          'CMD+NUM6': 'formatH6',                                                                                    // 6893
          'CMD+ENTER': 'insertHorizontalRule',                                                                       // 6894
          'CMD+K': 'linkDialog.show'                                                                                 // 6895
        }                                                                                                            // 6896
      },                                                                                                             // 6897
      icons: {                                                                                                       // 6898
        'align': 'note-icon-align',                                                                                  // 6899
        'alignCenter': 'note-icon-align-center',                                                                     // 6900
        'alignJustify': 'note-icon-align-justify',                                                                   // 6901
        'alignLeft': 'note-icon-align-left',                                                                         // 6902
        'alignRight': 'note-icon-align-right',                                                                       // 6903
        'indent': 'note-icon-align-indent',                                                                          // 6904
        'outdent': 'note-icon-align-outdent',                                                                        // 6905
        'arrowsAlt': 'note-icon-arrows-alt',                                                                         // 6906
        'bold': 'note-icon-bold',                                                                                    // 6907
        'caret': 'note-icon-caret',                                                                                  // 6908
        'circle': 'note-icon-circle',                                                                                // 6909
        'close': 'note-icon-close',                                                                                  // 6910
        'code': 'note-icon-code',                                                                                    // 6911
        'eraser': 'note-icon-eraser',                                                                                // 6912
        'font': 'note-icon-font',                                                                                    // 6913
        'frame': 'note-icon-frame',                                                                                  // 6914
        'italic': 'note-icon-italic',                                                                                // 6915
        'link': 'note-icon-link',                                                                                    // 6916
        'unlink': 'note-icon-chain-broken',                                                                          // 6917
        'magic': 'note-icon-magic',                                                                                  // 6918
        'menuCheck': 'note-icon-check',                                                                              // 6919
        'minus': 'note-icon-minus',                                                                                  // 6920
        'orderedlist': 'note-icon-orderedlist',                                                                      // 6921
        'pencil': 'note-icon-pencil',                                                                                // 6922
        'picture': 'note-icon-picture',                                                                              // 6923
        'question': 'note-icon-question',                                                                            // 6924
        'redo': 'note-icon-redo',                                                                                    // 6925
        'square': 'note-icon-square',                                                                                // 6926
        'strikethrough': 'note-icon-strikethrough',                                                                  // 6927
        'subscript': 'note-icon-subscript',                                                                          // 6928
        'superscript': 'note-icon-superscript',                                                                      // 6929
        'table': 'note-icon-table',                                                                                  // 6930
        'textHeight': 'note-icon-text-height',                                                                       // 6931
        'trash': 'note-icon-trash',                                                                                  // 6932
        'underline': 'note-icon-underline',                                                                          // 6933
        'undo': 'note-icon-undo',                                                                                    // 6934
        'unorderedlist': 'note-icon-unorderedlist',                                                                  // 6935
        'video': 'note-icon-video'                                                                                   // 6936
      }                                                                                                              // 6937
    }                                                                                                                // 6938
  });                                                                                                                // 6939
                                                                                                                     // 6940
}));                                                                                                                 // 6941
                                                                                                                     // 6942
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['summernote:standalone'] = {};

})();
