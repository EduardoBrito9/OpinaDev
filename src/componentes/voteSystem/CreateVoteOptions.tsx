// import { supabase } from "../../lib/helper/supabaseClient";
import { RxTrash } from "react-icons/rx";
import { VoteStateType } from "../../types/propsTypes/typesProps";

const VoteOptionsElement: React.FC<VoteStateType> = ({
  setVoteOptions,
  voteOptions,
  placeholder,
}) => {
  const addingVoteOption = async (value: string) => {
    if (
      !voteOptions.includes(value) &&
      value.length &&
      voteOptions.length < 10
    ) {
      setVoteOptions([...voteOptions, value]);
    } 
  };
  const numeroSorteado = () => {
    return Math.floor(Math.random() * 4) + 1;
  };
  const arrayEmoji = ["🔔", "🤖", "🎷", "📺", "🤔"];

  //funcao para deletar opcao de voto
  const deleteOption = (item: string) => {
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
    <div className=" flex flex-col gap-4 ">
      <div className=" flex flex-col gap-1">
        <label htmlFor="vOption" className=" text-lg font-bold">
          Opcoes de voto
        </label>
        <p className="text-sm text-muted-foreground text-gray-400">
          Voce nao pode editar sua opcao de voto. Tenha certeza antes de adicionar 📌.
        </p>
      </div>

      {voteOptions.length > 0 &&
        voteOptions.map((item) => {
          return (
            <div key={item} className=" text-lg flex justify-between">
              {arrayEmoji[numeroSorteado()]}
              {item}{" "}
              <button
                onClick={() => {
                  deleteOption(item);
                }}
              >
                <RxTrash className=" h-5 w-5"/>
              </button>
            </div>
          );
        })}
      <input
      autoComplete="off"
        className="bg-black py-3 px-4 border border-modalColor rounded text-sm outline-none focus:border-orange-500 focus:border-opacity-50 "
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
