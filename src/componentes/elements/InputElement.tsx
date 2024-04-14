import React from "react";
import { InputType } from "../../types/propsTypes/typesProps";

const Input: React.FC<InputType> = ({ type, onChange, id, name, value, placeholder }) => {
  return (
    <>
      <label htmlFor={id} className=" text-sm">{name}</label>
      <input
        className="bg-black py-3 px-4 border border-modalColor rounded text-sm outline-none focus:border-orange-500 focus:border-opacity-50"
        placeholder={placeholder}
        type={type}
        onChange={onChange}
        id={id}
        name={name}
        value={value}
      />
    </>
  );
};

export default Input;
