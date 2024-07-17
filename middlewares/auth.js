const {getUser} = require('../service/auth');

async function restrictlogin(req,res,next)
{
    // agar cookie hai to he uid read karega
    
    const userid = req.cookie?.uid;
    if(!userid)
        return res.redirect('/login');

    const user = getUser(userid);
    if(!user)
        return res.redirect('/login');
    req.user = user;
    next();
}
module.exports ={
    restrictlogin
}