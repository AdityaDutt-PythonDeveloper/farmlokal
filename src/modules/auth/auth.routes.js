const express = require('express');
const { getAccessToken } = require('./oauth.service');

const router = express.Router();

router.get('/token', async(req, res)=>{
    try{
        const token = await getAccessToken();
        res.json({token});
    }catch(err){
        res.status(500).send(err);
    }
});

module.exports = router;