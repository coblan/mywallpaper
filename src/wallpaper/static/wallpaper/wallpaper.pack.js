/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.cross_get = cross_get;
function cross_get(url, callback) {
    if (window.java_obj) {
        $.get(url, callback);
    } else {
        var get_url = '/proxy?url=' + encodeURIComponent(url);
        $.get(get_url, callback);
    }
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _myrequest = __webpack_require__(0);

var myrequest = _interopRequireWildcard(_myrequest);

var _data = __webpack_require__(2);

var data = _interopRequireWildcard(_data);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

window.data = data;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CategoryManager = exports.ImageManager = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _myrequest = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UrlManager = function () {
    function UrlManager() {
        _classCallCheck(this, UrlManager);

        this.pre = '';
        this.page = '';
        this.suf = '';
        this.page = 0;

        this.set_daily();
    }

    _createClass(UrlManager, [{
        key: 'set_daily',
        value: function set_daily() {
            this.pre = 'http://d2-wallpaperv3.ticktockapps.com/res/image/all/';
            this.page = 1;
            this.suf = '?app=wallhd-10000&device=iPhone8%2C1&devicesize=750x1334&ios=9.2.1&thumb=305x543&version=4.6';
        }
    }, {
        key: 'set_category',
        value: function set_category(cat) {
            this.pre = 'http://d2-wallpaperv3.ticktockapps.com/res/image/tag/' + cat + '/';
            this.page = 1;
            this.suf = '?app=wallhd-10000&device=iPod5%2C1&devicesize=640x1136&ios=8.3&thumb=305x543&version=4.6';
        }
    }, {
        key: 'get_next_url',
        value: function get_next_url() {
            var real_url = this.pre + this.page + this.suf;
            this.page += 1;
            return real_url;
        }
    }]);

    return UrlManager;
}();

var ImageManager = exports.ImageManager = function () {
    function ImageManager() {
        _classCallCheck(this, ImageManager);

        this.url_obj = new UrlManager();
        this.image_list = [];
        this.has_next_page = true;
    }

    _createClass(ImageManager, [{
        key: 'load_more',
        value: function load_more(callback) {
            var self = this;
            var url = this.url_obj.get_next_url();
            var timer = setTimeout(callback, 15 * 1000);
            (0, _myrequest.cross_get)(url, function (resp) {
                clearTimeout(timer);
                var new_image_list = resp.images;
                console.log('loaded....');
                self.image_list.push.apply(self.image_list, new_image_list);
                //			for(var i=0;i<new_image_list.length;i++){
                //				new_image_list[i].loaded=false
                //				self.image_list.push(new_image_list[i])
                //			}
                if (new_image_list.length < 72) {
                    self.has_next_page = false;
                } else {
                    self.has_next_page = true;
                }
                if (callback) {
                    callback(new_image_list);
                }
            });
        }
    }, {
        key: 'clear',
        value: function clear() {
            this.image_list.length = 0;
        }
    }]);

    return ImageManager;
}();

var CategoryManager = exports.CategoryManager = function () {
    function CategoryManager() {
        _classCallCheck(this, CategoryManager);

        this.categorys = [];
    }

    _createClass(CategoryManager, [{
        key: 'update',
        value: function update() {
            var self = this;
            var url = 'http://d2-wallpaperv3.ticktockapps.com/res/tag/category.json?app=wallhd-10000&device=iPod5%2C1&devicesize=640x1136&ios=8.3&sort=pop&thumb=305x543&version=4.6';
            (0, _myrequest.cross_get)(url, function (resp) {
                self.categorys.length = 0;
                self.categorys.push.apply(self.categorys, resp.data[1].categories);
            });
        }
    }]);

    return CategoryManager;
}();

/***/ })
/******/ ]);