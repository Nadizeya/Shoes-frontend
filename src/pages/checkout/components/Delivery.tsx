import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { CartCardShared } from "../CardCardShared";

const DeliveryContent = () => {
  const { control } = useFormContext();

  return (
    <div>
      <h1 className="mb-2">Delivery</h1>
      <FormField
        control={control}
        name="delivery_info.name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Phone Name</FormLabel>
            <FormControl>
              <Input placeholder="Your Name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="delivery_info.address"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Your Address</FormLabel>
            <FormControl>
              <Input placeholder="Address" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="delivery_info.phoneNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Phone No.</FormLabel>
            <FormControl>
              <Input placeholder="Phone Number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

const Delivery = () => {
  return (
    <div>
      <CartCardShared cardContent={<DeliveryContent />} cardClassName="py-3" />
    </div>
  );
};

export default Delivery;
