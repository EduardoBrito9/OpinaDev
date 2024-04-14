import { useEffect } from "react";
import { supabase } from "../supabaseClient";
import { UserIN } from "../../../types/userTypes/User";
import  useMyContext  from "../../../context/functionContext";
import { validateSession } from "../../../validateFunctions/validateDataType";

export const UserEffect = () => {
  const { setUser } = useMyContext();
  useEffect(() => {
    const session = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session !== null && validateSession(session)) {
        setUser(session.user as UserIN);
        const { data: authListener } = supabase.auth.onAuthStateChange(
          (event, session) => {
            switch (event) {
              case "SIGNED_IN":
                if (session !== null && validateSession(session)) {
                  setUser(session.user as UserIN);
                }
                break;
              case "SIGNED_OUT":
                setUser({
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
                break;
              default:
            }
          },
        );
        return () => {
          authListener.subscription.unsubscribe();
        };
      }
    };
    session();
  }, [setUser]);
};
