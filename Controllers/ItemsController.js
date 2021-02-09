const Item = require('./../Models/ItemModel')

exports.AddItem = async (req, res) => {
    const item = new Item({
        name: req.body.name,
        type: req.body.type,
        image: req.body.image,
        isActive: req.body.isActive
    })


    try {
        const savedItem = await item.save()
        res.json({data: savedItem})
    } catch (e) {
        res.send({error: e})
    }
}

exports.UpdateItem = async (req, res) => {

    const newItem = req.body;
    try {
        const item = await Item.findById(req.params.itemId);
        console.log(item)
        Object.assign(item, newItem)
        const updatedItem = await item.save();
        res.send({data: updatedItem})
    } catch (e) {
        res.send({error: e})
    }
}


exports.DeleteItem = async (req, res) => {

    try {
        await Item.remove({_id: req.params.itemId})
        res.send("The item was removed")

    } catch (e) {
        res.send({error: e})
    }
}


