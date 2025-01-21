function __insertCSS(code) {
  if (!code || typeof document == 'undefined') return
  let head = document.head || document.getElementsByTagName('head')[0]
  let style = document.createElement('style')
  style.type = 'text/css'
  head.appendChild(style)
  ;style.styleSheet ? (style.styleSheet.cssText = code) : style.appendChild(document.createTextNode(code))
}

Object.defineProperty(exports, '__esModule', { value: true });

var DatePicker_cjs = require('./DatePicker.cjs');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var DatePicker_cjs__default = /*#__PURE__*/_interopDefault(DatePicker_cjs);

__insertCSS("@tailwind base;@tailwind components;@tailwind utilities;");

Object.defineProperty(exports, "DatePicker", {
	enumerable: true,
	get: function () { return DatePicker_cjs__default.default; }
});
