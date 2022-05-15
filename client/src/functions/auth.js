import axios from 'axios';

export const createOrUpdateUser=async (idToken)=>{
    return await axios.post(`/api/create-or-update-user`,{},{
        headers:{
            token:idToken.token,
        }
    })
}

export const currentUser=async(idToken)=>{
    return await axios.post(`/api/current-user`,{},{
        headers:{
            token:idToken.token,
        }
    })
}

export const currentAdmin=async(token)=>{
    return await axios.post(`/api/current-admin`,{},{
        headers:{
            token:token,
        }
    })
}