const express=require("express")
const axios=require("axios")

const productRouter=express.Router()
productRouter.get("/",(req,res)=>{

    res.send("welcome to product page")
})

productRouter.get("/electronics", async (req, res) => {
        try{
            const response= await axios.get("https://modern-jersey-bee.cyclic.app/electronics")
            res.send(response.data)
        }
        catch(err){
            console.log(err)
        }
    })

    productRouter.get("/electronics/:id", async (req, res) => {
        const id = req.params.id
        try{
            const response= await axios.get(`https://modern-jersey-bee.cyclic.app/electronics/${id}`)
            res.send(response.data)
        }
        catch(err){
            console.log(err)
        }
    })
   

    productRouter.get("/fashion/:id", async(req, res) => {
        const id = req.params.id

        try{
            const response= await axios.get("https://modern-jersey-bee.cyclic.app/fashion")
            res.send(response.data)
        }
        catch(err){
            console.log("Somthing went wrong")
    console.log(err)
        }
    })

    productRouter.get("/fashion/:id", async(req, res) => {
        try{
            const response= await axios.get(`https://modern-jersey-bee.cyclic.app/fashion/${id}`)
            res.send(response.data)
        }
        catch(err){
            console.log("Somthing went wrong")
    console.log(err)
        }
    })


    productRouter.get("/grocery", async(req, res) => {
        try{
            const response= await axios.get("https://modern-jersey-bee.cyclic.app/grocery")
            res.send(response.data)
        }
        catch(err){
            console.log("Somthing went wrong")
    console.log(err)
        }
    })   

    productRouter.get("/grocery/:id", async(req, res) => {
        
       const id=req.params.id
        
        try{
            const response= await axios.get(`https://modern-jersey-bee.cyclic.app/grocery/${id}`)
            res.send(response.data)
        }
        catch(err){
            console.log("Somthing went wrong")
    console.log(err)
        }
    })   




    module.exports={productRouter}