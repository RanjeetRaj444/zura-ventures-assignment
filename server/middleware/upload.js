const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads");
	},
	filename: (req, file, cb) => {
		let ext = path.extname(file.originalname);
		// console.log(file);
		cb(null, Date.now() + "-" + Math.round(Math.random() * 1e9) + ext);
	},
});

const upload = multer({
	storage: storage,
	fileFilter: (req, files, cb) => {
		cb(null, true);
	},
	limits: {
		fieldSize: 1024 * 1024 * 2,
	},
});
//completed---------
module.exports = upload;
