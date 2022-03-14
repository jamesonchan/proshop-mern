import React, { useEffect } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  createProduct,
  deleteProduct,
  listProducts,
} from "../actions/productActions";
import { ProductActionType } from "../actionType/product/productActionType";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
  selectProductCreate,
  selectProductDelete,
  selectProductList,
} from "../reducers/productReducers";
import { selectUserLogin } from "../reducers/userReducers";

interface ProductListScreenProps {}

const ProductListScreen: React.FC<ProductListScreenProps> = ({}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(selectProductList);
  const { userInfo } = useSelector(selectUserLogin);
  const { product: createdProduct, success: successCreate } =
    useSelector(selectProductCreate);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = useSelector(selectProductDelete);

  useEffect(() => {
    dispatch({ type: ProductActionType.PRODUCT_CREATE_RESET });

    if (!userInfo?.isAdmin) {
      navigate("/login");
    }

    if (successCreate) {
      navigate(`/admin/product/${createdProduct?._id}/edit`);
    } else {
      dispatch(listProducts());
    }
  }, [
    dispatch,
    userInfo,
    navigate,
    successDelete,
    createdProduct,
    successCreate,
  ]);

  const deleteProductHandler = (productId: string) => {
    dispatch(deleteProduct(productId));
  };
  
  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
            </tr>
          </thead>

          <tbody>
            {products?.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteProductHandler(product._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ProductListScreen;
