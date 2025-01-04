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
      className="rounded-md shadow-lg 2xl:min-w-[545px] 2xl:w-[545px] xl:min-w-[450px] xl:w-[450px] md:w-[400px] md:min-w-[400px]  min-w-[300px] w-[300px] "
    >
      <div className="2xl:h-[400px] xl:h-[350px] md:h-[300px] h-[250px]">
        <img src={image} alt={title} className="w-full h-full" />
      </div>
      <div className="p-4 space-y-4">
        <h1 className="font-bold 2xl:text-4xl xl:text-3xl text-2xl">{title}</h1>
        <div className="space-y-4">
          <p>{description}</p>
          <p className="font-bold"> SHOP NOW {"\u25B6"}</p>
        </div>
      </div>
    </div>
  );
};

export default HeroCard;
