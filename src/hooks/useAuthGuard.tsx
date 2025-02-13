import { createContext, useContext, useState, ReactNode } from "react";

interface AuthStepState {
  changePasswordCompleted: boolean;
  otpValidated: boolean;
  resetPasswordCompleted: boolean;
}

interface AuthContextType {
  authStep: AuthStepState;
  completeStep: (step: keyof AuthStepState) => void;
  resetAuthSteps: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

// AuthProvider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authStep, setAuthStep] = useState<AuthStepState>({
    changePasswordCompleted: false,
    otpValidated: false,
    resetPasswordCompleted: false,
  });

  const completeStep = (step: keyof AuthStepState) => {
    setAuthStep((prev) => ({ ...prev, [step]: true }));
  };

  const resetAuthSteps = () => {
    setAuthStep({
      changePasswordCompleted: false,
      otpValidated: false,
      resetPasswordCompleted: false,
    });
  };

  return (
    <AuthContext.Provider value={{ authStep, completeStep, resetAuthSteps }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthGuard = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthGuard must be used within an AuthProvider");
  }
  return context;
};
