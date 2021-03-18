const ItemType = require('./../Models/ItemTypeModel')
const {handleErrors} = require('./../HandleErrors')
const {Permissions} = require('./../middleware/Authorization')


exports.showItemTypes = async (req, res) => {
    const authentic = await Permissions(req  , ['inventory'])
    if (!(authentic)) {
        res.status(400).json({e: "there is an authentication error"})
        return
    }
    try {
        const items = await ItemType.find()
        res.json(items)

    } catch (e) {
        res.status(400).json(handleErrors(e));
    }
}


exports.AddItemType = async (req, res) => {
    const authentic = await Permissions(req  , ['inventory'])
    if (!(authentic)) {
        res.status(400).json({e: "there is an authentication error"})
        return
    }

    const itemType = new ItemType({
        name: req.body.name
    })
    try {
        const savedItemType = await itemType.save()
        res.json({data: savedItemType})
    } catch (e) {
        res.status(400).json(handleErrors(e));
    }
}

exports.DeleteItemType = async (req, res) => {
    const authentic = await Permissions(req  , ['inventory'])
    if (!(authentic)) {
        res.status(400).json({e: "there is an authentication error"})
        return
    }

    try {
        await ItemType.remove({_id: req.params.itemTypeId})
        res.json("The item type was removed")

    } catch (e) {
        res.status(400).json(handleErrors(e));
    }
}

exports.UpdateItemType = async (req, res) => {
    const authentic = await Permissions(req  , ['inventory'])
    if (!(authentic)) {
        res.status(400).json({e: "there is an authentication error"})
        return
    }

    const newItemType = req.body;
    try {
        const itemType = await ItemType.findById(req.params.itemTypeId);
        Object.assign(itemType, newItemType)
        const updatedItemType = await itemType.save();
        res.send({data: updatedItemType})
    } catch (e) {
        res.status(400).json(handleErrors(e));
    }
}
