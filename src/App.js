import React from "react";

function App({ list = [] }) {
  const [count, setCount] = React.useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <>
      <p>{count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      {list?.map((x) => (
        <img key={x.id} src={x.image} alt={x.title} width={50} />
      ))}
    </>
  );
}

export default App;
