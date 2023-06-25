const express = require('express');
const app = express();
app.use(express.json());
require('dotenv').config();
const dbConfig = require('./config/dbConfig');
const port = process.env.PORT || 5050;

const usersRoute = require('./routes/usersRoute');
const productsRoute = require('./routes/productsRoute');
const searchRoute = require('./routes/searchRoute')
const bidsRoute = require('./routes/bidsRoues')
const notificationsRoute = require('./routes/notificationRoutes')

app.use('/api/users',usersRoute);
app.use('/api/products',productsRoute);
app.use('/api/search',searchRoute);
app.use('/api/bids',bidsRoute);
app.use('/api/notifications',notificationsRoute);

app.listen(port, () => console.log(`node running on ${port}`));

