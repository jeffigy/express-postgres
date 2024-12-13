import { UserType } from "@/types/user";
import { StateCreator } from "zustand";

type AuthState = {
  token: string | null;
  user: UserType | null;
};
type ActionType = {
  setCredentials: (token: string) => void;
  clearCredentials: () => void;
  setUser: (user: UserType) => void;
};

const initialState: AuthState = {
  token: null,
  user: null,
};

export type AuthSlice = AuthState & ActionType;

export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  ...initialState,
  setCredentials: (token) => set({ token }),
  clearCredentials: () =>
    set({
      token: null,
      user: null,
    }),
  setUser: (user) => ({ user }),
});
