const { MongoClient } = require('mongodb')

let databaseConnect

module.exports = {
    connectToDb: (cb) => {
        MongoClient.connect("mongodb://127.0.0.1:27017/bookstore")
        .then(client => {
            console.log("Hii There")
            databaseConnect = client.db()
            return cb()
        })
        .catch(err => {
            console.log(err)
            return cb(err)
        })
    },
    getDb: ()=> databaseConnect
};