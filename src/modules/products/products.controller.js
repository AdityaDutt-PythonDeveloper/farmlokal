const redis = require('../../config/redis');
const { getProducts } = require('./products.service');

async function listproducts(req, res){
    const cacheky = `products:${JSON.stringify(req.query)}`;

    const cached = await redis.get(cacheky);
    if(cached) return res.json(JSON.parse(cached));

    const products = await  getProducts(req.query);

    await redis.set(cachekey, JSON.stringify(products), "EX", 60);
    res.json(products);
}

module.exports = { listproducts };

