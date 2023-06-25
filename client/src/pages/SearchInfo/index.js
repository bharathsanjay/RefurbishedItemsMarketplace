import React from 'react'
import { GetProductById, GetProducts } from '../../apicalls/products';
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SetLoader } from "../../redux/loaderSlice";
import { Divider, message } from "antd";
import moment from 'moment'

import { useNavigate, useParams } from "react-router-dom";
import { GetFetchById } from '../../apicalls/search';

function SearchInfo() {
    const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);
    const [product, setProduct] = React.useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();

    const getData = async () => {
      try {
        dispatch(SetLoader(true));
        const response = await GetFetchById(id);
        dispatch(SetLoader(false));
        if (response.success) {
          setProduct(response.data)
        }
      } catch (error) {
        dispatch(SetLoader(false));
        message.error(error.message);
      }
    };
  
    React.useEffect(() => {
      getData();
    }, []);
   
  return (
    product && 
    <div>
      <div className="grid grid-cols-2 gap-5 mt-5">
      <div className="flex flex-col gap-5">
      <img
              src={product.image}
              alt=""
              className="w-full h-96 object-cover rounded-md"
            />
            
            <Divider/>

          
        </div>


        <div className="flex flex-col gap-3">
            <div>
              <h1 className="text-2xl font-semibold text-orange-900">
                {product.title}
              </h1>
              <span>{product.description}</span>
            </div>
            <Divider/>

            <div className="flex flex-col">
              <h1 className="text-2xl font-semibold text-orange-900">
                Product Details
              </h1>
              <div className="flex justify-between mt-2">
                <span>Price</span>
                <span>$ {product.price}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Category</span>
                <span className="uppercase">{product.category}</span>
              </div>
              
             
            </div>
            <Divider/>
            



            </div>



      </div>
    </div>
  )
}

export default SearchInfo