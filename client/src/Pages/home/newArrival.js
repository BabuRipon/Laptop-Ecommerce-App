import React,{useEffect,useState} from 'react';
import HomepageProductCard from '../component/product/homepageCard';
import LoadingCard from '../component/product/loadingCard';
import {getProductsbyPagination,productCount} from '../../functions/product'
import { Pagination } from 'antd';



const NewArrivalProduct=(props)=>{

    const [products,setProduct]=useState([]);
    const [loading,setLoading]=useState(false);
    const [page,setPage]=useState(1);
    const [totalProduct,setTotalProduct]=useState(0);

    
    useEffect(()=>{
       LoadAllProduct();
    },[page])

    useEffect(()=>{
        productCount()
        .then(res=>{
            // console.log(res.data)
            setTotalProduct(res.data);
        })
        .catch(err=>{
            console.log(err);
        })
    },[])

    const LoadAllProduct=()=>{
        setLoading(true);
        //sort order limit
        getProductsbyPagination('createdAt','desc',page)
        .then(res=>{
            setProduct(res.data);
            setLoading(false);
        })
        .catch(err=>{
            console.log(err);
            setLoading(false);
        })
    }

    // console.log(page)
    return(
        <>
            <h4 className="
                font-weight-bold 
                jumbotron
                p-3 
                mb-5 
                text-center
                text-uppercase
                ">new arival product</h4>
            <div className="container">
                

                {
                    loading?
                    <div className="row justify-content-around">
                        <LoadingCard count={4}/>
                    </div>
                    :
                    <div className="row justify-content-around">
                        {products.map(product=>(
                            <div key={product._id} className="col-md-3" >
                            <HomepageProductCard
                                product={product}
                            />
                            </div>
                        ))}
                    </div>
                }

            </div>
           <div className="text-center my-5">
                <Pagination 
                current={page} 
                total={(totalProduct/3)*10}
                onChange={page=>setPage(page)}
                />
           </div>
        </>
    )
}
export default NewArrivalProduct;