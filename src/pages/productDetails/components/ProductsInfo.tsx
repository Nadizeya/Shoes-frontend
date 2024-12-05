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
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { BASE_URL } from "@/api/BaseService";
import { useAuth } from "@/utils/useAuth";
import { useNavigate } from "react-router-dom";
import { postAddToCartT } from "@/utils/useProductDetail";
import { useMutation } from "@tanstack/react-query";
import { postAddToCart } from "@/api/endpoints/productsApi";
import {
  setSelectedColor,
  setSelectedItem,
  setSelectedSize,
} from "@/store/slices/Products/productSlice";
import { addToWishList, removeWishList } from "@/api/endpoints/wishlistApi";

const ProductsInfo = () => {
  // taking out datas from store
  const productsDetailsData = useAppSelector(
    (state) => state.productDetail.productDetail
  );
  const items = useAppSelector(
    (state) => state.productDetail.productDetail.items
  );
  const selectedItem = useAppSelector(
    (state) => state.productDetail.selectedItem
  );
  const selectedSize = useAppSelector(
    (state) => state.productDetail.selectedItem.size
  );
  const selectedColor = useAppSelector(
    (state) => state.productDetail.selectedItem.color
  );

  // using hooks for functions
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { authenticated } = useAuth();
  const [selectedQuantity, setSelectQuantity] = React.useState(1);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [changeheart, setChangeheart] = React.useState(false);
  const [carouselRef, api] = useEmblaCarousel();

  // when size changed only available will show
  const availableColors = items
    .filter((item) => item.size === selectedItem.size)
    .map((item) => item.color);
  console.log(selectedItem);

  const handleThumbnailClick = React.useCallback(
    (index: any) => {
      setSelectedIndex(index);
      if (api) {
        api.scrollTo(index); // Ensure the carousel scrolls to the selected image
      }
    },
    [api]
  );

  // Mutations called
  const addMutation = useMutation({
    mutationFn: addToWishList,
    onSuccess: () => {
      setChangeheart(true);
    },
    onError: (error: any) => {
      console.error("Error adding to wishlist:", error.message);
    },
  });

  const removeMutation = useMutation({
    mutationFn: removeWishList,
    onSuccess: () => {
      setChangeheart(false);
      console.log("Removed from wishlist");
    },
    onError: (error: any) => {
      console.error("Error removing from wishlist:", error.message);
    },
  });

  const basketMutation = useMutation({
    mutationFn: postAddToCart,
  });

  // Buttons handling events
  const handleSizeClick = (s: string) => {
    dispatch(setSelectedSize(s));
    const changedItem = items.filter(
      (item) => item.size === s && item.color === selectedColor
    );
    dispatch(setSelectedItem(changedItem[0]));
    console.log(selectedItem, "items");
  };

  const handleColorClick = (s: string) => {
    dispatch(setSelectedColor(s));
    const changedItem = items.filter(
      (item) => item.size === selectedSize && item.color === s
    );
    dispatch(setSelectedItem(changedItem[0]));
  };

  const handleIncrement = () => {
    setSelectQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setSelectQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const toggleHeart = () => {
    const wishListData = {
      product_id: productsDetailsData.id,
    };
    if (changeheart) {
      removeMutation.mutate(wishListData);
    } else {
      addMutation.mutate(wishListData);
    }
  };
  const addToCart = (id: number) => {
    const addToCartProduct: postAddToCartT = {
      product_id: productsDetailsData.id,
      product_variations_id: id,
      quantity: selectedQuantity,
    };

    if (!authenticated) {
      console.log("Not authenticated");
      navigate("/login");
    }
    basketMutation.mutate(addToCartProduct);
  };

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
          {productsDetailsData.images &&
          productsDetailsData.images.length > 0 ? (
            productsDetailsData.images.map((imgUrl, index) => (
              <div
                key={index}
                onClick={() => handleThumbnailClick(index)}
                className={`rounded-full w-12 h-12 border border-gray-400 cursor-pointer hover:border-blue-500 ${
                  selectedIndex === index ? "border-blue-500" : ""
                }`}
              >
                <img
                  src={BASE_URL + imgUrl}
                  alt={`Product ${index}`}
                  className="rounded-full w-full h-full object-cover"
                />
              </div>
            ))
          ) : (
            <div className="rounded-full w-12 h-12 border border-gray-400 cursor-pointer hover:border-blue-500">
              <img
                src="/assets/products/product3.png"
                alt="Placeholder"
                className="rounded-full w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        <div className="basis-[60%] mx-auto">
          <Carousel ref={carouselRef}>
            <CarouselContent>
              {productsDetailsData.images?.map((imgUrl, index) => (
                <CarouselItem key={index} className="h-60">
                  <img
                    src={BASE_URL + imgUrl}
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
          <h4 className="font-bold ">{productsDetailsData.name}</h4>
          <p>{productsDetailsData.short_description}</p>
        </div>
        <h4 className="font-bold">{selectedItem.price} Ks</h4>
        <p>Size : {selectedItem.size}</p>

        <div className="space-y-2">
          <h4>Size</h4>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {productsDetailsData?.sizes.map((s: string, index: number) => (
              <div
                key={index}
                onClick={() => handleSizeClick(s)}
                className={`border text-center  px-2 py-2 cursor-pointer rounded-sm text-black ${
                  selectedItem.size === s
                    ? "border-gray-700"
                    : "border-gray-300"
                }`}
              >
                {s}
              </div>
            ))}
          </div>
          <h4>Colors</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {(selectedItem.size
              ? availableColors
              : productsDetailsData.colors
            ).map((color: string, index: number) => (
              <div
                key={index}
                onClick={() => handleColorClick(color)}
                className={`w-10 h-10 cursor-pointer rounded-full border-2 flex items-center justify-center ${
                  selectedItem.color === color
                    ? "border-gray-700  "
                    : "border-gray-300"
                }`}
                style={{ backgroundColor: color }}
                title={color}
              ></div>
            ))}
          </div>

          <div className="flex items-center gap-4 my-4">
            <div className="text-white h-11 bg-red-600 rounded-full pl-4  pr-10 flex justify-start items-center gap-4">
              <div className="flex items-center gap-4 h-full border-r border-r-white pr-2  basis-[30%]">
                <Minus className="cursor-pointer" onClick={handleDecrement} />
                {selectedQuantity}
                <Plus className="cursor-pointer" onClick={handleIncrement} />
              </div>

              <span
                className={`basis-[70%] cursor-pointer ${
                  basketMutation.isPending
                    ? "cursor-not-allowed opacity-50"
                    : ""
                }`}
                onClick={() => addToCart(selectedItem?.id)}
              >
                {basketMutation.isPending ? "Adding..." : "Add to Basket"}
              </span>
            </div>
            {changeheart ? (
              <FaHeart
                onClick={removeMutation.isPending ? undefined : toggleHeart}
                className={`text-red-500 cursor-pointer ${
                  removeMutation.isPending
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                size={25}
              />
            ) : (
              <FaRegHeart
                onClick={addMutation.isPending ? undefined : toggleHeart}
                className={`text-red-500 cursor-pointer ${
                  removeMutation.isPending
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
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
