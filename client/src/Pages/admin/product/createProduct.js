import React,{useState,useEffect} from 'react';
import AdminNav from '../../component/nav/adminav';
import {createProduct} from '../../../functions/product';
import {getCategories,getSubsByParent}from '../../../functions/category'
import {useSelector} from 'react-redux';
import ProductForm from '../../component/forms/productForm';
import UploadImageForm from '../../component/forms/imageForm';


const initialState={
    title:'',
    description:'',
    price:'',
    category:'',
    categories:[],
    subCategory:[],
    quantity:'',
    images:[],
    shipping:'',
    color:'',
    brand:'',
    colors:["Black","Brown","Silver","White","Blue"],
    brands:["Apple","Lenovo","Dell","Samsung","Asus","Microsoft"]
}

const ProductCreate=()=>{

//state
const [values,setValues]=useState(initialState);
const [subs,setSubs]=useState([]);
const {user}=useSelector(state=>state);

// destucture values
const {categories,category}=values;

useEffect(()=>{
   loadCategories();
},[])

const loadCategories=()=>{
    // console.log('loadcategory')
    getCategories()
    .then(res=>{
        setValues({...values,categories:res.data});
    })
    .catch(error=>{
        console.log(error.response);
    })
}

const onCategoryChangeHandler=async(e)=>{
    e.preventDefault();
    setValues({...values,[e.target.name]:e.target.value})
    getSubsByParent(e.target.value)
    .then(res=>{
        // console.log(res.data);
        setSubs(res.data);
    })
    .catch(err=>{
        console.log(err);
    });

    setSubs([]);
}


const onChangeHandler=(e)=>{
   setValues({...values,[e.target.name]:e.target.value});
}

const onSubmitHandler=async (e)=>{
    e.preventDefault();
    createProduct(values,user.token)
    .then(res=>{
        // console.log(res.data);
        window.alert(`${res.data.title} is created`);
        window.location.reload();
    })
    .catch(error=>{
        console.log(error)
    });
    
}

console.log(values)


    return(
        <div className="container-fluid">
            <div className="row mt-2">
                <div className="col-md-2 ">
                        <AdminNav />
                </div>
                <div className="mt-2 col-md-8 offset-md-1">
                   <h4>Product Create</h4>
                   <hr />
                   <UploadImageForm 
                    values={values}
                    setValues={setValues}
                   />
                   <br />
                   <ProductForm 
                   setValues={setValues}
                   values={values}
                   subs={subs}
                   onSubmitHandler={onSubmitHandler}
                   onChangeHandler={onChangeHandler}
                   onCategoryChangeHandler={onCategoryChangeHandler}
                   />
                </div>
            </div>
        </div>
    )
}

export default ProductCreate;