const mongoose = require('mongoose');

console.log("uerl" + process.env.mongo_url)
mongoose.connect(process.env.mongo_url)
.then(() => {
    console.log('MongoDB connection successful')
  })
  .catch(error => {
    console.error('MongoDB connection error:', error)
  });

const connection = mongoose.connection;


connection.on('connected', () =>{
    console.log('mongo connection successful');
})

connection.on('error', () =>{
    console.log('mongo connection failed');
})

module.exports = connection;
