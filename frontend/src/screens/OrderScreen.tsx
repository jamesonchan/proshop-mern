import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import {
  deliverOrder,
  getOrderDetail,
  payOrder,
} from "../actions/orderActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
  selectOrderDeliver,
  selectOrderDetail,
  selectOrderPay,
} from "../reducers/orderReducers";
import { PayPalButton } from "react-paypal-button-v2";
import { OrderActionType } from "../actionType/cart/orderActionType";
import { selectUserLogin } from "../reducers/userReducers";

interface OrderScreenProps {}

const OrderScreen: React.FC<OrderScreenProps> = ({}) => {
  const [sdkReady, setSdkReady] = useState(false);

  const params = useParams();
  const orderId = params.id || null;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { order, loading, error } = useSelector(selectOrderDetail);
  const { success: successPay, loading: loadingPay } =
    useSelector(selectOrderPay);
  const {
    success: successDeliver,
    loading: loadingDeliver,
    error: errorDeliver,
  } = useSelector(selectOrderDeliver);
  const { userInfo } = useSelector(selectUserLogin);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!order || order._id !== orderId || successPay || successDeliver) {
      dispatch({ type: OrderActionType.ORDER_PAY_RESET });
      dispatch({ type: OrderActionType.ORDER_DELIVER_RESET });
      dispatch(getOrderDetail(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [
    dispatch,
    navigate,
    orderId,
    order,
    successPay,
    successDeliver,
    userInfo,
  ]);

  if (!loading) {
    const addDecimals = (num: number) =>
      (Math.round(num * 100) / 100).toFixed(2);

    //   calculate prices
    order!.itemsPrice = Number(
      addDecimals(
        order!.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      )
    );
  }

  const successPaymentHandler = (paymentResult: any) => {
    console.log(paymentResult);
    dispatch(payOrder(orderId as string, paymentResult));
  };

  const deliverHandler = () => {
    if (order) {
      dispatch(deliverOrder(order));
    }
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>Order {order?._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order?.user?.name}
              </p>
              <p>
                {" "}
                <strong>Email: </strong>
                <a href={`mailto:${order?.user?.email}`}>
                  {order?.user?.email}
                </a>
              </p>
              <p>
                <strong>Address: </strong>
                {order?.shippingAddress?.address},{" "}
                {order?.shippingAddress?.city}{" "}
                {order?.shippingAddress?.postalCode},{" "}
                {order?.shippingAddress?.country}
              </p>
              {order?.isDelivered ? (
                <Message variant="success">
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Not delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment method</h2>
              <p>
                <strong>Method: </strong>
                {order?.paymentMethod}
              </p>
              {order?.isPaid ? (
                <Message variant="success">Paid on {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Not paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order?.orderItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order?.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} X ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order?.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order?.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order?.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order?.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order?.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order?.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}

              {userInfo &&
                userInfo.isAdmin &&
                order?.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={deliverHandler}
                    >
                      Mark as delivered
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
