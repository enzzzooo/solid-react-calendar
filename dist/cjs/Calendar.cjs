'use client';
Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var reactWindow = require('react-window');
var dateFns = require('date-fns');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const CURRENT_YEAR = new Date().getFullYear();
function Calendar({ selectedDate, onChange, minDate, onClose }) {
    const listRef = React.useRef(null);
    const today = dateFns.startOfDay(new Date());
    const months = React.useMemo(()=>{
        const result = [];
        const startOfCurrentYear = dateFns.startOfYear(new Date(CURRENT_YEAR, 0, 1));
        const endOfNextYear = dateFns.endOfYear(new Date(CURRENT_YEAR + 1, 0, 1));
        let currentMonth = startOfCurrentYear;
        while(currentMonth <= endOfNextYear){
            if (!dateFns.isBefore(currentMonth, today)) {
                result.push(currentMonth);
            }
            currentMonth = dateFns.addMonths(currentMonth, 1);
        }
        return result;
    }, [
        today
    ]);
    React.useEffect(()=>{
        if (selectedDate && listRef.current) {
            const index = months.findIndex((month)=>dateFns.isSameMonth(month, selectedDate));
            if (index !== -1) {
                listRef.current.scrollToItem(index, "center");
            }
        }
    }, [
        selectedDate,
        months
    ]);
    const renderMonth = ({ index, style })=>{
        const month = months[index];
        const days = dateFns.eachDayOfInterval({
            start: month,
            end: dateFns.endOfMonth(month)
        });
        const dayOfWeek = dateFns.getDay(month);
        const emptyDays = Array(dayOfWeek).fill(null);
        return /*#__PURE__*/ React__default.default.createElement("div", {
            style: style,
            key: month.toString(),
            className: "p-4 mb-6 no-scrollbar"
        }, /*#__PURE__*/ React__default.default.createElement("h3", {
            className: "text-lg font-semibold mb-2"
        }, dateFns.format(month, "MMMM yyyy")), /*#__PURE__*/ React__default.default.createElement("div", {
            className: "grid grid-cols-7 gap-1"
        }, [
            "Sun",
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat"
        ].map((day)=>/*#__PURE__*/ React__default.default.createElement("div", {
                key: day,
                className: "h-8 w-8 text-center text-xs font-medium text-gray-700 flex items-center justify-center"
            }, day)), emptyDays.map((_, index)=>/*#__PURE__*/ React__default.default.createElement("div", {
                key: `empty-${index}`,
                className: "w-9 h-9"
            })), days.map((day)=>{
            const isSelected = selectedDate ? dateFns.isSameDay(day, selectedDate) : false;
            const isDisabled = dateFns.isBefore(day, minDate);
            const isWeekend = [
                0,
                6
            ].includes(dateFns.getDay(day));
            const isPastDay = dateFns.isBefore(day, today);
            return /*#__PURE__*/ React__default.default.createElement("button", {
                key: day.toString(),
                onClick: ()=>{
                    if (!isDisabled) {
                        onChange(day);
                    }
                    onClose();
                },
                type: "button",
                disabled: isDisabled,
                className: `
                  flex justify-center items-center w-10 h-10 rounded-full
                  ${isSelected ? "bg-indigo-600 text-white" : "bg-transparent text-gray-700"}
                  ${isDisabled ? "text-gray-300 cursor-not-allowed" : "hover:bg-gray-200"}
                  ${isWeekend && !isDisabled ? isPastDay ? "text-red-300" : "text-red-500" : ""}
                  ${!isWeekend && !isDisabled && !isSelected ? "text-gray-900" : ""}
              
                `
            }, dateFns.format(day, "d"));
        })));
    };
    return /*#__PURE__*/ React__default.default.createElement(reactWindow.FixedSizeList, {
        ref: listRef,
        height: 300,
        itemCount: months.length,
        itemSize: 300,
        width: 280,
        className: "no-scrollbar"
    }, renderMonth);
}

exports.default = Calendar;
