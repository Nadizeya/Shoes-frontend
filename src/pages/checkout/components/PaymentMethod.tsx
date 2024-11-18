import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CartCardShared } from "../CardCardShared";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRef, useState } from "react";

const PaymentMethodContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleAttachPhotoClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-5">
      <h1 className="">Payment method</h1>
      <p>Choose your bank method</p>
      <Tabs defaultValue="banktransfer" className="w-[300px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="banktransfer">Bank Transfer</TabsTrigger>
          <TabsTrigger value="pay">Pay</TabsTrigger>
        </TabsList>
        <TabsContent value="banktransfer" className="space-y-3">
          <p>Select your Preferred bank</p>
          <Tabs defaultValue="cb" className="w-[300px]">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="cb">Cb bank</TabsTrigger>
              <TabsTrigger value="kbz">Kbz bank</TabsTrigger>
              <TabsTrigger value="aya">Aya bank</TabsTrigger>
            </TabsList>
          </Tabs>
        </TabsContent>
        <TabsContent value="pay" className="space-y-3">
          <p>Select your Preferred pay</p>
          <Tabs defaultValue="kbz" className="w-[300px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="kbz">Kbz pay</TabsTrigger>
              <TabsTrigger value="cb">Cb pay</TabsTrigger>
            </TabsList>
          </Tabs>
        </TabsContent>
      </Tabs>
      <div>
        <FormItem>
          <FormLabel>Bank Account Name Name</FormLabel>
          <FormControl>
            <Input />
          </FormControl>
          <FormMessage />
        </FormItem>
        <FormItem>
          <FormLabel>Bank Account Number</FormLabel>
          <FormControl>
            <Input />
          </FormControl>
          <FormMessage />
        </FormItem>
      </div>
      <div className="space-y-3">
        <input
          id="picture"
          type="file"
          ref={fileInputRef}
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        <Button
          type="button"
          className="w-full"
          onClick={handleAttachPhotoClick}
        >
          Attach Receipt Photo
        </Button>
        {file && <p className="text-green-500">File selected: {file.name}</p>}

        <Button type="submit" className="w-full bg-red-700">
          Checkout
        </Button>
      </div>
    </div>
  );
};

const PaymentMethod = () => {
  return (
    <div>
      <CartCardShared
        cardContent={<PaymentMethodContent />}
        cardClassName="py-3"
      />
    </div>
  );
};

export default PaymentMethod;
