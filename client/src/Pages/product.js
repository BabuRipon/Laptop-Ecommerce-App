import React ,{useState,useEffect}from 'react';
import {useParams} from 'react-router-dom'
import { polulateProductBySlug, RelevantProduct } from '../functions/product';
import AverageStar from './component/forms/agerageStar';
import HomepageProductCard from './component/product/homepageCard';
import ImageCarousel from './component/product/imageCarousel';
import ProductDetails from './component/product/productDeatils';



const ProductDetailPage=()=>{

    const [product,setProduct]=useState({});  
    const [relevantProduct,setRelevantCategory]=useState([]);
    const {slug}=useParams();
    
    useEffect(()=>{
       loadProduct();
     },[slug])
 
     const loadProduct=async()=>{
 
        await polulateProductBySlug(slug)
         .then(res=>{
           setProduct(res.data[0]);
           RelevantProduct(res.data[0]._id)
             .then(res=>{
                 setRelevantCategory(res.data)
                //  console.log('relevant category'+JSON.stringify(res.data));
             })
             .catch(err=>{
                 console.log(err);
             })
         })
         .catch(err=>{
             console.log(err);
         })

     }

    
    return (
        <>
          <div className="container-fluid">
             <div className="row mt-3">
                 <div className="col-md-7">
                    {
                     Object.keys(product).length>0 && product.images && product.images.length ?
                     <ImageCarousel product={product}/> 
                     :
                     <h4>no image present</h4>   
                    }
                 </div>
                 <div className="col-md-5">
                      <h4 
                      className="
                        pb-3
                        text-dark
                       text-center
                       font-weight-bold 
                       text-uppercase
                       border-bottom
                       ">
                        {Object.keys(product).length>0 && product.title}
                        </h4>
                        {Object.keys(product).length>0 && <AverageStar product={product}/>}
                        {Object.keys(product).length>0 && <ProductDetails product={product} loadProduct={loadProduct}/>}
                 </div>
             </div>
          </div>

           <h4 
           className="
           jumbotron
           mt-3
           p-3 text-center
           text-uppercase
           font-weight-bold
           ">
               Relevant Category
            </h4>

            <div className="container">
                
                   {
                       relevantProduct.length?
                       <div className="row justify-content-around">
                       {
                       relevantProduct.map(product=>(
                           <div key={product._id} className="col-md-3" >
                           <HomepageProductCard
                               product={product}
                           />
                           </div>
                       ))}
                   </div>
                   :<h6 className="text-center">No relevant category present</h6>
                   }
    
            </div>

        </>
    )
}

export default  ProductDetailPage;