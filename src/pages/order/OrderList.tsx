import { Separator } from "@/components/ui/separator";
import { CaretLeft } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import { LoveListSort } from "../loves/components/LoveListSort";
import { useOrder } from "@/utils/api hooks/useOrder";
import { useAppSelector } from "@/store/hook";
import { OrderItem, status } from "@/types/orderTypes";
import { format } from "date-fns";

const OrderProduct = ({
  id,
  created_at,
  items,
  total_price,
}: {
  id: number;
  created_at: string;
  // image: string;
  items: OrderItem[];
  total_price: string;
  status: status;
}) => {
  const navigate = useNavigate();

  const formatCreatedDate = (created_date: string): string => {
    return format(new Date(created_date), "PP");
  };

  const createdDate = formatCreatedDate(created_at);
  console.log(createdDate);
  return (
    <div className="text-sm">
      <div
        key={id}
        className="flex justify-between border-t border-gray-400 py-2"
      >
        <div className="flex gap-4 items-start">
          <img
            src={"public/assets/products/product3.png"}
            width={150}
            height={150}
            className="place-self-center"
          />

          <div className="flex flex-col items-start gap-2">
            <h6 className="font-bold">Order Number: {id}</h6>
            {/* <p>{desc}</p> */}
            {/* <p>{size}</p> */}
            <small className="text-gray-600">Items</small>
            {items.map((product, index) => (
              <span key={product.id} className="text-xs">
                {product.variation.name}
                {index < items.length - 1 && ", "}
              </span>
            ))}
            <small className="text-gray-600">Total amount</small>
            <p className="font-bold">{total_price} MMK</p>
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <span className="place-self-end">{createdDate}</span>
          <p className="text-blue-600">
            <span onClick={() => navigate(`/order-list/${id}`)}>
              View Order
            </span>
            <span> | </span> <span>Buy again</span>
          </p>
        </div>
      </div>
    </div>
  );
};

const OrderList = () => {
  const navigate = useNavigate();
  const userId = useAppSelector((state) => state.user.id);
  const { orderHistory } = useOrder(userId);
  console.log(orderHistory);

  const handleSortChange = (sort: string) => {
    console.log(sort);
  };
  return (
    <div className="py-6  space-y-4">
      <small
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <CaretLeft size={15} />
        Back to Home
      </small>
      <div className="">
        <h1 className="font-medium text-2xl">Order History</h1>
        <Separator className="my-4 bg-gray-400" />
        <LoveListSort onSortChange={handleSortChange} type="order-list" />

        <div className="grid grid-cols-1 gap-4 w-full mt-4">
          {orderHistory?.map((product) => {
            return (
              <OrderProduct
                key={product.id}
                id={product.id}
                status={product.status}
                // size={product.size}
                // color={product.color}
                items={product.order_items}
                total_price={product.total_price}
                created_at={product.created_date}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrderList;
