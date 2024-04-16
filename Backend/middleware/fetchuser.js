const jwt = require('jsonwebtoken');
const secreteKey = "iNotebookUser"


fetchuser = (req, res, next)=>{
    const token = req.header('auth-token')
    if(!token){
        res.status(401).send({error:"Acsses denaied"})
    }
    try {
        const data = jwt.verify(token, secreteKey)
        req.user = data.user
        next()
    } catch (error) {
        res.status(401).send({error:"Acsses denaied"})
    }
}
module.exports = fetchuser
