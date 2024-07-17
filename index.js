const express = require('express');
const urlRoute = require('./routes/url');
const URL = require('./models/url');
const path = require('path');
const {connectToMongo} = require('./connect');
const staticRoute = require('./routes/staticRouters');

const app= express();
const port=8000;

app.use(express.json())
app.use(express.urlencoded({extended:false}));

app.set('view engine','ejs');
app.set('views',path.resolve('./views'));

connectToMongo('mongodb://localhost:27017/short-url').then(()=>{
    console.log('MongoDB connected successfully');
});

app.use('/url',urlRoute);
app.use('/',staticRoute);

app.get('/url/:shortId',async (req,res)=>{
    const si = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {shortId:si},
        {$push:{visitHistory:{timestamp:Date.now()}}},
    {new:true})
    res.redirect(entry.redirectURL);
});

app.listen(port,()=>{
    console.log('Server started at PORT ',port);
})