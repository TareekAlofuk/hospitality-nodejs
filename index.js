require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const ItemRoutes = require('./Routes/ItemRoutes')
const app = express()

app.use(express.json())
app.use('/api/Item', ItemRoutes)


mongoose.connect(process.env.DB_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

const db = mongoose.connection;

db.on('error', (err) => {
    console.log(err)
});
db.once('open', () => {
    console.log('db opened successfully')
});


app.listen(process.env.PORT, () => {
    console.log("Server started: 3100")
})

