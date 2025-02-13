import { Eye, EyeOff } from "lucide-react";

export const openCloseEyesPassword = (password: boolean) => {
  return (
    <>
      {password ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
    </>
  );
};
