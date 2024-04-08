import { useContext } from "react";
import { MyContext } from "./Context";
//funcao que uso de ponte para ter acesso ao meu context de forma segura
export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error(
      "useMyContext deve ser usado dentro de um MyContextProvider",
    );
  }
  return context;
};

