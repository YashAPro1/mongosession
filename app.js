const express = require("express")
const { getDb, connectToDb} = require("./db")
const { ObjectId } = require('mongodb')
// Initializing our app
const app  = express()
app.use(express.json())


// Here I'll assign our database connection variable
let db
connectToDb((err) => {
    if (!err){
        app.listen(3000, ()=>{
            console.log("App is Listening at port 3000")
        })
        db = getDb()
    }
})

// Routes that we'll use

app.get("/books",(req,res) => {
    let books = []
    db.collection('books')
    .find()
    .sort({author:1})
    .forEach(book => books.push(book))
    .then(()=>{
        res.status(200).json(books)
    })
    .catch(() => {
        res.status(500).json({message:"Cant fetch the documents"})
    })
})

app.get("/books/:id",(req,res) => {
    if (ObjectId.isValid(req.params.id)){
        db.collection('books')
        .findOne({_id: new ObjectId(req.params.id)})
        .then(book => {
            res.status(200).json(book)
        })
        .catch(err => {
            res.status(500).json({message:"Cant fetch the documents"})
        })
    } else {
        res.status(500).json({message:"Cant fetch the documents"})
    }
})


app.post('/books', (req,res)=>{
    const book = req.body
    db.collection("books")
    .insertOne(book)
    .then( result => {
        res.status(201).json(result)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message:"Cant post the documents"})
    })
})

app.delete("/books/:id", (req,res) => {
    if (ObjectId.isValid(req.params.id)){
        db.collection('books')
        .deleteOne({_id: new ObjectId(req.params.id)})
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json({message:"Cant delete the documents"})
        })
    } else {
        res.status(500).json({message:"Cant find the documents"})
    }
})

// app.patch("/boo", (req,res)=>{
//     const updateks/:idddoc = req.body
//     console.log(updateddoc)
//     if (ObjectId.isValid(req.params.id)){
//         db.collection('books')
//         .updateOne({_id: new ObjectId(req.params.id)},{$set: updateddoc})
//         .then(result => {
//             res.status(200).json(result)
//         })
//         .catch(err => {
//             res.status(500).json({message:"Cant Update the documents"})
//         })
//     } else {
//         res.status(500).json({message:"Cant find the documents"})
//     }
// })
app.patch('/books/:id', (req,res)=>{
    const book = req.body
    if (ObjectId.isValid(req.params.id)){
        db.collection('books')
        .updateOne({_id: new ObjectId(req.params.id)},{$set: book})
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json({message:"Cant Update the documents"})
        })
    } else {
        res.status(500).json({message:"Cant find the documents"})
    }
})