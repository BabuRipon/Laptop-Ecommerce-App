import React ,{useState,useEffect}from 'react';
import {Card,Tooltip} from 'antd';
import {ShoppingCartOutlined,HeartOutlined} from '@ant-design/icons';
import {Link}from 'react-router-dom'
import ModalCard from '../modal/modalCard';
import StarRatings from 'react-star-ratings';
import {useSelector,useDispatch}from 'react-redux';
import { ProductRatings } from '../../../functions/product';
import _ from 'lodash';
import { addToWishlist } from "../../../functions/user";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";




const ProductDetails=({product,loadProduct})=>{

    const [starCount,setStarCount]=useState(0);
    const {user}=useSelector(state=>({...state}));
   
    const [tootip,setTooltip]=useState('add to cart');
    
    const dispatch=useDispatch();
    const history = useHistory();

    const {color,brand,
        shipping,sold,price,
        category,subCategory,quantity,_id}=product;

    //color brand price shipping sold category subcategory quantity
    console.log(product);
    // console.log(user)

    useEffect(()=>{
        if(product.ratings && user){
            const rating=product.ratings.find(p=>p.postedBy===user._id);
            if(rating){
                setStarCount(rating.star);
            }
            
        }
    
    },[product.ratings,user])

   const onRatingHandler=()=>{
   
    ProductRatings(_id,starCount,user.token)
    .then(res=>{
        console.log(res.data);
        loadProduct();
    })
    .catch(err=>{
        console.log(err);
    })

   }

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

const handleAddToWishlist = (e) => {
    e.preventDefault();
    addToWishlist(_id, user.token)
    .then((res) => {
      console.log("ADDED TO WISHLIST", res.data);
      toast.success("Added to wishlist");
      history.push("/user/wishlist");
    })
    .catch(err=>{
        console.log(err);
    });

  };


    return (
       <Card
       actions={[
        <Tooltip title={ tootip }>
            <a onClick={addToCartHandler} className={"h6 "+(quantity>0?'text-warning':'text-secondary')} disabled={!quantity}>
                <ShoppingCartOutlined key="cart" /><br />
                {quantity>0?'Add to Cart':'Out Of Stock'}
            </a>
        </Tooltip>,
        <Tooltip title={'Add to Wishlist'}>
           <a onClick={handleAddToWishlist}>
            <HeartOutlined key="heart" className="h6 text-warning" /><br />
            <span className="h6 text-warning">Add to Wishlist</span>
           </a>
        </Tooltip>,
            <ModalCard
            onRatingHandler={onRatingHandler}
            >
                    <StarRatings 
                        rating={starCount}
                        starRatedColor="red"
                        changeRating={(rating,name)=>{
                            setStarCount(rating)
                            console.log(rating,name)
                        }}
                        numberOfStars={5}
                        name={_id}
                                />
            </ModalCard>
        
      ]}
       >
            <ul className="list-group list-group-flush ">
                <li className="list-group-item d-flex 
                justify-content-between">
                    <span className="h6 text-uppercase">brand</span>
                    <span className="h6 text-uppercase">{brand}</span>
                </li>
                <li className="list-group-item d-flex 
                justify-content-between ">
                    <span className="h6 text-uppercase">category</span>
                    <Link className="h6 text-uppercase btn btn-link btn-primary" to={category && category.slug? `/category/${category.slug}`:''}>{category && category.name}</Link>
                </li>
                <li className="list-group-item d-flex 
                justify-content-between ">
                    <span className="h6 text-uppercase">sub-category</span>
                    {
                        subCategory && subCategory.map(subs=>(
                            <Link 
                            className="h6 text-uppercase btn btn-link btn-primary"
                            to={subs && subs.slug? `/subcategory/${subs.slug}`:''}
                            key={subs._id}>{subs.name}</Link>
                        ))
                    }
                </li>
                <li className="list-group-item d-flex 
                justify-content-between">
                    <span className="h6 text-uppercase">color</span>
                    <span className="h6 text-uppercase">{color}</span>
                </li>
                <li className="list-group-item d-flex 
                justify-content-between ">
                    <span className="h6 text-uppercase">price</span>
                    <span className="h6 text-uppercase">{price}</span>
                </li>
                <li className="list-group-item d-flex 
                justify-content-between ">
                    <span className="h6 text-uppercase">quantity</span>
                    <span className="h6 text-uppercase">{quantity}</span>
                </li>
                <li className="list-group-item d-flex 
                justify-content-between ">
                    <span className="h6 text-uppercase">sold</span>
                    <span className="h6 text-uppercase">{sold}</span>
                </li>
                <li className="list-group-item d-flex 
                justify-content-between ">
                    <span className="h6 text-uppercase">shipping</span>
                    <span className="h6 text-uppercase">{shipping}</span>
                </li>
                
            </ul>
       </Card>
      
    )
}

export default ProductDetails;