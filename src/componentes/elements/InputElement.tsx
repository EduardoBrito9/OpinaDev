import React from "react";
import { InputType } from "../../types/propsTypes/typesProps";

const Input: React.FC<InputType> = ({ type, onChange, id, name, value, placeholder }) => {
  return (
    <>
      <label htmlFor={id}>{name}</label>
      <input
        className="bg-black border p-5 border-white"
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
