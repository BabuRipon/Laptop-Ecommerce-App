import axios from 'axios';

export const getSubCategories=async()=>{
    return await axios.get(`/api/subs`);
}

export const getSubCategory=async(slug)=>{
    return await axios.get(`/api/sub/${slug}`);
}

export const createSubCategory=async(category,parent,token)=>{
    return await axios.post(`/api/sub`,{name:category,parent},{
        headers:{
            token:token
        }
    });
}

export const upadteSubCategory=async(slug,category,parent,token)=>{
    return await axios.put(`/api/sub/${slug}`,{name:category,parent},{
        headers:{
            token:token
        }
    });
}

export const removeSubCategory=async(slug,token)=>{
    // console.log('api token ',token);
    return await axios.delete(`/api/sub/${slug}`,{
        headers:{
            token:token
        }
    })
}

