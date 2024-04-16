import { useState } from "react";
import VoteOptionsCreate from "./CreateVoteOptions";
import { supabase } from "../../lib/helper/supabaseClient";
import useMyContext from "../../context/functionContext";
import { VoteSectionType } from "../../types/propsTypes/typesProps";
import InputElement from "../elements/InputElement";
// import VoteDataEffect from "../../lib/helper/Effects/VoteDataEffect";
import AlertPostLoading from "../loadingSystem/AlertPostLoading";
import AlertPostSucess from "../loadingSystem/AlertPostSucess";
import Calendar from "react-calendar";

const CreatePost: React.FC<VoteSectionType> = ({
  voteSection,
  setVoteSection,
}) => {
  const { user } = useMyContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [voteOptions, setVoteOptions] = useState<string[]>([]);
  // const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  type ValuePiece = Date | null;

  type Value = ValuePiece | [ValuePiece, ValuePiece];

  const [value, onChange] = useState<Value>(new Date());

  // VoteDataEffect({ title, description, voteOptions, endDate });
  
  //function para adicionar post de voto
  const postVerification = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const postV = await supabase
        .from("OpinaDev")
        .insert({
          created_by: user.id,
          title,
          description,
          endDate: value,
          voteOptions,
          user_name: user.user_metadata.user_name,
          url: user.user_metadata.avatar_url,
        })
        .select("*")
        .single();
      console.log(postV);
      setVoteSection([...voteSection, postV.data]);
      // const voteTable = await supabase.from('votesTable').insert({option1: voteOptions[0]})
      // console.log(voteTable)
      setIsSuccess(true);
    } catch (error) {
      console.log("ocorreu um erro", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" max-w-5xl mx-auto">
      <form
        className=" flex  flex-col  gap-7 text-white max-w-[1000px] relative"
        onSubmit={postVerification}
      >
        {isLoading && (
          <div>
            <AlertPostLoading />
          </div>
        )}
        {isSuccess && (
          <div>
            <AlertPostSucess />
          </div>
        )}
        <InputElement
          onChange={({ target }) => {
            setTitle(target.value);
          }}
          placeholder="vote em qual voce acha melhor..."
          type="text"
          value={title}
          id="Titulo"
          name="Titulo"
        />
        <InputElement
          onChange={({ target }) => {
            setDescription(target.value);
          }}
          placeholder="(opcional) descricao da votacao"
          value={description}
          type="text"
          id="Descricao"
          name="Descricao"
        />

        <VoteOptionsCreate
          placeholder="Pressione enter para adicionar opcoes"
          setVoteOptions={setVoteOptions}
          voteOptions={voteOptions}
        />

        <InputElement
          placeholder="Escolha uma data"
          type="text"
          name="Data Final"
          id="Data Final"
          onChange={() => {
            console.log("nothing");
          }}
          value={`${value?.toString().substring(0, 15)}`}
        />
        <Calendar className="w-[300px]" onChange={onChange} value={value} />

        <button
          // onClick={postVerification}
          // disabled={isDisabled}
          className=" bg-orange-600 py-2 rounded `"
        >
          just a test
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
