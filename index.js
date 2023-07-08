const express = require("express")
const app = express()
const {connection}=require("./src/config/db")
const {UserModel}=require("./src/models/user.model")
const {userRouter}=require("./src/routes/User.route")
const {productRouter}=require("./src/routes/Product.route")
const {cartRouter}=require("./src/routes/Cart.route")
const {authenticate}=require("./src/middlewares/authenticate.middleware")
const jwt=require("jsonwebtoken")
const bcrypt = require('bcrypt');
app.use(express.json())

app.get("/", (req, res) => {
     res.send("hello world")
})
app.use("/user",userRouter)
app.use("/product",productRouter)
app.use(authenticate)
 app.use("/cart",cartRouter)

app.get("/payment",(req,res)=>{

    const token=req.headers.authorization;
    jwt.verify(token,"vishnu",(err,decoded)=>{

        if(err){
            res.send("inalid token")
            console.log(err)
        }
        else{
            res.send("data..")
        }
    })
})


app.listen(8080, async() => {

try{
    await connection 
    console.log("server is running")
}catch(err){
    console.log("facing issue while connection")
    console.log(err)
}

})

