import { useCallback, useEffect, useState } from "react";
import InputElement from "../elements/InputElement";
import { supabase } from "../../lib/helper/supabaseClient";
import useMyContext from "../../context/functionContext";
import { useParams } from "react-router-dom";
import { CommentsDataType } from "../../types/propsTypes/typesProps";
import { validateDataComments } from "../../validateFunctions/validateDataType";
import ModalComment from "./ModalComment";
import { formatarData } from "../../lib/helper/dataConversion/funcData";

const CommentsComponent = () => {
  const { id } = useParams();
  const { user } = useMyContext();
  const [currentComment, setCurrentComments] = useState("");
  const [commentId, setCommentId] = useState<number>();
  const [comments, setComments] = useState<CommentsDataType[]>([]);
  const [modalComment, setModalComment] = useState(false);
  const [commentValue, setCommentValue] = useState("");

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
    <section className="w-full max-w-[600px] space-y-6 overflow-hidden ">
      <h1 className=" text-3xl font-medium">Comentarios em tempo real 😉</h1>
      <section className="border border-modalColor rounded-md">
        <div className=" p-5 flex flex-col gap-10 h-[600px] ">
          <form onSubmit={postComment}>
            <InputElement
              onChange={({ target }) => {
                setCurrentComments(target.value);
              }}
              placeholder="comente..."
              type="text"
              value={currentComment}
            />
          </form>
          <div className=" flex flex-col gap-4">
            {comments &&
              comments.map((item) => (
                <div
                  key={item.id}
                  className=" w-[500px] flex gap-2 mb-5"
                >
                  <img
                    className="rounded-full border border-indigo-600 h-16 w-16 overflow-hidden"
                    src={item.url}
                    alt=""
                  />
                  <div className="flex flex-col">
                    <div className="flex items-center gap-3 max-h-6">
                      <p className=" font-bold">{item.user_name}</p>
                      <p className="text-sm text-gray-400 ">
                        {formatarData(item.created_at)}
                      </p>
                      {item.user_id === user.id && (
                        <button
                          onClick={() => {
                            setCommentValue(item.commentsColumn);
                            setCommentId(item.id);
                            setModalComment(!modalComment);
                          }}
                          className="inline-flex items-center justify-end whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0"
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
                      )}
                    </div>
                    <span className=" text-stone-100 text-base">{item.commentsColumn} </span>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {modalComment && commentId && (
          <ModalComment
            commentId={commentId}
            commentValue={commentValue}
            getComments={getComments}
          />
        )}
      </section>
    </section>
  );
};

export default CommentsComponent;
