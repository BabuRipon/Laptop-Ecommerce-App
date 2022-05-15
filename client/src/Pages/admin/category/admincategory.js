import React,{useState,useEffect} from 'react';
import AdminNav from '../../component/nav/adminav';
import {useSelector} from 'react-redux'
import {createCategory,upadteCategory,removeCategory,getCategories,getCategory} from '../../../functions/category'
import { toast } from 'react-toastify';
import { DeleteOutlined,EditOutlined} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import CategoryForm from '../../component/forms/categoryForm';
import LocalSearch from '../../component/forms/localSearch';



const AdminCategory=()=>{

    const [category,setCategory]=useState('');
    const [loading,setLoading]=useState(false);
    const [categories,setCategories]=useState([]);
    const {user}=useSelector(state=>state);
    const [keyword,setKeyword]=useState('');
    // console.log(user.token);

    useEffect(()=>{
        
        loadCategories();

        return ()=>{
            setCategories([]);
        }
    },[])

    

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
        createCategory(category,user.token)
        .then(res=>{
           setCategory('');
           setLoading(false)
           toast.success(`${res.data.name} is created`)
           loadCategories();
        })
        .catch(error=>{
            setLoading(false);
            toast.error(error.response.data);
        })
    }

    const deleteCategory=(slug)=>{
        // console.log('under delete category '+user.token);
        if(window.confirm(`are you sure you wanna delete ${slug}`)){setLoading(true);
        removeCategory(slug,user.token)
        .then(res=>{
        //    console.log(res.data);
           setLoading(false)
           toast.success(res.data.result);
           loadCategories();
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
                <h4>Create Category</h4>
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
                {categories.filter(c=>c.name.toLowerCase().includes(keyword)).map(data=>(
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
                         <Link to={`/admin/category/${data.slug}`}>    <EditOutlined className='text-warning btn'/>
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