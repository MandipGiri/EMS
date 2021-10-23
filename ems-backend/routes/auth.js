const router = require("express").Router();
const AuthController = require("../controllers/auth-controller");
const checkAuth = require("../middleware/check-auth");

/* user login */
router.route("/login").post(AuthController.login);

/* change user password */
router
  .route("/change-password")
  .post(checkAuth, AuthController.change_password);
module.exports = router;
