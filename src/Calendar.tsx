"use client";
import React, { useRef, useEffect, useMemo } from "react";
import { FixedSizeList as List, ListChildComponentProps } from "react-window";
import {
  format,
  startOfDay,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isBefore,
  addMonths,
  getDay,
  startOfYear,
  endOfYear,
} from "date-fns";

const CURRENT_YEAR = new Date().getFullYear();

interface CalendarProps {
  selectedDate: Date | null;
  onChange: (date: Date) => void;
  minDate: Date;
  onClose: () => void;
}

export default function Calendar({
  selectedDate,
  onChange,
  minDate,
  onClose,
}: CalendarProps) {
  const listRef = useRef<List>(null);
  const today = startOfDay(new Date());

  const months = useMemo(() => {
    const result: Date[] = [];
    const startOfCurrentYear = startOfYear(new Date(CURRENT_YEAR, 0, 1));
    const endOfNextYear = endOfYear(new Date(CURRENT_YEAR + 1, 0, 1));

    let currentMonth = startOfCurrentYear;
    while (currentMonth <= endOfNextYear) {
      if (!isBefore(currentMonth, today)) {
        result.push(currentMonth);
      }
      currentMonth = addMonths(currentMonth, 1);
    }
    return result;
  }, [today]);

  useEffect(() => {
    if (selectedDate && listRef.current) {
      const index = months.findIndex((month) =>
        isSameMonth(month, selectedDate)
      );
      if (index !== -1) {
        listRef.current.scrollToItem(index, "center");
      }
    }
  }, [selectedDate, months]);

  const renderMonth = ({ index, style }: ListChildComponentProps) => {
    const month = months[index];
    const days = eachDayOfInterval({
      start: month,
      end: endOfMonth(month),
    });

    const dayOfWeek = getDay(month);
    const emptyDays = Array(dayOfWeek).fill(null);

    return (
      <div
        style={style}
        key={month.toString()}
        className="p-4 mb-6 no-scrollbar"
      >
        <h3 className="text-lg font-semibold mb-2">
          {format(month, "MMMM yyyy")}
        </h3>
        <div className="grid grid-cols-7 gap-1">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="h-8 w-8 text-center text-xs font-medium text-gray-700 flex items-center justify-center"
            >
              {day}
            </div>
          ))}
          {emptyDays.map((_, index) => (
            <div key={`empty-${index}`} className="w-9 h-9" />
          ))}
          {days.map((day) => {
            const isSelected = selectedDate
              ? isSameDay(day, selectedDate)
              : false;
            const isDisabled = isBefore(day, minDate);
            const isWeekend = [0, 6].includes(getDay(day));
            const isPastDay = isBefore(day, today);

            return (
              <button
                key={day.toString()}
                onClick={() => {
                  if (!isDisabled) {
                    onChange(day);
                  }
                  onClose();
                }}
                type="button"
                disabled={isDisabled}
                className={`
                  flex justify-center items-center w-10 h-10 rounded-full
                  ${
                    isSelected
                      ? "bg-indigo-600 text-white"
                      : "bg-transparent text-gray-700"
                  }
                  ${
                    isDisabled
                      ? "text-gray-300 cursor-not-allowed"
                      : "hover:bg-gray-200"
                  }
                  ${
                    isWeekend && !isDisabled
                      ? isPastDay
                        ? "text-red-300"
                        : "text-red-500"
                      : ""
                  }
                  ${
                    !isWeekend && !isDisabled && !isSelected
                      ? "text-gray-900"
                      : ""
                  }
              
                `}
              >
                {format(day, "d")}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <List
      ref={listRef}
      height={300}
      itemCount={months.length}
      itemSize={300}
      width={280}
      className="no-scrollbar"
    >
      {renderMonth}
    </List>
  );
}
