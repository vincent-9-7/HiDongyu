const apiRouter = require('../routes/v1/')
const fs = require('fs');



module.exports = async (app) => {
    app.use(apiRouter.routes());
    const url = './src/routes/v1';
    const dir = fs.readdirSync(url);
    dir.forEach((filename) => {
    if (filename.includes('.js')) {
        const apiRouter = require('../routes/v1/' + filename);
        app.use(apiRouter.routes());
    }
})
 
    return app;
};


