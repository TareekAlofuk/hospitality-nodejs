const Room = require('./../Models/RoomModel')
const {handleErrors} = require('HandleErrors')


exports.showRooms = async (req, res) => {

    try {
        const Rooms = await Room.find()
        res.status(200).json(Rooms)

    } catch (e) {
        res.status(400).json(handleErrors(e));

    }
}


exports.AddRoom = async (req, res) => {
    const room = new Room({
        name: req.body.name
    })
    try {
        const savedRoom = await room.save()
        res.status(200).json({data: savedRoom})
    } catch (e) {
        res.status(400).json(handleErrors(e));

    }
}

exports.DeleteRoom = async (req, res) => {

    try {
        await Room.remove({_id: req.params.roomId})
        res.status(200).json("The room was removed")

    } catch (e) {
        res.status(400).json(handleErrors(e));
    }
}

exports.UpdateRoom = async (req, res) => {

    const newRoom = req.body;
    try {
        const room = await Room.findById(req.params.roomId);
        Object.assign(room, newRoom)
        const updatedRoom = await room.save();
        res.status(200).send({data: updatedRoom})
    } catch (e) {
        res.status(400).json(handleErrors(e));
    }
}
