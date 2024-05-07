import { DayPicker } from "react-day-picker";
import { DateStates } from "../../types/propsTypes/typesProps";

const CalendarVote: React.FC<DateStates> = ({ date, setDate }) => {
  const css = `
  .rdp-caption {
    display: flex;
  }

  .rdp-month {
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items:center;
  }
  .rdp {
    border: 1px solid white;
    padding: 35px;
    width: fit-content;
  }
  .rdp-table {
    width: 300px
  }
  .my-selected:not([disabled]) { 
      background-color: #FACC15
  }
  .my-selected:hover:not([disabled]) { 
    border-color: blue;
    color: blue;
  }
  .my-today { 

    
  }


  .rdp-head_cell {
    
    
  }
  
`;
  return (
    <div>
      <style>{css}</style>
      <DayPicker
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
      />
    </div>
  );
};

export default CalendarVote;
