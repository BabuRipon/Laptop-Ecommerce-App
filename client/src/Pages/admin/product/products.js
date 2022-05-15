import React,{useEffect,useState} from 'react';
import {getAllProducts,removeProduct} from '../../../functions/product'
import AdminNav from '../../component/nav/adminav';
import ProductCard from '../../component/product/productCard';
import {useSelector} from 'react-redux';


const Products=()=>{

    const [products,setProducts]=useState([]);
    const [loading,setLoading]=useState(false);

    const {user}=useSelector(state=>state);

    useEffect(()=>{
        loadAllProducts();
    },[])

    const loadAllProducts=()=>{
        setLoading(true);

        getAllProducts(10)
        .then(res=>{
            console.log(res.data);
            setProducts(res.data);
            setLoading(false);
        })
        .catch(err=>{
            setLoading(false);
            console.log(err);
        })
    }

    const removeProductHandler=(slug)=>{
     
        
        if(window.confirm('delete ?')){
           
            removeProduct(slug,user.token)
            .then(res=>{
                console.log(res.data);
                loadAllProducts();
            })
            .catch(err=>{
                console.log(err);
            }) 

        }
        
    }
      
    return (
        <div className="container-fluid">
            <div className="row mt-2">
                <div className="col-md-2 ">
                        <AdminNav />
                </div>
                <div className="col-md-8">
                    <h4>All Products</h4>
                    <hr />
                      <div className="row">
                      {
                          products.map(product=>(
                              <div className="col-md-4" key={product._id}>
                                  <ProductCard 
                                  product={product} 
                                  removeProductHandler={removeProductHandler} />
                              </div>
                          ))
                      }
                      </div>
                </div>
            </div>
        </div>
    )
}

export default Products;