import React, { useEffect, useState } from "react";
import { CaretLeft, Export, CaretDown } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Delete from "/assets/add-to-cart/delete.svg";
import { products } from "../home/products";
import { useWishList } from "@/utils/useWishList";
import { LoveListSort } from "./components/LoveListSort";
import { BASE_URL } from "@/api/BaseService";

const LoveProduct = ({
  id,
  image,
  title,
  desc,
  price,
}: {
  id: number;
  image: string;
  title: string;
  desc: string;
  price: number;
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
          alt={title}
          className="place-self-center"
        />

        <div className="flex flex-col items-start gap-2">
          <h6 className="font-bold">{title}</h6>
          <p>{desc}</p>
          <p>SIZE 30ml</p>
          <p>Color : Red</p>
          <p className="text-sky-500">View similar products</p>
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
  const { isError, isLoading, isSuccess, wishListsData } = useWishList();
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
        console.log(a.original_price, b.original_price, " a and b");
        return a.original_price - b.original_price;
      } else if (sort === "Price high to low") {
        return b.original_price - a.original_price;
      } else if (sort === "Name A to Z") {
        return a.name.localeCompare(b.name);
      } else if (sort === "Name Z to A") {
        return b.name.localeCompare(a.name);
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
              <LoveListSort onSortChange={handleSortChange} />

              <div className="grid grid-cols-1 gap-4 w-full mt-4">
                {sortedData?.map((product) => {
                  return (
                    <LoveProduct
                      key={product.id}
                      id={product.id}
                      image={product.images?.[0]?.path || "default-image.jpg"}
                      price={product.original_price}
                      title={product.name}
                      desc={product.description}
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
