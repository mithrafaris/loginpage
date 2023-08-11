const express=require("express");
const app=express();
const path=require("path")
const bodyparser=require("body-parser")
const session=require("express-session")

const router=require('./router')
const port=process.env.port||5005;
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

app.set('view engine','ejs')
app.use('/',router)

//home route
app.use('/static',express.static(path.join(__dirname,'public')))
app.use('/image',express.static(path.join(__dirname,'views/image')))



app.listen(port,()=>{
    console.log("server started http://localhost:5005");
})

 