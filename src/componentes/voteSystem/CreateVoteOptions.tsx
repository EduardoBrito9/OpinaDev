import { VoteStateType } from "../../types/propsTypes/typesProps";

const VoteOptionsElement: React.FC<VoteStateType> = ({
  setVoteOptions,
  voteOptions,
  placeholder,
}) => {
  //funcao para adicionar opcoes de votos
  const addingVoteOption = (value: string) => {
    setVoteOptions([...voteOptions, value]);
  };

  //funcao para confirmacao da adicao de opcoes de voto.
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && event.target instanceof HTMLInputElement) {
      event.preventDefault();
      addingVoteOption(event.target.value);
    }
  };
  return (
    <div className=" flex flex-col gap-5 ">
      <label htmlFor="vOption" className=" text-sm">Opcoes de voto</label>
      <input
        className=" p-5 bg-black border border-white"
        placeholder={placeholder}
        type="text"
        id="vOption"
        name="vOption"
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default VoteOptionsElement;
