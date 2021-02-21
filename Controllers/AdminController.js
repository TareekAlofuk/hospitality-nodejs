const Admin = require('./../Models/AdminModel')
var flatten = require('flat')


exports.showAdmins = async (req, res) => {

    try {
        let admins = await Admin.find()
        admins= admins.map(admin => {
            return flatten(admin, {maxDepth: 1})
        })
        res.status(200).json(admins)

    } catch (e) {
        console.log(e)
        res.status(400).send({
            error: e
        });
    }
}


exports.AddAdmin = async (req, res) => {
    const admin = new Admin({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        permitions: {
            operations: req.body.operations,
            reports: req.body.reports,
            inventory: req.body.inventory,
            superAdmin: req.body.superAdmin,
        }

    })
    try {
        const savedAdmin = await admin.save()
        res.status(200).json({data: savedAdmin})
    } catch (e) {
        res.status(400).json(e);
    }
}

exports.DeleteAdmin = async (req, res) => {

    try {
        await Admin.remove({_id: req.params.adminId})
        res.status(200).json("The Admin was removed")

    } catch (e) {
        res.status(400).send({
            error: e
        });
    }
}

exports.UpdateAdmin = async (req, res) => {

    const newAdmin = req.body;
    try {
        const admin = await Admin.findById(req.params.adminId);
        Object.assign(admin, newAdmin)
        const updatedAdmin = await admin.save();
        res.status(200).send({data: updatedAdmin})
    } catch (e) {
        res.status(400).send({
            error: e
        });
    }
}
