import axios from 'axios';

export const uploadImage=async(image,token)=>{
    return await axios.post(`/api/uploadImage`,{image},{
        headers:{
            token:token
        }
    })
}

export const removeProduct=async(public_id,token)=>{

    return await axios.post(`/api/removeImage`,{public_id},{
        headers:{
            token:token
        }
    })
}