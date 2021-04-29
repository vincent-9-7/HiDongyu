const router = require(".");

const regularController = require("../../controllers/api/v1/regularCleanController");
const payment = require("../../controllers/api/v1/payment")
const employeeController = require("../../controllers/api/v1/employeeController");
const userController = require("../../controllers/api/v1/userController");
router.post("/pay", userController.passport,payment.paynow);
router.get("/regular/:id",userController.passport2||employeeController.passport2,regularController.show);
router.get("/regular",userController.passport2||employeeController.passport2,regularController.index);
router.get("/sortedOrder", userController.passport2||employeeController.passport2,regularController.allSortedOrder)
router.get("/unassigneddOrder", userController.passport2||employeeController.passport2,regularController.allUnassignedOrderByTime)


router.post("/regular",userController.passport,regularController.store);

router.put("/regular/assign/:id",employeeController.passport,regularController.assignToEmployee);
router.put('/regular/:id',userController.passport2||employeeController.passport2,regularController.update)
router.put('/regular/cancel/:id',employeeController.passport,regularController.cancelByAdmin)
router.put("/regular/comments/:id",regularController.comments);

router.delete("/regular/:id",userController.passport2||employeeController.passport2,regularController.delete);



module.exports = router;