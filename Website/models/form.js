//Requiring mongoose package
var mongoose=require("mongoose");
  
// Schema
var formSchema = new mongoose.Schema({
    username : String,
    password : String,
    age: Number
});
  
module.exports = mongoose.model("Form", formSchema);