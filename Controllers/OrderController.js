const Order = require('./../Models/OrderModel')
const {handleErrors} = require('./../HandleErrors')
const {permissions} = require('./../middleware/Authorization')


exports.showOrders = async (req, res) => {
    // const authentic = await permissions(req, ['operations'])
    // if (!(authentic)) {
    //     res.status(400).json({e: "there is an authentication error"})
    //     return
    // }

    try {
        const orders = await Order.find().sort({_id:-1}).limit(40);
        res.status(200).json(orders)
    } catch (e) {
        res.status(400).json(e);
    }
}

exports.showClientOrders = async (req, res) => {
    const userId = req.params.userId;
    try {
        const orders = await Order.find({userId: userId}).sort({_id:-1}).limit(20)
        res.status(200).json(orders)
    } catch (e) {
        res.status(400).json(e);
    }

}

exports.showOrder = async (req, res) => {
    const authentic = await permissions(req, ['operations'])
    if (!(authentic)) {
        res.status(400).json({e: "there is an authentication error"})
        return
    }

    const _id = req.params._id;
    try {
        const order = await Order.findById(_id)
        res.status(200).json(order)
    } catch (e) {
        res.status(400).json(e);
    }
}

exports.showWaitingOrder = async (req, res) => {
    const authentic = await permissions(req, ['operations'])
    if (!(authentic)) {
        res.status(400).json({e: "there is an authentication error"})
        return
    }

    try {
        const orders = await Order.find({status: 0}).sort({_id:-1})
        res.status(200).json(orders)
    } catch (e) {
        res.status(400).json(e);
    }
}

exports.showCompletedOrder = async (req, res) => {
    const authentic = await permissions(req, ['operations , inventory'])
    if (!(authentic)) {
        res.status(400).json({e: "there is an authentication error"})
        return
    }
    try {
        const orders = await Order.find({status: 2}).sort({_id:-1})
        res.status(200).json(orders)
    } catch (e) {
        res.status(400).json(e);
    }
}

exports.showUnderwayOrder = async (req, res) => {
    const authentic = await permissions(req, ['operations'])
    if (!(authentic)) {
        res.status(400).json({e: "there is an authentication error"})
        return
    }
    try {
        const orders = await Order.find({status: 1})
        res.status(200).json(orders)
    } catch (e) {
        console.log(e)

        res.status(400).json(e);
    }
}

const EventNames = {
    NEW_ORDER: "NEW_ORDER",
    ORDER_CANCELED: "ORDER_CANCELED",
    ORDER_STATUS_CHANGED: "ORDER_STATUS_CHANGED"
}

exports.addOrder = async (req, res) => {

    const order = new Order({
        items: req.body.items,
        client: req.body.client,
        isGust: req.body.isGust,
        note: req.body.note,
        userId: req.body.userId,
        time:new Date().getHours() > 12 ? new Date().getHours() - 12 + ":"+new Date().getMinutes()+"PM":new Date().getHours() + ":"+new Date().getMinutes()+"AM"
    })
    try {
        const savedOrder = await order.save()
        res.status(200).json({data: savedOrder});
        req.io.sockets.emit(EventNames.NEW_ORDER, savedOrder);
    } catch (e) {
        res.status(400).json(e);
    }
}

exports.deleteOrder = async (req, res) => {
    const _id = req.params._id;
    try {
        await Order.remove({_id: _id})
        res.status(200).json({'message': "The Order was removed"});
        req.io.sockets.emit(EventNames.ORDER_CANCELED, {_id: _id});
    } catch (e) {
        res.status(400).json(e);
    }
}

exports.updateOrder = async (req, res) => {
    const _id = req.params._id;
    const newOrder = req.body;
    try {
        const order = await Order.findById(_id);
        Object.assign(order, newOrder)
        const updatedOrder = await order.save();
        res.status(200).send({data: updatedOrder})
    } catch (e) {
        res.status(400).json(e);
    }
}

exports.updateOrderStatus = async (req, res) => {
    const authentic = await permissions(req, ['operations'])
    if (!(authentic)) {
        res.status(400).json({e: "there is an authentication error"})
        return
    }
    const newStatus = req.body.status;
    const _id = req.params._id;
    try {
        await Order.updateOne({_id: _id}, {status: newStatus});
        res.status(200).json();
        req.io.sockets.emit(EventNames.ORDER_STATUS_CHANGED, {_id: _id, newStatus: newStatus});
    } catch (e) {
        res.status(400).json(e);
    }
}



