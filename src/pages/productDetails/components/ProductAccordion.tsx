import Accordion from "@/components/ui/Accordion";
import { Separator } from "@/components/ui/separator";

const HowToUseComp = () => {
  return (
    <div>
      <div className="flex items-start gap-8 py-4">
        <h4 className="font-bold text-medium min-w-min max-w-max">
          Suggested Usage:
        </h4>
        <ul className="list-disc grid gap-1">
          <li>
            Apply a small amount to clean, towel-dired hair , form mid lengths
            to ends.{" "}
          </li>
          <li>Blow dry or let dry naturally</li>
          <li>
            Apply on dry hair to tame flyaways, condition split ends and snooth
            hair
          </li>
        </ul>
      </div>
    </div>
  );
};

const AboutProductComp = () => {
  return (
    <div className="flex gap-10 py-4">
      <div className="min-w-min max-w-max">Good for Dryness</div>
      <div className="flex flex-col gap-3">
        <div className="">
          <span>What is it:</span>
          An argan oil-infused hair treatment that smooths frizz , detangles,
          conditions, protects against thermal damage, and increases shine by up
          to 118%.*
        </div>
        <div className="">
          <span>Hair Type:</span>
          Medium and Thick
        </div>
        <div className="">
          <span>Hair texture</span>
          Coily, Curly , Straight and Wavy
        </div>
      </div>
    </div>
  );
};

const ProductAccordion = () => {
  return (
    <div>
      <Separator className="my-4" />
      <Accordion title="About the Products" answer={<AboutProductComp />} />
      <Separator className="my-4" />
      <Accordion title="Ingredients" answer={<>Ingredients</>} />
      <Separator className="my-4" />
      <Accordion title="How To Use" answer={<HowToUseComp />} />
      <Separator className="my-4" />
      <Accordion title="About The Brands" answer={<>About The brand</>} />
      <Separator className="my-4" />
    </div>
  );
};

export default ProductAccordion;
