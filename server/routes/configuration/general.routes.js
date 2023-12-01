const express = require("express");
const generalModel = require("../../models/Configuration/general.modal");
const router = express.Router();
router.get("/general_configure/:id", async (req, res) => {
	///:id===projectId
	try {
		const data = await generalModel.find({ userId: req.params.id });
		res.status(200).send({ data: data });
	} catch (err) {
		res.status(500).send({ error: err.message });
	}
});
router.post("/add_general_configure", async (req, res) => {
	// console.log(req.body);
	const project = {
		projectId: req.body.projectId || "",
		chatbot_name: req.body.primary_color || "",
		welcome_message: req.body.font_color || "",
		placeholder: req.body.font_size || "",
	};
	try {
		const data = await generalModel.create(project);
		res
			.status(200)
			.send({ data: data, msg: "General data stored in database😊" });
	} catch (err) {
		res.status(500).send({ error: err.message });
	}
});

module.exports = router;
