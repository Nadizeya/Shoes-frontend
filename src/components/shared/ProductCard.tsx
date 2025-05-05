import { BASE_URL } from "@/api/BaseService";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

type ProductCardProps = {
  id: number;
  name: string;
  category_id: number;
  brand_id: number;
  category_name: string;
  brand_name: string; // Optional field
  short_description: string;
  price: number | string; // To support both numbers and strings
  image: string | null; // Optional and nullable field
};

const ProductCard = ({
  id,
  name,
  short_description,
  price,
  image,
}: ProductCardProps) => {
  return (
    <Card
      key={id}
      className="xl:p-2 lg:p-1 2xl:min-w-[200px] 2xl:w-[200px] xl:min-w-[200px] xl:w-[200px] lg:min-w-[180px] lg:w-[180px] md:min-w-[180px] md:w-[180px] min-w-[190px] w-[190px]"
    >
      <Link to={`/products/${id}`}>
        <CardContent className="cursor-pointer p-3 ">
          <div className="mb-4">
            <img
              src={image ? `${BASE_URL}${image}` : "/assets/default.png"}
              alt={name}
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-bold">{name}</p>
            <p className="text-sm">
              {short_description.length > 20
                ? `${short_description.substring(0, 20)}...`
                : short_description}
            </p>
            <p className="font-bold">{price}$</p>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

// const ProductCard = ({
//   id,
//   title,
//   image,
//   desc,
//   price,
//   tags,
// }: {
//   id: number;
//   title: string;
//   image: string;
//   desc: string;
//   price: string | number;
//   tags?: string[];
// }) => {
//   return (
//     <Card
//       key={id}
//       className="xl:p-2 lg:p-1 2xl:min-w-[230px] 2xl:w-[230px] xl:min-w-[200px] xl:w-[200px] min-w-[180px] w-[180px]"
//     >
//       <Link to={`/products/${id}`}>
//         <CardContent className="cursor-pointer p-3 ">
//           <div className="relative mb-4">
//             <img src={image} alt={title} />
//             <div className="absolute left-0 top-0 space-y-1">
//               {tags?.map((tag, index) => (
//                 <p
//                   key={index}
//                   className="text-xs bg-textColor text-white px-1 text-center"
//                 >
//                   {tag}
//                 </p>
//               ))}
//             </div>
//           </div>

//           <div className="space-y-2">
//             <p className="text-sm font-bold">{title}</p>
//             <p className="text-sm">
//               {desc.length > 50 ? `${desc.substring(0, 50)}...` : desc}
//             </p>
//             <p className="font-bold">{price} Ks</p>
//           </div>
//         </CardContent>
//       </Link>
//     </Card>
//   );
// };

export default ProductCard;
