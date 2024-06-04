import { DayPicker } from "react-day-picker";
import { DateStates } from "../../types/propsTypes/typesProps";
import { addDays, isAfter, isBefore, startOfDay } from "date-fns";
import "react-day-picker/dist/style.css";
import { useCallback, useEffect, useRef } from "react";

const CalendarVote: React.FC<DateStates> = ({
  date,
  setDate,
  calendarState,
  setCalendarState,
  input
}) => {
  const calendar = useRef<HTMLDivElement>(null);
  const css = `
  .rdp-button:hover:not([disabled]):not(.rdp-day_selected) {
    background-color: #252525;
    border-radius: 4px;
    transition: 0.2s;
  }
 
  .my-selected:not([disabled]) { 
      border-radius: 5px;
      background-color: #FACC15 !important;
  }
  .my-selected:hover:not([disabled]) { 
    background-color: #FACC15;
}
`;
  const dataMinima = new Date();
  const maxDate = addDays(dataMinima, 6);
  const isDayDisabled = (day: Date) => {
    return (
      isBefore(startOfDay(day), startOfDay(dataMinima)) || isAfter(day, maxDate)
    );
  };

  const outsideClick = useCallback(() => {
    console.log('heyy');
    setCalendarState(false);
  }, [setCalendarState]);

  useEffect(() => {
    const handleClickOutside = ({ target }: MouseEvent) => {
      if (
       calendarState &&
       target !== calendar.current &&
       target !== input?.current && 
       !calendar.current?.contains(target as Node)
      ) {
        outsideClick();
      }
    };
    if (calendarState) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [calendarState, outsideClick, input]);

  return (
    <div
      ref={calendar}
      className=" absolute bg-black border border-modalColor rounded-md top-6 animate-renderAnimationModal transition-all"
    >
      <style>{css}</style>
      <DayPicker
        pagedNavigation
        mode="single"
        required
        selected={date}
        onSelect={setDate}
        showOutsideDays
        fixedWeeks
        modifiersClassNames={{
          selected: "my-selected",
          today: "my-today",
        }}
        modifiersStyles={{
          disabled: { fontSize: "75%" },
        }}
        disabled={isDayDisabled}
      />
    </div>
  );
};

export default CalendarVote;
