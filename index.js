require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require("passport");
const cors = require("cors");
const { success, error } = require("consola");


require("./server/config/passport");

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(session({
    secret: process.env.SESSION,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());



app.use("/api/users", require("./server/routes/user"));

app.get('/auth/google',
  passport.authenticate('google', { scope: [ 'email', 'profile' ] }
));
app.get( '/auth/google/dashboard',
    passport.authenticate( 'google', {
        successRedirect: 'http://localhost:3000/dashboard',
        failureRedirect: 'http://localhost:3000/login'
}));

const startApp = async () => {
    try {
        // Connecting to Mongo
        await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/authDB", {
            useNewUrlParser: true,
            useUnifiedTopology: true, 
            useCreateIndex: true
        });

        success({
            message: 'MongoDB Successfully Connected...',
            badge: true
        });
        const port = process.env.PORT || 5000
         app.listen(port, () =>
            success({ message: `Server started on PORT ${port}`, badge: true })
          );
    } catch (err) {
        error({
            message: `Unable to connect to the Databace \n${err}`,
        });
        startApp();
    }
};

startApp();









// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/authDB", {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
// .then(() => console.log("MongoDB Successfully Connected..."))
// .catch(err =>console.log(err));
