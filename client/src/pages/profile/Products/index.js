import React from 'react'
import {Button} from 'antd'
import ProductForm from "./productsForm";

function Products()
{   const [showProductForm,setShowProductForm] = React.useState(false);
    return (<div><div className ="flex justify-end" >
    <Button type ='default' onClick ={() => setShowProductForm(true)}>
        Add Product
    </Button>
    </div>
        {showProductForm && <ProductForm showProductForm = {showProductForm} setShowProductForm={setShowProductForm}/>}
    </div>)
}

export default Products;