import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Products({ data = [] }) {
  const [counter, setCounter] = useState(0);
  const nav = useNavigate();
  return (
    <>
      <p onClick={() => setCounter(counter + 1)}>+ {counter}</p>
      {data?.map((product) => (
        <div onClick={() => console.log('HIT')}>
            <img key={product.id} src={product.image} onClick={() => {console.log('HIT')}} alt={product.title} width={50} />
        </div>
      ))}
    </>
  );
}

export default Products;
