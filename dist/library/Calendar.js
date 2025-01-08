"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Calendar;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_window_1 = require("react-window");
var date_fns_1 = require("date-fns");
var CURRENT_YEAR = new Date().getFullYear();
function Calendar(_a) {
    var selectedDate = _a.selectedDate, onChange = _a.onChange, minDate = _a.minDate, onClose = _a.onClose;
    var listRef = (0, react_1.useRef)(null);
    var today = (0, date_fns_1.startOfDay)(new Date());
    var months = (0, react_1.useMemo)(function () {
        var result = [];
        var startOfCurrentYear = (0, date_fns_1.startOfYear)(new Date(CURRENT_YEAR, 0, 1));
        var endOfNextYear = (0, date_fns_1.endOfYear)(new Date(CURRENT_YEAR + 1, 0, 1));
        var currentMonth = startOfCurrentYear;
        while (currentMonth <= endOfNextYear) {
            if (!(0, date_fns_1.isBefore)(currentMonth, (0, date_fns_1.startOfMonth)(today))) {
                // Modified condition
                result.push(currentMonth);
            }
            currentMonth = (0, date_fns_1.addMonths)(currentMonth, 1);
        }
        return result;
    }, [today]);
    (0, react_1.useEffect)(function () {
        if (listRef.current) {
            var index = months.findIndex(function (month) {
                return (0, date_fns_1.isSameMonth)(month, selectedDate);
            });
            if (index !== -1) {
                listRef.current.scrollToItem(index, "center");
            }
        }
    }, [selectedDate, months]);
    var renderMonth = function (_a) {
        var index = _a.index, style = _a.style;
        var month = months[index];
        var days = (0, date_fns_1.eachDayOfInterval)({
            start: month,
            end: (0, date_fns_1.endOfMonth)(month),
        });
        var dayOfWeek = (0, date_fns_1.getDay)(month);
        var emptyDays = Array(dayOfWeek).fill(null);
        return ((0, jsx_runtime_1.jsxs)("div", { style: style, className: "p-4 mb-6 ", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-semibold mb-2", children: (0, date_fns_1.format)(month, "MMMM yyyy") }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-7 gap-1", children: [["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(function (day) { return ((0, jsx_runtime_1.jsx)("div", { className: "h-8 w-8 text-center text-xs font-medium text-gray-700 flex items-center justify-center", children: day }, day)); }), emptyDays.map(function (_, index) { return ((0, jsx_runtime_1.jsx)("div", { className: "w-9 h-9" }, "empty-".concat(index))); }), days.map(function (day) {
                            var isSelected = (0, date_fns_1.isSameDay)(day, selectedDate);
                            var isDisabled = (0, date_fns_1.isBefore)(day, minDate);
                            var isWeekend = [0, 6].includes((0, date_fns_1.getDay)(day));
                            var isPastDay = (0, date_fns_1.isBefore)(day, today);
                            return ((0, jsx_runtime_1.jsx)("button", { onClick: function () {
                                    if (!isDisabled) {
                                        onChange(day);
                                    }
                                    onClose();
                                }, type: "button", disabled: isDisabled, className: "\n                  flex justify-center items-center w-10 h-10 rounded-full\n                  ".concat(isSelected
                                    ? "bg-indigo-600 text-white"
                                    : "bg-transparent text-gray-700", "\n                  ").concat(isDisabled
                                    ? "text-gray-300 cursor-not-allowed"
                                    : "hover:bg-gray-200", "\n                  ").concat(isWeekend && !isDisabled
                                    ? isPastDay
                                        ? "text-red-300"
                                        : "text-red-500"
                                    : "", "\n                  ").concat(!isWeekend && !isDisabled && !isSelected
                                    ? "text-gray-900"
                                    : "", "\n                  ").concat(isPastDay && !isSelected ? "gray-200" : "", "\n                "), children: (0, date_fns_1.format)(day, "d") }, day.toString()));
                        })] })] }, month.toString()));
    };
    return ((0, jsx_runtime_1.jsx)(react_window_1.FixedSizeList, { ref: listRef, height: 300, itemCount: months.length, itemSize: 300, width: 280, children: renderMonth }));
}
