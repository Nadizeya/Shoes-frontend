const HeroCard = ({
  image,
  title,
  description,
  background,
}: {
  image: string;
  title: string;
  description: string;
  background: string;
}) => {
  return (
    <div
      style={{ backgroundColor: background }}
      className="rounded-md shadow-lg 2xl:min-w-[545px] 2xl:w-[545px] xl:min-w-[450px] xl:w-[450px] lg:w-[400px] lg:min-w-[400px] "
    >
      <div className="2xl:h-[400px] xl:h-[350px] lg:h-[300px]">
        <img src={image} alt={title} className="w-full h-full " />
      </div>
      <div className="p-4 space-y-3">
        <h1 className="font-bold 2xl:text-4xl xl:text-3xl lg:text-2xl">
          {title}
        </h1>
        <div className="space-y-1">
          <p>{description}</p>
          <p className="font-bold"> SHOP NOW {"\u25B6"}</p>
        </div>
      </div>
    </div>
  );
};

export default HeroCard;
