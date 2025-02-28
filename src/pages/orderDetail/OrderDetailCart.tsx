import { Separator } from "@/components/ui/separator";
import useResponsive from "@/utils/useResponsive";
import { BASE_URL } from "@/api/BaseService";
import { OrderDetailItem } from "@/types/orderTypes";

const CartItem = ({
  id,
  title,
  image,
  price,
  size,
  quantity,
}: {
  id: number;
  title: string;
  image: string;
  desc?: string;
  price: number;
  size: string;
  quantity: number;
}) => {
  return (
    <div className="w-full">
      <div className="px-12 gap-10 flex items-start">
        <div className="px-12">
          <img src={image} alt={title} className="w-[250px] h-[250px] py-6" />
        </div>
        <div className="flex flex-col gap-1  px-12 py-6 ">
          <h2 className="font-bold tracking-wider text-lg">{title}</h2>
          <p>Absolut Repair 10-In-1 Hair Oil for Dry Hair</p>
          <small className="text-muted-foreground">Size: {size}</small>
          {/* <span className="text-xs">{color}</span> */}
          <div className="flex w-[300px] justify-between items-center gap-4 mt-4">
            <span className="border rounded-2xl border-black px-4 ">
              {quantity}
            </span>
            <span className="font-bold">{price} Ks</span>
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
  price,
  size,
  quantity,
}: {
  id: number;
  title: string;
  image: string;
  desc?: string;
  price: number;
  size: string;
  quantity: number;
}) => {
  return (
    <div>
      <div className="flex justify-around ">
        <img src={image} alt={title} className="w-[200px] h-[200px] p-4" />
        <div className="flex flex-col justify-center ">
          <div className="mb-2 flex justify-between items-center">
            <h2 className="font-bold">{title}</h2>
          </div>
          {/* <p>{desc}</p> */}
          <small className="text-muted-foreground">Size: {size}</small>
          {/* <span className="text-xs">{color}</span> */}
        </div>
      </div>
      <div className="flex justify-between items-center mt-4 p-4 px-10 md:px-16 ">
        <div className="flex gap-2"></div>
        <span>{price} Ks</span>
      </div>
      <Separator />
    </div>
  );
};
type CartCompProps = {
  cartItems: OrderDetailItem[];
};

const OrderDetailCart = ({ cartItems }: CartCompProps) => {
  const { desktopResponsive, mobileResponsive, tabletResponsive } =
    useResponsive();

  return (
    <div className="w-full sm:w-[80%] lg:w-[70%] xl:w-[70%] border rounded-lg shadow-lg">
      {desktopResponsive &&
        cartItems?.map((item, index) => (
          <CartItem
            key={index}
            id={item.id}
            title={item.name}
            image={BASE_URL + item.image}
            price={item.price}
            size={item.size}
            quantity={item.quantity}
          />
        ))}
      {(mobileResponsive || tabletResponsive) &&
        cartItems?.map((item, index) => (
          <MobileCartItem
            key={index}
            id={item.id}
            title={item.name}
            image={BASE_URL + item.image}
            price={item.price}
            size={item.size}
            quantity={item.quantity}
          />
        ))}
    </div>
  );
};

export default OrderDetailCart;
