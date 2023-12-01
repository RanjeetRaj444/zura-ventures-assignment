const express = require("express");
const userModel = require("../models/user.model");
const upload = require("../middleware/upload");
const router = express.Router();
router.get("/user", async (req, res) => {
	try {
		const data = await userModel.find();
		res.status(200).send({ data: data });
	} catch (err) {
		res.status(500).send({ error: err.message });
	}
});
router.post("/add_user", async (req, res) => {
	// console.log(req.body);
	const project = {
		image: req.body.image || "",
		name: req.body.name || "",
		email: req.body.email || "",
	};
	try {
		const exist = await userModel.findOne({ name: project.name });
		if (exist)
			res.status(200).send({ User: exist, msg: "User is already exist!😒" });
		const data = await userModel.create(project);
		res.status(200).send({ data: data, msg: "User stored in database😊" });
	} catch (err) {
		res.status(500).send({ error: err.message });
	}
});
const cpUpload = upload.fields([{ name: "image", maxCount: 1 }]);
router.patch("/update_user/:id", cpUpload, async (req, res) => {
	//  /:id  --- current user id
	const updateUser = {
		image: "",
	};
	if (req.files.image) updateUser.image = req.files.image[0].path;
	console.log(updateUser);
	try {
		const data = await userModel.findByIdAndUpdate(
			{ _id: req.params.id },
			updateUser,
			{ new: true },
		);
		res.status(200).send({ data: data });
	} catch (err) {
		res.status(500).send({ error: err.message });
	}
});

module.exports = router;
