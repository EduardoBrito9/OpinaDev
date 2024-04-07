import { useEffect } from "react";
import { supabase } from "../lib/helper/supabaseClient";
import { useMyContext } from "../context.tsx/functionContext";
import { login, logout } from "../lib/helper/funcLogin/authUser.service";

const Nav = () => {
  const { user, setUser } = useMyContext();
  // const ref = useRef();
  useEffect(() => {
    const session = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session !== null) {
        setUser(data.session.user);
        const { data: authListener } = supabase.auth.onAuthStateChange(
          (event, session) => {
            switch (event) {
              case "SIGNED_IN":
                if (session !== null) setUser(session?.user);
                break;
              case "SIGNED_OUT":
                setUser({});
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
        {user && "id" in user ? (
          <button
            onClick={handleLogout}
            className=" rounded-full border-4 border-green-400 h-16 w-16 overflow-hidden"
          >
            {/* <img src={user.user_metadata.avatar_url} alt="" /> */}
          </button>
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
