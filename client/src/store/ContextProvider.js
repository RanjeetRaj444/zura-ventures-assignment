// MyContextProvider.js
import React, { useState } from "react";
import Context from "./Context";

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [project, setProject] = useState(null);

  const updateState = (user) => {
    setUser(user);
  };

  const updateProject = (project) => {
    setProject(project);
  };

  return (
    <Context.Provider value={{ user, setUser, project, setProject }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
