import { useContext } from "react";
import { MyContext } from "./Context";

// Função que uso de ponte para ter acesso ao meu contexto de forma segura
export default function useMyContext() {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error(
      "useMyContext deve ser usado dentro de um MyContextProvider",
    );
  }
  return context;
}
