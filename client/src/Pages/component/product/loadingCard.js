import React from  'react';
import { Skeleton,Card} from 'antd';
import { v4 as uuidv4 } from 'uuid';

const LoadingCard=({count})=>{
    const cardArr=[];
    for(let i=0;i<count;i++){
        cardArr.push(
            <div className="col-md-3" key={uuidv4()}>
                <Card>
                    <Skeleton active>
                    </Skeleton>
                </Card>
            </div>
        )
    }
    return cardArr;
}

export default LoadingCard;