const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
	projectId: { type: String },
	name: { type: String, require: true },
	description: { type: String, require: true },
	date: { type: String },
	time: { type: String },
});

module.exports = recordModel = mongoose.model("Records", recordSchema);
