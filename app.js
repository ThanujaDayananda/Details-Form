var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app= express()

app.set('view engine','ejs')
app.use(express.static('views'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

mongoose.connect('mongodb://localhost:27017/project',{
    useNewUrlParser: true,
    useUnifiedtopology:true
});

var db=mongoose.connection;

db.on('error',()=>console.log("error in connecting database."));
db.once('open',()=>console.log("connected to database."));


app.post("/form",(req,res)=>{
    var name =req.body.name;
    var course =req.body.course;
    var age= req.body.age;
    var email= req.body.email;

    var data={
        "name": name,
        "course": course,
        "age":age,
        "email":email   
    }

    db.collection('student').insertOne(data,(err,connection)=>{
        if(err){
        throw err;
        }
    console.log("details entered sucesssfully.");
    });

    return res.redirect('popup.html')
})




app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin":'*'
    })
    return res.render('index');
}).listen(3000);

console.log("listening to port 3000");

