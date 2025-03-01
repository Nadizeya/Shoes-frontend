import { useEffect, useState } from "react";
import { CaretLeft } from "@phosphor-icons/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Delete from "/assets/add-to-cart/delete.svg";
import { useWishList } from "@/utils/api hooks/useWishList";
import { BASE_URL } from "@/api/BaseService";
import { removeWishList } from "@/api/endpoints/wishlistApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppDispatch } from "@/store/hook";
import { decrementLoveList } from "@/store/slices/user/userSlice";
import MainLoading from "@/components/shared/MainLoading";
import LoveListSkeleton from "./components/LoveListSkeleton";

type LoveProductProps = {
  variation_id: number;
  product_id: number;
  price: number;
  name: string;
  short_description: string;
  image: string;
  onDelete: (id: number) => void;
};

const LoveProduct = ({
  variation_id,
  product_id,
  price,
  name,
  short_description,
  image,
  onDelete,
}: LoveProductProps) => {
  const navigate = useNavigate();

  return (
    <div
      key={variation_id}
      className="flex text-sm md:text-base justify-between border-t border-gray-400 py-5"
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
          <h6 className="font-bold w-[70px] md:w-full">{name}</h6>
          <p>{short_description}</p>
          {/* <p>{size}</p> */}
          {/* <p>{color}</p> */}
          <Link
            to={`/products/${product_id}`}
            className="text-sky-500 text-sm md:text-[16px]"
          >
            View product's details
          </Link>
          <div className="md:hidden flex items-center gap-3">
            <Button
              className="text-white bg-red-600 rounded-full px-5"
              onClick={() => navigate(`/products/${product_id}`)}
            >
              Add to Basket
            </Button>

            <img
              src={Delete}
              onClick={() => onDelete(variation_id)}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>
      <div className="hidden md:flex items-center gap-3">
        <p>{price} MMK</p>
        <Button
          className="text-white bg-red-600 rounded-full px-10"
          onClick={() => navigate(`/products/${variation_id}`)}
        >
          Add to Basket
        </Button>
        <img
          src={Delete}
          onClick={() => onDelete(variation_id)}
          className="cursor-pointer"
        />{" "}
      </div>
      <p className="md:hidden font-bold">{price} MMK</p>
    </div>
  );
};

const LoveList = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const { wishListsData, isSuccess, isLoading, isFetching } = useWishList();

  const mutation = useMutation({
    mutationFn: removeWishList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
  });

  const handleDelete = (id: number) => {
    const wishListData = {
      product_variation_id: id,
    };
    dispatch(decrementLoveList());
    mutation.mutate(wishListData);
  };

  return (
    <div className="py-6 space-y-4">
      <span
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <CaretLeft size={20} />
        Back
      </span>

      {/* ✅ Show skeleton while fetching or loading */}
      {isLoading || isFetching ? (
        <LoveListSkeleton />
      ) : isSuccess && wishListsData?.length === 0 ? (
        <div className="md:h-screen grid place-content-center text-center">
          <div>
            <img src="/assets/error.png" className="w-2/3 h-4/5" alt="" />
            <h5 className="font-bold">
              You haven't added any products to your Love Lists.
            </h5>
            <p className="font-light">
              Collect all your favorite and must-try products by clicking on the
              heart while you shop.
            </p>
          </div>
        </div>
      ) : (
        <div>
          <h1 className="text-xl md:text-2xl font-bold">Loves</h1>
          <div className="grid grid-cols-1 gap-4 w-full mt-4">
            {wishListsData?.map((product) => (
              <LoveProduct
                key={product.variation_id}
                image={product.image}
                name={product.name}
                price={product.price}
                product_id={product.product_id}
                short_description={product.short_description}
                variation_id={product.variation_id}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LoveList;
