import { User } from "../../DatabaseTypes/User";

export interface Props {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

interface ReturnType {
  user: User;
  errorMessage: string;
}

export interface LoginMutationReturnData {
  login: ReturnType;
}

export interface LoginMutationVariables {
  email: string;
  password: string;
}
