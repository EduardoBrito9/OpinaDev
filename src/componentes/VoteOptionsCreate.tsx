import { VoteStateType } from "../types/propsTypes/typesProps";

const VoteOptionsElement: React.FC<VoteStateType> = ({ setVotes, votes }) => {
  const addingVoteOption = (value: string) => {
    setVotes([...votes, value])
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && event.target instanceof HTMLInputElement) {
      event.preventDefault();
      addingVoteOption(event.target.value);
    }
  };
  return (
    <div>
      <label htmlFor="vOption">Vote Options</label>
      <input
        className=" bg-black border border-white"
        type="text"
        id="vOption"
        name="vOption"
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default VoteOptionsElement;
