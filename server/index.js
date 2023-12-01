const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user.routes");
const projectRoutes = require("./routes/project.routes");
const recordRoutes = require("./routes/record.routes");
const generalConfiguration_routes = require("./routes/configuration/general.routes");
const displayConfiguration_routes = require("./routes/configuration/display.routes");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", userRoutes);
app.use("/", projectRoutes);
app.use("/", recordRoutes);
app.use("/", generalConfiguration_routes);
app.use("/", displayConfiguration_routes);
app.use("/uploads", express.static("uploads"));
app.listen(process.env.PORT, async () => {
	try {
		await mongoose.connect(process.env.DATABASE_URL);
		console.log("database connected");
	} catch (err) {
		console.log({ error: err.message });
	}
	console.log("App is listening on port ", process.env.PORT);
});
