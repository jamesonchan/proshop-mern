import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { listProducts } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import Product from "../components/Product";
import ProductCarousel from "../components/ProductCarousel";
import TitleMeta from "../components/TitleMeta";
import { selectProductList } from "../reducers/productReducers";

interface HomeScreenProps {}

const HomeScreen: React.FC<HomeScreenProps> = ({}) => {
  const dispatch = useDispatch();
  const params = useParams();
  const keyword = params.keyword;
  const pageNumber = params.pageNumber || 1;

  const { loading, error, products, page, pages } =
    useSelector(selectProductList);

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber as string));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <TitleMeta
        title="Welcome to PropShop | Home"
        descriptionContent="We sell the best products for cheap"
        keywordsContent="electronics, buy electronics, cheap electronics"
      />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light">
          Go back
        </Link>
      )}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
