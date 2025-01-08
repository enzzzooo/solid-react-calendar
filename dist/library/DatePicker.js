"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DatePicker;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var date_fns_1 = require("date-fns");
var Calendar_1 = __importDefault(require("./Calendar"));
function DatePicker(_a) {
    var className = _a.className;
    var _b = (0, react_1.useState)(false), isOpen = _b[0], setIsOpen = _b[1];
    var _c = (0, react_1.useState)((0, date_fns_1.startOfDay)(new Date())), selectedDate = _c[0], setSelectedDate = _c[1];
    var calendarRef = (0, react_1.useRef)(null);
    var handleDateChange = (0, react_1.useCallback)(function (date) {
        setSelectedDate(date);
        setIsOpen(false);
    }, []);
    var toggleCalendar = (0, react_1.useCallback)(function () {
        setIsOpen(function (prev) { return !prev; });
    }, []);
    (0, react_1.useEffect)(function () {
        function handleClickOutside(event) {
            if (calendarRef.current &&
                !calendarRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return function () {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "relative ".concat(className), children: [(0, jsx_runtime_1.jsx)("button", { onClick: toggleCalendar, type: "button", className: " px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500", children: (0, date_fns_1.format)(selectedDate, "MMM dd, yyyy") }), isOpen && ((0, jsx_runtime_1.jsx)("div", { ref: calendarRef, className: "absolute z-20 w-auto min-w-[280px] mt-1 bg-white rounded-md shadow-lg pointer-events-auto", children: (0, jsx_runtime_1.jsx)(Calendar_1.default, { selectedDate: selectedDate, onChange: handleDateChange, minDate: (0, date_fns_1.startOfDay)(new Date()), onClose: function () { return setIsOpen(false); } }) })), (0, jsx_runtime_1.jsx)("input", { type: "hidden", name: "date", value: (0, date_fns_1.format)(selectedDate, "yyyy-MM-dd") })] }));
}
