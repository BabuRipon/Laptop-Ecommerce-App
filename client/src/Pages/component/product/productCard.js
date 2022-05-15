import React from 'react';
import { Card } from 'antd';
import laptop from '../../../images/laptop.jpeg';
import { DeleteOutlined,EditOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom';


const {Meta} =Card;



const ProductCard=({product,removeProductHandler})=>{

    const {images,title,description}=product;


    return(
        <>
        <Card
        hoverable
        className="mb-3"
        cover={
        <img 
        alt="laptop_img" src={images.length ?images[0].url:laptop} />
         }
         style={{height:'350px',objectFit:'cover'}}
        actions={[
           <Link to={`/admin/product/${title}`}>
              <EditOutlined 
                className="text-warning"
                key="edit" 
                
                />
           </Link>
           ,
           <DeleteOutlined 
           className="text-danger"
           key="delete" 
           onClick={()=>removeProductHandler(product.title)}
           />
        ]}
        >
            <Meta title={title} description={description.length>50 ?description.substr(0,50).concat('...'):description} />
        </Card>
        </>
    )
}

export default ProductCard;