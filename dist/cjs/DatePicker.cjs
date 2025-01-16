'use client';
Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var dateFns = require('date-fns');
var Calendar = require('./Calendar.cjs');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);
var Calendar__default = /*#__PURE__*/_interopDefault(Calendar);

function DatePicker({ className }) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [selectedDate, setSelectedDate] = React.useState(null);
    const calendarRef = React.useRef(null);
    const handleDateChange = React.useCallback((date)=>{
        setSelectedDate(date);
        setIsOpen(false);
    }, []);
    const toggleCalendar = React.useCallback(()=>{
        setIsOpen((prev)=>!prev);
    }, []);
    React.useEffect(()=>{
        setSelectedDate(dateFns.startOfDay(new Date()));
    }, []);
    React.useEffect(()=>{
        function handleClickOutside(event) {
            if (calendarRef.current && !calendarRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return ()=>{
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    return /*#__PURE__*/ React__default.default.createElement("div", {
        className: `relative ${className}`
    }, /*#__PURE__*/ React__default.default.createElement("button", {
        onClick: toggleCalendar,
        type: "button",
        className: " px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    }, selectedDate ? dateFns.format(selectedDate, "MMM dd, yyyy") : "Loading..."), isOpen && /*#__PURE__*/ React__default.default.createElement("div", {
        ref: calendarRef,
        className: "absolute z-20 w-auto min-w-[280px] mt-1 bg-white rounded-md shadow-lg pointer-events-auto"
    }, /*#__PURE__*/ React__default.default.createElement(Calendar__default.default, {
        selectedDate: selectedDate,
        onChange: handleDateChange,
        minDate: dateFns.startOfDay(new Date()),
        onClose: ()=>setIsOpen(false)
    })), /*#__PURE__*/ React__default.default.createElement("input", {
        type: "hidden",
        name: "date",
        value: selectedDate ? dateFns.format(selectedDate, "yyyy-MM-dd") : ""
    }));
}

exports.default = DatePicker;
