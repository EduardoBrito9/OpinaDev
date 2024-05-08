import React, { useState } from "react";
import ButtonProfileOptions from "../elements/ButtonProfileOptions";
import { FiTrash } from "react-icons/fi";
import { RxPencil1 } from "react-icons/rx";
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
    setCommentEdit("");
    setEditing(false);
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
              console.log("hello world");
            }}
          >
            {" "}
            Edit <RxPencil1 className=" w-5 h-5" />
          </ButtonProfileOptions>
        </div>
      </div>
      {editing && (
        <form
          className="flex flex-col gap-5 bg-black absolute top-[40%] left-[35%] border border-modalColor p-7"
          onSubmit={editComment}
        >
          <label htmlFor="edit">Edit</label>
          <span>Edite seu comentario</span>
          <input
            type="text"
            className=" text-white px-3 py-2 min-w-[450px] bg-transparent border border-modalColor rounded-md outline-none"
            value={commentEdit}
            onChange={({ target }) => {
              setCommentEdit(target.value);
            }}
            name="edit"
            id="edit"
          />
          <div className=" space-x-2 flex justify-end">
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition text-stone-800h-10 px-4 py-2 border border-modalColor">
              Cancelar
            </button>
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition bg-yellow-400 text-stone-800 hover:bg-yellow-500 h-10 px-4 py-2">
              Continuar
            </button>
          </div>
        </form>
      )}
    </section>
  );
};

export default ModalComment;
