const router = require(".");
const Password = require('../../controllers/api/v1/password');
const userController = require("../../controllers/api/v1/userController");
const employeeController = require("../../controllers/api/v1/employeeController");
router.get("/users",userController.passport2||employeeController.passport2,userController.index); 
router.get("/userslist",userController.passport2||employeeController.passport2,userController.listUser); 
router.get("/users/:id",userController.passport2||employeeController.passport2,userController.show);
router.get("/users/alltask/:id",userController.passport2||employeeController.passport2,userController.getAllTask);
router.get("/users/totalOrders/:id",userController.passport2||employeeController.passport2,userController.getTotalTask)
router.post("/users/registration",userController.registration)
router.post("/users/login",userController.login)
router.put("/users/:id",userController.passport,userController.update);
router.put("/deletedUsers/:id", employeeController.passport2,userController.delete);
router.post('/recover', Password.recover);
router.post('/resetPassword', Password.resetPassword);


module.exports = router;