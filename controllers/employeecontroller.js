var express = require('express');
var router = express.Router();
var ObjectId = require("mongoose").Types.ObjectId
var { Employee } = require("../models/employee");


router.get("/list", (req,res) =>{
    Employee.find((err,docs) =>{
        if(err){
            console.log(docs);
        }else{
            console.log("Employees not found")
            res.send(docs)
        }
    })
})


router.post("/create", (req,res) =>{
   var emp = new Employee({
       name: req.body.name,
       position: req.body.position,
       office: req.body.office,
       salary: req.body.salary
   });
   console.log("Emp", emp)
   emp.save((err, docs) =>{
       if(err){
           console.log("Error Occured while Saving", JSON.stringify(err));
       } else {
           res.send(JSON.stringify(docs));
       }
   });
})


router.get("/:id", (req, res) =>{
        if(!ObjectId.isValid(req.params.id)){
            return res.status(400).send(`Employee ${req.params.id} doesnt exist`)
        }
        Employee.findById(req.params.id, (err, docs) =>{
            res.status(200).send(docs);
        })
})

router.put("/:id", (req,res) =>{
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send(`Employee ${req.params.id} doesnt exist`)
    }
    var emp = new Employee({
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary
    });
     Employee.findByIdAndUpdate(req.params.id, { $set: emp}, {new: true}, (err, docs) =>{
         if(err){
             res.status(400).send("Error occured while updating record");
         } else {
             res.status(202).send(docs);
         }
     });
});


router.delete("/delete/:id", (req,res) =>{
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send(`Employee ${req.params.id} doesnt exist`)
    }
    Employee.findByIdAndRemove(req.params.id, (err, docs)=>{
       checkForError(err, docs, req, res)
    })
})


function checkForError(err, docs, req, res){
    if(err){
        res.status(400).send(`Error occured for record ${req.params.id}`);
    } else {
        res.status(202).send(docs);
    }
}


module.exports = router;