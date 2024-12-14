import { useMutation } from "@tanstack/react-query";
import { login, logout, refreshUser, signUp } from "./authApi";
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

export function useRefreshMutation() {
  const { setCredentials } = useStore();
  return useMutation({
    mutationFn: () => refreshUser(),
    onSuccess: (data) => {
      setCredentials(data.accessToken);
    },
  });
}

export function useLogoutMutation() {
  const { clearCredentials } = useStore();
  return useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      clearCredentials();
    },
  });
}
