import PublicService from "../PublicService";

export const postLogin = async (
  loginformVal: Record<"username" | "password", string>
) => {
  const response = await PublicService.post("/login", loginformVal);

  return response.data;
};

export const postRegister = async (
  registerformVal: Record<"email" | "password" | "confoirmPassword", string>
) => {
  const response = await PublicService.post("/register", registerformVal);

  return response.data;
};

export const postForgotPassword = async (
  forgotpasswordVal: Record<"email", string>
) => {
  const response = await PublicService.post(
    "/forgotpassword",
    forgotpasswordVal
  );

  return response.data;
};

export const postOtpValidation = async (
  otpValidatioVal: { email: string; otp_code: number } // email is string, otp is number
) => {
  const response = await PublicService.post("/otp-validation", otpValidatioVal);

  return response.data;
};

export const postRegisterOtp = async (
  otpValidatioVal: { email: string; otp_code: number } // email is string, otp is number
) => {
  const response = await PublicService.post(
    "/register-otp-validation",
    otpValidatioVal
  );

  return response.data;
};

export const postResetPassword = async (
  resetPasswordVal: { email: string; password: string } // email is string, otp is number
) => {
  const response = await PublicService.post(
    "/reset-password",
    resetPasswordVal
  );

  return response.data;
};
