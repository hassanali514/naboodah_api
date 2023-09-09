const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const errorMiddleware = require('./middlewares/error');

if (process.env.NODE_ENV !== 'production') {
    // config
    require("dotenv").config({ path: './config/config.env' });  
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// import routes
const users = require("./routes/user/user");
const candidates = require('./routes/candidate/candidate');

// use routes
app.use('/api/v1', users);
app.use('/api/v1', candidates)

// middleware for error
app.use(errorMiddleware);

module.exports = app;