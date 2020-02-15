import { User } from "../../DatabaseTypes/User";

export interface Props {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

export interface TextFieldProps {
  id: string;
  label: string;
  type: string;
  error: boolean;
  helperText: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  autoFocus: boolean;
}

interface ReturnType {
  user: User;
  errorMessage: string;
}

export interface SignUpMutationReturnData {
  register: ReturnType;
}

export interface SignUpMutationVariables {
  fullName: string;
  email: string;
  password: string;
  teamName: string;
}
