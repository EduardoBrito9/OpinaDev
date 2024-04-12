import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Nav from "./componentes/Nav";
import { MyContextProvider } from "./context/Context";
import { useEffect, useRef, useState } from "react";
import CreatePost from "./componentes/CreatePost";
import { VoteTypeStructure } from "./types/voteTypes/voteType";

function App() {
  const [voteSection, setVoteSection] = useState<VoteTypeStructure[]>([])
  const [miniModal, setMiniModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

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

  return (
    <MyContextProvider>
      <BrowserRouter>
        <main className=" flex flex-col max-w-7xl mx-auto min-h-screen space-y-10 p-5">
          <Nav
            modalRef={modalRef}
            miniModal={miniModal}
            setMiniModal={setMiniModal}
          />
          {/* <Route path="/" element={<Home />} /> */}
          <Routes>
            <Route path="/CreatePost" element={<CreatePost voteSection={voteSection} setVoteSection={setVoteSection}/>} />
          </Routes>
        </main>
      </BrowserRouter>
    </MyContextProvider>
  );
}

export default App;
