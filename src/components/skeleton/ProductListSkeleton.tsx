const ProductListSkeleton = () => {
  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 gap-x-2 gap-y-6 justify-center">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="animate-pulse flex flex-col items-center space-y-2 bg-gray-200 rounded-md p-4 w-full h-[220px]"
        >
          <div className="w-full h-40 bg-gray-300 rounded-md"></div>
          <div className="h-4 bg-gray-300 w-3/4 rounded"></div>
          <div className="h-4 bg-gray-300 w-1/2 rounded"></div>
        </div>
      ))}
    </div>
  );
};

export default ProductListSkeleton;
