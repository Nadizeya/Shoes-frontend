import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

const ProductCard = ({
  id,
  title,
  image,
  desc,
  price,
  tags,
}: {
  id: number;
  title: string;
  image: string;
  desc: string;
  price: string | number;
  tags?: String[];
}) => {
  console.log(image);
  return (
    <Card key={id} className="p-2 min-w-[250px] w-[250px]">
      <Link to={`/brands/${id}`}>
        <CardContent className="cursor-pointer ">
          <div className="relative mb-4">
            <img src={image} alt={title} />
            <div className="absolute left-0 top-0 space-y-1 ">
              {tags?.map((tag, index) => (
                <p
                  key={index}
                  className="text-xs bg-textColor text-white px-1 "
                >
                  {tag}
                </p>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-bold">{title}</p>
            <p className="text-sm">{desc}</p>
            <p className="font-bold">{price} Ks</p>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default ProductCard;
