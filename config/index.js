const MONGO_URI = process.env.ENV 
    ? `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.on3qis6.mongodb.net/` 
    : "mongodb://127.0.0.1:27017/myTestDB";

module.exports = MONGO_URI 
