const mongoose = require("mongoose");

const displaySchema = new mongoose.Schema({
	projectId: { type: String, require: true },
	primary_color: { type: String, require: true },
	font_color: { type: String, require: true },
	font_size: { type: Number, require: true },
	chat_height: { type: String, require: true },
	chat_icon_size: { type: String, require: true },
	position_on_screen: { type: String, require: true },
	distance_from_bottom: { type: Number, require: true },
	horizontal_distance: { type: Number, require: true },
});

module.exports = displayModel = mongoose.model("Display", displaySchema);
