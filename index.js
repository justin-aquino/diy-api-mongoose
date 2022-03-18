const express = require("express")
const app = express()
const PORT = 8000
const cors = require("cors")


// middleware
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())



app.use("/dramas", require("./controllers/drama"))


app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`)
})