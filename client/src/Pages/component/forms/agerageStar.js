import React,{useState,useEffect} from 'react';
import StarRatings from 'react-star-ratings';

const AverageStar=({product})=>{

    const [avgStar,setAvgStar]=useState();

    // console.log('avg star'+JSON.stringify(product))
    useEffect(()=>{
        let total=0;
        // console.log('avg star '+JSON.stringify(product))
       if(product.ratings && product.ratings.length){
          total=product.ratings.map(p=>p.star).reduce((acu,cur)=>{
              return acu+cur;
          });
          setAvgStar(total/(product.ratings.length))
       }
       

    },[product.ratings])


    return (
      
           
              product.ratings && product.ratings.length?
              <div className="d-flex justify-content-center">
              
                 <StarRatings
                 starDimension="25px"
                  rating={avgStar}
                  starRatedColor="red"
                  numberOfStars={5}
                />
                
               </div>
               :<h6 className="text-center">No Rating Yet</h6>
           
        
    )
}

export default AverageStar;

