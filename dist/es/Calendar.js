'use client';
import { useRef, useMemo, useEffect } from 'react';
import { FixedSizeList } from 'react-window';
import { startOfDay, startOfYear, endOfYear, isBefore, addMonths, isSameMonth, eachDayOfInterval, endOfMonth, getDay, format, isSameDay } from 'date-fns';

const CURRENT_YEAR = new Date().getFullYear();
function Calendar({ selectedDate, onChange, minDate, onClose }) {
    const listRef = useRef(null);
    const today = startOfDay(new Date());
    const months = useMemo(()=>{
        const result = [];
        const startOfCurrentYear = startOfYear(new Date(CURRENT_YEAR, 0, 1));
        const endOfNextYear = endOfYear(new Date(CURRENT_YEAR + 1, 0, 1));
        let currentMonth = startOfCurrentYear;
        while(currentMonth <= endOfNextYear){
            if (!isBefore(currentMonth, today)) {
                result.push(currentMonth);
            }
            currentMonth = addMonths(currentMonth, 1);
        }
        return result;
    }, [
        today
    ]);
    useEffect(()=>{
        if (listRef.current) {
            const index = months.findIndex((month)=>isSameMonth(month, selectedDate));
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
        const days = eachDayOfInterval({
            start: month,
            end: endOfMonth(month)
        });
        const dayOfWeek = getDay(month);
        const emptyDays = Array(dayOfWeek).fill(null);
        return /*#__PURE__*/ React.createElement("div", {
            style: style,
            key: month.toString(),
            className: "p-4 mb-6 no-scrollbar"
        }, /*#__PURE__*/ React.createElement("h3", {
            className: "text-lg font-semibold mb-2"
        }, format(month, "MMMM yyyy")), /*#__PURE__*/ React.createElement("div", {
            className: "grid grid-cols-7 gap-1"
        }, [
            "Sun",
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat"
        ].map((day)=>/*#__PURE__*/ React.createElement("div", {
                key: day,
                className: "h-8 w-8 text-center text-xs font-medium text-gray-700 flex items-center justify-center"
            }, day)), emptyDays.map((_, index)=>/*#__PURE__*/ React.createElement("div", {
                key: `empty-${index}`,
                className: "w-9 h-9"
            })), days.map((day)=>{
            const isSelected = isSameDay(day, selectedDate);
            const isDisabled = isBefore(day, minDate);
            const isWeekend = [
                0,
                6
            ].includes(getDay(day));
            const isPastDay = isBefore(day, today);
            return /*#__PURE__*/ React.createElement("button", {
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
            }, format(day, "d"));
        })));
    };
    return /*#__PURE__*/ React.createElement(FixedSizeList, {
        ref: listRef,
        height: 300,
        itemCount: months.length,
        itemSize: 300,
        width: 280,
        className: "no-scrollbar"
    }, renderMonth);
}

export { Calendar as default };
