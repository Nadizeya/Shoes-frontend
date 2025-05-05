import Logo from "/assets/logo/blackwhitelogo.png";

export const AuthLogo = ({
  width,
  height,
  mobile,
}: {
  width?: number;
  height?: number;
  mobile?: boolean;
}) => {
  return (
    <div className="flex flex-col gap-2 justify-center">
      <div className="flex items-center justify-center">
        <img
          className="mx-auto rounded-full"
          src={Logo}
          alt=""
          width={width || 180}
          height={height || 180}
        />
      </div>
    </div>
  );
};
