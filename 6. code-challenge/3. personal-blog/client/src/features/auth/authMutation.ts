import { useMutation } from "@tanstack/react-query";
import { login, signUp } from "./authApi";
import { Login, SignUp } from "@/types/auth";

export function useLoginMutation() {
  return useMutation({
    mutationFn: (credentials: Login) => login(credentials),
    onSuccess: (data) => {
      console.log(data);
    },
  });
}

export function useSignUpMutation() {
  return useMutation({
    mutationFn: (credentials: SignUp) => signUp(credentials),
    onSuccess: (data) => {
      console.log(data);
    },
  });
}
