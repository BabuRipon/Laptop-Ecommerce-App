import React,{useState,useEffect} from 'react';
import AdminNav from '../../component/nav/adminav';
import {useSelector} from 'react-redux'
import { toast } from 'react-toastify';
import ProductUpdateForm from '../../component/forms/productUpdateForm';
import {getProductBySlug,updateProduct}from '../../../functions/product'
import {getCategories,getSubsByParent}from '../../../functions/category'
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



const Productupdate=({match,history})=>{

    const [values,setValues]=useState(initialState);
    const {user}=useSelector(state=>state);
    const {slug}=match.params;
    const [subs,setSubs]=useState([]);

    useEffect(()=>{
       loadProduct();
       loadCategories();
    },[])

    const loadProduct=()=>{

        getProductBySlug(slug)
        .then(res=>{
            setValues(values=>({...values,...res.data[0]}));
            
            getSubsByParent(res.data[0].category)
            .then(res=>{
                // console.log(res.data);
                setSubs(res.data);
            })
            .catch(err=>{
                console.log(err);
            })

        })
        .catch(err=>{
            console.log(err);
        })
    }

    const loadCategories=()=>{
        getCategories()
        .then(res=>{
        //    console.log(res.data);
          setValues(values=>({...values,categories:res.data}));
        })
        .catch(err=>{
            console.log(err);
        })
    }
  
    const onSubmitHandler=(e)=>{
        e.preventDefault();
        //todo
        updateProduct(slug,values,user.token)
        .then(res=>{
           
            // console.log(res.data);
            toast.success('product update successfully.')
            
            history.push('/admin/products');
         
            
        })
        .catch(err=>{
            console.log(err);
        })
    }

    const onChangeHandler=(e)=>{

         setValues({...values,[e.target.name]:e.target.value})
    }

    const onCategoryChangeHandler=async(e)=>{
        e.preventDefault();
        setValues({...values,[e.target.name]:e.target.value,subCategory:[]})
        getSubsByParent(e.target.value)
        .then(res=>{
            setSubs(res.data);
        })
        .catch(err=>{
            console.log(err);
        });
    
        setSubs([]);
    }

    console.log('product update ',values);


    return(
      <div className="container-fluid">
      <div className="row">
          <div className="col-md-2 ">
                <AdminNav />
          </div>
          <div className="col">
                <br/>
                <h4>Product Update</h4>
                <hr />
                <UploadImageForm 
                values={values}
                setValues={setValues}
                />
                <br />
                <ProductUpdateForm 
                onSubmitHandler={onSubmitHandler}
                onChangeHandler={onChangeHandler}
                values={values}
                subs={subs}
                setValues={setValues}
                onCategoryChangeHandler={onCategoryChangeHandler}
                />
          </div>
      </div>
   </div>
    )
}

export default Productupdate;