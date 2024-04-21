import React from "react";
import { ButtonType } from "../../types/propsTypes/typesProps";
import { Link } from "react-router-dom";

const ButtonProfileOptions: React.FC<ButtonType> = ({
  onclickButton,
  children,
  path,
}) => {
  return (
    <Link
      onClick={onclickButton}
      to={`${path}`}
      className=" py-3 px-4 flex justify-between items-center w-full hover:bg-modalColor transition"
    >
      {children}
    </Link>
  );
};

export default ButtonProfileOptions;
