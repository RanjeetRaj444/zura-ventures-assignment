import React from "react";
import { MdOutlineHome } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import { FaRegBell } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="project__nav">
      <div className="project__nav-title">
        <h3>
          <span className="home__icon">
            <Link to="/">
              <MdOutlineHome className="project__nav-title-icon" />
            </Link>
          </span>
          / <span className="project__name">Sample Project</span> /
          <span>Upload</span>
        </h3>
      </div>
      <div className="project__nav-options">
        <div className="nav-option language">
          <div className="nav-option">
            <IoMdArrowDropdown />
          </div>
          EN
          <div className="nav-option">
            <RxAvatar />
          </div>
        </div>
        <div className="nav-option">
          <FaRegBell />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
