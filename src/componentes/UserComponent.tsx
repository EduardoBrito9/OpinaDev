import { validatingPhoto } from "../validateFunctions/validateDataType";
import { PropType } from "../types/userTypes/propsTypes/typesProps";
import Modal from "./Modal";

const UserComponent: React.FC<PropType> = ({
  modalRef,
  miniModal,
  user,
  setMiniModal,
}) => {
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
