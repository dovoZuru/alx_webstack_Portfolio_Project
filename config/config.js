const mongoose = require('mongoose');
const redis = require('redis');

// MongoDB setup
const mongooseUri = "mongodb+srv://PaulOkoli:ejvNC6FxvfahpbqC@bank-api.bxv84lt.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongooseUri, { useNewUrlParser: true, useUnifiedTopology: true, }).then(()=>{
  console.log("mongodb is connected");
}).catch((error)=>{
  console.log("mondb not connected");
  console.log(error);
});

// Redis setup
const redisClient = redis.createClient({
    password: 'TzJju1ruY7kbA7QZ2jFhPhxAO3LCAP4c',
    socket: {
        host: 'redis-13985.c61.us-east-1-3.ec2.cloud.redislabs.com',
        port: 13985
    }
});
  
(async () => {
    await redisClient.connect();
})();
  
console.log("Connecting to the Redis");
  
redisClient.on("ready", () => {
    console.log("Connected!");
});
  
redisClient.on("error", (err) => {
    console.log(err, "Error in the Connection");
});

module.exports = redisClient;
