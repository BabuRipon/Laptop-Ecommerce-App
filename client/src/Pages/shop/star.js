import React from 'react';
import StarRatings from 'react-star-ratings';

const StarNav=({handleRatingChange,numberOfRatings})=>{
    return(
        <span className="pl-3 pb-2">
          <StarRatings
                  
                  rating={numberOfRatings}
                  starDimension="16px"
                  starRatedColor="red"
                  starHoverColor="red"
                  starEmptyColor="red"
                  changeRating={()=>handleRatingChange(numberOfRatings)}
                  numberOfStars={numberOfRatings}
                  name='rating'
                />
          </span>
     
    )
}

export default StarNav;