// import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { SetLoader } from "../../redux/loaderSlice";
// import { Divider, message } from "antd";
// import { GetProducts } from "../../apicalls/products";
// import { useNavigate } from "react-router-dom";
// import Filters from "./Filters";

// function Home() {
//   const [showFilters, setShowFilters] = React.useState(true);
//   const [products, setProducts] = React.useState([]);
//   const [filters, setFilters] = React.useState({
//     status: "approved",
//     category : [],
//     age : []
//   });
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.users);

 
//   const getData = async () => {
//     try {
//       dispatch(SetLoader(true));
//       const response = await GetProducts(filters);
//       dispatch(SetLoader(false));
//       if (response.success) {
//         setProducts(response.data);
//       }
//     } catch (error) {
//       dispatch(SetLoader(false));
//       message.error(error.message);
//     }
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   useEffect(() => {
//     getData();
//   }, [filters]);


//   return (
//     <div className="flex gap-5">
//       { showFilters && <Filters
//        showFilters={showFilters}
//        setShowFilters={setShowFilters}
//        filters={filters}
//        setFilters={setFilters}
//        />}
//       <div className="flex flex-col gap-5">
//         <div className="flex gap-5 items-center ">
//         {!showFilters && (
//             <i
//               className="ri-equalizer-line text-xl cursor-pointer"
//               onClick={() => setShowFilters(!showFilters)}
//             ></i>
//           )}
//           <input
//             type="text"
//             placeholder="Search Products  here..."
//             className="border border-gray-300 rounded border-solid px-2 py-1 h-14 w-full"
//           />
//         </div>
//       <div className= {`
//       grid gap-5 ${showFilters ? "grid-cols-4" : "grid-cols-5"}
//       `}>
//         {products?.map((product) => {
//           return (
//             <div className="border border-gray-300 rounded border-solid flex flex-col gap-2 pb-2 cursor-pointer"
//             key={product._id}
//             onClick={() => navigate(`/product/${product._id}`)}

//             >
//               <img
//                 src={product.images[0]}
//                 className="w-full h-52 p-2 rounded-md object-cover"
//                 alt=""
//               />
             
//               <div className="px-2 flex flex-col">
//               <h1 className="text-lg font-semibold">{product.name}</h1>
//               <p className="text-sm ">{product.description}</p>
//               <Divider/>
//               <span className="text-xl font-semibold text-green-700">
//                 ${product.price}
//               </span>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//       </div>
//     </div>
//   );
// }

// export default Home;
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetProducts, GetStoreProducts } from "../../apicalls/products";
import { SetLoader } from "../../redux/loaderSlice";
import { message } from "antd";
import Divider from "../../components/Divider";
import { useNavigate } from "react-router-dom";
import Filters from "./Filters";
import moment from "moment";
import { GetProductsSearch } from "../../apicalls/search";

function Home() {
  const [showFilters, setShowFilters] = React.useState(true);
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [products, setProducts] = React.useState([]);
  const [searchproducts, setsearchproducts] = React.useState([]);
  const [category,searchCategory] = React.useState('');
  const [filters, setFilters] = React.useState({
    status: "approved",
    category: [],
    age: [],
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetProducts(filters);
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
  }, [filters]);

  

  const handleSearch = async () => {
    console.log(category);
    const storeData = await GetProductsSearch({ category: category });
    console.log("sd" + storeData.data)
    setsearchproducts(storeData.data);
    console.log(searchproducts); // Note: This may not reflect the updated state immediately
    console.log(storeData);
    setShowDropdown(true)
  };
  useEffect(()=>{handleSearch()},[category]);
  
  return (
    <div className="flex gap-5">
      {showFilters && (
        <Filters
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          filters={filters}
          setFilters={setFilters}
        />
      )}
      <div className="flex flex-col gap-5 w-full">
        <div className="flex gap-5 items-center">
          {!showFilters && (
            <i
              className="ri-equalizer-line text-xl cursor-pointer"
              onClick={() => setShowFilters(!showFilters)}
            ></i>
          )}
          <input
  type="text"
  placeholder="Search Products here..."
 
  className="border border-gray-300 rounded border-solid px-2 py-1 h-14 w-full"
  value={category}
  onChange={(e) => {
    searchCategory(e.target.value);
     // Call handleSearch on text change
  }}
/>
{console.log("186")}
{console.log(category)}
{console.log(showDropdown)}
{console.log(searchproducts)}


<div className="dropdown">
  
{category !== "" && showDropdown  && searchproducts.length > 0 && (
  <div className="dropdown-content">
    {console.log(searchproducts)}
    {searchproducts.map((product) => (
      <div
        key={product.id}
        className="dropdown-item"
        onClick={() => navigate(`/product/${product._id}`)}
      >
        {product.title}
      </div>
    ))}
  </div>
)}
        </div>
        </div>
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
                onClick={() => navigate(`/product/${product._id}`)}
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
  );
}

export default Home;