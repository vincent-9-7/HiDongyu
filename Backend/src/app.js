const loader = require('./loaders');
const bodyParser = require('koa-bodyparser');
const passport = require("koa-passport");


const Koa = require('koa');
const cors = require('koa-cors');
const app = new Koa();

app.use(cors());
app.use(bodyParser());
loader.init(app);


app.use(passport.initialize());
app.use(passport.session());
require("./utils/passport")(passport);
module.exports = app;