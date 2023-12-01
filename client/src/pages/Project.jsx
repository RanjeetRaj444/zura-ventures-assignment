import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProjectUpload from "../components/ProjectUpload";
import EditTranscript from "../components/EditTranscript";
import WidgetConfig from "../components/WidgetConfig";
import Sidebar from "../components/Sidebar";
import "../styles/Project.css";
import UserConfig from "../components/UserConfig";

const Project = () => {
  return (
    <div className="project__container root_container">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="rest">
        <div className="container">
          <Navbar />

          <div className="upload__section">
            <Routes>
              <Route path="upload" element={<ProjectUpload />} />
              <Route path="transcript" element={<EditTranscript />} />
              <Route path="editConfig" element={<WidgetConfig />} />
              <Route path="userconfig" element={<UserConfig />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;
