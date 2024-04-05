import { ReactNode, createContext, useState } from "react";

// Defina o tipo para os dados que você deseja armazenar no contexto

interface MyContextType {
  user: object;
  setUser: (user: object) => void;
}
interface Props {
  children?: ReactNode;
}

export const MyContext = createContext<MyContextType | undefined>(undefined);

export const MyContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState({});

  return (
    <MyContext.Provider value={{ user, setUser }}>
      {children}
    </MyContext.Provider>
  );
};
