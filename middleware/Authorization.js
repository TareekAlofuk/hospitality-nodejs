const jwt = require("jsonwebtoken");
const Admin = require('./../Models/AdminModel')

const authenticationByJwt =(req) => {
    const token =   req.headers['authorization'];
    const authenticationData = {id:'' , error:''}


    try{

        const jwtPayload =  jwt.verify(
            token,
            'hospitality-protect-by-SIN'
        )
        authenticationData.id =  jwtPayload.id
    }catch (e){
        authenticationData.error = e
    }

    return authenticationData

}

const authorization =   async (req) => {
    const authorizationData = {permissions:[] , error:""}
    const authenticationData  = authenticationByJwt(req)

    if (authenticationData.error === "")
    try{
        const admin =  await Admin.findById(authenticationData.id)
       const permissions =  (admin.permissions).toJSON()
        for (const [key, value] of Object.entries(permissions)) {
            if(value === true){
                authorizationData.permissions.push(key)
            }
        }
    }catch (e){
        authorizationData.error = e ;
    }

    else {
        authorizationData.error =  authenticationData.error
    }

    return authorizationData

}


exports.permissions = async (req  , permissions) => {
    let requestPermissions ;
    const authData =  await authorization(req )
    requestPermissions = authData.permissions;

    return requestPermissions.some(p => permissions.includes(p));

}

// exports.isInventory = async (req , model) => {
//     let permissions ;
//     const authData =  await authorization(req ,model)
//     permissions = authData.permissions
//     return permissions.filter(permission => permission === "inventory").length !== 0;
// }
// exports.isReports = async (req , model) => {
//     let permissions ;
//     const authData =  await authorization(req ,model)
//     permissions = authData.permissions
//     return permissions.filter(permission => permission === "reports").length !== 0;
// }

exports.notAuthenticated= async (req , model) => {
    let permissions ;
    const authData =  await authorization(req ,model)
    permissions = authData.permissions
    return permissions.length === 0;
}



