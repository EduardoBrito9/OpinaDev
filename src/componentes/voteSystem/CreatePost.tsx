import { useState } from "react";
import VoteOptionsCreate from "./CreateVoteOptions";
import { supabase } from "../../lib/helper/supabaseClient";
import useMyContext from "../../context/functionContext";
import { VoteSectionType } from "../../types/propsTypes/typesProps";
import InputElement from "../elements/InputElement";
import AlertPostLoading from "../loadingSystem/AlertPostLoading";
import AlertPostSucess from "../loadingSystem/AlertPostSucess";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import CalendarVote from "./CalendarVote";

const CreatePost: React.FC<VoteSectionType> = ({
  voteSection,
  setVoteSection,
}) => {
  const { user } = useMyContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [voteOptions, setVoteOptions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const today = new Date();
  const [date, setDate] = useState<Date | undefined>(today);
  let formattedDate;
  if (date) {
    formattedDate = format(date, "PP");
  }

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
          endDate: date,
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
        comments: [{}],
        user_id: postV.data.user_id,
      });

      if (setVoteSection && voteSection)
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
      <ul className="absolute top-10 right-[45%] z-30 space-y-2"></ul>

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
        />
        <InputElement
          placeholder="(opcional) descricao da votacao"
          value={formattedDate}
          type="text"
          id="Data de encerramento"
          name="Data de encerramento"
        />

         
          <CalendarVote date={date} setDate={setDate} />
        

        <button
          className={`bg-orange-600 py-2 rounded ${
            voteOptions.length >= 2 && date && title ? "" : "opacity-60"
          }`}
          disabled={voteOptions.length >= 2 && date && title ? false : true}
        >
          just a test
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
