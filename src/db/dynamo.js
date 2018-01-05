const AWS = require('aws-sdk');
const uuid = require('uuid');
AWS.config.update({region:'us-west-2'});
const documentClient = new AWS.DynamoDB.DocumentClient();

const getPosts = async (id) => {
    
    if (!id || id === "*") {
        const params = {
            TableName: 'posts'
        };
        const data = await documentClient.scan(params).promise();
        return data;
    } else {
        const params = {
            TableName: 'posts',
            KeyConditionExpression: "#id = :id",
            ExpressionAttributeNames:{
                "#id": "id"
            },
            ExpressionAttributeValues: {
                ":id":id
            }
        };
        const data = await documentClient.query(params).promise();
        return data;
    }    
};

const savePost = async (text, voice) => {    
    const id = uuid.v4();
    const item = {
        "TableName": "posts",
        "Item" : {
            "id": id,
            "text": text,
            "voice": voice,
            "status": "PROCESSING"
        }
    };    
    const newPost = await documentClient.put(item).promise();
    return item.Item;
};

const updatePost = async ({id, url}) => {
    const params = {
        TableName: "posts",
        Key: {id},
        UpdateExpression: "set #status = :newStatus, #url = :url",
        
        ExpressionAttributeValues: {
            ":url": url,
            ":newStatus": "DONE"
        },
        ExpressionAttributeNames:{
            "#url": "url",
            "#status": "status"
        },
        "ReturnValues": "ALL_NEW"
    }
    return await documentClient.update(params).promise();
};

module.exports.getPosts = getPosts;
module.exports.savePost = savePost;

