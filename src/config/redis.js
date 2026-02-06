require('dotenv').config();
const Redis = require('ioredis');

const redis = new Redis(process.env.REDIS_URL);

//successful connection
redis.on('connect', ()=>{console.log('Redis connected')});

//redis errors
redis.on('error', (err)=>{console.log('redis error', err.message)});

module.exports = redis;