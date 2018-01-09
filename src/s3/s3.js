const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const uploadFile = async ({id, stream}) => {
    var params = {
        ACL: "public-read", 
        Body: stream.AudioStream, 
        Bucket: "polly-ws-audio", 
        Key: id + ".mp3"
    };
    return await s3.putObject(params).promise();
};

const getUrl = async (id) => {
    const s3 = new AWS.S3();
    let url_begining = "https://s3.amazonaws.com/";
    var params = {
        Bucket: "polly-ws-audio"
    };
    const location = await s3.getBucketLocation(params).promise();
    console.log(location);
    if (location.LocationConstraint) {
        url_begining = "https://s3-" + location.LocationConstraint + ".amazonaws.com/";
    }
    const url = url_begining + "polly-ws-audio" + "/" + id + ".mp3";
    return url;    
};

module.exports.getUrl = getUrl;
module.exports.uploadFile = uploadFile;