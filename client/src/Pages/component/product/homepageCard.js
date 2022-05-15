import React,{useState} from 'react';
import { Card ,Tooltip} from 'antd';
import laptop from '../../../images/laptop.jpeg';
import { EyeOutlined,ShoppingCartOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom';
import AverageStar from '../forms/agerageStar';
import {useDispatch} from 'react-redux'
import _ from 'lodash';


const {Meta} =Card;



const HomepageProductCard=({product})=>{

    const {images,title,description,price,quantity,slug}=product;
    const [tootip,setTooltip]=useState('add to cart');
    const dispatch=useDispatch();
    
    // console.log('product : ',product);

    const addToCartHandler=()=>{
        let cartArray=[];
        if(typeof window!==undefined){
            if(localStorage.getItem('cart')){
                cartArray=JSON.parse(localStorage.getItem('cart'));
            }
    
            cartArray.push({
                ...product,
                count:1
            })

            let unique=_.uniqWith(cartArray,_.isEqual);
    
            localStorage.setItem('cart',JSON.stringify(unique));

            setTooltip('added');
 
            //add cart product to redux

            dispatch({
                type:"ADD_TO_CART",
                payload:unique
            })

            dispatch({
                type:"VISIBLE_ACTIVITY",
                payload:true
            })

        }
    }


    return(
        <>
        
         <AverageStar product={product} />
        
        <Card
        hoverable
        className="mb-3"
        cover={
        <img 
        alt="laptop_img" src={images.length ?images[0].url:laptop} />
         }
         style={{height:'380px',objectFit:'cover'}}
        actions={[
          <Tooltip title={"View Product Details"}>
               <Link to={`/product/${slug}`}>
              <EyeOutlined 
                className="text-warning"
                key="edit" 
                
                />
                <br />
                <span>View Product</span>
            </Link>
          </Tooltip>
           ,
           <Tooltip title={quantity>0 ? 'Add To Cart' :'Out Of Stock'} >
                    <a onClick={addToCartHandler} disabled={!quantity && true}>
                    <ShoppingCartOutlined
                        className="text-danger"
                        key="addtocart" 
                        />
                        <br />
                        <span >{quantity>0 ? 'Add To Cart' :'Out Of Stock'}</span>
                </a>
           </Tooltip>
           
        ]}
        >
            <Meta title={<span>{title} - <span className="text-dark font-weight-bold">&#8377;{price}</span></span>} description={description.length>50 ?description.substr(0,50).concat('...'):description} />
        </Card>
        </>
    )
}

export default HomepageProductCard;