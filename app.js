const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const app = express()

app.use(express.json({extended:true}))
app.use('/api/auth', require('./routes/auth.routes'))

const PORT = config.get('port') || 5000
const mongoUri = config.get('mongoUri')

async function start() {
    try {
        await mongoose.connect(mongoUri,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useCreateIndex:true
        })
    } catch (e) {
        console.log('Server Error', e.message)
    }
}

app.listen(PORT, () => console.log(`App has been started on ${PORT}...`))


start()