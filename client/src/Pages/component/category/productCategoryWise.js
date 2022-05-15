import React ,{useState,useEffect}from 'react';
import { useParams } from 'react-router';
import {getCategory} from '../../../functions/category';
import HomepageProductCard from '../product/homepageCard';


const ProductCategoryWise=({})=>{
    const [products,setProducts]=useState([]);
    const [loading,setLoading]=useState(false);
    const {slug}=useParams();

    useEffect(()=>{
        
        setLoading(true);
        getCategory(slug)
        .then(res=>{
            setProducts(res.data.products);
            setLoading(false);
        })
        .catch(err=>{
            console.log(err);
            setLoading(false);
        })

    },[])

    return <>
    <div className="container">
                

                {
                    
                    loading?
                    <h4 className="text-center text-warning">Loading...</h4>
                    :
                    <div className="row mt-5 justify-content-around">
                         {
                             products.length?
                             products.map(product=>(
                                <div key={product._id} className="col-md-3" >
                                <HomepageProductCard
                                    product={product}
                                />
                                </div>
                            )):
                            <h4 className="text-center text-warning">No Product found on <span className="text-primary">{slug.toUpperCase()}</span></h4>
                         }
                    </div>
                }

            </div>
    </>
}

export default ProductCategoryWise;
