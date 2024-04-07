import { supabase } from "../supabaseClient";

export const login = async () => {
  await supabase.auth.signInWithOAuth({
    provider: "github",
  });
};

export const logout = async () => {
  await supabase.auth.signOut();
};
