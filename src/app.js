const express = require('express');
const cors = require('cors');
require('./config/redis');
const authRoutes = require('./modules/auth/auth.routes');
const productRoutes = require('./modules/products/product.routes');
const webhookRoutes = require('./modules/external/webhook');
const rateLimiter = require('./middlewares/ratelimier');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/', webhookRoutes);
app.use(rateLimiter);

app.post('/mock/oauth/token', (req, res)=>{
    res.json(
        {
            access_token:"mock_access_token_123",
            expires_in: 3600
        }
    )
})
app.get('/health', (req, res)=>{
    res.json(
        {
            status: "OK"
        }
    );
});

module.exports = app;