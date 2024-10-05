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
      className="rounded-md shadow-lg min-w-[545px] w-[545px]"
    >
      <div className="h-[400px]">
        <img src={image} alt={title} className="w-full h-full " />
      </div>
      <div className="p-4 space-y-3">
        <h1 className="font-bold text-4xl">{title}</h1>
        <div className="space-y-1">
          <p>{description}</p>
          <p className="font-bold"> SHOP NOW {"\u25B6"}</p>
        </div>
      </div>
    </div>
  );
};

export default HeroCard;
