const AWS = require('aws-sdk');
const polly = new AWS.Polly();
const _ = require('lodash');


const convertToMp3 = async ({text, voice}) => {
    const params = {
        OutputFormat: 'mp3',
        Text: text,
        VoiceId: voice
    };
    const stream = await polly.synthesizeSpeech(params).promise();
    return stream;
    //_.pick(req.body, ['text', 'voice']);
    //return await polly.synthesizeSpeech(params).promise();
};

module.exports.convertToMp3 = convertToMp3;