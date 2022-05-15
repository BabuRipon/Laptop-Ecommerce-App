import React ,{useState,useEffect}from 'react';
import { CloudUploadOutlined} from '@ant-design/icons';
import Resizer from "react-image-file-resizer";
import {uploadImage , removeProduct} from '../../../functions/cloudinary'
import {useSelector} from 'react-redux';
import { Avatar, Badge } from 'antd';

const UploadImageForm=({values,setValues})=>{

    const {user}=useSelector(state=>state);
    const [imgDetails,setImgDetails]=useState([]);

    useEffect(()=>{
        console.log('image folder ',values);
        setImgDetails(values.images);
    },[values.images])

    const fileUploadAndResize=(e)=>{
        const files=e.target.files;
        // const fileResponseUrl=[];
        // const imageResponseDetails=[];

        if(files){
            for(let i=0;i<files.length;i++){
            
            //resize start
                Resizer.imageFileResizer(
                    files[i], 720,720,'JPEG',100,0,
                    (uri)=>{
                        
                        uploadImage(uri,user.token)
                       .then((res)=>{
                        //    console.log(res.data);
                        //    fileResponseUrl.push(res.data.url);
                        //    imageResponseDetails.push(res.data);
                           setValues(values=>({...values,images:[...values.images,res.data]}));
                           setImgDetails(pre=>[...pre,res.data]);
                       })
                       .catch(err=>{
                           console.log(err);
                       })
                    },
                    "base64"
                )
            //resize done

            }
        }
        
    }

    const removeImageHandler=(public_id)=>{
        // console.log(public_id);
        removeProduct(public_id,user.token)
        .then(res=>{
            const newImageDetails=imgDetails.filter(c=>c.public_id!==public_id)
            setImgDetails(newImageDetails);
            setValues({...values,images:newImageDetails});
            // console.log(res.data);
        })
        .catch(err=>{
            console.log(err);
        })
    }

    console.log('image folder only image',imgDetails);

    return(
        <>
           <div>
                {imgDetails.map(i=>(
                    <Badge className='mr-3' style={{cursor:'pointer'}} onClick={()=>removeImageHandler(i.public_id)} key={i.public_id} count={'x'}>
                    <Avatar 
                    size={120}
                    shape="square"
                     src={i.url} />
                </Badge>
                ))}
           </div>
           <br/>
            <div className="row">
            <label className="ml-3 btn btn-outline-primary">
                <CloudUploadOutlined 
                className="text-dark pr-2"
                style={{fontSize:"20px"}}
                />
                image
                <input 
                type="file"
                multiple
                hidden
                accept="image/*"
                onChange={fileUploadAndResize}
                />
            </label>
            </div>
        </>
    )
}

export default UploadImageForm;