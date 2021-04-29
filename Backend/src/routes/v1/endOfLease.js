const router = require("./");

const endController = require("../../controllers/api/v1/endOfLeaseController");
const employeeController = require("../../controllers/api/v1/employeeController");
const userController = require("../../controllers/api/v1/userController");
router.get("/endOfLease",userController.passport2||employeeController.passport2,endController.index);
router.get("/endOfLease/:id",userController.passport2||employeeController.passport2,endController.showById); 
router.post("/endOfLease",userController.passport,endController.store); 
router.put("/endOfLease/assign/:id",employeeController.passport,endController.assignToEmployee); 
router.put("/endOfLease/comments/:id",userController.passport,endController.comments);
router.put('/endOfLease/:id',userController.passport2||employeeController.passport2,endController.update) 
router.put('/endOfLease/cancel/:id',employeeController.passport,endController.cancelByAdmin)
router.put("/deletedEndOfLease/:id",userController.passport2||employeeController.passport2,endController.delete);

module.exports = router;