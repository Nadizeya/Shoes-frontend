import { CategoryT } from "@/types/common";

interface Props {
  data: CategoryT[];
}
const CategoriesDropDown = ({ data }: Props) => {
  {
    console.log(data);
  }
  return (
    <div className="absolute text-sm bg-white text-black p-4 w-full  gap-7">
      {data.map((data, index) => (
        <p key={index}>{data.name}</p>
      ))}
    </div>
  );
};

export default CategoriesDropDown;
