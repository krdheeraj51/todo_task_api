
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const appConfig = require('./config/appConfig');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//model
require('./model/User');
require('./model/Task');
require('./model/SubTask');
const appRouter = require('./route/appRoute')
//call router
appRouter.setAppRouter(app);

app.listen(appConfig.port, () => {

    let db = mongoose.connect(appConfig.db.uri, { useNewUrlParser: true });

})
//handling mongoose connection error
mongoose.connection.on('error', (err) => {
    console.log('DataBase connection error :::');
})
console.log("after connection error ....");
mongoose.connection.on('open', (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('DBConnection Established Successfully .....');
    }

})