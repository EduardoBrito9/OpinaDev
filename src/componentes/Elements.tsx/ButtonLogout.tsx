import React from "react";
import { buttonChildren } from "../../types/propsTypes/typesProps";

const ButtonProfileOptions: React.FC<buttonChildren> = ({
  children,
  onclickButton,
}) => {
  return (
    <button
      className=" border-t border-modalColor py-3 px-4 flex justify-between items-center w-full hover:bg-modalColor transition"
      onClick={onclickButton}
    >
      {children}
    </button>
  );
};

export default ButtonProfileOptions;
