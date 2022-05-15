import React from "react";

const ShowPaymentInfo = ({ order, showStatus = true }) =>{
    // console.log(JSON.stringify(order,null,4));
   return (

    <div>
      <p>
        <span>Order Id: {order.paymentResponse.orderCreationId}</span>
        {" / "}
        <span>
          Amount : 
          {order.paymentResponse.amount?order.paymentResponse.amount.toLocaleString("en-IN", {style:"currency", currency:"INR"}):'NA'}
        </span>
        {" / "}
        <span>Currency: {order.paymentResponse.currency ? order.paymentResponse.currency :'NA'}</span>
        {" / "}
        <span>
          Orderd on : 
          {order.paymentResponse.created_at?new Date(order.paymentResponse.created_at * 1000).toLocaleString():'NA'}
        </span>
        {" / "}
        <br />
        {showStatus && (
          <span className="badge bg-primary text-white">
            STATUS: {order.orderStatus}
          </span>
        )}
      </p>
    </div>
  );
} 

export default ShowPaymentInfo;