const express = require('express');
const bodyParser = require('body-parser');
const service = require('./service/post-service');
const _ = require('lodash');
const asyncHandler = require('express-async-handler');

var app = express();
app.use(bodyParser.json());

app.get('/posts', async (req, res) => {
    const data = await service.getPosts("*");
    res.send({data});
});

app.post('/posts', asyncHandler( async (req, res, next) => {
    const data = _.pick(req.body, ['text', 'voice']);
    const newPost = await service.addPost(data.text, data.voice);
    res.send({newPost});
}));

app.patch('/posts/convert/:id', asyncHandler( async (req, res, next) => {
    
    
    res.send({newPost});
}));

app.listen(3000, () => {
    console.log(`Started up at port 3000`);
});