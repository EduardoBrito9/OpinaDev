import React from "react";
import { InputType } from "../../types/propsTypes/typesProps";

const Input: React.FC<InputType> = ({ type, onChange, id, name, value, placeholder }) => {
  return (
    <div className=" space-y-2">
      <label htmlFor={id} className=" text-sm">{name}</label>
      <input
        className="bg-black py-3 px-4 border border-modalColor rounded text-sm text-#DEDCE4 outline-none focus:border-orange-500 focus:border-opacity-50 w-full"
        placeholder={placeholder}
        type={type}
        onChange={onChange}
        id={id}
        name={name}
        value={value}
        autoComplete="off"
      />
    </div>
  );
};

export default Input;
