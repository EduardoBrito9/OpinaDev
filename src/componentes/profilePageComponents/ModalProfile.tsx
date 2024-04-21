import { CiLink } from "react-icons/ci";
import ButtonProfileOptions from "../elements/ButtonProfileOptions";

import { FiTrash } from "react-icons/fi";

import React, { useState } from "react";

import { RxPencil1 } from "react-icons/rx";
import { supabase } from "../../lib/helper/supabaseClient";

const ModalProfile: React.FC<{ currentPostId: string }> = ({
  currentPostId,
}) => {
  const [modalDelete, setModalDelete] = useState(false);
  const deletePost = async () => {
    try {
      await supabase.from("votesTable").delete().eq("post_id", currentPostId);
      await supabase.from("OpinaDev").delete().eq("id", currentPostId);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className=" z-40 bg-black  animate-renderAnimationModal absolute space-y-4 top-24 right-1 border border-modalColor py-4 px-5 rounded-md w-[290px] font-semibold text-sm text-#fafaf9 fill-#fafaf9 transition-all">
      <div>
        <ButtonProfileOptions onclickButton={deletePost}>
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
  );
};

export default ModalProfile;
