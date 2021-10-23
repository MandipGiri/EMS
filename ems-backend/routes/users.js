const router = require("express").Router();
const checkAuth = require("../middleware/check-auth");

let UserController = require("../controllers/user-controller");

/* GET all users */
router.route("/").get(checkAuth, UserController.user_get_all);

/* POST add new user */
router.route("/add").post(checkAuth, UserController.add_user);

/* DELETE delete user */
router.route("/delete/:userId").delete(checkAuth, UserController.delete_user);

module.exports = router;
