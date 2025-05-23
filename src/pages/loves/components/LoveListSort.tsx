import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Export, CaretDown } from "@phosphor-icons/react";
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
  type,
  onSortChange,
}: {
  onSortChange: (sort: string) => void;
  type: string;
}) => {
  const [sortList, setsortList] = useState("Recenty Added");

  const handleSortChange = (sort: string) => {
    setsortList(sort);
    onSortChange(sort);
  };

  return (
    <div className="flex justify-between">
      {type === "love-list" && (
        <span className="flex gap-2 font-bold">
          <Export size={23} />
          Share
        </span>
      )}
      {type === "order-list" && (
        <span className="flex gap-2 font-bold text-sm">
          Check the status of recent orders, and discover similar products.
        </span>
      )}

      <div className="flex gap-2 text-xs items-center">
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
