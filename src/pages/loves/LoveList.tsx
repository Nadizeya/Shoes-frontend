import { useEffect, useState } from "react";
import { CaretLeft } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Delete from "/assets/add-to-cart/delete.svg";
import { useWishList } from "@/utils/api hooks/useWishList";
import { LoveListSort } from "./components/LoveListSort";
import { BASE_URL } from "@/api/BaseService";
import { removeWishList } from "@/api/endpoints/wishlistApi";
import { useMutation } from "@tanstack/react-query";
import { decrementLoveList } from "@/store/slices/user/userSlice";
import { useAppDispatch } from "@/store/hook";

type LoveProductProps = {
  variation_id: number;
  product_id: number;
  price: number;
  name: string;
  short_description: string;
  image: string;
  // handleDelete: void;
};

const LoveProduct = ({
  variation_id,
  product_id,
  price,
  name,
  short_description,
  image,
}: // handleDelete,
LoveProductProps) => {
  const navigate = useNavigate();

  return (
    <div
      key={variation_id}
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
          <p>{short_description}</p>
          {/* <p>{size}</p> */}
          {/* <p>{color}</p> */}
          <p className="text-sky-500 text-sm md:text-[16px]">
            View similar products
          </p>
          <div className="md:hidden flex items-center gap-3">
            <Button
              className="text-white bg-red-600 rounded-full px-5"
              onClick={() => navigate(`/products/${variation_id}`)}
            >
              Add to Basket
            </Button>

            <img
              src={Delete}
              // onClick={handleDelete(variation_id)}
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

        <img src={Delete} className="cursor-pointer" />
      </div>
      <p className="md:hidden font-bold">{price} MMK</p>
    </div>
  );
};

const LoveList = () => {
  const navigate = useNavigate();
  const { isSuccess, wishListsData } = useWishList();
  const [sortedData, setSortedData] = useState(wishListsData || []);
  const dispatch = useAppDispatch();

  const mutation = useMutation({
    mutationFn: removeWishList,
  });

  // const handleDelete = (id: number) => {
  //   const wishListData = {
  //     product_variation_id: id,
  //   };
  //   mutation.mutate(wishListData, {
  //     onSuccess: () => {
  //       dispatch(decrementLoveList());
  //     },
  //   });
  // };

  useEffect(() => {
    if (wishListsData && isSuccess) {
      setSortedData(wishListsData);
    }
  }, [isSuccess, wishListsData]);

  console.log(sortedData, "sorted");

  const handleSortChange = (sort: string) => {
    if (!wishListsData || !isSuccess) return;

    // Sorting logic can be added here if needed
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
                the heart while you shop.
              </p>
            </div>
          ) : (
            <div>
              <h1 className="font-medium text-2xl">Loves</h1>
              <Separator className="my-4 bg-gray-400" />
              <LoveListSort onSortChange={handleSortChange} type="love-list" />

              <div className="grid grid-cols-1 gap-4 w-full mt-4">
                {sortedData?.map((product) => {
                  return (
                    <LoveProduct
                      key={product.variation_id}
                      image={product.image}
                      name={product.name}
                      price={product.price}
                      product_id={product.product_id}
                      short_description={product.short_description}
                      variation_id={product.variation_id}
                      // handleDelete={handleDelete}
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
