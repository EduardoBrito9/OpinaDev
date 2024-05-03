import { logout } from "../../lib/helper/funcLogin/authUser.service";
import { CiSettings } from "react-icons/ci";
import { FiPlus } from "react-icons/fi";
import { GiPadlockOpen } from "react-icons/gi";
import ButtonProfileOptions from "../elements/ButtonProfileOptions";
import ButtonLogout from "../elements/ButtonLogout";
import useMyContext from "../../context/functionContext";
import { PropType } from "../../types/propsTypes/typesProps";

const Modal: React.FC<PropType> = ({ setMiniModal }) => {
  const { user } = useMyContext();
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log("Erro ao fazer logout", error);
    }
  };
  return (
    <div className=" z-40 bg-black  animate-renderAnimationModal absolute space-y-4 top-16 right-1 border border-modalColor py-4 px-5 rounded-md w-[290px] font-semibold text-sm text-#fafaf9 fill-#fafaf9 transition-all">
      <div>
        <ButtonProfileOptions
          onclickButton={() => {
            setMiniModal(false);
          }}
          path={`/Profile/${user.id}`}
        >
          Profile <CiSettings className=" w-5 h-5" />
        </ButtonProfileOptions>

        <ButtonProfileOptions
          onclickButton={() => {
            setMiniModal(false);
          }}
          path="/criarPublicacao"
        >
          Create <FiPlus className=" w-5 h-5" />
        </ButtonProfileOptions>
      </div>
      <ButtonLogout onclickButton={handleLogout}>
        Logout <GiPadlockOpen />
      </ButtonLogout>
    </div>
  );
};

export default Modal;
