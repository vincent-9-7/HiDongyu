const EndOfLeaseTable = require('../../../model/EndOfLease');
const RegularTable = require('../../../model/RegularClean');
const EmployeeTable = require('../../../model/Employee');

 exports.updateStatus = async (ctx, next) => {
    const {taskID, type} = ctx.request.body
    let table = EndOfLeaseTable;
    if (type === 'RC') {
        table = RegularTable;
    }
    const regularSearchResult = await table.find({"taskID": parseInt(taskID)}, (err, result) => {
        if (err) {
            ctx.throw(404, `It occurs an error when search ${taskID}. `);
        }
        return result;
    })
    if (regularSearchResult.length > 0) {
        ctx.orderStatus = regularSearchResult[0].status;
        ctx.employeeID = regularSearchResult[0].employeeID;
        await next();
        if (ctx.body === "update successful!") {
        table.findOneAndUpdate({"taskID": taskID}, {"status": "finished"}, function(err, result) {
            if (err) {
                ctx.throw(404, `It occurs an error when update by ${taskID}. `);
            }
        })
    } else {
        ctx.body = `Task ${taskID} is not in-progress.`
    }
    } else {
    ctx.body = `Task ${taskID} is not in-progress.`
    }
 }

 exports.updateOrderFinishedNumber = async (ctx, next) => {
     const {orderStatus, employeeID} = ctx;
     if (orderStatus === 'in-progress') {
         const employeeSearchResult = await EmployeeTable.find({"ID": `${employeeID}`}, (err, result) => {
             if (err) {
                ctx.throw(404, `It occurs an error when search ${employeeID}. `);
             }
             return result;
         })
         if (employeeSearchResult.length < 1) {
             ctx.body = `Can not find this employee by ${employeeID}. `
         }
        let order = employeeSearchResult[0].numberOfOrderFinished;
        order++;
        const numberOfOrder = {"numberOfOrderFinished": order};
        
        await EmployeeTable.findOneAndUpdate({"ID": employeeID}, numberOfOrder, function(err,result) {
            if (err) {
                ctx.body = `It occurs an error when update by ${employeeID}. `
            } else {
                ctx.body = "update successful!"
            }
        })
        await next();
     }}