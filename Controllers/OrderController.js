const Order = require('./../Models/OrderModel')


exports.showOrders = async (req, res) => {
    try {
        const orders = await Order.find()
        res.status(200).json(orders)
    } catch (e) {
        res.status(400).json({error: e})
    }
}


exports.AddOrder = async (req, res) => {
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

exports.DeleteOrder = async (req, res) => {

    try {
        await Order.remove({_id: req.params.orderId})
        res.status(200).json({'message':"The Order was removed"})

    } catch (e) {
        res.status(400).json({error: e})
    }
}

exports.UpdateOrder = async (req, res) => {

    const newOrder = req.body;
    try {
        const order = await Order.findById(req.params.orderId);
        Object.assign(order, newOrder)
        const updatedOrder = await order.save();
        res.status(200).send({data: updatedOrder})
    } catch (e) {
        console.log(e)
        res.status(400).json({error: e})
    }
}
