const express = require("express")
const router = express.Router()

const db = require("../models")




//get all the dramas READ

router.get("/", (req,res) => {
    db.Drama.find({})
        .then(dramas => {
            res.send(dramas)
        })
        .catch(err => {
            res.status(404).json({message: "something went wrong"})
        })
})

// router.get("/", async (req,res) => {
//    await db.Drama.find({}, (err, dramas) => {
//         if(err) return res.send(err)
//         res.send(dramas)
//     })
// })


//show drama READ
router.get("/:id", (req,res) => {
    db.Drama.findById(req.params.id)
        .then(foundDrama => {
            if(!foundDrama) res.status(404).json({message: "drama not found"})
            else res.send(foundDrama)
        }).catch(err => {
            if(err.name === "CaskError") return res.status(404).json({message: "ID not valid"})
            res.status(503).json({message: "server is down"})
        })
})

// router.get("/:id", (req,res) => {
//     db.Drama.findById(req.params.id, (err, drama) => {
//         if(err) return res.send(err)
//         res.send(drama)
//     })
// })

//post a drama
// router.post("/", async (req,res) => {
//    await db.Drama.create(req.body, (err, createdDrama) => {
//         if(err) console.log(err)
//         else res.json(createdDrama)
//     })  
// })
router.post("/", (req,res) => {
    db.Drama.create(req.body)
        .then(newDrama => {
            res.json(newDrama)
        })
        .catch(console.log)
})

//edit a drama

router.put("/:id", (req,res) => {
    db.Drama.findByIdAndUpdate(req.params.id, req.body, { new: true})
        .then(updatedBlog => {
            res.send(updatedBlog)
        })
        .catch(err => {
            console.log(err)
            res.status(503).json({message: " something went wrong "})
        })
})

// router.put("/:id", async (req,res) => {
//     const id = req.params.id
//     try {
//         await db.Drama.findOneAndUpdate({
//             _id: id
//         }, req.body)

//         const updatedDrama = await db.Drama.findById(id)
//         if(!updatedDrama) return res.status(404).send({message: "invalid id"})
//         res.send(updatedDrama)
//     } catch (error) {
//         console.log(error)
//     }
// })

//delete a drama
// router.delete("/:id", (req,res) => {
//     db.Drama.findByIdAndDelete(req.params.id)
//         .then(() => {
//             res.status(204).json({message: "drama is deleted!"})
//         })
//         .catch(err => {
//             console.log(err)
//             res.status(503).json({message: "something went wrong"})
//         })
// })

router.delete("/:id", (req,res) => {
    db.Drama.findByIdAndDelete(req.params.id)
        .then(() => {
            res.status(204).send({message: "deleted"})
        })
        .catch(err => {
            console.log(err)
            res.status(503).json({message: "something went wrong"})
        })
})


//reviews crud

// //CREATE move to reviews
// router.put("/:id/review", async (req,res) => {
//     try {
//         const foundDrama = await db.Drama.findById(req.params.id)
//         foundDrama.reviews.push(req.body)
//         await foundDrama.save()
//         res.send(foundDrama)
//     } catch (error) {
//         res.status(503).json({message:`An error occured. Details : ${error}`})
//     }
// })

// //READ
// router.delete("/:id" , async (req,res) => {
//     try{
//         const foundDrama = await db.Drama.findById(req.params.id)
//         foundDrama.reviews[0].remove()
//         foundDrama.save()
//     } catch (err) {
//         console.log(err)
//     }
    
// })

router.post("/:id/reviews", async (req,res) => {
    try {
        //find the blog ID
        const drama = await db.Drama.findById(req.params.id)
        //push comment
        drama.reviews.push(req.body)
        //save drama
        await drama.save()
        res.status(204).json(drama)
    } catch (err) {
        console.log(err)
        res.status(503).json({message: "error"})
    }
})

module.exports = router