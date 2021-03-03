require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const ItemRoutes = require('./Routes/ItemRoutes')
const ItemTypeRoutes = require('./Routes/ItemTypeRoutes')
const RoomRoutes = require('./Routes/RoomRoutes')
const AdminRoutes = require('./Routes/AdminRoutes')
const OrderRoutes = require('./Routes/OrderRoutes')
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json())
app.use('/api/Item', ItemRoutes)
app.use('/api/ItemType', ItemTypeRoutes)
app.use('/api/Room', RoomRoutes)
app.use('/api/Admin', AdminRoutes)
app.use('/api/Order', OrderRoutes)

app.use(express.static('StaticFileServer'))

mongoose.connect('mongodb://127.0.0.1:27017/HospitalitySystem', {
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


app.listen(3100, () => {
    console.log("Server started:3100")
})

