import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import Delete from "/assets/add-to-cart/delete.svg";
import Icon from "@/components/ui/icon";

const ItemQuantity = ({ quantity }: { quantity: number }) => {
  const [amount, setQuantity] = useState(quantity);

  const handleIncrement = () => {
    setQuantity((prevAmount) => prevAmount + 1);
  };

  const handleDecrement = () => {
    setQuantity((prevAmount) => Math.max(prevAmount - 1, 0)); // Prevents going below 0
  };

  return (
    <div className="flex gap-4 rounded-full border px-3 w-[80px] border-black">
      <span onClick={handleDecrement} style={{ cursor: "pointer" }}>
        -
      </span>
      <span>{amount}</span>
      <span onClick={handleIncrement} style={{ cursor: "pointer" }}>
        +
      </span>
    </div>
  );
};

const CartItem = ({
  id,
  title,
  image,
  desc,
  price,
  size,
  color,
  quantity,
}: {
  id: number;
  title: string;
  image: string;
  desc: string;
  price: string | number;
  size: string;
  color: string;
  quantity: number;
}) => {
  return (
    <div>
      <div className="flex justify-around h-[254px]">
        <img src={image} alt={title} />
        <div className="flex flex-col justify-center w-[400px]">
          <div className="mb-2 flex justify-between items-center">
            <h2 className="font-bold">{title}</h2>
            <Icon src={Delete} />
          </div>
          <p>{desc}</p>
          <small className="text-muted-foreground">Size: {size}</small>
          <span className="text-xs">{color}</span>
          <div className="flex justify-between items-center mt-4">
            <ItemQuantity quantity={quantity} />
            <span>{price}</span>
          </div>
        </div>
      </div>
      <Separator />
    </div>
  );
};

const CartComp = () => {
  return (
    <div className="w-3/5 border rounded-lg shadow-lg">
      <CartItem
        id={1}
        title="Gro Hair Serum"
        image="/assets/products/product1.png"
        color="Color: Adulterous - 828"
        desc="Absolut Repair 10-In-1 Hair Oil for Dry Hair"
        price="10,000 Ks"
        size="30mL"
        quantity={2}
      />
      <CartItem
        id={1}
        title="Gro Hair Serum"
        image="/assets/products/product1.png"
        color="Color: Adulterous - 828"
        desc="Absolut Repair 10-In-1 Hair Oil for Dry Hair"
        price="10,000 Ks"
        size="30mL"
        quantity={2}
      />
      <CartItem
        id={1}
        title="Gro Hair Serum"
        image="/assets/products/product1.png"
        color="Color: Adulterous - 828"
        desc="Absolut Repair 10-In-1 Hair Oil for Dry Hair"
        price="10,000 Ks"
        size="30mL"
        quantity={2}
      />
    </div>
  );
};

export default CartComp;
