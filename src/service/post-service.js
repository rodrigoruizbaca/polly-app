const db  = require('../db/dynamo');
const sns = require('../sns/sns');
const polly = require('../polly/polly');
const s3 = require('../s3/s3');

const getPosts = async () => {
    const data = await db.getPosts("*");
    return data;
};

const addPost = async (text, voice) => {
    const newPost = await db.savePost(text, voice);
    await sns.publish(newPost.id);
    return newPost;
};


const processPost = async (id) => {
    const data = await db.getPosts(id);
    const stream = await polly.convertToMp3(data.Items[0]);
    await s3.uploadFile({id, stream}); 
    const url = await s3.getUrl(id);
    return await db.updatePost({id, url});
};

module.exports.getPosts = getPosts;
module.exports.addPost = addPost;
module.exports.processPost = processPost;