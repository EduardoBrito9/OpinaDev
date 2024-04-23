import { useCallback, useEffect, useState } from "react";
import InputElement from "../elements/InputElement";
import { supabase } from "../../lib/helper/supabaseClient";
import useMyContext from "../../context/functionContext";
import { useParams } from "react-router-dom";
import { CommentsDataType } from "../../types/propsTypes/typesProps";
import { validateDataComments } from "../../validateFunctions/validateDataType";

const CommentsComponent = () => {
  const { id } = useParams();
  const { user } = useMyContext();
  const [currentComment, setCurrentComments] = useState("");
  const [comments, setComments] = useState<CommentsDataType[]>([]);

  const postComment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await supabase.from("comments").insert({
      post_id: id,
      user_id: user.id,
      user_name: user.user_metadata.user_name,
      url: user.user_metadata.avatar_url,
      commentsColumn: currentComment,
    });
    setCurrentComments("");
    getComments();
  };

  const getComments = useCallback(async () => {
    const { data } = await supabase
      .from("comments")
      .select("*")
      .eq("post_id", id);
    if (validateDataComments(data)) {
      setComments(data);
    }
  }, [id]);

  useEffect(() => {
    getComments();
  }, [getComments]);

  return (
    <section>
      {comments && comments.map((item) => <div>{item.commentsColumn}</div>)}
      <form onSubmit={postComment}>
        <InputElement
          onChange={({ target }) => {
            setCurrentComments(target.value);
          }}
          placeholder="vote em qual voce acha melhor..."
          type="text"
          value={currentComment}
        />
      </form>
    </section>
  );
};

export default CommentsComponent;
