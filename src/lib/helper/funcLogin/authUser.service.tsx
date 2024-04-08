import { supabase } from "../supabaseClient";

//funcao responsavel por fazer o processo de login do usuario
export const login = async () => {
  await supabase.auth.signInWithOAuth({
    provider: "github",
  });
};

//funcao responsavel por fazer o processo de logout do usuario
export const logout = async () => {
  await supabase.auth.signOut();
};
