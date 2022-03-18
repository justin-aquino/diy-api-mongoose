const mongoose = require("mongoose")


mongoose.connect("mongodb://127.0.0.1/dramalists")

const db = mongoose.connection

db.once("open", () => {
    console.log(`mongoose connected at ${db.host}: ${db.port}`)
})

db.on("error", (error) => {
    console.log("something went wrong", error)
})


module.exports.Drama = require("./drama")
module.exports.User = require("./user")