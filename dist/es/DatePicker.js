'use client';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { startOfDay, format } from 'date-fns';
import Calendar from './Calendar.js';

function DatePicker({ className }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const calendarRef = useRef(null);
    const handleDateChange = useCallback((date)=>{
        setSelectedDate(date);
        setIsOpen(false);
    }, []);
    const toggleCalendar = useCallback(()=>{
        setIsOpen((prev)=>!prev);
    }, []);
    useEffect(()=>{
        setSelectedDate(startOfDay(new Date()));
    }, []);
    useEffect(()=>{
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
    return /*#__PURE__*/ React.createElement("div", {
        className: `relative ${className}`
    }, /*#__PURE__*/ React.createElement("button", {
        onClick: toggleCalendar,
        type: "button",
        className: " px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    }, selectedDate ? format(selectedDate, "MMM dd, yyyy") : "Loading..."), isOpen && /*#__PURE__*/ React.createElement("div", {
        ref: calendarRef,
        className: "absolute z-20 w-auto min-w-[280px] mt-1 bg-white rounded-md shadow-lg pointer-events-auto"
    }, /*#__PURE__*/ React.createElement(Calendar, {
        selectedDate: selectedDate,
        onChange: handleDateChange,
        minDate: startOfDay(new Date()),
        onClose: ()=>setIsOpen(false)
    })), /*#__PURE__*/ React.createElement("input", {
        type: "hidden",
        name: "date",
        value: selectedDate ? format(selectedDate, "yyyy-MM-dd") : ""
    }));
}

export { DatePicker as default };
