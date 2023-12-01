import React, { useState } from "react";
import home_logo from "../assets/logo.svg";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoSettingsSharp } from "react-icons/io5";

const options = [
	{
		name: "Projects",
		redirectTo: "upload",
	},
	{
		name: "Widget Configuration",
		redirectTo: "editConfig",
	},
	{
		name: "Deployment",
		redirectTo: "",
	},
	{
		name: "Pricing",
		redirectTo: "",
	},
];

const Sidebar = () => {
	const [selectedOption, setSelectedOption] = useState(0);
	const { projectId } = useParams();

	return (
		<div className="sidebar_parent">
			<div className="logo_container">
				<img src={home_logo} alt="" />
				<div className="upload__title">LAMA.</div>
			</div>
			<div className="menu_container">
				<div className="side-bar__option-header">Podcast Upload Flow</div>
				{options.map((element, index) => {
					return (
						<MenuOption
							option={element}
							indexNum={index}
							setSelectedOption={setSelectedOption}
							isSelected={selectedOption === index}
						/>
					);
				})}
			</div>

			<div className="user__settings">
				<Link to={`/${projectId}/userconfig`} className="">
					<div className="setting__icon">
						<IoSettingsSharp />
					</div>
					<div className="setting__label">Settings</div>
				</Link>
			</div>
		</div>
	);
};

const MenuOption = ({ option, indexNum, isSelected, setSelectedOption }) => {
	const { projectId } = useParams();
	const navigate = useNavigate();

	return (
		<div
			onClick={() => {
				setSelectedOption(indexNum);
				navigate(`/${projectId}/${option.redirectTo}`);
			}}
			className={
				isSelected ? "option__selected sidebar-option" : "sidebar-option"
			}
		>
			<div className="index_count">{indexNum + 1}</div>
			<div>{option.name}</div>
		</div>
	);
};

export default Sidebar;
