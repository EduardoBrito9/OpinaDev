import { useCallback, useEffect, useState } from "react";
import InputElement from "../elements/InputElement";
import { supabase } from "../../lib/helper/supabaseClient";
import useMyContext from "../../context/functionContext";
import { useParams } from "react-router-dom";
import { CommentsDataType } from "../../types/propsTypes/typesProps";
import { validateDataComments } from "../../validateFunctions/validateDataType";
import ModalComment from "./ModalComment";

const CommentsComponent = () => {
  const { id } = useParams();
  const { user } = useMyContext();
  const [currentComment, setCurrentComments] = useState("");
  const [commentId, setCommentId] = useState<number>()
  const [comments, setComments] = useState<CommentsDataType[]>([]);
  const [modalComment, setModalComment] = useState(false);
  const [commentValue, setCommentValue] = useState('')

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
      {comments &&
        comments.map((item) => (
          <div key={item.id} className=" w-[300px] flex justify-between mb-5">
            {item.commentsColumn}{" "}
            <button
              onClick={() => {
                setCommentValue(item.commentsColumn)
                setCommentId(item.id)
                setModalComment(!modalComment)
              }}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0"
              type="button"
              aria-haspopup="dialog"
              aria-expanded="false"
              aria-controls="radix-:ro:"
              data-state="closed"
            >
              <span className="sr-only">Open menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-more-horizontal h-4 w-4"
              >
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="19" cy="12" r="1"></circle>
                <circle cx="5" cy="12" r="1"></circle>
              </svg>
            </button>
          </div>
        ))}
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
      {modalComment && commentId && <ModalComment commentId={commentId} commentValue={commentValue} getComments={getComments}/>}
    </section>
  );
};

export default CommentsComponent;
