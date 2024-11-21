import React from "react";

const ProductDetail = ({ data = {} }) => {
  return <div>{data?.title}</div>;
};

export default ProductDetail;
