const ItemType = require('./../Models/ItemTypeModel')


exports.showItemTypes = async (req, res) => {

    try {
        const items = await ItemType.find()
        res.json(items)

    } catch (e) {
        res.json({error: e})
    }
}


exports.AddItemType = async (req, res) => {
    const itemType = new ItemType({
        name: req.body.name
    })
    try {
        const savedItemType = await itemType.save()
        res.json({data: savedItemType})
    } catch (e) {
        res.status(400).send({
            error : e
        });
    }
}

exports.DeleteItemType = async (req, res) => {

    try {
        await ItemType.remove({_id: req.params.itemTypeId})
        res.json("The item type was removed")

    } catch (e) {
        res.json({error: e})
    }
}

exports.UpdateItemType = async (req, res) => {

    const newItemType = req.body;
    try {
        const itemType = await ItemType.findById(req.params.itemTypeId);
        Object.assign(itemType, newItemType)
        const updatedItemType = await itemType.save();
        res.send({data: updatedItemType})
    } catch (e) {

        console.log(e)
        res.json({error: e})
    }
}
