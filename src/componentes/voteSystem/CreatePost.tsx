import { useState } from "react";
import VoteOptionsCreate from "./CreateVoteOptions";
import { supabase } from "../../lib/helper/supabaseClient";
import useMyContext from "../../context/functionContext";
import { VoteSectionType } from "../../types/propsTypes/typesProps";
import InputElement from "../elements/InputElement";
import AlertPostLoading from "../loadingSystem/AlertPostLoading";
import AlertPostSucess from "../loadingSystem/AlertPostSucess";
import Calendar from "react-calendar";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
import { Error } from "@mui/icons-material";

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
  const navigate = useNavigate();
  type ValuePiece = Date | null;
  type Value = ValuePiece | [ValuePiece, ValuePiece];
  const [value, onChange] = useState<Value>(new Date());
  const [erros, setErros] = useState<string[]>([]);

  // VoteDataEffect({ title, description, voteOptions, endDate });

  //function para adicionar post de voto
  const postVerification = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const postV = await supabase
        .from("OpinaDev")
        .insert({
          title,
          description,
          endDate: value,
          voteOptions,
          user_name: user.user_metadata.user_name,
          url: user.user_metadata.avatar_url,
          user_id: user.id,
        })
        .select(
          `*, votesTable (
          *
        )`,
        )
        .single();
      await supabase.from("votesTable").insert({
        post_id: postV.data.id,
        user_id: postV.data.user_id,
        option1: 0,
        option2: 0,
        option3: 0,
        option4: 0,
        option5: 0,
        option6: 0,
        option7: 0,
        option8: 0,
        option9: 0,
        option10: 0,
      });
      await supabase.from("comments").insert({
        post_id: postV.data.id,
        comments:[{}],
        user_id: postV.data.user_id
      });

      setVoteSection([...voteSection, postV.data]);
      setIsSuccess(true);
      navigate(`/vote/${postV.data.id}`);
    } catch (error) {
      console.log("ocorreu um erro", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" max-w-5xl mx-auto">
      <ul className="absolute top-10 right-[45%] z-30 space-y-2">
        {erros &&
          erros.map((item, index) => (
            <li key={index}>
              <Alert
                className="animate-renderAnimation"
                icon={<Error fontSize="inherit" />}
                severity="error"
              >
                {item}
              </Alert>
            </li>
          ))}
      </ul>

      <form
        className=" flex  flex-col  gap-7 text-white max-w-[1000px] relative"
        onSubmit={postVerification}
      >
        {isLoading && (
          <div className=" absolute border">
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
          setErros={setErros}
          erros={erros}
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

        <button className=" bg-orange-600 py-2 rounded `">just a test</button>
      </form>
    </div>
  );
};

export default CreatePost;
