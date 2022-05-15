import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import { getCategories } from '../functions/category';
import { getSubCategories } from '../functions/subCategory';
import BestSeller from './home/bestSeller';
import NewArrivalProduct from './home/newArrival';



const Home=(props)=>{

    const [categories,setCategories]=useState([]);
    const [subCategories,setSubCategories]=useState([]);

    useEffect(()=>{
        getCategories()
        .then(res=>{
            // console.log(res.data);
            setCategories(res.data);
        })
        .catch(err=>{
          console.log('category',err)
        })

        getSubCategories()
        .then(res=>{
            // console.log(res.data);
            setSubCategories(res.data);
        })
        .catch(err=>{
            console.log('sub category',err);
        })

    },[])

    return(
        <>
            <div className="jumbotron text-center h4">
                <Typewriter
                    options={{
                        strings: ['Welcome to our site','Hope you feel great','For query contact with  our team'],
                        autoStart: true,
                        loop: true,
                    }}
                    />
            </div>
            <NewArrivalProduct />
            <br />
            <BestSeller />
            <br />
            <h4 className="
                font-weight-bold 
                jumbotron
                p-3 
                mb-5 
                text-center
                text-uppercase
                ">Category</h4>

                <div className="container">
                 
                       <div className="row">
                           {
                                categories.map(c=>{
                                    return (
                                    <Link to={`/category/${c.slug}`} key={c._id} className="col-sm-2 mb-3"><h6  
                                    className="btn btn-outline-secondary py-2 px-5 "
                                    >
                                        {c.name}</h6></Link>
                                    )
                                })
                           }
                        </div>
        
                </div>

                <h4 className="
                font-weight-bold 
                jumbotron
                p-3 
                mb-5 
                text-center
                text-uppercase
                ">Sub Category</h4>

                <div className="container">
                 
                       <div className="row">
                           {
                                subCategories.map(c=>{
                                    return (
                                    <Link to={`/subcategory/${c.slug}`} key={c._id} className="col-sm-2 mb-3"><h6  
                                    className="btn btn-outline-secondary py-2 px-5 "
                                    >
                                        {c.name}</h6></Link>
                                    )
                                })
                           }
                        </div>
        
                </div>

        </>
    )
}
export default Home;