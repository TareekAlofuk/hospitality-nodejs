const {permissions , notAuthenticated} = require('./../middleware/Authorization')
const Admin = require('./../Models/AdminModel')
const jwt = require('jsonwebtoken');


const createToken = (admin) => {
    return jwt.sign({
        id: admin._id,
        name: admin.name,
        permissions: admin.permissions
    }, 'hospitality-protect-by-SIN')
}


exports.showAdmins = async (req, res) => {
    const authentic = await permissions(req , ['superAdmin'])
    if (!(authentic)) {
        res.status(400).json({e: "there is an authentication error"})
        return
    }


    try {
        let admins = await Admin.find()
        res.status(200).json(admins)

    } catch (e) {
        console.log(e)
        res.status(400).json(e);
    }

}


exports.AddAdmin = async (req, res) => {

    const authentic = await permissions(req , ['superAdmin'])
    if (!(authentic)) {
        res.status(400).json({e: "there is an authentication error"})
        return
    }

    const admin = new Admin({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        permissions: {
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
        res.status(400).send(e);
    }
}

exports.DeleteAdmin = async (req, res) => {
    const authentic = await permissions(req , ['superAdmin'])
    if (!(authentic)) {
        res.status(400).json({e: "there is an authentication error"})
        return
    }

    try {
        await Admin.remove({_id: req.params.adminId})
        res.status(200).json("The Admin was removed")
    } catch (e) {
        res.status(400).json(e);

    }
}

exports.UpdateAdmin = async (req, res) => {
    const authentic = await permissions(req , ['superAdmin'])
    if (!(authentic)) {
        res.status(400).json({e: "there is an authentication error"})
        return
    }

    const newAdmin = {
        permissions: {
            operations: req.body.operations,
            reports: req.body.reports,
            inventory: req.body.inventory,
            superAdmin: req.body.superAdmin
        },
        name: req.body.name,
        email: req.body.email
    }

    try {
        const admin = await Admin.findById(req.params.adminId);
        Object.assign(admin, newAdmin)
        const updatedAdmin = await admin.save();
        res.status(200).send({data: updatedAdmin})
    } catch (e) {
        res.status(400).json(e);
    }
}

exports.login = async (req, res) => {
    const notAuthentic = await notAuthenticated(req)

    if (!(notAuthentic)) {
        res.status(400).json({e: "there is an authentication error"})
        return
    }

    const {email, password} = req.body;
    try {
        const admin = await Admin.login(email, password);
        const token = createToken(admin);
        console.log(admin)
        res.status(200).json({data:admin, token: token})
    } catch (e) {
        console.log(e)
        res.status(400).json(e.message);
    }
}