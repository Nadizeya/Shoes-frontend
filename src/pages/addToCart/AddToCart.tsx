import React from "react";
import CartComp from "./components/CartComp";

const AddToCart = () => {
  return (
    <div>
      <h1 className="mb-5">Your Basket</h1>
      <div className="flex">
        <CartComp />
        <div className="w-2/5">Payment comp</div>
      </div>
    </div>
  );
};

export default AddToCart;
