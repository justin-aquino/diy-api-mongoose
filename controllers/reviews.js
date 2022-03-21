const express = require("express")
const db = require("../models")
const router = express.Router()


router.put("/:id", async (req,res) => {

    try {
       const drama = await db.Drama.findOne({
            "reviews._id" : req.params.id
        })

        console.log(drama)
        const review = await drama.reviews.id(req.params.id)

        review.header = req.body.header
        review.content = req.body.content
        // review.header = req.body.header
        await drama.save()

        res.json({message: "Successfully updated"})
    } catch (err) {
        console.log(err)
        res.status(503).json({message: "error"})
    }
    
})
router.delete("/:id", async (req,res) => {
    try {
        const drama = await db.Drama.findOne({
            "reviews._id" : req.params.id
        })
        drama.reviews.id(req.params.id).remove()

        await drama.save()
        res.send({message: "deleted successfully"})
    } catch (err) {
        console.log(err)

    }
})



module.exports = router