import { Separator } from "@/components/ui/separator";
import Delete from "/assets/add-to-cart/delete.svg";
import { useAppSelector } from "@/store/hook";
import { useDispatch } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  updateTotalCost,
} from "@/store/slices/Checkout/checkOutSlice";
import useResponsive from "@/utils/useResponsive";
import { BASE_URL } from "@/api/BaseService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteOrder } from "@/api/endpoints/checkoutApi";
import { CartItemT } from "@/types/checkOutTypes";
import { decrementAddToCart } from "@/store/slices/user/userSlice";

const ItemQuantity = ({
  quantity,
  onIncrement,
  onDecrement,
}: {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
}) => {
  return (
    <div className="flex gap-4 rounded-full border justify-center items-center w-[80px] border-black">
      <span onClick={onDecrement} style={{ cursor: "pointer" }}>
        -
      </span>
      <span>{quantity}</span>
      <span onClick={onIncrement} style={{ cursor: "pointer" }}>
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
  onDelete,
}: {
  id: number;
  title: string;
  image: string;
  desc: string;
  price: number;
  size: string;
  quantity: number;
  onDelete: (id: number) => void;
}) => {
  const dispatch = useDispatch();
  const itemQuantity = useAppSelector(
    (state) =>
      state.checkout.cartItems.find((item) => item.cart_item_id === id)
        ?.quantity || 1
  );

  console.log(itemQuantity, "quantity");

  const totalPrice = price * itemQuantity;

  const handleIncrement = () => {
    dispatch(incrementQuantity(id));
    dispatch(updateTotalCost());
  };

  const handleDecrement = () => {
    dispatch(decrementQuantity(id));
    dispatch(updateTotalCost());
  };

  return (
    <div className="w-full">
      <div className="flex justify-around">
        <div>
          <img src={image} alt={title} className="w-[250px] h-[250px] py-4" />
        </div>
        <div className="flex flex-col justify-center min-w-[170px] ">
          <div className="mb-2 flex justify-between items-center">
            <h2 className="font-bold">{title}</h2>
            <img
              src={Delete}
              className="cursor-pointer"
              onClick={() => onDelete(id)}
            />
          </div>
          <p>{desc.slice(0, 20) + "..."}</p>
          <small className="text-muted-foreground">Size: {size}</small>
          {/* <span className="text-xs">{color}</span> */}
          <div className="flex justify-between items-center gap-4 mt-4">
            <ItemQuantity
              quantity={itemQuantity}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
            />
            <span>{totalPrice} Ks</span>
          </div>
        </div>
      </div>
      <Separator />
    </div>
  );
};

const MobileCartItem = ({
  id,
  title,
  image,
  desc,
  price,
  size,
  onDelete,
}: {
  id: number;
  title: string;
  image: string;
  desc: string;
  price: number;
  size: string;
  quantity: number;
  onDelete: (id: number) => void;
}) => {
  const dispatch = useDispatch();
  const itemQuantity = useAppSelector(
    (state) =>
      state.checkout.cartItems.find((item) => item.cart_item_id === id)
        ?.quantity || 1
  );

  const totalPrice = price * itemQuantity;

  const handleIncrement = () => {
    dispatch(incrementQuantity(id));
    dispatch(updateTotalCost());
  };

  const handleDecrement = () => {
    dispatch(decrementQuantity(id));
    dispatch(updateTotalCost());
  };

  return (
    <div>
      <div className="flex justify-around ">
        <img src={image} alt={title} className="w-[200px] h-[200px] p-4" />
        <div className="flex flex-col justify-center ">
          <div className="mb-2 flex justify-between items-center">
            <h2 className="font-bold">{title}</h2>
          </div>
          <p>{desc.slice(0, 3) + "..."}</p>
          <small className="text-muted-foreground">Size: {size}</small>
          {/* <span className="text-xs">{color}</span> */}
        </div>
      </div>
      <div className="flex justify-between items-center mt-4 p-4 px-10 md:px-16 ">
        <div className="flex gap-2">
          <ItemQuantity
            quantity={itemQuantity}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
          />
          <img
            src={Delete}
            className="cursor-pointer"
            onClick={() => onDelete(id)}
          />
        </div>

        <span>{totalPrice} Ks</span>
      </div>
      <Separator />
    </div>
  );
};
type CartCompProps = {
  cartItems: CartItemT[];
};

const CartComp = ({ cartItems }: CartCompProps) => {
  const { desktopResponsive, mobileResponsive, tabletResponsive } =
    useResponsive();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartProducts"] });
      queryClient.invalidateQueries({ queryKey: ["payment"] });
    },
  });

  const handleDelete = (id: number) => {
    mutation.mutate(id);
    dispatch(updateTotalCost());
    dispatch(decrementAddToCart());
  };

  return (
    <div className="w-full sm:w-[80%] lg:w-[70%] xl:w-[70%] border rounded-lg shadow-lg">
      {desktopResponsive &&
        cartItems?.map((item, index) => (
          <CartItem
            key={index}
            id={item.cart_item_id}
            title={item.name}
            image={BASE_URL + item.image}
            desc={item.short_description}
            price={item.price}
            size={item.variant.size}
            quantity={item.quantity}
            onDelete={handleDelete}
          />
        ))}
      {(mobileResponsive || tabletResponsive) &&
        cartItems?.map((item, index) => (
          <MobileCartItem
            key={index}
            id={item.cart_item_id}
            title={item.name}
            image={BASE_URL + item.image}
            desc={item.short_description}
            price={item.price}
            size={item.variant.size}
            quantity={item.quantity}
            onDelete={handleDelete}
          />
        ))}
    </div>
  );
};

export default CartComp;
