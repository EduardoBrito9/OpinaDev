import React from "react";
import { InputType } from "../../types/propsTypes/typesProps";

const Input: React.FC<InputType> = ({
  type,
  onChange,
  id,
  name,
  value,
  placeholder,
  onclick,
  input,
}) => {
  return (
    <div className=" space-y-2">
      <label htmlFor={id} className=" text-sm">
        {name}
      </label>
      <input
        ref={input}
        className={`bg-black py-3 px-4 border border-modalColor rounded text-sm text-#F3F0F2 outline-none focus:border-orange-500 focus:border-opacity-50 w-full ${
          onclick ? "hover: cursor-default" : ""
        }`}
        placeholder={placeholder}
        type={type}
        onChange={onChange}
        id={id}
        name={name}
        value={value}
        autoComplete="off"
        onClick={onclick}
        readOnly={onclick ? true : false}
      />
    </div>
  );
};

export default Input;
