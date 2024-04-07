import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Nav from "./componentes/Nav";
import { MyContextProvider } from "./context.tsx/Context";

function App() {
  return (
    <MyContextProvider>
      <BrowserRouter>
      <main className=" flex flex-col max-w-7xl mx-auto min-h-screen space-y-10 p-5">
        <Nav/>
      </main>
      </BrowserRouter>
    </MyContextProvider>
  );
}

export default App;
