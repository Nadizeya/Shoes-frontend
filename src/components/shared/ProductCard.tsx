import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

// const ProductCard = ({
//   id,
//   name,
//   category_name,
//   brand_name,
//   short_description,
//   original_price,
//   image,
//   videos,
// }: {
//   id: number;
//   name: string;
//   category_name: string;
//   brand_name: string;
//   short_description: string;
//   original_price: number;
//   image: string;
//   videos: string | null;
// }) => {
//   return (
//     <Card
//       key={id}
//       className="xl:p-2 lg:p-1 2xl:min-w-[230px] 2xl:w-[230px] xl:min-w-[200px] xl:w-[200px] lg:min-w-[180px] lg:w-[180px] min-w-[200px] w-[200px]"
//     >
//       <Link to={`/products/${id}`}>
//         <CardContent className="cursor-pointer p-3 ">
//           <div className="mb-4">
//             <img src={image} alt={name} />
//           </div>

//           <div className="space-y-2">
//             <p className="text-sm font-bold">{name}</p>
//             <p className="text-sm">
//               {short_description.length > 50
//                 ? `${short_description.substring(0, 50)}...`
//                 : short_description}
//             </p>
//             <p className="font-bold">{original_price} Ks</p>
//           </div>
//         </CardContent>
//       </Link>
//     </Card>
//   );
// };

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
  return (
    <Card
      key={id}
      className="xl:p-2 lg:p-1 2xl:min-w-[230px] 2xl:w-[230px] xl:min-w-[200px] xl:w-[200px] min-w-[180px] w-[180px]"
    >
      <Link to={`/products/${id}`}>
        <CardContent className="cursor-pointer p-3 ">
          <div className="relative mb-4">
            <img src={image} alt={title} />
            <div className="absolute left-0 top-0 space-y-1">
              {tags?.map((tag, index) => (
                <p
                  key={index}
                  className="text-xs bg-textColor text-white px-1 text-center"
                >
                  {tag}
                </p>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-bold">{title}</p>
            <p className="text-sm">
              {desc.length > 50 ? `${desc.substring(0, 50)}...` : desc}
            </p>
            <p className="font-bold">{price} Ks</p>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default ProductCard;
