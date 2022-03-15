import React, { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { getAllOrder } from "../actions/orderActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { selectOrderAll } from "../reducers/orderReducers";
import {
  selectUserLogin
} from "../reducers/userReducers";

interface UserListScreenProps {}

const UserListScreen: React.FC<UserListScreenProps> = ({}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector(selectUserLogin);
  const { allOrder, loading, error } = useSelector(selectOrderAll);

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getAllOrder());
    } else {
      navigate("/login");
    }
  }, [dispatch, userInfo, navigate]);

  const deleteHandler = (userId: string) => {
    if (window.confirm("Are you sure to delete this order?")) {
      // dispatch delete order action
    }
  };

  return (
    <>
      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
            </tr>
          </thead>

          <tbody>
            {allOrder?.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt?.substring(0, 10)}</td>
                <td>{order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt?.substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt?.substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant="light" className="btn-sm">
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListScreen;
