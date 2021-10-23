const router = require("express").Router();
const checkAuth = require("../middleware/check-auth");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, `${new Date().toISOString()}_${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "application/pdf" ||
    file.mimetype === "application/txt"
  ) {
    cb(null, true);
  } else cb(null, false); // doesn't store file
};
const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 2 },
  fileFilter,
}); //accept size 2MB

let UserController = require("../controllers/user-controller");

/* GET all users */
router.route("/").get(checkAuth, UserController.user_get_all);

/* POST add new user */
router
  .route("/add")
  .post(checkAuth, upload.single("document"), UserController.add_user);

/* DELETE delete user */
router.route("/delete/:userId").delete(checkAuth, UserController.delete_user);

module.exports = router;
