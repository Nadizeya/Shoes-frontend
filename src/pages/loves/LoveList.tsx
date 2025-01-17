import { useEffect, useState } from "react";
import { CaretLeft } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Delete from "/assets/add-to-cart/delete.svg";
import { useWishList } from "@/utils/api hooks/useWishList";
import { LoveListSort } from "./components/LoveListSort";
import { BASE_URL } from "@/api/BaseService";

const LoveProduct = ({
  name,
  id,
  image,
  size,
  color,
  desc,
  price,
}: {
  name: string;
  id: number;
  image: string;
  desc: string;
  price: number;
  size: string;
  color: string;
}) => {
  const navigate = useNavigate();

  return (
    <div
      key={id}
      className="flex justify-between border-t border-gray-400 py-2"
    >
      <div className="flex gap-4 items-start">
        <img
          src={BASE_URL + image}
          width={150}
          height={150}
          alt={name}
          className="place-self-center"
        />

        <div className="flex flex-col items-start gap-2">
          <h6 className="font-bold">{name}</h6>
          <p>{desc}</p>
          <p>{size}</p>
          <p>{color}</p>
          <p className="text-sky-500 text-sm md:text-[16px]">
            View similar products
          </p>
          <div className=" md:hidden flex items-center gap-3">
            <Button
              className="text-white bg-red-600 rounded-full px-5"
              onClick={() => navigate(`/products/${id}`)}
            >
              Add to Basket
            </Button>

            <img src={Delete} className="cursor-pointer" />
            {/* {changeheart ? (
              <FaHeart className="text-red-500 cursor-pointer" size={25} />
            ) : (
              <FaRegHeart
                onClick={() => setChangeheart(true)}
                className="text-red-500 cursor-pointer"
                size={25}
              />
            )} */}
          </div>
        </div>
      </div>
      <div className="hidden md:flex items-center gap-3">
        <p>{price} MMK</p>
        <Button
          className="text-white bg-red-600 rounded-full px-10"
          onClick={() => navigate(`/products/${id}`)}
        >
          Add to Basket
        </Button>

        <img src={Delete} className="cursor-pointer" />
        {/* {changeheart ? (
              <FaHeart className="text-red-500 cursor-pointer" size={25} />
            ) : (
              <FaRegHeart
                onClick={() => setChangeheart(true)}
                className="text-red-500 cursor-pointer"
                size={25}
              />
            )} */}
      </div>
      <p className="md:hidden font-bold">{price} MMK</p>
    </div>
  );
};

const LoveList = () => {
  const navigate = useNavigate();
  const { isSuccess, wishListsData } = useWishList();
  const [sortedData, setSortedData] = useState(wishListsData || []);

  useEffect(() => {
    if (wishListsData && isSuccess) {
      setSortedData(wishListsData);
    }
  }, [isSuccess, wishListsData]);

  console.log(sortedData, "sorted");

  const handleSortChange = (sort: string) => {
    if (!wishListsData || !isSuccess) return; // Ensure sorting only works when data is fetched

    const sorted = [...wishListsData].sort((a, b) => {
      if (sort === "Recently Added") {
        const dateA = new Date(a.pivot.created_at).getTime();
        const dateB = new Date(b.pivot.created_at).getTime();
        console.log("Date A:", dateA, "Date B:", dateB);
        return dateB - dateA;
      } else if (sort === "Price low to high") {
        console.log(
          a.product.original_price,
          b.product.original_price,
          " a and b"
        );
        return a.product.original_price - b.product.original_price;
      } else if (sort === "Price high to low") {
        return a.product.original_price - b.product.original_price;
      } else if (sort === "Name A to Z") {
        return a.product.name.localeCompare(b.product.name);
      } else if (sort === "Name Z to A") {
        return b.product.name.localeCompare(a.product.name);
      }
      return 0;
    });
    setSortedData(sorted);
  };

  return (
    <div>
      {isSuccess && (
        <div className="py-6 space-y-4">
          <span
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <CaretLeft size={20} />
            Back to Lists
          </span>

          {sortedData?.length === 0 ? (
            <div className="h-screen grid place-content-center text-center gap-4">
              <h5 className="font-bold">
                You haven't added any products to your Love Lists.
              </h5>
              <p className="font-light">
                Collect all your favorite and must-try products by clicking on
                the while you shop.
              </p>
            </div>
          ) : (
            <div className="">
              <h1 className="font-medium text-2xl">Loves</h1>
              <Separator className="my-4 bg-gray-400" />
              <LoveListSort onSortChange={handleSortChange} type="love-list" />

              <div className="grid grid-cols-1 gap-4 w-full mt-4">
                {sortedData?.map((product) => {
                  return (
                    <LoveProduct
                      key={product.id}
                      id={product.id}
                      size={product.size}
                      color={product.color}
                      image={
                        product.product.images?.[0]?.path || "default-image.jpg"
                      }
                      price={product.product.original_price}
                      name={product.product.name}
                      desc={product.product.short_description}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LoveList;
