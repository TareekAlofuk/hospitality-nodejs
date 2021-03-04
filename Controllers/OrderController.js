const Order = require('./../Models/OrderModel')




exports.showOrders = async (req, res) => {
    try {
        const orders = await Order.find()
        res.status(200).json(orders)
    } catch (e) {
        res.status(400).json({error: e})
    }
}

exports.showOrder= async (req, res) => {
    const _id = req.params._id ;
    try {
        const order = await Order.findById(_id)
        res.status(200).json(order)
    } catch (e) {
        res.status(400).json({error: e})
    }
}



exports.showWaitingOrder = async (req , res) => {
    try {
        const orders = await Order.find({status:"waiting"})
        res.status(200).json(orders)
    } catch (e) {
        res.status(400).json({error: e})
    }
}
exports.showCompletedOrder = async (req , res) => {
    try {
        const orders = await Order.find({status:"completed"})
        res.status(200).json(orders)
    } catch (e) {
        res.status(400).json({error: e})
    }
}

exports.showUnderwayOrder = async (req , res) => {
    try {
        const orders = await Order.find({status:"underway"})
        res.status(200).json(orders)
    } catch (e) {
        res.status(400).json({error: e})
    }
}



exports.addOrder = async (req, res) => {
    const order = new Order({
        items: req.body.items ,
        client:req.body.client,
        isGust:req.body.isGust
    })
    try {
        const savedOrder = await order.save()
        res.status(200).json({data: savedOrder})
    } catch (e) {
        res.status(400).send({
            error: e
        });
    }
}

exports.deleteOrder = async (req, res) => {
    const _id = req.params._id ;

    try {
        await Order.remove({_id: _id})
        res.status(200).json({'message':"The Order was removed"})

    } catch (e) {
        res.status(400).json({error: e})
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
        console.log(e)
        res.status(400).json({error: e})
    }
}

exports.updateOrderStatus = async (req, res) => {

    const newStatus  = req.body.status;
    const _id  = req.params._id ;
    try {
        await Order.updateOne({_id:_id}  , {status:newStatus});
        res.status(200)
    } catch (e) {
        console.log(e)
        res.status(400).json({error: e})
    }
}
