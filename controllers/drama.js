const express = require("express")

// const anime = require("../models/anime")
const db = require("../models")
const router = express.Router()



//get all the animes

router.get("/", async (req,res) => {
    db.Drama.find({}, (err, dramas) => {
        if(err) return res.send(err)
        res.send(dramas)
    })
})


//show drama
router.get("/:id", (req,res) => {
    db.Drama.findById(req.params.id, (err, drama) => {
        if(err) return res.send(err)
        res.send(drama)
    })
})

//post a drama
router.post("/", async (req,res) => {
    db.Drama.create(req.body, (err, createdDrama) => {
        if(err) console.log(err)
        else res.json(createdDrama)
    })  
})

//edit a drama

router.put("/:id", async (req,res) => {
    const id = req.params.id
    try {
        await db.Drama.findOneAndUpdate({
            _id: id
        }, req.body)

        const updatedDrama = await db.Drama.findById(id)
        if(!updatedDrama) return res.status(404).send({message: "invalid id"})
        res.send(updatedDrama)
    } catch (error) {
        console.log(error)
    }
 
})

//delete a drama
router.delete("/:id", (req,res) => {
    db.Drama.findByIdAndDelete(req.params.id)
        .then(() => {
            res.status(204).json({message: "drama is deleted!"})
        })
        .catch(err => {
            console.log(err)
            res.status(503).json({message: "something went wrong"})
        })
})


//reviews crud

//CREATE
router.put("/:id/review", async (req,res) => {
    try {
        const foundDrama = await db.Drama.findById(req.params.id)
        foundDrama.reviews.push(req.body)
        await foundDrama.save()
        res.send(foundDrama)
    } catch (error) {
        res.status(503).json({message:`An error occured. Details : ${err}`})
    }
})

//READ
router.delete("/:id" , async (req,res) => {
    try{
        const foundDrama = await db.Drama.findById(req.params.id)
        foundDrama.reviews.id(req.params.id).remove()
        foundDrama.save()
    } catch (err) {
        console.log(err)
    }
    
})

module.exports = router