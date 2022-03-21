const express = require("express")
const app = express()
const PORT = 8000
const cors = require("cors")
require("./models")


// middleware
app.use(express.urlencoded({extended: false}))
app.use(express.json()) //parse json request bodies.
app.use(cors())



app.use("/dramas", require("./controllers/drama"))
app.use("/reviews", require("./controllers/reviews"))

//test route
app.get("/", (req,res) => {
    res.json({msg: "welcome to the blog API"})
})

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`)
})