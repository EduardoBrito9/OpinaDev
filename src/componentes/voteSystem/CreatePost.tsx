import { useState } from "react";
import VoteOptionsCreate from "./CreateVoteOptions";
import { supabase } from "../../lib/helper/supabaseClient";
import useMyContext from "../../context/functionContext";
import { VoteSectionType } from "../../types/propsTypes/typesProps";
import InputElement from "../elements/InputElement";

const CreatePost: React.FC<VoteSectionType> = ({
  voteSection,
  setVoteSection,
}) => {
  const { user } = useMyContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [voteOptions, setVoteOptions] = useState<string[]>([]);
  const [endDate, setEndDate] = useState("");

  //function para adicionar post de voto
  const postVerification = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const postV = await supabase
      .from("OpinaDev")
      .insert({
        created_by: user.id,
        title,
        description,
        endDate,
        voteOptions,
        user_name: user.user_metadata.user_name,
      })
      .select("*")
      .single();
    setVoteSection([...voteSection, postV.data]);
  };

  return (
    <form
      className=" flex  flex-col  gap-5 text-white"
      onSubmit={postVerification}
    >
      <InputElement
        onChange={({ target }) => {
          setTitle(target.value);
        }}
        placeholder="vote em qual voce acha melhor..."
        type="text"
        value={title}
        id="Title"
        name="Title"
      />
      <InputElement
        onChange={({ target }) => {
          setDescription(target.value);
        }}
        placeholder="(opcional) descricao da votacao"
        value={description}
        type="text"
        id="Description"
        name="Description"
      />

      <VoteOptionsCreate
        placeholder="Pressione enter para adicionar opcoes"
        setVoteOptions={setVoteOptions}
        voteOptions={voteOptions}
      />

      <InputElement
        placeholder="Escolha uma data"
        type="date"
        name="date"
        id="date"
        value={endDate}
        onChange={({ target }) => {
          setEndDate(target.value);
        }}
      />

      <button>just a test</button>
    </form>
  );
};

export default CreatePost;
