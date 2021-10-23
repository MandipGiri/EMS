const router = require("express").Router();
const RoleController = require("../controllers/role-controller");

/* get all roles with deparmentId as optional filter */
router.route("/").get(RoleController.get_all_roles);

/* add a role with department */
router.route("/add").post(RoleController.add_role);

module.exports = router;
