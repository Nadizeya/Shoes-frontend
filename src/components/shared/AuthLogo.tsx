import Logo from "/assets/logo/logo.jpg";

export const AuthLogo = () => {
  return (
    <div className="flex flex-col gap-2 justify-center">
      <div className="flex items-center justify-center">
        <img className="mx-auto" src={Logo} alt="" width={180} height={180} />
      </div>
      <h4 className="text-center font-bold text-2xl">Nadi Yoon Htike</h4>
    </div>
  );
};
