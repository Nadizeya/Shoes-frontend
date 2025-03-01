const LoveListSkeleton = () => {
  return (
    <div className="animate-pulse space-y-4">
      {[1, 2, 3].map((index) => (
        <div
          key={index}
          className="flex justify-between border-t border-gray-400 py-5"
        >
          <div className="flex gap-4 items-start">
            <div className="w-[300px] h-[150px] bg-gray-300 rounded-md"></div>
            <div className="flex flex-col gap-2 w-full">
              <div className="h-4 bg-gray-300 w-1/3 rounded"></div>
              <div className="h-4 bg-gray-300 w-2/3 rounded"></div>
              <div className="h-4 bg-gray-300 w-1/4 rounded"></div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <div className="h-6 bg-gray-300 w-16 rounded"></div>
            <div className="h-10 bg-gray-300 w-24 rounded"></div>
            <div className="h-6 bg-gray-300 w-10 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoveListSkeleton;
