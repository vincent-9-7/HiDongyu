const router = require(".");
const employeeController = require("../../controllers/api/v1/employeeController");

const Password = require('../../controllers/api/v1/password');

router.get("/employees",employeeController.passport,employeeController.index); 
router.get("/employeeslist",employeeController.passport,employeeController.listUser); 
router.get("/employees/:id",employeeController.passport,employeeController.show); 
router.put("/deletedEmployees/:id",employeeController.passport2,employeeController.delete); 
router.get("/employees/alltask/:id",employeeController.passport,employeeController.getAllTask);
router.put("/employees/:id", employeeController.passport,employeeController.update); 
router.get("/employees/totalOrders/:id",employeeController.passport,employeeController.getTotalTask)
router.get("/getInfoNum",employeeController.passport,employeeController.getInfoNumber)
router.post("/employees/registration",employeeController.registration);
router.post("/employees/login",employeeController.login);
router.post("/employees/recover",Password.recoverEmployee);
router.post("/employees/resetPassword",Password.resetPasswordEmployee);

module.exports = router;