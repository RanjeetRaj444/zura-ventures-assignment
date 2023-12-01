const express = require("express");
const displayModel = require("../../models/Configuration/display.model");
const router = express.Router();
router.get("/display_configure/:id", async (req, res) => {
	///:id===projectId
	try {
		const data = await displayModel.find({ projectId: req.params.id });
		res.status(200).send({ data: data });
	} catch (err) {
		res.status(500).send({ error: err.message });
	}
});
router.post("/add_display_configure", async (req, res) => {
	// console.log(req.body);
	const project = {
		projectId: req.body.projectId || "",
		primary_color: req.body.primary_color || "",
		font_color: req.body.font_color || "",
		font_size: req.body.font_size || "",
		chat_height: req.body.chat_height || "",
		chat_icon_size: req.body.chat_icon_size || "",
		position_on_screen: req.body.position_on_screen || "",
		distance_from_bottom: req.body.distance_from_bottom || "",
		horizontal_distance: req.body.horizontal_distance || "",
	};
	try {
		const data = await displayModel.create(project);
		res
			.status(200)
			.send({ data: data, msg: "Display data stored in database😊" });
	} catch (err) {
		res.status(500).send({ error: err.message });
	}
});

module.exports = router;
