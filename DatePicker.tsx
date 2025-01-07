"use client";
import React, { useState, useCallback, useRef, useEffect } from "react";
import { format, startOfDay } from "date-fns";
import Calendar from "./Calendar";

interface DatePickerProps {
  className?: string;
}

export default function DatePicker({ className }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date>(
    startOfDay(new Date())
  );
  const calendarRef = useRef<HTMLDivElement>(null);

  const handleDateChange = useCallback((date: Date) => {
    setSelectedDate(date);
    setIsOpen(false);
  }, []);

  const toggleCalendar = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={toggleCalendar}
        type="button"
        className=" px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {format(selectedDate, "MMM dd, yyyy")}
      </button>
      {isOpen && (
        <div
          ref={calendarRef}
          className="absolute z-20 w-auto min-w-[280px] mt-1 bg-white rounded-md shadow-lg pointer-events-auto"
        >
          <Calendar
            selectedDate={selectedDate}
            onChange={handleDateChange}
            minDate={startOfDay(new Date())}
            onClose={() => setIsOpen(false)}
          />
        </div>
      )}
      <input
        type="hidden"
        name="date"
        value={format(selectedDate, "yyyy-MM-dd")}
      />
    </div>
  );
}
