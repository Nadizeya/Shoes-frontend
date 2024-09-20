import { LoaderCircle } from "lucide-react";

const MainLoading = () => {
  return (
    <div className="fixed inset-0 w-full h-full bg-white/60 z-50 grid place-content-center">
      <LoaderCircle color="pink" size={50} className="animate-spin" />
    </div>
  );
};

export default MainLoading;
