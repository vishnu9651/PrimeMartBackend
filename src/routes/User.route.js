const express = require("express")
const { UserModel } = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const userRouter = express.Router()

userRouter.post("/register", async (req, res) => {

    const { email, pass, name, age } = req.body

    try {
        bcrypt.hash(pass, 5, async (err, secure_password) => {
            if (err) {
                console.log(err)
            }
            else {
                const user = new UserModel({ email, pass: secure_password, name, age })
                await user.save()
                res.send("register")
            }
        })


    }
    catch (err) {
        console.log(err)
    }


})
userRouter.post("/login", async (req, res) => {
    const { email, pass } = req.body
    try {
        const user = await UserModel.find({ email })
        const hashed_pass = user[0].pass
        if (user.length > 0) {
            bcrypt.compare(pass, hashed_pass, (err, result) => {
                if (result) {
                    const token = jwt.sign({ app: "prime" }, "vishnu")
                    res.send({ "msg": "Login sucsessful", "token": token })
                }
                 else {
                    res.send("wrong credentials")
                }
            })
        }
        else {
            res.send("wrong credential")
        }

    }
    catch (err) {
        console.log("Somthing went wrong")
        console.log(err)
    }


})
module.exports = { userRouter }