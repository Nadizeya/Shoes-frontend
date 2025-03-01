import React, { useEffect, useMemo } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { Plus, Minus } from "@phosphor-icons/react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { BASE_URL } from "@/api/BaseService";
import { useAuth } from "@/utils/useAuth";
import { useNavigate } from "react-router-dom";
import { postAddToCartT } from "@/utils/api hooks/useProductDetail";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postAddToCart } from "@/api/endpoints/productsApi";
import {
  setItemHeart,
  // setSelectedColor,
  setSelectedItem,
  setSelectedSize,
} from "@/store/slices/Products/productSlice";
import { addToWishList, removeWishList } from "@/api/endpoints/wishlistApi";
import {
  decrementLoveList,
  incrementAddToCart,
  incrementLoveList,
} from "@/store/slices/user/userSlice";

const ProductsInfo = () => {
  // taking out datas from store
  const productsDetailsData = useAppSelector(
    (state) => state.productDetail.productDetail
  );
  const items = useAppSelector(
    (state) => state.productDetail.productDetail.product_variations
  );
  const selectedProductVariation = useAppSelector(
    (state) => state.productDetail.selectedItem
  );
  const selectedSize = useAppSelector(
    (state) => state.productDetail.selectedItem.size
  );
  const isLoved = useAppSelector(
    (state) => state.productDetail.productDetail.isLoved
  );

  const media = useMemo(() => {
    if (!selectedProductVariation) return [];

    const images =
      selectedProductVariation.images?.map((img) => ({
        type: "image",
        url: img,
      })) || [];

    const videos =
      selectedProductVariation.videos?.map((vid) => ({
        type: "video",
        url: vid,
      })) || [];

    // Combine both images and videos
    return [...images, ...videos]; // If order matters, modify accordingly
  }, [selectedProductVariation]);

  console.log(media, "media");

  // using hooks for functions
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { authenticated } = useAuth();
  const [selectedQuantity, setSelectQuantity] = React.useState(1);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [api, setApi] = React.useState(null);
  const queryClient = useQueryClient();

  //Logic for sizes and colors
  const uniqueSizes = [...new Set(items.map((v) => v.size))];

  const getAvailableColors = (size: string) => {
    return items
      .filter((variation) => variation.size === size)
      .map((variation) => variation.images[0]);
  };

  // Set available colors based on initial size
  const [availableColors, setAvailableColors] = React.useState<string[]>(
    getAvailableColors(selectedSize)
  );

  // Mutations called

  const addMutation = useMutation({
    mutationFn: addToWishList,
    onMutate: async (wishListData) => {
      // Optimistically update UI
      dispatch(setItemHeart(true));

      return { previousState: isLoved };
    },
    onSuccess: () => {
      console.log("Added to wishlist");
    },
    onError: (_error, _variables, context) => {
      // Rollback if API fails
      if (context?.previousState) {
        dispatch(setItemHeart(context.previousState));
      }
    },
  });

  const removeMutation = useMutation({
    mutationFn: removeWishList,
    onMutate: async (wishListData) => {
      dispatch(setItemHeart(false));

      return { previousState: isLoved };
    },
    onSuccess: () => {
      console.log("Removed from wishlist");
    },
    onError: (_error, _variables, context) => {
      if (context?.previousState) {
        dispatch(setItemHeart(context.previousState));
      }
    },
  });

  const basketMutation = useMutation({
    mutationFn: postAddToCart,
  });

  // Buttons handling events
  const handleSizeClick = (size: string) => {
    dispatch(setSelectedSize(size));

    // Get colors available for the selected size
    const colorsForSize = getAvailableColors(size);
    setAvailableColors(colorsForSize);

    // Auto-select first color for the selected size
    if (colorsForSize.length > 0) {
      handleColorClick(colorsForSize[0], size);
    }
  };

  const handleColorClick = (selectedImage: string, size: string) => {
    const matchingVariation = items.find(
      (variation) =>
        variation.images[0] === selectedImage && variation.size === size
    );

    if (matchingVariation) {
      dispatch(setSelectedItem(matchingVariation));
    }
  };

  const handleIncrement = () => {
    if (selectedQuantity < 5) {
      setSelectQuantity((prev) => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (selectedQuantity > 1) {
      setSelectQuantity((prev) => prev - 1);
    }
  };

  const toggleHeart = (id: number) => {
    if (!authenticated) {
      navigate("/login");
    }
    const wishListData = {
      product_variation_id: id,
    };
    if (isLoved) {
      removeMutation.mutate(wishListData, {
        onSuccess: () => {
          dispatch(setItemHeart(false));
          queryClient.invalidateQueries({ queryKey: ["wishlist"] });
          dispatch(decrementLoveList());
        },
      });
    } else {
      addMutation.mutate(wishListData, {
        onSuccess: () => {
          dispatch(setItemHeart(true)); // Ensure correct dispatch
          queryClient.invalidateQueries({ queryKey: ["wishlist"] });
          dispatch(incrementLoveList());
        },
      });
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
    basketMutation.mutate(addToCartProduct, {
      onSuccess: () => {
        dispatch(incrementAddToCart());
        navigate("/checkout"); // Dispatch the action after successful API call
      },
    });
  };

  const handleThumbnailClick = (index: number) => {
    if (api) {
      setSelectedIndex(index);
      api.scrollTo(index); // Scroll to the selected index
    }
  };

  // UseEffect logics for page rerenders
  useEffect(() => {
    if (items.length > 0) {
      const firstSize = uniqueSizes[0]; // Pick first size
      dispatch(setSelectedSize(firstSize));

      const colorsForSize = getAvailableColors(firstSize);
      setAvailableColors(colorsForSize);

      if (colorsForSize.length > 0) {
        handleColorClick(colorsForSize[0], firstSize);
      }
    }
  }, [items]);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      const currentIndex = api.selectedScrollSnap(); // Get the current visible index
      setSelectedIndex(currentIndex);
    };

    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    // Thumbnails Comp
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
      <div className="flex flex-start h-full">
        {/* Thumbnails */}
        <div className="flex flex-col gap-2 h-60 overflow-y-scroll no-scrollbar">
          {media.length > 0 ? (
            media.map((item, index) => (
              <div
                key={index}
                onClick={() => handleThumbnailClick(index)}
                className={`rounded-full w-12 h-12 border cursor-pointer hover:border-blue-500 ${
                  selectedIndex === index ? "border-black border-2" : ""
                }`}
              >
                {item.type === "image" ? (
                  <img
                    src={BASE_URL + item.url || "/assets/products/product3.png"}
                    alt={`Media ${index}`}
                    className="rounded-full w-full h-full object-cover"
                  />
                ) : (
                  <video className="rounded-full w-full h-full object-cover">
                    <source src={BASE_URL + item.url} type="video/mp4" />
                  </video>
                )}
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

        {/* Carousel */}
        <div className="basis-[60%] mx-auto">
          <Carousel setApi={setApi}>
            <CarouselContent>
              {media.map((item, index) => (
                <CarouselItem key={index} className="h-60">
                  {item.type === "image" ? (
                    <img
                      src={
                        BASE_URL + item.url || "/assets/products/product3.png"
                      }
                      alt={`Media ${index}`}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <video controls className="w-full h-full object-contain">
                      <source src={BASE_URL + item.url} type="video/mp4" />
                    </video>
                  )}
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
        <div className="space-y-1">
          <h4 className="font-bold ">{productsDetailsData.name}</h4>
          <p>{productsDetailsData.short_description}</p>
        </div>
        <h4 className="font-bold">{selectedProductVariation.price} Ks</h4>
        <p>Size : {selectedProductVariation.size}</p>

        <div className="space-y-2">
          {/* Sizes */}

          <h4>Colors</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 w-3/4 px-1 ">
            {availableColors.map((imageUrl, index) => (
              <div
                key={index}
                onClick={() => handleColorClick(imageUrl, selectedSize)}
                className={`w-9 h-9 cursor-pointer border-2 flex items-center rounded justify-center transition-all duration-200 transform hover:scale-105 hover:shadow-lg ${
                  selectedProductVariation.images[0] === imageUrl
                    ? "border-gray-700"
                    : "border-gray-300 hover:border-gray-500"
                }`}
              >
                <img
                  src={BASE_URL + imageUrl}
                  alt={`Color ${index}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          <h4>Size</h4>

          <div className="w-3/4 2xl:w-3/5 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {uniqueSizes.map((size, index) => (
              <div
                key={index}
                onClick={() => handleSizeClick(size)}
                className={`border text-center py-1 cursor-pointer rounded-sm hover:bg-slate-200 ${
                  selectedSize === size ? "border-gray-700" : "border-gray-300"
                }`}
              >
                {size}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4 my-4">
            <div className="text-white h-11 bg-red-600 rounded-full pl-4  pr-10 flex justify-start items-center gap-4 mt-2">
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
                onClick={() => addToCart(selectedProductVariation?.id)}
              >
                {basketMutation.isPending ? "Adding..." : "Add to Basket"}
              </span>
            </div>
            {isLoved ? (
              <button
                key="loved"
                onClick={() =>
                  !removeMutation.isPending &&
                  toggleHeart(selectedProductVariation?.id)
                }
                disabled={removeMutation.isPending} // Properly disables button
                className={`text-red-500 ${
                  removeMutation.isPending
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                <FaHeart size={25} />
              </button>
            ) : (
              <button
                key="not-loved"
                onClick={() =>
                  !addMutation.isPending &&
                  toggleHeart(selectedProductVariation?.id)
                }
                disabled={addMutation.isPending} // Properly disables button
                className={`text-red-500 ${
                  addMutation.isPending
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                <FaRegHeart size={25} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsInfo;
