import { ReactNode, createContext, useState } from "react";
import { UserIN } from "../types/User";

interface MyContextType {
  user: UserIN;
  setUser: (user: UserIN) => void;
}

interface Props {
  children?: ReactNode;
}
export const MyContext = createContext<MyContextType | undefined>(undefined);

export const MyContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<UserIN>({
    app_metadata: {
      provider: "",
      providers: [],
    },
    aud: "",
    confirmed_at: "",
    created_at: "",
    email: "",
    email_confirmed_at: "",
    id: "",
    identities: [],
    is_anonymous: false,
    last_sign_in_at: "",
    phone: "",
    role: "",
    updated_at: "",
    user_metadata: {
      avatar_url: "",
      email: "",
      email_verified: false,
      full_name: "",
      iss: "",
      name: "",
      phone_verified: false,
      preferred_username: "",
      provider_id: "",
      sub: "",
      user_name: "",
    },
  });

  return (
    <MyContext.Provider value={{ user, setUser }}>
      {children}
    </MyContext.Provider>
  );
};
