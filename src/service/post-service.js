const db  = require('../db/dynamo');
const sns = require('../sns/sns');

const getPosts = async () => {
    const data = await db.getPosts("*");
    return data;
};

const addPost = async (text, voice) => {
    const newPost = await db.savePost(text, voice);
    await sns.publish(newPost.id);
    return newPost;
};

module.exports.getPosts = getPosts;
module.exports.addPost = addPost;