//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const date =  require(__dirname+ "/date.js");



const app = express();

const items = ["buy food", "car wash", "play games"];
const  workItems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/", function(req,res){

  // let today = new Date();
  // let options = {
  //   weekday: "long",
  //    day : "numeric",
  //     month:"long"
  // };
  //
  // let day = today.toLocaleDateString("en-US", options);

    const day = date.getDate();
    res.render("List",{ListTitle:day, newListItems:items});
      // newday: day
    });

    app.post("/", function(req,res){
      // console.log(req.body);
      const item = req.body.newItem;
      if (req.body.List === "work") {
        workItems.push(item);
        res.redirect("/work");
      }else {
        items.push(item);
        res.redirect("/");
      }

    });

app.get("/work", function(req,res){
  res.render("List", {ListTitle:"work List", newListItems:"workItems"});
});

app.post("/work", function(req,res){
  const item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
})


app.listen(3000,function(){
  console.log("server started on port 3000");
});
