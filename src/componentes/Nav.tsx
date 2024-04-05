import { useEffect } from "react";
import { supabase } from "../lib/helper/supabaseClient";
import { useMyContext } from "../context.tsx/functionContext";


const Nav = () => {
  const { user, setUser } = useMyContext;
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
  const login = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
    });
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div>
      {user && "id" in user ? (
        <div>
          <h1>user</h1>
          <button onClick={logout}>Sign Out</button>
        </div>
      ) : (
        <button onClick={login} className="bg-black text-white">
          Login
        </button>
      )}
    </div>
  );
};

export default Nav;
