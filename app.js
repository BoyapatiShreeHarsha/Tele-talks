const express= require("express");
const path=require("path");
const fs=require("fs");
const app=express();
const port=85;


//For Express commands
 //for serving the static file
app.use('/static',express.static("static"));
//to extract the data from the website to app.js
app.use(express.urlencoded({extended:true}));

//Pug commands
app.set('view engine','pug');//set the template engine as pug
//app.set('flod', path.join(__dirname, 'fold'));//set the fold directory  //this is doubt
//app.set('views', path.join(__dirname, 'flod'));//this is correct
app.set('views', path.join(__dirname, 'views'));

//End points
app.get('/',(req,res)=>{
    res.status(200).render('demo.pug');
});


//listening
app.listen(port,()=>{
    console.log(`This is sunning on ${port}`);
})