exports.reportType1 = async (req, res) => {
    const authentic = await permissions(req, ['reports'])
    if (!(authentic)) {
        res.status(400).json({e: "there is an authentication error"})
        return
    }

    try {

        let clientsDetails = await Order.aggregate([
            {
                $match : { status:2}
            },
            {
                $match :  {date : {$gt: new Date(new Date().setDate(new Date().getDate()-30))  }}
            },
            {
                $group: {
                    _id: "$client.clientName",
                    orders: {$push: "$items"},
                    ordersCount: {$sum: 1},
                },

            }
        ]).then((clients) => {
            return  clients.map((client) => {
                let itemsCount = 0 ;
                if(client.orders !== undefined){
                 client.orders.forEach(items => {

                     let itemCount = 0 ;

                     items.forEach(item => {
                         itemCount = item.count + itemCount
                     })
                     itemsCount =  itemCount  + itemsCount
                })
                client.itemsCount = itemsCount ;
                return client
                }
                else{
                    return []
                }
            })
        })

        res.status(200).json(clientsDetails)
    } catch (e) {
        console.log(e)
        res.status(400).json(e);
    }

}


//return all items and every item how many times is taken
exports.reportByMonth = async (req, res) => {
    const numberOfMonthFromNow =  - (parseInt(req.params.numberOfMonthFromNow))  ;
    let date = new Date();
    let beginningOfTheMonth = new Date(date.getFullYear(),date.getMonth() + numberOfMonthFromNow , 1);
    let endOfTheMonth = new Date(date.getFullYear(),date.getMonth()+1+ numberOfMonthFromNow  , 0 , 23 , 59 , 59);

    try{
        let orders =  await Order.aggregate([
            {
                $match : { status:2}
            },
            {
                $match :  {date : {$gt: beginningOfTheMonth , $lte: endOfTheMonth}}
            },
            {
                $group: {
                    _id: "1",
                    orderItems: {$push: "$items"},
                    ordersCount: {$sum: 1},
                },
            }
        ])



        if (!orders.length) { 
            res.status(200).json(orders)
            return 0
        }
        let items = [] ;
        let itemsInAssociativeArray= [] ;
        let itemsNameWithCount = []
        for (const order of orders[0].orderItems) {
            for (const item of order){
                items.push(item)
            }
        }

        for (let i = 0 ; i<items.length ; i++) {

                if (itemsInAssociativeArray[items[i].itemName] !== undefined ){
                    itemsInAssociativeArray[items[i].itemName] = itemsInAssociativeArray[items[i].itemName] + items[i].count;
                }else {
                    itemsInAssociativeArray[items[i].itemName] = items[i].count;
                }
        }

        for (let key in itemsInAssociativeArray) {
            itemsNameWithCount.push({itemName:key , itemCount:itemsInAssociativeArray[key]})
        }

        res.status(200).json(itemsNameWithCount)

    } catch(e) {
         console.log(e)
         res.status(400).json(e);
     }
}





exports.MonthlyCompleteReport = async (req, res) => {
    const numberOfMonthFromNow =  - (parseInt(req.params.numberOfMonthFromNow))  ;
   
    let date = new Date();
    let beginningOfTheMonth = new Date(date.getFullYear(),date.getMonth() + numberOfMonthFromNow , 1);
    let endOfTheMonth = new Date(date.getFullYear(),date.getMonth()+1+ numberOfMonthFromNow  , 1 , 0 , 0 , 0);

    try {
        let orders =  await Order.aggregate([
            {
                $match : { status:2}
            },
            {
                $match :  {date : {$gt: beginningOfTheMonth , $lte: endOfTheMonth}}
            },
            {
                $addFields: {
                   "itemscount": {$sum:"$items.count"}
                }
             },
             {
                $sort:{ "date" : -1  }  
            },
            {
                $group: {
                    _id: "$client" ,
                    orders: {$push:{items : "$items" , isGust:"$isGust" , note:"$note" ,itemscount:{$sum:"$items.count"}  , date:"$date"  } },
                    totalItems:{$sum:"$itemscount"},
                    ordersCount: {$sum: 1}
                },
            },
             {
                 $sort:{ "ordersCount" : -1  , "totalItems":-1 }  
             }
            
        ])
    res.status(200).json(orders)

    } catch (e) {
        console.log(e)
        res.status(400).json(e);
    }
    

}
