import { CiLink } from "react-icons/ci";
import ButtonProfileOptions from "../elements/ButtonProfileOptions";
import { FiTrash } from "react-icons/fi";
import React, { useRef, useState, useEffect, useCallback } from "react";
import { supabase } from "../../lib/helper/supabaseClient";
import { Alert } from "@mui/material";
import { Check } from "@mui/icons-material";

const ModalProfile: React.FC<{
  modal: boolean
  currentPostId: string;
  setModal: (modal: boolean) => void;
  openMenuButton: React.MutableRefObject<HTMLButtonElement | null>;
}> = ({ currentPostId, setModal, modal, openMenuButton }) => {
  const [modalDelete, setModalDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const deletePost = async () => {
    setLoading(true);
    try {
      await supabase.from("votesTable").delete().eq("post_id", currentPostId);
      await supabase.from("OpinaDev").delete().eq("id", currentPostId);
    } catch (e) {
      console.log(e);
    } finally {
      setModal(false);
      setLoading(false);
    }
  };
  const outsideClick = useCallback(() => {
    setModal(false);
  }, [setModal]);

  useEffect(() => {
    const handleClickOutside = ({ target }: MouseEvent) => {
      const targetTest = target as HTMLElement;
      if (
        modal&&
        modalRef.current &&
        openMenuButton &&
        targetTest &&
        targetTest !== modalRef.current &&
        !modalRef.current.contains(targetTest as Node) &&
        targetTest !== openMenuButton.current &&
        !openMenuButton.current?.contains(targetTest as Node) &&
        targetTest.namespaceURI !== "http://www.w3.org/2000/svg"
      ) {
        outsideClick();
      }
    };

    if (modal) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [modal, openMenuButton, outsideClick]);

  return (
    <section>
      {loading && (
        <Alert
          className="absolute right-[37%] top-10 block"
          icon={<Check fontSize="inherit" />}
          severity="info"
        >
          Here is a gentle confirmation that your action was successful.
        </Alert>
      )}
      {modalDelete ? (
        <div>you sure?</div>
      ) : (
        <div
          ref={modalRef}
          className=" z-40 bg-black  animate-renderAnimationModal absolute space-y-2 right-14 border border-modalColor py-3 px-3 rounded-md w-[180px] font-semibold text-sm text-#fafaf9 fill-#fafaf9 transition-all"
        >
          <div>
            <ButtonProfileOptions onclickButton={deletePost}>
              Delete <FiTrash className=" w-5 h-5" />
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
      )}
    </section>
  );
};

export default ModalProfile;
