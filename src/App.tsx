import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Nav from "./componentes/navSystem/Nav";
import { MyContextProvider } from "./context/Context";
import { useEffect, useRef, useState } from "react";
import CreatePost from "./componentes/voteSystem/CreatePost";

import HomePage from "./componentes/HomePage";
import { VoteTypeStructure } from "./types/propsTypes/typesProps";
import ProfilePage from "./componentes/profilePageComponents/ProfilePage";
import { validateDataPostType } from "./validateFunctions/validateDataType";
import { supabase } from "./lib/helper/supabaseClient";
import VotePage from "./componentes/voteSystem/VotePage";

function App() {
  const [voteSection, setVoteSection] = useState<VoteTypeStructure[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);
  const [miniModal, setMiniModal] = useState(false);

  //funcao que seta o estado miniModal para false, fazendo com que ele saia da tela
  const outsideClick = () => {
    setMiniModal(false);
  };

  //useEffect que acontece sempre que o estado miniModal altera, caso for true adiciona o evento ao document e inicia a verificacao de click para ver se o click ocorreu fora do modal, chamar a outsideClick function.
  useEffect(() => {
    const handleClickOutside = ({ target }: MouseEvent) => {
      if (
        miniModal &&
        modalRef.current &&
        target !== modalRef.current &&
        !modalRef.current.contains(target as Node)
      ) {
        outsideClick();
      }
    };

    if (miniModal) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [miniModal]);

  const getPost = async () => {
    const { data } = await supabase.from("OpinaDev").select("*");
    if (validateDataPostType(data)) {
      setVoteSection(data);
    } else {
      console.log("error");
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <MyContextProvider>
      <BrowserRouter>
        <main className="flex flex-col max-w-7xl mx-auto min-h-screen space-y-20 p-5 ">
          <div className=" w-full flex-1 space-y-12">
            <Nav
              modalRef={modalRef}
              miniModal={miniModal}
              setMiniModal={setMiniModal}
            />

            <Routes>
              <Route
                path="/"
                element={<HomePage voteSection={voteSection} />}
              />
              <Route path="/Profile/:id" element={<ProfilePage />} />
              <Route
                path="/CreatePost"
                element={
                  <CreatePost
                    voteSection={voteSection}
                    setVoteSection={setVoteSection}
                  />
                }
              />
              <Route path="/vote/:id" element={<VotePage />} />
            </Routes>
          </div>
        </main>
      </BrowserRouter>
    </MyContextProvider>
  );
}

export default App;
