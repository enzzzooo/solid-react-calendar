import React from "react";
interface CalendarProps {
    selectedDate: Date | null;
    onChange: (date: Date) => void;
    minDate: Date;
    onClose: () => void;
}
export default function Calendar({ selectedDate, onChange, minDate, onClose, }: CalendarProps): React.JSX.Element;
export {};
