import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const data = [
  {
    id: 1,
    title: "aa",
    desc: "adjs",
    image: "https://via.placeholder.com/150/1",
    price: 1000,
  },
  {
    id: 2,
    title: "bb",
    desc: "bcjs",
    image: "https://via.placeholder.com/150/2",
    price: 1500,
  },
  {
    id: 3,
    title: "cc",
    desc: "ccjs",
    image: "https://via.placeholder.com/150/3",
    price: 2000,
  },
  {
    id: 4,
    title: "dd",
    desc: "ddjs",
    image: "https://via.placeholder.com/150/4",
    price: 2500,
  },
  {
    id: 5,
    title: "ee",
    desc: "eejs",
    image: "https://via.placeholder.com/150/5",
    price: 3000,
  },
  {
    id: 6,
    title: "ff",
    desc: "ffjs",
    image: "https://via.placeholder.com/150/6",
    price: 3500,
  },
  {
    id: 7,
    title: "gg",
    desc: "ggjs",
    image: "https://via.placeholder.com/150/7",
    price: 4000,
  },
];

const BrandsHomeComp = () => {
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-lg font-bold">Characters</h1>
        <Link to={`/brands`}>
          <Button>View More</Button>
        </Link>
      </div>

      {/* map data from api */}
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 py-4">
        {data.map((brand) => (
          <Card key={brand.id} className="p-4">
            <CardTitle>{brand.title}</CardTitle>
            <Link to={`/brands/${brand.id}`}>
              <CardContent className="cursor-pointer">
                <img src={brand.image} className="bg-red-500" />
              </CardContent>
            </Link>
            <CardDescription>{brand.desc}</CardDescription>
            <CardFooter>{brand.price}</CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BrandsHomeComp;
