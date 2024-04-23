import React from "react";
import ButtonProfileOptions from "../elements/ButtonProfileOptions";
import { FiTrash } from "react-icons/fi";
import { RxPencil1 } from "react-icons/rx";
import { CiLink } from "react-icons/ci";
import { supabase } from "../../lib/helper/supabaseClient";

const ModalComment: React.FC<{ commentId: number }> = ({ commentId }) => {
  const deleteComment = async () => {
    await supabase.from("comments").delete().eq("id", commentId);
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
              console.log("edit");
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
    </section>
  );
};

export default ModalComment;
