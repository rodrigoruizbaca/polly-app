const AWS = require('aws-sdk');
const sns = new AWS.SNS();

const publish = async (id) => {
    await sns.publish({
        Message : id,
        TopicArn: "arn:aws:sns:us-west-2:480818568846:posts_topic_node"
    }).promise();
};

module.exports.publish = publish;
