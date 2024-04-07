import { useEffect } from "react";
import { supabase } from "../lib/helper/supabaseClient";
import { useMyContext } from "../context/functionContext";
import { login, logout } from "../lib/helper/funcLogin/authUser.service";
import {
  validateSession,
  validatingPhoto,
} from "../validateFunctions/validateDataType";
import { UserIN } from "../types/User";

const Nav = () => {
  const { user, setUser } = useMyContext();

  useEffect(() => {
    const teste = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      console.log(session?.user);
    };
    teste();
  }, []);

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
  const handlelogin = async () => {
    try {
      await login();
      console.log("oi");
    } catch (error) {
      console.log("Erro ao fazer login", error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log("Erro ao fazer logout", error);
    }
  };

  return (
    <div>
      <div className=" flex justify-between">
        <h1 className="text-3xl font-bold">DevOpina</h1>
        {user &&
        "user_metadata" in user &&
        "aud" in user &&
        user.aud === "authenticated" ? (
          <div>
            <button
              onClick={handleLogout}
              className=" rounded-full border-4 border-green-400 h-16 w-16 overflow-hidden"
            >
              {validatingPhoto(user.user_metadata) && (
                <img src={user.user_metadata.avatar_url} alt="" />
              )}
            </button>
          </div>
        ) : (
          <button onClick={handlelogin} className="bg-black text-white">
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Nav;
