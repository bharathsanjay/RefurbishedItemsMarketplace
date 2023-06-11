const mongoose = require('mongoose');


mongoose.connect(process.env.mongo_url)

const connection = mongoose.connection;

connection.on('connected', () =>{
    console.log('mongo connection successful');
})

connection.on('error', () =>{
    console.log('mongo connection failed');
})

module.exports = connection;
