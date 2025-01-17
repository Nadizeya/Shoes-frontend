import { CartCardShared } from "../CartCardShared";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { useAppSelector } from "@/store/hook";
import { useDispatch } from "react-redux";
import {
  changePaymentFile,
  changePaymentId,
} from "@/store/slices/Checkout/checkOutSlice";
import { Bank, HandCoins } from "@phosphor-icons/react";
import { BASE_URL } from "@/api/BaseService";

const PaymentMethodContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const paymentMethods = useAppSelector((state) => state.checkout.paymentData);
  const payData = paymentMethods?.filter(
    (item) => item.bank_type === "pay_number"
  );
  const bankData = paymentMethods?.filter(
    (item) => item.bank_type === "bank_account"
  );

  // Handling events
  const handlePaymentSelection = (id: number) => {
    dispatch(changePaymentId(id));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;

    console.log(selectedFile, "select file");
    if (selectedFile) {
      // setFile(selectedFile);
      dispatch(changePaymentFile(selectedFile));
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
          <TabsTrigger
            value="banktransfer"
            className="flex gap-3 data-[state=active]:bg-buttonbg data-[state=active]:text-white"
          >
            <Bank size={23} />
            Bank Transfer
          </TabsTrigger>
          <TabsTrigger
            value="pay"
            className="flex gap-3 data-[state=active]:bg-buttonbg data-[state=active]:text-white"
          >
            <HandCoins size={23} />
            Pay
          </TabsTrigger>
        </TabsList>
        {/* Bank pay tabs  */}
        <TabsContent value="banktransfer" className="space-y-3">
          <p>Select your Preferred Bank</p>
          <Tabs
            defaultValue={bankData[0]?.userdetails.account_id.toString()}
            onValueChange={(value) => handlePaymentSelection(Number(value))}
            className="w-full"
          >
            <TabsList className="grid w-full bg-white grid-cols-3  p-0">
              {bankData.map((bank) => (
                <TabsTrigger
                  key={bank.userdetails.account_id}
                  value={bank.userdetails.account_id.toString()}
                  className="border border-transparent rounded-sm p-2 focus:outline-none data-[state=active]:border-black data-[state=active]:shadow-sm"
                >
                  <img
                    src={
                      bank.image
                        ? `${BASE_URL}${bank.image}`
                        : "/assets/products/product3.png"
                    }
                    className="w-full h-10 object-contain"
                  />
                </TabsTrigger>
              ))}
            </TabsList>
            {/* Default Selected Bank Details */}
            {/* {bankData?.[0] && (
              <div className="space-y-2 mt-7">
                <p>Name: {bankData[0].userdetails.name}</p>
                <p>Bank Number: {bankData[0].userdetails.bank_number}</p>
              </div>
            )} */}

            {bankData.map((bank) => (
              <TabsContent
                key={bank.userdetails.account_id}
                value={bank.userdetails.account_id.toString()}
                className="space-y-2 mt-7"
              >
                <p>Name: {bank.userdetails.name}</p>
                <p>Bank Number: {bank.userdetails.bank_number}</p>
              </TabsContent>
            ))}
          </Tabs>
        </TabsContent>

        {/* Pay methods tabs  */}
        <TabsContent value="pay" className="space-y-3">
          <p>Select your Preferred Pay</p>
          <Tabs
            defaultValue={payData[0]?.userdetails.account_id.toString()}
            onValueChange={(value) => handlePaymentSelection(Number(value))}
            className="w-[300px]"
          >
            <TabsList className="grid w-full grid-cols-3">
              {payData.map((pay) => (
                <TabsTrigger
                  key={pay.userdetails.account_id}
                  value={pay.userdetails.account_id.toString()}
                  className="gap-2"
                >
                  <img
                    src={
                      pay.image
                        ? `${BASE_URL}${pay.image}`
                        : "/assets/products/product3.png"
                    }
                    width={20}
                    height={20}
                  />
                  <p>{pay.name}</p>
                </TabsTrigger>
              ))}
            </TabsList>
            {payData.map((pay) => (
              <TabsContent
                key={pay.userdetails.account_id.toString()}
                value={pay.userdetails.account_id.toString()}
                className="space-y-2 mt-7"
              >
                <p>Recipient's Name - {pay.userdetails.name}</p>
                <p>Recipient's Number - {pay.userdetails.pay_number}</p>
              </TabsContent>
            ))}
          </Tabs>
        </TabsContent>
      </Tabs>

      {/* Form components  */}
      {/* <div>
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
      </div> */}
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
        <small className="flex justify-center">get it soon now</small>
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
