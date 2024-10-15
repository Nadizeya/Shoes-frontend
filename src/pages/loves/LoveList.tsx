import React, { useState } from "react";
import { CaretLeft, Export, CaretDown } from "@phosphor-icons/react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { products } from "../home/products";

const sortOptions: {
  value: string;
  label: string;
}[] = [
  {
    value: "recently_added",
    label: "Recenty Added",
  },
  {
    value: "recently_added",
    label: "Brand name A-Z",
  },
  {
    value: "recently_added",
    label: "Brand name Z-A",
  },
  {
    value: "recently_added",
    label: "Price high to low",
  },
  {
    value: "recently_added",
    label: "Price low to high",
  },
];

const LoveListSort = () => {
  const [sortList, setsortList] = useState("Recenty Added");

  return (
    <div className="flex justify-between">
      <span className="flex gap-2 font-bold">
        <Export size={23} />
        Share
      </span>

      <div className="flex gap-2">
        <p>Sort By:</p>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 ">
            {sortList}
            <CaretDown size={20} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="space-y-1">
            {sortOptions.map((sort) => (
              <DropdownMenuItem
                onClick={() => setsortList(sort.label)}
                className="cursor-pointer"
                key={sort.value}
              >
                {sort.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

const LoveList = () => {
  const navigate = useNavigate();
  const [changeheart, setChangeheart] = useState(false);
  console.log(products);
  return (
    <div className="py-6 space-y-4">
      <span
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <CaretLeft size={20} />
        Back to Lists
      </span>

      {products?.length === 0 || !products ? (
        <div className="h-screen grid place-content-center text-center gap-4">
          <h5 className="font-bold">
            You haven't added any products to your Love Lists.
          </h5>
          <p className="font-light">
            Collect all your favorite and must-try products by clicking on the
            while you shop.
          </p>
        </div>
      ) : (
        <div className="">
          <h1 className="font-medium text-2xl">Loves</h1>
          <Separator className="my-4 bg-gray-400" />
          <LoveListSort />

          <div className="grid grid-cols-1 gap-4 w-full mt-4">
            {products?.map((product) => (
              <div
                key={product.id}
                className="flex justify-between border-t border-gray-400 py-2"
              >
                <div className="flex gap-4 items-start">
                  <img
                    src={product.image}
                    width={150}
                    height={150}
                    alt={product.title}
                  />

                  <div className="flex flex-col items-start gap-2">
                    <h6 className="font-bold">{product.title}</h6>
                    <p>{product.desc}</p>
                    <p>SIZE 30ml</p>
                    <p>Color : Red</p>
                    <p className="text-sky-500">View similar products</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <p>{product.price} MMK</p>
                  <Button className="text-white bg-red-600 rounded-full px-10">
                    Add to Basket
                  </Button>
                  {changeheart ? (
                    <FaHeart
                      className="text-red-500 cursor-pointer"
                      size={25}
                    />
                  ) : (
                    <FaRegHeart
                      onClick={() => setChangeheart(true)}
                      className="text-red-500 cursor-pointer"
                      size={25}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LoveList;
