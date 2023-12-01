import React, { useEffect, useState } from "react";
import {
	Tabs,
	TabList,
	TabPanels,
	Tab,
	TabPanel,
	Input,
	Switch,
	Button,
	useToast,
} from "@chakra-ui/react";
import "../styles/Widget.css";

import { get_general_configure, update_project } from "../utils/ApiRoutes";
import { create_general_configure } from "../utils/ApiRoutes";
import { useParams } from "react-router";
import axios from "axios";
import { showError, showSuccess } from "./ALert";

const WidgetConfig = () => {
	const toast = useToast();
	const { projectId } = useParams();
	// console.log(projectId)
	const [isLoading, setIsLoading] = useState(false);
	const [generalState, setGeneralState] = useState({
		chatbot_name: null,
		welcome_message: null,
		placeholder: null,
	});
	const [imege, setimage] = useState();

	const createGeneralConfig = async () => {
		console.log(generalState);
		try {
			const { data } = await axios.post(`${create_general_configure}`, {
				projectId: projectId,
				chatbot_name: generalState.chatbot_name,
				welcome_message: generalState.welcome_message,
				placeholder: generalState.placeholder,
			});

			console.log(data);

			if (data) {
				getGeneralConfig();
			}
		} catch (error) {
			console.error(error);
		}
	};

	const getGeneralConfig = async () => {
		try {
			const { data } = await axios.get(`${get_general_configure}/${projectId}`);
			if (data) {
				console.log(data);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const handleChangeGenerealTab = (event) => {
		setGeneralState({
			...generalState,
			[event.target.name]: event.target.value,
		});
	};

	const uploadImage = async (e) => {
		// console.log("image uploaded");
		e.preventDefault();
		// console.log(imege);
		try {
			setIsLoading(true);
			const { data } = await axios.patch(
				`${update_project}/${projectId}`,
				{
					image: imege,
				},
				{
					headers: { "Content-Type": "multipart/form-data" },
				},
			);
			if (data) {
				showSuccess("Image Uploaded For Project Icon", toast);
			}
			console.log(data);
		} catch (error) {
			console.error(error);
			// console.log("faield");
			showError("Image Uploaded For Project Icon", toast);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getGeneralConfig();
	}, [projectId]);

	return (
		<div>
			<div className="upload__title">
				<h1>Configuration</h1>
			</div>

			<div className="widget__configs">
				<Tabs>
					<TabList>
						<Tab className="Tab-title">General</Tab>
						<Tab className="Tab-title">Display</Tab>
					</TabList>

					<TabPanels>
						<TabPanel>
							<div className="general__tab">
								<div className="general__item">
									<h2>Chatbot Name</h2>
									<Input
										name="chatbot_name"
										onChange={(event) => handleChangeGenerealTab(event)}
									/>
									<small>This is chatbot string</small>
								</div>
								<div className="general__item">
									<h2>Welcome Message</h2>
									<Input
										name="welcome_message"
										onChange={(event) => handleChangeGenerealTab(event)}
									/>
									<small>This is Welcome string</small>
								</div>
								<div className="general__item">
									<h2>Input Placeholder</h2>
									<Input
										name="placeholder"
										onChange={(event) => handleChangeGenerealTab(event)}
									/>
									<small>Input Placeholder</small>
								</div>
							</div>

							<Button mt={5} onClick={createGeneralConfig} colorScheme="blue">
								Save
							</Button>
						</TabPanel>

						<TabPanel>
							<div className="section__display display__section1">
								<div className="general__item">
									<h2>Primary Color</h2>
									<Input />
									<small>This is chatbot string</small>
								</div>
								<div className="general__item">
									<h2>Primary Color</h2>
									<Input />
									<small>This is chatbot string</small>
								</div>
								<div className="general__item">
									<h2>Primary Color</h2>
									<Input />
									<small>This is chatbot string</small>
								</div>
								<div className="general__item">
									<h2>Primary Color</h2>
									<Input />
									<small>This is chatbot string</small>
								</div>
							</div>
							<div className="display__section2">
								<div className="display__section2-controller">
									<div className="general__item">
										<h2>Primary Color</h2>
										<small>This is chatbot string</small>
									</div>
									<div className="general__item">
										<Switch colorScheme="purple" size="lg" />
									</div>
								</div>

								<div className="section__display display__section2">
									<div className="general__item">
										<h2>Chat Icon Size</h2>
										<Input />
									</div>
									<div className="general__item">
										<h2>Position on Screen</h2>
										<Input />
									</div>
									<div className="general__item">
										<h2>Distance from Bottom (in px)</h2>
										<Input />
									</div>
									<div className="general__item">
										<h2>Horizontal Distance (in px)</h2>
										<Input />
									</div>
									<div>
										<div className="image_uploaded">
											<img src="" alt="" />
										</div>
										<div>
											<h2>Bot Icon</h2>
											<form
												className="image_upoloader"
												onSubmit={(e) => uploadImage(e)}
											>
												<Input
													id="custom-file-input"
													onChange={(e) => setimage(e.target.files[0])}
													type="file"
													name="image"
													accept="image/*"
												/>
												<Button
													type="submit"
													isLoading={isLoading}
													loadingText="Getting in..."
													colorScheme="blue"
												>
													Upload
												</Button>
											</form>
										</div>
									</div>
								</div>
							</div>
						</TabPanel>
					</TabPanels>
				</Tabs>
			</div>
		</div>
	);
};

export default WidgetConfig;
