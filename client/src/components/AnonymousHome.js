import React, {useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {SetLoader} from "../redux/loaderSlice";
import {GetProducts} from "../apicalls/products";
import {message} from "antd";
import {GetProductsSearch} from "../apicalls/search";
import Filters from "../pages/Home/Filters";
import Divider from "./Divider";
function AnonymousHome()
{
    const [showFilters, setShowFilters] = React.useState(true);
    const [products, setProducts] = React.useState([]);
    const [searchproducts, setsearchproducts] = React.useState([]);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.users);
    const getData = async () => {
        try {
            dispatch(SetLoader(true));
            const response = await GetProducts();
            dispatch(SetLoader(false));
            if (response.success) {
                setProducts(response.data);
            }
        } catch (error) {
            dispatch(SetLoader(false));
            message.error(error.message);
        }
    };



    useEffect(() => {
        getData();
    }, []);


    return (
        <div>
            <div className="flex justify-between item-center bg-primary p-5">
                <h1 className="text-2x1 text-white cursor-pointer" onClick={()=> navigate("/")}>Market Place</h1>
                <div className="py-2 px-5 rounded flex gap-5">
                <span className="text-white" onClick={()=> navigate("/register")}>Signup</span>
                <i className="ri-login-box-line text-white" onClick={()=> navigate("/login")}></i>
                    </div>
            </div>


            <div className="flex gap-5">
                <div className="flex flex-col gap-5 w-full">
                    <div
                        className={`
        grid gap-5 ${showFilters ? "grid-cols-4" : "grid-cols-5"}
      `}
                    >
                        {products?.map((product) => {
                            return (
                                <div
                                    className="border border-gray-300 rounded border-solid flex flex-col gap-2 pb-2 cursor-pointer"
                                    key={product._id}
                                    onClick={() => navigate(`/product-ay/${product._id}`)}
                                >
                                    <img
                                        src={product.images[0]}
                                        className="w-full h-52 p-2 rounded-md object-cover"
                                        alt=""
                                    />
                                    <div className="px-2 flex flex-col">
                                        <h1 className="text-lg font-semibold">{product.name}</h1>
                                        <p className="text-sm">
                                            {product.age} {' '}
                                            {product.age === 1 ? " year" : " years"} {' '}
                                            old
                                        </p>
                                        <Divider />
                                        <span className="text-xl font-semibold text-green-700">
                    $ {product.price}
                  </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>




            </div>
    );


}
export default AnonymousHome;