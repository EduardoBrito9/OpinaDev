import { ReactNode, createContext, useState } from "react";
// interface AppMetadata {
//   provider: string;
//   providers: string[];
// }

// interface UserMetadata {
//   avatar_url: string;
//   email: string;
//   email_verified: boolean;
//   full_name: string;
//   iss: string;
//   name: string;
//   phone_verified: boolean;
//   preferred_username: string;
//   provider_id: string;
//   sub: string;
//   user_name: string;
// }

// interface User {
//   id: string;
//   aud: string;
//   role: string;
//   email: string;
//   email_confirmed_at: string;
//   phone?: string;
//   confirmed_at: string;
//   last_sign_in_at: string;
//   app_metadata: AppMetadata;
//   user_metadata: UserMetadata;
//   identities: [];
//   created_at: string;
//   updated_at: string;
//   is_anonymous: boolean;
// }

// interface MyContextType {
//   user: User;
//   setUser: (user: User) => void;
// }

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
