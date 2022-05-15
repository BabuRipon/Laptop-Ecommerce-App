import axios from "axios";

export const getOrders = async (authtoken) =>
  await axios.get(`/api/admin/orders`, {
    headers: {
      token:authtoken,
    },
  });

export const changeStatus = async (orderId, orderStatus, authtoken) =>
  await axios.put(
    `/api/admin/order-status`,
    { orderId, orderStatus },
    {
      headers: {
        token:authtoken,
      },
    }
  );