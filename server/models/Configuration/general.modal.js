const mongoose = require("mongoose");

const generalSchema = new mongoose.Schema({
	projectId: { type: String, require: true },
	chatbot_name: { type: String, require: true },
	welcome_message: { type: String, require: true },
	placeholder: { type: String, require: true },
});

module.exports = generalModel = mongoose.model("General", generalSchema);
