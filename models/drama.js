const mongoose = require("mongoose")

const reviewSchema = new mongoose.Schema({
    header: String,
    body: String,

})

const dramaSchema = new mongoose.Schema({
    title: String,
    synopsis: String,
    episodes: Number,
    reviews: [ reviewSchema ], //upsert this
    reviewer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

module.exports = mongoose.model("Drama", dramaSchema)