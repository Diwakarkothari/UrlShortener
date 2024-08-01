const {getUser} = require('../service/auth');

async function restrictlogin(req,res,next)
{
    // agar cookie hai to he uid read karega
    
    // const userid = req.cookies?.uid;
    const userid = req.headers['Authorization'];
    if(!userid)
        return res.redirect('/login');

    const token = userid.split('Bearer')[1];
    // const user = getUser(userid);
    const user = getUser(token);
    if(!user)
        return res.redirect('/login');
    req.user = user;
    next();
}

async function checkAuth(req,res,next)
{
    const userid = req.cookies?.uid;
    const user = getUser(userid);
    req.user = user;
    next();
}

module.exports ={
    restrictlogin,
    checkAuth
}