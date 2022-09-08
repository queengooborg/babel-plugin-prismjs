"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _components = _interopRequireDefault(require("prismjs/components.js"));

var _dependencies = _interopRequireDefault(require("prismjs/dependencies.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * @param {string} type
 * @returns {(name: string) => string}
 */
var getPath = function getPath(type) {
  return function (name) {
    return "prismjs/".concat(_components["default"][type].meta.path.replace(/\{id\}/g, name));
  };
};
/**
 * @param {string} dep
 * @returns {boolean}
 */


var isPlugin = function isPlugin(dep) {
  return _components["default"].plugins[dep] != null;
};
/**
 * @param {string} type
 * @param {string} name
 * @returns {boolean}
 */


var getNoCSS = function getNoCSS(type, name) {
  return !!_components["default"][type][name].noCSS;
};
/**
 * @param {string} theme
 * @returns {string}
 */


var getThemePath = function getThemePath(theme) {
  if (theme.includes('/')) {
    var _theme$split = theme.split('/'),
        _theme$split2 = _slicedToArray(_theme$split, 2),
        themePackage = _theme$split2[0],
        themeName = _theme$split2[1];

    return "".concat(themePackage, "/themes/prism-").concat(themeName, ".css");
  }

  if (theme === 'default') {
    theme = 'prism';
  } else {
    theme = "prism-".concat(theme);
  }

  return getPath('themes')(theme);
};

var getPluginPath = getPath('plugins');
var getLanguagePath = getPath('languages');
/**
 * @param {Options} [options]
 * @returns {string[]}
 *
 * @typedef Options
 * @property {string[] | 'all'} [languages]
 * @property {string[]} [plugins]
 * @property {string} [theme]
 * @property {boolean} [css]
 */

var _default = function _default() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$languages = _ref.languages,
      languages = _ref$languages === void 0 ? [] : _ref$languages,
      _ref$plugins = _ref.plugins,
      plugins = _ref$plugins === void 0 ? [] : _ref$plugins,
      theme = _ref.theme,
      _ref$css = _ref.css,
      css = _ref$css === void 0 ? false : _ref$css;

  if (languages === 'all') {
    languages = Object.keys(_components["default"].languages).filter(function (l) {
      return l !== 'meta';
    });
  }

  return [].concat(_toConsumableArray((0, _dependencies["default"])(_components["default"], [].concat(_toConsumableArray(languages), _toConsumableArray(plugins))).getIds().reduce(function (deps, dep) {
    // Plugins can have language dependencies.
    var add = [isPlugin(dep) ? getPluginPath(dep) : getLanguagePath(dep)];

    if (css && isPlugin(dep) && !getNoCSS('plugins', dep)) {
      add.unshift(getPluginPath(dep) + '.css');
    }

    return [].concat(_toConsumableArray(deps), _toConsumableArray(add.map(function (dep) {
      return dep.endsWith('.css') ? dep : "".concat(dep, ".js");
    })));
  },
  /** @type {string[]} */
  [])), _toConsumableArray(css && theme ? [getThemePath(theme)] : []));
};

exports["default"] = _default;