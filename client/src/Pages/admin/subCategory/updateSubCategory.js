import React,{useState,useEffect} from 'react';
import AdminNav from '../../component/nav/adminav';
import {useSelector} from 'react-redux'
import {getSubCategory,upadteSubCategory} from '../../../functions/subCategory'
import {getCategories}from '../../../functions/category'
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import CategoryForm from '../../component/forms/categoryForm';
import { CheckOutlined} from '@ant-design/icons';




const UpdateSubCategory=({match,history})=>{

    const [subCategory,setSubCategory]=useState('');
    const [categories,setCategories]=useState([]);
    const [loading,setLoading]=useState(false);
    const [parent,setParent]=useState('');
    const {user}=useSelector(state=>state);
    const {slug}=useParams();
    // console.log(user.token);

    useEffect(()=>{
        // console.log(match.params.slug);
        loadSubCategory();
        loadCategories();
    },[])

    const loadSubCategory=()=>{
        setLoading(true)
        getSubCategory(slug)
        .then(res=>{
            console.log(res.data);
            setSubCategory(res.data.categorySubResult.name);
            setParent(res.data.categorySubResult.parent);
            setLoading(false);
        })
        .catch(error=>{
            console.log(error.response);
            setLoading(false);
        })
    }


    const loadCategories=()=>{
        // console.log('loadcategory')
        getCategories()
        .then(res=>{
            // console.log(res.data);
            setCategories(res.data);
        })
        .catch(error=>{
            console.log(error.response);
        })
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        setLoading(true)
        upadteSubCategory(slug,subCategory,parent,user.token)
        .then(res=>{
           setSubCategory('');
           setLoading(false)
           toast.success(`${slug} is updated`)
           history.push('/admin/sub-category/sub');
        })
        .catch(error=>{
            setLoading(false);
            toast.error(error.response.data);
        })
    }

    
    return(
      <div className="container-fluid">
      <div className="row">
          <div className="col-md-2 ">
                <AdminNav />
          </div>
          <div className="col mt-5">
                {
                    loading?
                    <h4 className="text-primary">Loading...</h4>
                    :<h4>Update Sub Category</h4>
                }

             <select className="form-control pl-2" 
                value={parent}
                onChange={e=>setParent(e.target.value)}
                >
                    <option>please select one parent</option>
                    {categories.map(c=>(
                      <option  value={c._id} key={c._id} selected={parent===c._id} >{c.name}</option>
                    ))}
                </select>
               <br />
               
                <CategoryForm 
                category={subCategory}
                setCategory={setSubCategory}
                handleSubmit={handleSubmit}
                />
          </div>
      </div>
   </div>
    )
}

export default UpdateSubCategory;