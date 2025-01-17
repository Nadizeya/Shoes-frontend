import { Card, CardContent } from "@/components/ui/card";
import classNames from "classnames";

interface CardProps {
  cardContent: React.ReactNode;
  cardClassName?: string;
  contentClassName?: string;
}

export const CartCardShared = ({
  cardContent,
  cardClassName,
  contentClassName,
}: CardProps) => {
  const defaultCardClassName =
    "bg-white w-full min-w-[250px] max-w-full rounded-xl overflow-hidden border border-gray-50 shadow-sm";
  const defaultContentClassName = "p-5";

  return (
    <Card className={classNames(defaultCardClassName, cardClassName)}>
      <CardContent
        className={classNames(defaultContentClassName, contentClassName)}
      >
        {cardContent}
      </CardContent>
    </Card>
  );
};
