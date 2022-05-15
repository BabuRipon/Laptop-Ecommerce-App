import React,{useEffect,useState} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import AdminNav from '../component/nav/adminav';
import { getOrders, changeStatus } from "../../functions/admin";
import Orders from '../component/order/orders';

const AdminDashboard=()=>{

    const [orders, setOrders] = useState([]);
    const { user } = useSelector((state) => ({ ...state }));
  
    useEffect(() => {
      loadOrders();
    }, []);
  
    const loadOrders = () =>
      getOrders(user.token).then((res) => {
        console.log(JSON.stringify(res.data, null, 4));
        setOrders(res.data);
      });
  
    const handleStatusChange = (orderId, orderStatus) => {
      changeStatus(orderId, orderStatus, user.token).then((res) => {
        toast.success("Status updated");
        loadOrders();
      });
    };

    return(
      <div className="container-fluid">
      <div className="row">
          <div className="col-md-2 ">
            <AdminNav />
          </div>
          <div className="col-md-10">
          <h4>Admin Dashboard</h4>
          <Orders orders={orders} handleStatusChange={handleStatusChange} />
        </div>
      </div>
   </div>
    )
}

export default AdminDashboard;