interface CalendarProps {
    selectedDate: Date;
    onChange: (date: Date) => void;
    minDate: Date;
    onClose: () => void;
}
export default function Calendar({ selectedDate, onChange, minDate, onClose, }: CalendarProps): import("react/jsx-runtime").JSX.Element;
export {};
