const router = require("express").Router();
const DepartmentController = require("../controllers/department-controller");
let Departments = require("../models/departments.model");

/* get all departments */
router.route("/").get(DepartmentController.get_all_departments);

/* add new department */
router.route("/add").post(DepartmentController.add_department);

module.exports = router;
