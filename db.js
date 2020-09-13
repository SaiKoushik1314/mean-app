const mongoose = require("mongoose")

var mongourl = "mongodb+srv://mongo:mongo@cluster0.wks63.mongodb.net/mean?retryWrites=true&w=majority"

mongoose.connect(mongourl,{ useNewUrlParser: true }, (err) =>{
  if(err){
    console.log("Connectyion unsuccessful", JSON.stringify(err));
  }else {
    console.log("connection successful")
  }
});

module.exports = mongoose;