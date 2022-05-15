import axios from 'axios';

export const getCategories=async()=>{
    return await axios.get(`/api/categories`);
}

export const getCategory=async(slug)=>{
    return await axios.get(`/api/category/${slug}`);
}

// export const getCategoryById=async(slug)=>{
//     return await axios.get(`${process.env.REACT_APP_BACKEND_API}/category/readbyid/${slug}`)
// }

export const createCategory=async(category,token)=>{
    return await axios.post(`/api/category`,{name:category},{
        headers:{
            token:token
        }
    });
}

export const upadteCategory=async(slug,category,token)=>{
    return await axios.put(`/api/category/${slug}`,{name:category},{
        headers:{
            token:token
        }
    });
}

export const removeCategory=async(slug,token)=>{
    // console.log('api token ',token);
    return await axios.delete(`/api/category/${slug}`,{
        headers:{
            token:token
        }
    })
}

export const getSubsByParent=async(_id)=>{
    return await axios.get(`/api/category/subs/${_id}`)
}

