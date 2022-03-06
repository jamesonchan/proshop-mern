import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import Rating from "./Rating";
import { useDispatch, useSelector } from "react-redux";
import { productDetails } from "../actions/productActions";
import { selectProductDetails } from "../reducers/productReducers";
import Loader from "./Loader";
import Message from "./Message";

interface ProductScreenProps {}

const ProductScreen: React.FC<ProductScreenProps> = ({}) => {
  const dispatch = useDispatch();
  const { loading, error, singleProduct } = useSelector(selectProductDetails);
  const params = useParams();

  useEffect(() => {
    dispatch(productDetails(params.id));
  }, [dispatch, params.id]);

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
                  value={singleProduct.rating}
                  text={`${singleProduct.numReviews} reviews`}
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
                <ListGroup.Item>
                  <Button
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
      ) : null}
    </>
  );
};

export default ProductScreen;
