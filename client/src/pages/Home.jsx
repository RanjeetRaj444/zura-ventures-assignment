import React, { useContext, useEffect, useState } from "react";
import { MdOutlineHome } from "react-icons/md";
import { FaPlusCircle } from "react-icons/fa";
import HomeNav from "../components/HomeNav";
import home_no_project from "../assets/home-illus.svg";
import "../styles/Home.css";
import { Link } from "react-router-dom";

import {
	useDisclosure,
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	Input,
	useToast,
} from "@chakra-ui/react";
import Context from "../store/Context";
import axios from "axios";
import { login } from "../utils/ApiRoutes";
import { getProjects } from "../utils/ApiRoutes";
import { add_project } from "../utils/ApiRoutes";
import { showError, showSuccess, showUserAdded } from "../components/ALert";

const Home = () => {
	const [isProjectAvailable, setIsProjectAvailable] = useState(false);
	const [noUser, setNoUser] = useState(true);
	const [labels, setLabels] = useState({
		createProjectTitle: "Create a New Project",
		projects: "Projects",
		createButton: "Create New Project",
	});

	const {
		isOpen: isUserModalOpen,
		onOpen: onUserModalOpen,
		onClose: isUserModalClose,
	} = useDisclosure();

	const {
		isOpen: isCreateProjectModalOpen,
		onOpen: onCreateProjectModalOpen,
		onClose: onCreateProjectModalClose,
	} = useDisclosure();

	const [projects, setProjects] = useState([]);

	const [userInfo, setUserInfo] = useState({ name: null, email: null });
	const [projectTitle, setProjectTitle] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const { user, setUser, project, setProject } = useContext(Context);

	useEffect(() => {
		const userData = JSON.parse(localStorage.getItem("user"));

		if (userData) {
			setUser(userData);
		}

		if (!userData) {
			setNoUser(true);
			onUserModalOpen();
			return;
		}
	}, []);

	const toast = useToast();
	useEffect(() => {
		if (user) {
			setNoUser(false);
			isUserModalClose();
			getUserProjects();
		}
	}, [user]);

	const createProject = async () => {
		if (!projectTitle || projectTitle.length === 0) {
			return;
		}

		try {
			setIsLoading(true);
			const { data } = await axios.post(add_project, {
				userId: user?._id,
				name: projectTitle,
			});

			if (data) {
				onCreateProjectModalClose();
				getUserProjects();
				showSuccess("Project Created", toast);
			}
		} catch (error) {
			console.error(error);
			showError("Project Creating", toast);
		} finally {
			setIsLoading(false);
		}
	};

	const getUserProjects = async () => {
		try {
			const { data } = await axios.get(`${getProjects}/${user?._id}`);
			if (data.data.length > 0) {
				setIsProjectAvailable(true);
				setProjects(data.data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const loginUser = async () => {
		if (!userInfo.email || !userInfo.name) {
			return;
		}

		try {
			setIsLoading(true);
			const { data } = await axios.post(login, userInfo);
			console.log(data);
			if (data.data) {
				setUser(data.data);
				localStorage.setItem("user", JSON.stringify(data.data));
				setNoUser(false);
				isUserModalClose();
			}
			if (!data.msg) {
				showUserAdded(toast);
			} else {
				showSuccess("User Logedin", toast);
			}
		} catch (e) {
			console.error(e);
		} finally {
			setIsLoading(false);
		}
	};

	const handleChange = (event) => {
		setUserInfo({ ...userInfo, [event.currentTarget.id]: event.target.value });
	};

	return (
		<div className="container home__container">
			<HomeNav />

			<div className="container">
				<div className="back__to__home">
					<button>
						<MdOutlineHome /> Back to Home
					</button>
				</div>

				<div className="home__contents">
					{isProjectAvailable ? (
						<div className="home__contents-main">
							<div className="has__project-title__bar">
								<h1 className="home__title">{labels.projects}</h1>
								<div className="create__project">
									<button onClick={onCreateProjectModalOpen}>
										<FaPlusCircle /> {labels.createButton}
									</button>
								</div>
							</div>

							<div className="home__body">
								<div className="projects">
									{projects.length > 0 &&
										projects.map((project) => (
											<ProjectCard
												key={project?._id}
												projectName={project.name}
												image={project.image || ""}
												id={project._id}
												timeStamp={project.timeStamp}
												episodes={project.episodes}
											/>
										))}
								</div>
							</div>
						</div>
					) : (
						<div>
							<h1 className="home__title no__projects">
								{labels.createProjectTitle}
							</h1>
							<div className="home__no-project__body">
								<div className="no__project-illustration">
									<img src={home_no_project} alt="" />
								</div>
								<div className="no__project-text">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
									do eiusmod tempor incididunt ut labore et dolore magna aliqua.
									Ut enim ad minim veniam, quis nostrud exercitation ullamco
									laboris nisi ut aliquip ex ea commodo consequat. Duis aute
									irure dolor in reprehenderit in
								</div>

								<div className="create__project">
									<button onClick={onCreateProjectModalOpen}>
										<FaPlusCircle /> {labels.createButton}
									</button>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>

			<Modal isCentered isOpen={isUserModalOpen}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Login</ModalHeader>
					<ModalBody>
						<div className="login__section">
							<Input
								onChange={(event) => handleChange(event)}
								type="email"
								id="email"
								placeholder="Enter email"
							/>
							<Input
								onChange={(event) => handleChange(event)}
								placeholder="Enter username"
								id="name"
							/>
							<Button
								isLoading={isLoading}
								loadingText="Getting in..."
								colorScheme="blue"
								onClick={loginUser}
							>
								Login
							</Button>
						</div>
					</ModalBody>
				</ModalContent>
			</Modal>

			<Modal isCentered isOpen={isCreateProjectModalOpen} size="lg">
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Create Project</ModalHeader>
					<ModalBody>
						<div className="create__project-modal">
							<p>Enter Project Name:</p>
							<Input
								onChange={(event) => setProjectTitle(event.target.value)}
								placeholder="Type Here"
							/>
						</div>
					</ModalBody>

					<ModalFooter>
						<Button
							onClick={onCreateProjectModalClose}
							colorScheme="red"
							variant="ghost"
						>
							Cancel
						</Button>
						<Button
							isLoading={isLoading}
							loadingText="Getting in..."
							style={{ background: "#7e22ce", color: "white" }}
							variant="ghost"
							onClick={createProject}
						>
							Create
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</div>
	);
};

export default Home;

const ProjectCard = ({ projectName, image, id, timeStamp, episodes }) => {
	return (
		<div className="project">
			<Link to={`/${id}/upload`}>
				{image !== "" ? (
					<div className="projectImage">
						<img
							src={`https://lama-backend-7w46.onrender.com/${image}`}
							alt="img"
						/>
					</div>
				) : (
					<div className="project__logo">SP</div>
				)}
				<div className="project__body">
					<div className="project__info">
						<p className="project__name">{projectName.toUpperCase()}</p>
						<p className="project__episodes">{episodes} episodes</p>
					</div>

					<div className="project__timestamps">
						<p>{timeStamp}</p>
					</div>
				</div>
			</Link>
		</div>
	);
};
