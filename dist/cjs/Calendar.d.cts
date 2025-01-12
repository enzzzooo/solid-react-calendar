import React from 'react';

interface CalendarProps {
    selectedDate: Date;
    onChange: (date: Date) => void;
    minDate: Date;
    onClose: () => void;
}
declare function Calendar({ selectedDate, onChange, minDate, onClose, }: CalendarProps): React.JSX.Element;

export { Calendar as default };
