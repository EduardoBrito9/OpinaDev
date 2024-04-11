import React from "react";
import { ButtonPropType } from "../../types/propsTypes/typesProps";
import { Link } from "react-router-dom";

const ButtonProfileOptions: React.FC<ButtonPropType> = ({
  children,
  onclickButton,
  path,
}) => {
  return (
    <Link
      to={`${path}`}
      className=" py-3 px-4 flex justify-between items-center w-full hover:bg-modalColor transition"
      onClick={onclickButton}
    >
      {children}
    </Link>
  );
};

export default ButtonProfileOptions;
