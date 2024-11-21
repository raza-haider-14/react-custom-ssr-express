import React from "react";
import { Route, Routes } from "react-router-dom";
import Products from "./pages/products";
import ProductDetail from "./pages/product-detail";

function App({ data = null }) {
  return (
    <Routes>
      <Route index element={<Products data={data} />} />
      <Route path="/product/:id" element={<ProductDetail data={data} />} />
    </Routes>
  );
}

export default App;
