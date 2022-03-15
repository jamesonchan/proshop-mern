import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { createProductReview, productDetails } from "../actions/productActions";
import {
  selectProductDetails,
  selectProductReview,
} from "../reducers/productReducers";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Rating from "../components/Rating";
import { selectUserLogin } from "../reducers/userReducers";
import {
  ProductActionType,
  Reviews,
} from "../actionType/product/productActionType";

interface ProductScreenProps {}

const ProductScreen: React.FC<ProductScreenProps> = ({}) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const params = useParams();
  const productId = params.id || "";
  const navigate = useNavigate();
  const { loading, error, singleProduct } = useSelector(selectProductDetails);
  const { error: errorReview, success: successReview } =
    useSelector(selectProductReview);
  const { userInfo } = useSelector(selectUserLogin);

  useEffect(() => {
    if (successReview) {
      alert("Review Submitted!");
      setRating(0);
      setComment("");
      dispatch({ type: ProductActionType.PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(productDetails(productId));
  }, [dispatch, productId, successReview]);

  const addToCartHandler = () => {
    navigate(`/cart/${productId}?qty=${qty}`);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      createProductReview(productId, {
        rating,
        comment,
      })
    );
  };

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : singleProduct ? (
        <>
          <Row>
            <Col md={6}>
              <Image src={singleProduct.image} alt={singleProduct.name} fluid />
            </Col>

            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{singleProduct.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={Number(singleProduct.rating)}
                    text={`${singleProduct.reviews?.length} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${singleProduct.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: ${singleProduct.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${singleProduct.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {singleProduct.countInStock > 0
                          ? "In Stock"
                          : "Out of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {singleProduct.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                          >
                            {Array.from(
                              { length: singleProduct.countInStock },
                              (_, i) => (
                                <option value={i + 1} key={i + 1}>
                                  {i + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className="btn-block"
                      type="button"
                      disabled={!singleProduct.countInStock}
                    >
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {singleProduct.reviews?.length === 0 && (
                <Message>No reviews</Message>
              )}
              <ListGroup variant="flush">
                {singleProduct.reviews?.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt?.substring(0, 10)}</p>
                    <p>
                      {review.comment.length > 100
                        ? `${review.comment.substring(0, 100)} ...`
                        : review.comment}
                    </p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a customer review</h2>
                  {errorReview && (
                    <Message variant="danger">{errorReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(Number(e.target.value))}
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment" className="mt-3">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button type="submit" variant="primary" className="mt-3">
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to="/login">log in</Link> to write a review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      ) : null}
    </>
  );
};

export default ProductScreen;
