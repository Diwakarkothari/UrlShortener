const User = require('../models/user')

async function handleSignup(req,res)
{
    const {name,email,password} = req.body;
    await User.create({
        name:name,
        email:email,
        password:password    
    })
    return res.render('/');
}

async function handleLogin(req,res)
{
    const {email,password} = req.body;
    const user = await User.findOne({
        email:email,
        password:password
    })
    if(!user)
        return res.render('login',{
            error:"Invalid Username or Password"
    })
    return res.redirect('/');
}
module.exports = {
    handleSignup,
    handleLogin
}