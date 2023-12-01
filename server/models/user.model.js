const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	name: { type: String, require: true },
	email: { type: String, require: true },
	image: { type: String },
});

module.exports = userModel = mongoose.model("User", userSchema);
