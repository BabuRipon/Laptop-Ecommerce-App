import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import {StarOutlined} from '@ant-design/icons';
import {useSelector,} from 'react-redux';
import { Link, useHistory,useParams } from 'react-router-dom';


const ModalCard = ({children,onRatingHandler}) => {
  const [modalVisible,setModalVisible]=useState(false);
  const {user}=useSelector(state=>state);
  const history=useHistory();
  const {slug} =useParams();

  const handleModalVisible=()=>{
      if(user && user._id){
        setModalVisible(true);
      }else{
        history.push({
          pathname:'/login',
          state:{
            from:`/product/${slug}`
          }
        })
      }
  }

  const handleOk=()=>{
    setModalVisible(false)
    onRatingHandler();
  }

  const handleCancel=()=>{
      setModalVisible(false)
    }


  return (
    <>
     <div onClick={handleModalVisible}>
     <StarOutlined className="h6 text-warning"/> <br />
     {
     user && user._id ?
     <span className="h6 text-warning">Leave Ratings</span>
     : 
      <Link to='/login'>
         <span className="h6 text-warning">
            Login to leave rating
          </span>
      </Link>
    }
     </div>
      <Modal 
      title="Please give you valuable rating" 
      visible={modalVisible} 
      onOk={handleOk} 
      onCancel={handleCancel}
      >
        {children}
      </Modal>
    </>
  );
};

export default  ModalCard;