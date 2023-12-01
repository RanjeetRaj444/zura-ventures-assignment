import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Project from "./pages/Project";
import { ChakraProvider } from "@chakra-ui/react";
import ContextProvider from "./store/ContextProvider";

const App = () => {
  return (
    <ChakraProvider>
      <ContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route index element={<Home />} />
              <Route path=":projectId/*" element={<Project />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </ContextProvider>
    </ChakraProvider>
  );
};

export default App;
