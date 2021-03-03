const Item = require('./../Models/ItemModel')
const fs = require('fs');
const path = require('path')
const formidable = require('formidable');
const { v4: uuidv4 } = require('uuid');

exports.showItems = async (req, res) => {
    try {
        const items = await Item.find()
        res.json(items)
    } catch (e) {
        res.json({error: e})
    }
}


exports.showActiveItems = async (req, res) => {
    try {
        const ActiveItems = await Item.find({isActive: true})
        res.json(ActiveItems)
    } catch (e) {
        res.json({error: e})
    }
}

exports.showItem = async (req, res) => {
    try {
        const item = await Item.findById(req.params.itemId);
        res.json(item)

    } catch (e) {
        res.json({error: e})
    }
}


exports.AddItem = async (req, res) => {
    console.log(req.body)
    const item = new Item({
        itemName: req.body.itemName,
        type: req.body.type,
        image: 'req.body.image',
        isActive: req.body.isActive
    })
    try {
        const savedItem = await item.save()
        res.status(200).json({data: savedItem})
    } catch (e) {
        console.log(e)
        res.status(400).json({error: e})
    }

}

exports.UploadImage = async (req, res) => {



    const form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
        console.log(files);
        if(err){
            console.log(err) ;
            res.status(400).send(err);
            return;
        }

        try{
            const theExtention = files.image.type.split('/').pop()
            const imageName = uuidv4()+'.'+ theExtention ;
            var imagePath = path.join(__dirname, '../' + 'StaticFileServer/ItemImage')
                + '\\' + imageName;


            var rawData = fs.readFileSync(files.image.path)
            fs.writeFile(imagePath, rawData, () => {
                if (err) {
                    console.log(err) ;
                    res.status(400).json(err)
                }else{
                    res.status(200).json({url: imageName})
                }
            })

        }catch(e){
            console.log(e);
            res.status(400).send(e);
        }

    })


}


exports.UpdateItem = async (req, res) => {
    const newItem = req.body;
    try {
        const item = await Item.findById(req.params.itemId);
        console.log(item)
        Object.assign(item, newItem)
        const updatedItem = await item.save();
        res.json({data: updatedItem})
    } catch (e) {
        res.json({error: e})
    }
}


exports.DeleteItem = async (req, res) => {

    try {
        await Item.remove({_id: req.params.itemId})
        res.json("The item was removed")

    } catch (e) {
        res.json({error: e})
    }
}


