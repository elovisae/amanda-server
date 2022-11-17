const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = process.env.PORT || 5000
const swaggerDocument = require('./swaggerConfig')
const swaggerUi     = require('swagger-ui-express')

const dotenv = require('dotenv')
dotenv.config()

const itemRoute = require('./routes/items')

app.use(express.json())
app.use('/api/v0/items', itemRoute)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.get('/items', (req, res) => {
    res.redirect('/api/v0/items')
})
app.get('/', (req, res) => {
    const status = res.statusCode;
    if(!res.statusCode === 200){
        res.send(`Status ${status} : Something is wrong`)
    }else{
        res.send(`Status ${status} : Everything OK`)
    }
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
