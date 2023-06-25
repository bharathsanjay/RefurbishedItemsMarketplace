const router = require("express").Router();
const axios = require("axios");




router.post("/fetch-products", async (req, res) => {
    console.log(req)
    axios.get(`https://fakestoreapi.com/products/category/${req.body.category}`)
    .then(response => {
      console.log(response.data);
      res.send({success: true,
      data: response.data});
    })
    .catch(error => {
      console.log(error);
    });
  
      
  });
  
  
  router.get("/fetch-by-id/:id", async (req, res) => {
    axios.get(`https://fakestoreapi.com/products/${req.params.id}`)
    .then(response => {
      console.log(response.data);
      res.send({success: true,
      data: response.data});
    })
    .catch(error => {
      console.log(error);
    });
  });


  module.exports = router;