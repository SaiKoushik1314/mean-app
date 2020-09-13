const express = require('express')
const bodyparser = require('body-parser')
const mongoose = require('./db')
const EmployeeController  = require("./controllers/employeecontroller")
const cors = require('cors')

var app = express();
app.use(bodyparser.json());
app.use(cors({origin: 'http://localhost:4200'}));
app.listen(3000, ()=>{
    console.log("Mean application has started.")
})

app.use("/employees", EmployeeController);