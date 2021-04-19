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


app.use(express.static('StaticFileServer'))

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


const server = app.listen(3100, () => {
    console.log("Server started:3100")
});

const io = require('socket.io')(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on('connection', function () {
    console.log('A user connected');
});

app.use(function (req, res, next) {
    req.io = io;
    next();
});


app.use('/api/Admin', AdminRoutes)
app.use('/api/Item', ItemRoutes)
app.use('/api/ItemType', ItemTypeRoutes)
app.use('/api/Room', RoomRoutes)
app.use('/api/Order', OrderRoutes)