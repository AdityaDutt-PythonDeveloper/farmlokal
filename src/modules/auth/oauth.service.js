require('dotenv').config();
const axios = require('axios');
const redis = require('../../config/redis');

const TOKEN_KEY = "oauth:access_token";
const LOCK_KEY = "oauth:lock";

async function getAccessToken(){
    const cachedToken = await redis.get(TOKEN_KEY);
    if(cachedToken) return cachedToken;

    const lock = await redis.set(LOCK_KEY, '1', 'NX', 'EX', 10);
    if(!lock){
        await new Promise((resolve)=> setTimeout(resolve, 500));
        const token = await redis.get(TOKEN_KEY);
        if(token) return token;
        throw new Error("Token refresh in progress");
    }

    try{
        const response = await axios.post(
            process.env.OAUTH_TOKEN_URL,
            {
                grant_type: "client_credentials",
                client_id : process.env.OAUTH_CLIENT_ID,
                client_secret : process.env.OAUTH_CLIENT_SECRET,
            },
            {timeout : 3000}
        );
        const { access_token, expires_in } = response.data;

        await redis.set(
            TOKEN_KEY,
            access_token,
            "EX",
            expires_in-30
        );
        return access_token;
    }finally{
        await redis.del(LOCK_KEY);
    }
}

module.exports = { getAccessToken };