import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Tabs } from 'antd';

const { TabPane } = Tabs;



const ImageCarousel=({product})=>{
        const {images,description}=product;
     
    return (
       <>
          <Carousel
            autoPlay={true}
            infiniteLoop={true}
            >
                {
                    images.map(image=>(
                        <img
                            src={image.url}
                            key={image.public_id}
                        />
                    ))
                }
            </Carousel>

            <Tabs type="card">
                <TabPane tab="Description" key="1">
                    <p>{description}</p>
                </TabPane>
                <TabPane tab="More" key="3">
                    <p>To know further please contact our Team on xxxx xxx xxx number (toll free)</p>
                </TabPane>
            </Tabs>
       </>
    )
}

export default ImageCarousel;