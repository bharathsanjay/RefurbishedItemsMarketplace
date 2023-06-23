import { Upload, Button, message } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { EditProduct, UploadProductImage } from "../../../apicalls/products";
import { SetLoader } from "../../../redux/loaderSlice";

function Images({ selectedProduct, setShowProductForm, getData }) {

  const [showPreview = false, setShowPreview] = React.useState(true);

  const [images = [], setImages] = React.useState(selectedProduct.images);
 
  const [file = null, setFile] = React.useState(null);
  const dispatch = useDispatch();

  const upload = async () => {
    console.log(file)
    try {
      dispatch(SetLoader(true));
      const formData = new FormData();
      formData.append("file", file);
      formData.append("productId", selectedProduct._id);
      const response = await UploadProductImage(formData);
      dispatch(SetLoader(false));

      if (response.success) {
        message.success(response.message);
        setImages([...images, response.data]);
        setShowPreview(false);
        setFile(null)
        getData();
       
      } else {
        console.log("img 27" + response)
        message.error(response.message);
      }

    } catch (error) {
      console.log("img 32" + error)
      dispatch(SetLoader(false));
      message.error(error.message);

      
    }
  }



  return (
    <div>
      <Upload
        listType="picture"
        beforeUpload={() => false}
        onChange={(info) => {
          setFile(info.file);
          setShowPreview(true);
        }}
        showUploadList={showPreview}
      >

<div className="flex gap-5 mb-5">
        {images.map((image) => {
          return (
            <div className="flex gap-2 border border-solid border-gray-500 rounded p-2 items-end">
              <img className="h-20 w-20 object-cover" src={image} alt="" />
              <i
                className="ri-delete-bin-line"
                onClick={() => {}}
              ></i>
            </div>
          );
        })}
      </div>




        <Button type="dashed">Upload Image</Button>
      </Upload>
      <div className="flex justify-end gap-5 mt-5">
      <Button
          type="default"
          onClick={() => {
            setShowProductForm(false);
          }}
        >
          Cancel
        </Button>
        <Button type="primary" disabled={!file} onClick={upload}>
          Upload
        </Button>


      </div>
    </div>
  );
}

export default Images;
