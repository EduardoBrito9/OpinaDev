import { validatingPhoto } from "../../validateFunctions/validateDataType";
import { PropType } from "../../types/propsTypes/typesProps";
import Modal from "./Modal";
import useMyContext from "../../context/functionContext";

const UserComponent: React.FC<PropType> = ({
  modalRef,
  miniModal,
  setMiniModal,
}) => {
  const { user } = useMyContext();
  const handleModal = () => {
    setMiniModal(!miniModal);
  };

  return (
    user && (
      <div ref={modalRef} className=" relative">
        <button
          onClick={handleModal}
          className=" animate-renderAnimation hover:scale-125 transition rounded-full border-4 border-green-500 h-14 w-14 overflow-hidden"
        >
          {validatingPhoto(user.user_metadata) && (
            <img src={user.user_metadata.avatar_url} alt="" />
          )}
        </button>
        {miniModal && <Modal />}
      </div>
    )
  );
};

export default UserComponent;
