import React,{useState,useEffect} from 'react';
import AdminNav from '../../component/nav/adminav';
import {useSelector} from 'react-redux'
import {createSubCategory,getSubCategories,removeSubCategory} from '../../../functions/subCategory'
import {getCategories}from '../../../functions/category'
import { toast } from 'react-toastify';
import { DeleteOutlined,EditOutlined} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import CategoryForm from '../../component/forms/categoryForm';
import LocalSearch from '../../component/forms/localSearch';



const AdminCategory=()=>{

    const [category,setCategory]=useState('');
    const [categories,setCategories]=useState([]);
    const [loading,setLoading]=useState(false);
    const [subCategories,setSubCategories]=useState([]);
    const {user}=useSelector(state=>state);
    const [keyword,setKeyword]=useState('');
    const [parent,setParent]=useState('');
    // console.log(user.token);

    useEffect(()=>{
        
        loadCategories();
        loadSubCategories();

    },[])

    

    const loadSubCategories=()=>{
        // console.log('loadcategory')
        getSubCategories()
        .then(res=>{
            console.log(res.data);
            setSubCategories(res.data);
        })
        .catch(error=>{
            console.log(error.response);
        })
    }

    const loadCategories=()=>{
      // console.log('loadcategory')
      getCategories()
      .then(res=>{
          console.log(res.data);
          setCategories(res.data);
      })
      .catch(error=>{
          console.log(error.response);
      })
  }


    const handleSubmit=(e)=>{
        e.preventDefault();
        setLoading(true)
        createSubCategory(category,parent,user.token)
        .then(res=>{
           setCategory('');
           setLoading(false)
           toast.success(`${res.data.name} is created`)
           loadSubCategories();
        })
        .catch(error=>{
            setLoading(false);
            toast.error(error.response.data);
        })
    }

    const deleteCategory=(slug)=>{
        // console.log('under delete category '+user.token);
        if(window.confirm(`are you sure you wanna delete ${slug}`)){setLoading(true);
        removeSubCategory(slug,user.token)
        .then(res=>{
        //    console.log(res.data);
           setLoading(false)
           toast.success(res.data.result);
           loadSubCategories();
        })
        .catch(error=>{
            setLoading(false);
            toast.error(error);
        });}
    }



    return(
      <div className="container-fluid">
      <div className="row">
          <div className="col-md-2 ">
                <AdminNav />
          </div>
          <div className="col mt-5">
                <h4>Create Sub Category</h4>
                <select className="form-control pl-2" 
                onChange={e=>setParent(e.target.value)}
                >
                    <option>please select one parent</option>
                    {categories.map(c=>(
                      <option  value={c._id} key={c._id}>{c.name}</option>
                    ))}
                </select>
                
                <br />
                <CategoryForm 
                category={category}
                setCategory={setCategory}
                handleSubmit={handleSubmit}
                />
                <hr />
                <LocalSearch
                  keyword={keyword}
                  setKeyword={setKeyword}
                />
                {subCategories.filter(c=>c.name.toLowerCase().includes(keyword)).map(data=>(
                    <div 
                    key={data._id}
                    className="alert alert-secondary"
                    >
                      {data.name}
                      <span 
                      className="float-right"
                      onClick={()=>deleteCategory(data.slug)}
                      >
                          <DeleteOutlined className="text-danger btn" />
                      </span>
                      <span className="float-right">
                         <Link to={`/admin/sub-category/sub/${data.slug}`}>    <EditOutlined className='text-warning btn'/>
                         </Link>
                      </span>
                    </div>
                ))}
          </div>
      </div>
   </div>
    )
}

export default AdminCategory;