import { useContext } from "react";
import { MyContext } from "./Context";

export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error(
      "useMyContext deve ser usado dentro de um MyContextProvider",
    );
  }
  return context;
};

