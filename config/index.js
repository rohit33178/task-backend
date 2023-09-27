
const MONGO_URI = process.env.NODE_ENV ? process.env.MONGODB_URI : "mongodb://127.0.0.1:27017/myTestDB";

module.exports = MONGO_URI 
