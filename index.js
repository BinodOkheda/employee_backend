const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config()

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const {userRouter} = require("./routes/user.route")
const {employeeRouter} = require("./routes/employee.route")

app.use("/user",userRouter)
app.use("/employee",employeeRouter)

app.listen(3000,async () => {
    try {

        await mongoose.connect(process.env.DB_CONNECTION_STRING);
        console.log("connnected to DB")      
    } catch (error) {       
        console.log(error)
    }

    console.log('Server is running on port 3000');
  });
