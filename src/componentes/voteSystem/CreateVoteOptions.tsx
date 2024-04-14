import { VoteStateType } from "../../types/propsTypes/typesProps";

const VoteOptionsElement: React.FC<VoteStateType> = ({
  setVoteOptions,
  voteOptions,
  placeholder,
}) => {
  //funcao para verificar e adicionar opcoes de votos
  const addingVoteOption = (value: string) => {
    if (!voteOptions.includes(value)) {
      setVoteOptions([...voteOptions, value]);
    }
  };

  //funcao para deletar opcao de voto
  const deleteOption = (item: string) => {
    console.log(item)
    const index = voteOptions.indexOf(item);
    const newOptions = [...voteOptions];
    newOptions.splice(index, 1);
    setVoteOptions([...newOptions]);
  };

  //funcao para confirmacao do click para adicao de opcoes de voto.
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && event.target instanceof HTMLInputElement) {
      event.preventDefault();
      addingVoteOption(event.target.value);
      event.target.value = "";
    }
  };
  return (
    <div className=" flex flex-col gap-5 ">
      <div className=" flex flex-col gap-1">
        <label htmlFor="vOption" className=" text-lg font-bold">
          Opcoes de voto
        </label>
        <p className="text-sm text-muted-foreground text-gray-400">
          You can not edit your vote option. Please double check 📌.
        </p>
      </div>

      {voteOptions.length > 0 &&
        voteOptions.map((item) => {
          return (
            <div key={item} className=" text-sm flex justify-between">
              {item}{" "}
              <button
                onClick={() => {
                  deleteOption(item);
                }}
              >
                delete
              </button>
            </div>
          );
        })}
      <input
        className="bg-black py-3 px-4 border border-modalColor rounded text-sm outline-none focus:border-orange-500 focus:border-opacity-50"
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
