const express = require("express")

// Initializing our app
const app  = express()

app.listen(3000, ()=>{
    console.log("App is Listening at port 3000")
})


// Routes that we'll use

app.get("/books",(req,res) => {
    res.json({message: "This is mongodb session"})
})