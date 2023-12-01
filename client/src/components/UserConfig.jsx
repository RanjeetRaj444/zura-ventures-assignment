import { Avatar, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import "../styles/User.css";

const UserConfig = () => {
	const [user,setUser]=useState()
	return (
		<div>
			<div className="upload__title">Account Settings</div>

			<div className="user__info">
				<div className="user__avatar">
					<Avatar
						size="2xl"
						name="Segun Adebayo"
						src="https://bit.ly/sage-adebayo"
					/>
				</div>
				<div className="user__name user-data">
					<p className="user__info-label">User Name</p>
					<Input value={"as"} />
				</div>
				<div className="user__email user-data">
					<p className="user__info-label">Email</p>
					<Input value={"as"} />
				</div>
			</div>

			<div className="subscription">
				<div className="upload__title">Subscription</div>

				<div className="subs__banner">
					<h2>
						You are currently on the <span>Ques AI BASIC PLAN!</span>
					</h2>

					<button>Upgrade</button>
				</div>

				<h4>Cancel Subscription</h4>
			</div>
		</div>
	);
};

export default UserConfig;
