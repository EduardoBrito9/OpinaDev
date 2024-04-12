import { VoteStateType } from "../types/propsTypes/typesProps";

const VoteOptionsElement: React.FC<VoteStateType> = ({ setVoteOptions, voteOptions }) => {
  const addingVoteOption = (value: string) => {
    setVoteOptions([...voteOptions, value])
  };

  //function para confirmacao da adicao de opcoes de voto.
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && event.target instanceof HTMLInputElement) {
      event.preventDefault();
      addingVoteOption(event.target.value);
    }
  };
  return (
    <div className=" flex gap-5 items-center">
      <label htmlFor="vOption">Vote Options</label>
      <input
        className=" p-5 bg-black border border-white"
        type="text"
        id="vOption"
        name="vOption"
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default VoteOptionsElement;
