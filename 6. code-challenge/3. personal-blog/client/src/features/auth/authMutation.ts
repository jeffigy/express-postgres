import { useMutation } from "@tanstack/react-query";
import { login, signUp } from "./authApi";
import { Login, SignUp } from "@/types/auth";
import { useStore } from "@/store/store";

export function useLoginMutation() {
  const { setCredentials } = useStore();
  return useMutation({
    mutationFn: (credentials: Login) => login(credentials),
    onSuccess: (data) => {
      setCredentials(data.accessToken);
    },
  });
}

export function useSignUpMutation() {
  const { setCredentials } = useStore();
  return useMutation({
    mutationFn: (credentials: SignUp) => signUp(credentials),
    onSuccess: (data) => {
      setCredentials(data.accessToken);
    },
  });
}
