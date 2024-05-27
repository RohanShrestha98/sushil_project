const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log({file})
    cb(null, "./uploads");
  },
  filename: function (_, file, cb) {
    cb(null, file.originalname + "-" + Date.now());
  },
});

const upload = multer({ storage });

module.exports = { upload };
