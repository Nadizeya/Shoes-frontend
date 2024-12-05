import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CaretLeft, Export, CaretDown } from "@phosphor-icons/react";
import { useState } from "react";

const sortOptions: {
  value: string;
  label: string;
}[] = [
  {
    value: "recently_added",
    label: "Recently Added",
  },
  {
    value: "alphabetical_order",
    label: "Name A to Z",
  },
  {
    value: "alphabetical_reverse",
    label: "Name Z to A",
  },
  {
    value: "price_order",
    label: "Price high to low",
  },
  {
    value: "price_reverse",
    label: "Price low to high",
  },
];

export const LoveListSort = ({
  onSortChange,
}: {
  onSortChange: (sort: string) => void;
}) => {
  const [sortList, setsortList] = useState("Recenty Added");

  const handleSortChange = (sort: string) => {
    setsortList(sort);
    onSortChange(sort);
  };

  return (
    <div className="flex justify-between">
      <span className="flex gap-2 font-bold">
        <Export size={23} />
        Share
      </span>

      <div className="flex gap-2">
        <p>Sort By:</p>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 ">
            {sortList}
            <CaretDown size={20} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="space-y-1">
            {sortOptions.map((sort) => (
              <DropdownMenuItem
                onClick={() => handleSortChange(sort.label)}
                className="cursor-pointer"
                key={sort.value}
              >
                {sort.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
