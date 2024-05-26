import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Nav from "./componentes/navSystem/Nav";
import { MyContextProvider } from "./context/Context";
import { useCallback, useEffect, useRef, useState } from "react";
import CreatePost from "./componentes/voteSystem/CreatePost";
import HomePage from "./componentes/HomePage";
import { VoteTypeStructure } from "./types/propsTypes/typesProps";
import ProfilePage from "./componentes/profilePageComponents/ProfilePage";
import { validateDataPostType } from "./validateFunctions/validateDataType";
import { supabase } from "./lib/helper/supabaseClient";
import VotePage from "./componentes/voteSystem/VotePage";
import Footer from "./componentes/Footer";
import { isAfter } from "date-fns";

function App() {
  const [voteSection, setVoteSection] = useState<VoteTypeStructure[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);
  const [miniModal, setMiniModal] = useState(false);
  const [loadingPost, setLoadingPost] = useState(false);
  const [votePastSection, setVotePastSection] = useState<VoteTypeStructure[]>(
    [],
  );
  const [index, setIndex] = useState(0);
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
    setLoadingPost(true);
    try {
      const { data } = await supabase.from("OpinaDev").select("*");
      if (validateDataPostType(data)) {
        setVoteSection(data);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoadingPost(false);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  const votosExpirados = useCallback(() => {
    if (voteSection) {
      const expiredVotes = voteSection.filter((item) => {
        const dateNOW = new Date();
        const end = new Date(item.endDate.substring(0, 10));
        return isAfter(dateNOW, end);
      });
      if (setVotePastSection) setVotePastSection(expiredVotes);
    }
  }, [voteSection, setVotePastSection]);

  useEffect(() => {
    votosExpirados();
  }, [votosExpirados]);

  return (
    <MyContextProvider>
      <BrowserRouter>
        <main className="flex flex-col max-w-7xl mx-auto min-h-screen space-y-16 p-5 ">
          <Nav
            modalRef={modalRef}
            miniModal={miniModal}
            setMiniModal={setMiniModal}
          />
          <div className=" w-full flex-1">
            <Routes>
              <Route
                path="/"
                element={
                  <HomePage
                    setVoteSection={setVoteSection}
                    voteSection={voteSection}
                    votePastSection={votePastSection}
                    setVotePastSection={setVotePastSection}
                    loadingPost={loadingPost}
                    index={index}
                    setIndex={setIndex}
                  />
                }
              />
              <Route path="/Profile/:id" element={<ProfilePage votePastSection={votePastSection} />} />
              <Route
                path="/criarPublicacao"
                element={
                  <CreatePost
                    voteSection={voteSection}
                    setVoteSection={setVoteSection}
                  />
                }
              />
              <Route
                path="/vote/:id"
                element={
                  <VotePage votePastSection={votePastSection} index={index} />
                }
              />
            </Routes>
          </div>
          <Footer />
        </main>
      </BrowserRouter>
    </MyContextProvider>
  );
}

export default App;
