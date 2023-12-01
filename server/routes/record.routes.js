const express = require("express");
const recordModel = require("../models/records.models");
const router = express.Router();
router.get("/record/:id", async (req, res) => {
	///:id===projectId "id taken from project creation."
	const projectId = req.params.id;
	try {
		const data = await recordModel.find({ projectId });
		res.status(200).send({ data: data });
	} catch (err) {
		res.status(500).send({ error: err.message });
	}
});
router.post("/add_record", async (req, res) => {
	const record = {
		projectId: req.body.projectId,
		name: req.body.name,
		description: req.body.description,
		date: req.body.date,
		time: req.body.time,
	};
	var currentDate = new Date();

	// Get the current hours, minutes, and seconds
	var hours = currentDate.getHours();
	var minutes = currentDate.getMinutes();
	var seconds = currentDate.getSeconds();
	record.time = `${hours} : ${minutes}`;

	var currentDate = new Date();

	// Get the current date
	var currentDay = currentDate.getDate();
	var currentMonth = currentDate.getMonth() + 1; // Months are zero-indexed, so we add 1
	var currentYear = currentDate.getFullYear();

	// Display the current date in a formatted string
	// console.log(currentYear + "-" + currentMonth + "-" + currentDay);
	record.date = `${currentDay}-${currentMonth}-${currentYear}`;
	try {
		const data = await recordModel.create(record);
		res.status(200).send({ data: data, msg: "Record stored in database😊" });
	} catch (err) {
		res.status(500).send({ error: err.message });
	}
});

router.patch("/update_record/:id", async (req, res) => {
	///:id===recordId---_id "id from current record "
	const newrecord = req.body;
	try {
		const exist = await recordModel.findById({ _id: req.params.id });
		if (!exist) {
			res.status(400).send("Record is not avilable!🤷‍♂️");
		}
		const data = await recordModel.findByIdAndUpdate(
			{ _id: req.params.id },
			newrecord,
			{ new: true },
		);
		res.status(200).send({ data: data });
	} catch (err) {
		res.status(500).send({ error: err.message });
	}
});

router.delete("/delete_record/:id", async (req, res) => {
	// /:id===recordId---_id "id from current record "
	id = req.params.id;
	const index = req.body.index;
	try {
		const exist = await recordModel.findById({ _id: id });
		if (!exist) {
			res.status(400).send("Record is not avilable!🤷‍♂️");
		}
		const data = await recordModel.findByIdAndDelete({ _id: id });
		res.status(200).send({ msg: "Record is deleted. ✔" });
	} catch (err) {
		res.status(500).send({ error: err.message });
	}
});

module.exports = router;
