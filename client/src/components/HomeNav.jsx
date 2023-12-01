import React, { useState } from "react";
import styled from "styled-components";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa";
import home_logo from "../assets/logo.svg";

const HomeNav = () => {
  const [labels, setlabels] = useState({ projectName: "LAMA" });
  return (
    <Nav>
      <div className="container navbar">
        <div className="nav__logo">
          <img src={home_logo} alt="logo" />
          <h2>{labels.projectName}</h2>
        </div>

        <div className="nav__icons">
          <ul>
            <li className="nav__icons-option">
              <IoSettingsOutline />
            </li>
            <li className="nav__icons-option">
              <FaRegBell />
            </li>
          </ul>
        </div>
      </div>
    </Nav>
  );
};

export default HomeNav;

const Nav = styled.div`
  .navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 90%;
  }

  .nav__logo {
    display: flex;
    align-items: center;
    img {
      width: 40px;
    }
    h2 {
      margin-left: 10px;
    }
  }

  .nav__icons-option {
    font-size: 25px;
    cursor: pointer;
  }
`;
