// import { Button, message, Table } from "antd";
// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import moment from "moment";
// import { GetProducts } from "../../apicalls/products";
// import { SetLoader } from "../../redux/loaderSlice";
//
// function Products() {
//     const [products,setProducts] = React.useState([]);
//     const { user } = useSelector((state) => state.users);
//     const dispatch = useDispatch();
//
//     const getData = async () => {
//         try {
//             dispatch(SetLoader(true));
//             const response = await GetProducts({
//                                                    seller: user._id,
//                                                });
//             dispatch(SetLoader(false));
//             if (response.success) {
//                 setProducts(response.data);
//             }
//         } catch (error) {
//             dispatch(SetLoader(false));
//             message.error(error.message);
//         }
//     };
//
//     const columns = [
//         {
//             title: "Product",
//             dataIndex: "image",
//             render: (text, record) => {
//                 return (
//                     <img
//                         src={record?.images?.length > 0 ? record.images[0] : ""}
//                         alt=""
//                         className="w-20 h-20 object-cover rounded-md"
//                     />
//                 );
//             },
//         },
//         {
//             title: "Name",
//             dataIndex: "name",
//         },
//         {
//             title: "Price",
//             dataIndex: "price",
//         },
//         {
//             title: "Category",
//             dataIndex: "category",
//         },
//         {
//             title: "Age",
//             dataIndex: "age",
//         },
//         {
//             title: "Status",
//             dataIndex: "status",
//         },
//         {
//             title: "Added On",
//             dataIndex: "createdAt",
//             render: (text, record) =>
//                 moment(record.createdAt).format("DD-MM-YYYY hh:mm A"),
//         },
//         {
//             title: "Action",
//             dataIndex: "action",
//             render: (text, record) => {
//                 return (
//                     <div className="flex gap-5 items-center">
//
//                     </div>
//                 );
//             },
//         },
//     ];
//
//     useEffect(() => {
//         getData();
//     }, []);
//     return (
//         <div>
//             <Table columns={columns} dataSource={products} />
//         </div>
//     );
// }
//
// export default Products;