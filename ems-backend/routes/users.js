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

/* GET User detail by user ID */
router.route("/user/:userId").get(checkAuth, UserController.get_user);

/* POST accept user */
router
  .route("/accept-user/:userId")
  .post(checkAuth, UserController.accept_user);

/* GET all pending users */
router.route("/pending-users").get(checkAuth, UserController.get_pending_user);

/* POST add new user */
router
  .route("/add")
  .post(checkAuth, upload.single("document"), UserController.add_user);

/* DELETE delete user */
router.route("/delete/:userId").delete(checkAuth, UserController.delete_user);

/* get user detail */
module.exports = router;
