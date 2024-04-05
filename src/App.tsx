import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Nav from "./componentes/Nav";
import { MyContextProvider } from "./context.tsx/Context";
// import { useEffect, useState } from "react";
// import { supabase } from "./lib/helper/supabaseClient";

function App() {
 return (
  <MyContextProvider>
    <BrowserRouter> 
    <Nav/>
    </BrowserRouter>
  </MyContextProvider>
 )

 
}

export default App;
