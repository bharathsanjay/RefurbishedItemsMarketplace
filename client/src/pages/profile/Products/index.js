import React, { useEffect } from 'react'
import {Button, Table} from 'antd'
import { useDispatch, useSelector } from "react-redux";
import { DeleteProduct, GetProducts } from "../../../apicalls/products";
import ProductForm from "./productsForm";
import { SetLoader } from "../../../redux/loadersSlice";

function Products()
{   const [products, setProducts] = React.useState([]);
    const [showProductForm,setShowProductForm] = React.useState(false);
    const dispatch = useDispatch();


    const getData = async () => {
        try {
          dispatch(SetLoader(true));
          const response = await GetProducts();
          dispatch(SetLoader(false));
          if (response.success) {
            setProducts(response.products);
          }
        } catch (error) {
          dispatch(SetLoader(false));
          message.error(error.message);
        }
      };







    const columns  = [
        {
            title : "Name",
            dataIndex : "name",
        },
        {
            title : "Description",
            dataIndex : "description",
        },
        {
            title: "Price",
            dataIndex: "price",
          },
          {
            title: "Category",
            dataIndex: "category",
          },
          {
            title: "Age",
            dataIndex: "age",
          },
          {
            title: "Status",
            dataIndex: "status",
          },
          {
            title : "Action",
            dataIndex : "action",
            render : (text,record) => {
                return (
                    <div className="flex gap-5 items-center">
                      <i
                        className="ri-delete-bin-line"
                        onClick={() => {
                          deleteProduct(record._id);
                        }}
                      ></i>
                      <i
                        className="ri-pencil-line"
                        onClick={() => {
                          setSelectedProduct(record);
                          setShowProductForm(true);
                        }}
                      ></i>
          
                      <span
                        className="underline cursor-pointer"
                        onClick={() => {
                          setSelectedProduct(record);
                          setShowBids(true);
                        }}
                      >
                        Show Bids
                      </span>
                    </div>
                  );


            }
          }
    ];
    useEffect(() => {
        getData();
      }, []);

    return (<div><div className ="flex justify-end mb-2" >
    <Button type ='default' onClick ={() => setShowProductForm(true)}>
        Add Product
    </Button>
    </div>
    <Table columns={columns} dataSource={products} />

        {showProductForm && <ProductForm showProductForm = {showProductForm} setShowProductForm={setShowProductForm}/>}
    </div>)
}

export default Products;