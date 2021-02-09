const Item = require('./../Models/ItemModel')

exports.addItem = async (req, res) => {
    const item =  new Item({
        name: req.body.name,
        type: req.body.type,
        image: req.body.image,
        isActive: req.body.isActive
    })

    try {
        const savedItem = await item.save()
        res.json({savedItem: savedItem})
    } catch (e) {
        res.json({error: e})
    }
}



