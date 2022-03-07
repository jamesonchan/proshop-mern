import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeScreen from "./components/HomeScreen";
import ProductScreen from "./components/ProductScreen";
import CartScreen from "./components/CartScreen";

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/cart/:id" element={<CartScreen/>}/> 
            <Route path="/cart" element={<CartScreen/>}/> 
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
