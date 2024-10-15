import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import useEmblaCarousel from "embla-carousel-react";
import { FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { Plus, Minus } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

const productsDetailsData = {
  id: 1,
  title: "Gro Hair serum",
  product_desc: "Absolut Repair 10 In 1 Hair Oil for Dry Hair",
  price: "10,00 Ks",
  size: ["30mL", "50mL", "100mL", "300mL", "120mL", "38mL"],
};

const products_images = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1590156546946-ce55a12a6a5d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fGxpcHN0aWNrfGVufDB8fDB8fHww",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1590156351885-f73330202730?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fGxpcHN0aWNrfGVufDB8fDB8fHww",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1591375372226-3531cf2eb6d3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fGxpcHN0aWNrfGVufDB8fDB8fHww",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1617422275563-4cf1103e7d60?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGxpcHN0aWNrfGVufDB8fDB8fHww",
  },
];

const ProductsInfo = () => {
  const [selectedSize, setSelectedSize] = React.useState("-");
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [changeheart, setChangeheart] = React.useState(false);
  const [carouselRef, api] = useEmblaCarousel();

  // Function to handle when a thumbnail is clicked
  const handleThumbnailClick = React.useCallback(
    (index) => {
      setSelectedIndex(index);
      if (api) {
        api.scrollTo(index); // Ensure the carousel scrolls to the selected image
      }
    },
    [api]
  );

  // Sync selected index with carousel when using Next/Previous buttons
  React.useEffect(() => {
    if (!api) return;
    const onSelect = () => {
      setSelectedIndex(api.selectedScrollSnap());
    };
    api.on("select", onSelect);
    return () => api.off("select", onSelect);
  }, [api]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
      <div className="flex flex-start h-full">
        <div className="flex flex-col gap-2">
          {products_images.map((imgUrl, index) => (
            <div
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`rounded-full w-12 h-12 border border-gray-400 cursor-pointer hover:border-blue-500 ${
                selectedIndex === index ? "border-blue-500" : ""
              }`}
            >
              <img
                src={imgUrl.url}
                alt={`Product ${index}`}
                className="rounded-full w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        <div className="basis-[60%] mx-auto">
          <Carousel ref={carouselRef}>
            <CarouselContent>
              {products_images.map((imgUrl, index) => (
                <CarouselItem key={index} className="h-60">
                  <img
                    src={imgUrl.url}
                    alt={`Product ${index}`}
                    className={`w-full h-full object-contain ${
                      index === selectedIndex ? "opacity-100" : "opacity-50"
                    }`} // Highlight selected image with opacity
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>

      {/* product info left side */}
      <div className="space-y-4">
        <div className="">
          <h4 className="font-bold ">{productsDetailsData.title}</h4>
          <p>{productsDetailsData.product_desc}</p>
        </div>
        <div className="">
          <h4 className="font-bold">{productsDetailsData.price}</h4>
          <p>Size : {selectedSize}</p>
        </div>

        <div className="">
          <h4>Size</h4>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {productsDetailsData?.size.map((s: string, index: number) => (
              <div
                key={index}
                onClick={() => setSelectedSize(s)}
                className={`border text-center  px-2 py-2 cursor-pointer rounded-sm text-black ${
                  selectedSize === s ? "border-gray-700" : "border-gray-300"
                }`}
              >
                {s}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4 my-4">
            <div className="text-white h-11 bg-red-600 rounded-full pl-4  pr-10 flex justify-start items-center gap-4">
              <div className="flex items-center gap-4 h-full border-r border-r-white pr-2  basis-[30%]">
                <Minus
                  className="cursor-pointer"
                  onClick={() => console.log("work")}
                />
                1
                <Plus
                  className="cursor-pointer"
                  onClick={() => console.log("work")}
                />
              </div>
              <span className="basis-[70%] cursor-pointer">Add to Basket</span>
            </div>
            {changeheart ? (
              <FaHeart className="text-red-500 cursor-pointer" size={25} />
            ) : (
              <FaRegHeart
                onClick={() => setChangeheart(true)}
                className="text-red-500 cursor-pointer"
                size={25}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsInfo;
