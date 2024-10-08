const shortId = require('shortid');
const url = require('../models/url');
const shortid = require('shortid');

async function generate(req,res){
    const body = req.body;
    if(!body.url) 
        return res.status(400).json({error:"URL is required"});
    const shortId = shortid();
    await url.create({
        shortId:shortId,
        redirectURL: body.url,
        visitHistory:[],
        createdBy:req.user._id
    });
    // return res.status(200).json({id:shortId});
    return res.render('home',{id:shortId});
}

async function handle(req,res)
{
    const shortId = req.params.shortId;
    const result = await url.findOne({shortId});
    return res.json({totalClicks:result.visitHistory.length, 
        analytics:result.visitHistory })
}

module.exports={
    generate,
    handle
}