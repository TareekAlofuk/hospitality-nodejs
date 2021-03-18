const Order = require('./../Models/OrderModel')
const {handleErrors} = require('./../HandleErrors')
const {Permissions} = require('./../middleware/Authorization')




exports.showOrders = async (req, res) => {
    const authentic = await Permissions(req  , ['operations'])
    if (!(authentic)) {
        res.status(400).json({e: "there is an authentication error"})
        return
    }
    try {
        const orders = await Order.find()
        res.status(200).json(orders)
    } catch (e) {
        res.status(400).json(handleErrors(e));
    }
}

exports.showClientOrders= async (req , res) => {
    const userId = req.params.userId ;
    console.log(req.headers.authorization)


    try {
        const orders = await Order.find({userId:userId})
        res.status(200).json(orders)
    } catch (e) {
        res.status(400).json(handleErrors(e));
    }

}

exports.showOrder= async (req, res) => {
    const authentic = await Permissions(req  , ['operations'])
    if (!(authentic)) {
        res.status(400).json({e: "there is an authentication error"})
        return
    }

    const _id = req.params._id ;
    try {
        const order = await Order.findById(_id)
        res.status(200).json(order)
    } catch (e) {
        res.status(400).json(handleErrors(e));
    }
}



exports.showWaitingOrder = async (req , res) => {
    const authentic = await Permissions(req  , ['operations '])
    if (!(authentic)) {
        res.status(400).json({e: "there is an authentication error"})
        return
    }

    try {
        const orders = await Order.find({status:"waiting"})
        res.status(200).json(orders)
    } catch (e) {
        res.status(400).json(handleErrors(e));
    }
}
exports.showCompletedOrder = async (req , res) => {
    const authentic = await Permissions(req  , ['operations , inventory'])
    if (!(authentic)) {
        res.status(400).json({e: "there is an authentication error"})
        return
    }
    try {
        const orders = await Order.find({status:"completed"})
        res.status(200).json(orders)
    } catch (e) {
        res.status(400).json(handleErrors(e));
    }
}

exports.showUnderwayOrder = async (req , res) => {
    const authentic = await Permissions(req  , ['operations'])
    if (!(authentic)) {
        res.status(400).json({e: "there is an authentication error"})
        return
    }
    try {
        const orders = await Order.find({status:"underway"})
        res.status(200).json(orders)
    } catch (e) {
        res.status(400).json(handleErrors(e));
    }
}



exports.addOrder = async (req, res) => {
    const order = new Order({
        items: req.body.items ,
        client:req.body.client,
        isGust:req.body.isGust,
        note:req.body.note,
        userId:req.body.userId
    })
    try {
        const savedOrder = await order.save()
        res.status(200).json({data: savedOrder})
    } catch (e) {
        res.status(400).json(handleErrors(e));
    }
}

exports.deleteOrder = async (req, res) => {
    const _id = req.params._id ;
    try {
        await Order.remove({_id: _id})
        res.status(200).json({'message':"The Order was removed"})

    } catch (e) {
        res.status(400).json(handleErrors(e));
    }
}

exports.updateOrder = async (req, res) => {
    const _id = req.params._id ;
    const newOrder = req.body;
    try {
        const order = await Order.findById(_id);
        Object.assign(order, newOrder)
        const updatedOrder = await order.save();
        res.status(200).send({data: updatedOrder})
    } catch (e) {
        res.status(400).json(handleErrors(e));
    }
}

exports.updateOrderStatus = async (req, res) => {
    const authentic = await Permissions(req  , ['operations'])
    if (!(authentic)) {
        res.status(400).json({e: "there is an authentication error"})
        return
    }
    const newStatus  = req.body.status;
    const _id  = req.params._id ;
    try {
        await Order.updateOne({_id:_id}  , {status:newStatus});
        res.status(200).json()
    } catch (e) {
        res.status(400).json(handleErrors(e));
    }
}
