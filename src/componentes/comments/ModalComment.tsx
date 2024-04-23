import React, { useState } from "react";
import ButtonProfileOptions from "../elements/ButtonProfileOptions";
import { FiTrash } from "react-icons/fi";
import { RxPencil1 } from "react-icons/rx";
import { CiLink } from "react-icons/ci";
import { supabase } from "../../lib/helper/supabaseClient";

const ModalComment: React.FC<{
  commentId: number;
  commentValue: string;
  getComments: () => void;
}> = ({ commentId, commentValue, getComments }) => {
  const [commentEdit, setCommentEdit] = useState(commentValue);
  const [editing, setEditing] = useState(false);
  const deleteComment = async () => {
    await supabase.from("comments").delete().eq("id", commentId);
    getComments();
  };

  const editComment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await supabase
      .from("comments")
      .update({
        commentsColumn: commentEdit,
      })
      .eq("id", commentId);
      setCommentEdit('')
    getComments();
  };

  return (
    <section>
      <div className=" z-40 bg-black  animate-renderAnimationModal absolute space-y-4 top-24 right-1 border border-modalColor py-4 px-5 rounded-md w-[290px] font-semibold text-sm text-#fafaf9 fill-#fafaf9 transition-all">
        <div>
          <ButtonProfileOptions onclickButton={deleteComment}>
            Delete <FiTrash className=" w-5 h-5" />
          </ButtonProfileOptions>

          <ButtonProfileOptions
            onclickButton={() => {
              setEditing(!editing);
            }}
          >
            {" "}
            Edit <RxPencil1 className=" w-5 h-5" />
          </ButtonProfileOptions>
        </div>
        <ButtonProfileOptions
          onclickButton={() => {
            console.log("oi");
          }}
        >
          Share <CiLink className=" w-5 h-5" />
        </ButtonProfileOptions>
      </div>
      {editing && (
        <form onSubmit={editComment}>
          <label htmlFor="edit"></label>
          <input
            type="text"
            className=" text-black p-5"
            value={commentEdit}
            onChange={({ target }) => {
              setCommentEdit(target.value);
            }}
            name="edit"
            id="edit"
          />
        </form>
      )}
    </section>
  );
};

export default ModalComment;
