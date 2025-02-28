import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { CartCardShared } from "../CartCardShared";

const DeliveryContent = ({ isReadOnly }: { isReadOnly: boolean }) => {
  const { control } = useFormContext();

  return (
    <div className="">
      <h1 className="mb-2">Delivery</h1>
      <div className="space-y-3">
        <FormField
          control={control}
          name="user_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your Name"
                  {...field}
                  readOnly={isReadOnly}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Address</FormLabel>
              <FormControl>
                <Input placeholder="Address" {...field} readOnly={isReadOnly} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="phone_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone No.</FormLabel>
              <FormControl>
                <Input
                  placeholder="Phone Number"
                  {...field}
                  readOnly={isReadOnly}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

const Delivery = ({ isReadOnly }: { isReadOnly: boolean }) => {
  return (
    <div className="w-full">
      <CartCardShared
        cardContent={<DeliveryContent isReadOnly={isReadOnly} />}
        cardClassName="py-3"
      />
    </div>
  );
};

export default Delivery;
