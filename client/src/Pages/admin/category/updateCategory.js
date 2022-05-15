import React,{useState,useEffect} from 'react';
import AdminNav from '../../component/nav/adminav';
import {useSelector} from 'react-redux'
import {upadteCategory,getCategory} from '../../../functions/category'
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import CategoryForm from '../../component/forms/categoryForm';




const UpdateCategory=({match,history})=>{

    const [category,setCategory]=useState('');
    const [loading,setLoading]=useState(false);
    const {user}=useSelector(state=>state);
    const {slug}=useParams();
    // console.log(user.token);

    useEffect(()=>{
        // console.log(match.params.slug);
        loadCategory();
    },[])

    const loadCategory=()=>{
        setLoading(true)
        getCategory(slug)
        .then(res=>{
            // console.log(res.data);
            setCategory(res.data.categoryResult.name);
            setLoading(false);
        })
        .catch(error=>{
            console.log(error.response);
            setLoading(false);
        })
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        setLoading(true)
        upadteCategory(slug,category,user.token)
        .then(res=>{
           setCategory('');
           setLoading(false)
           toast.success(`${slug} is updated`)
           history.push('/admin/category');
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
                    :<h4>Update Category</h4>
                }
                <CategoryForm 
                category={category}
                setCategory={setCategory}
                handleSubmit={handleSubmit}
                />
          </div>
      </div>
   </div>
    )
}

export default UpdateCategory;