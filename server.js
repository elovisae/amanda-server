const express = require('express')
const cors      = require('cors')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 5000

const app = express()
app.use(cors)


const dotenv = require('dotenv')
dotenv.config()

app.get('/', (req, res) => {
    res.send('Server is running')
})

const connectDB = async () => {
    try {
        
        await mongoose.connect(
            process.env.MONGO_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            },
            console.log('Connected to DB')
        )
    } catch (error) {
        console.log(error)
    }
}
connectDB()
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})
