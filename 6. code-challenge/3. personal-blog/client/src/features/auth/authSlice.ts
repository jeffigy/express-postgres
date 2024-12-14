import { StateCreator } from "zustand";

type AuthState = {
  token: string | null;
  isAuthenicated: boolean;
};
type ActionType = {
  setCredentials: (token: string) => void;
  clearCredentials: () => void;
};

const initialState: AuthState = {
  token: null,
  isAuthenicated: false,
};

export type AuthSlice = AuthState & ActionType;

export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  ...initialState,
  setCredentials: (token) => set({ token, isAuthenicated: true }),
  clearCredentials: () =>
    set({
      token: null,
      isAuthenicated: false,
    }),
});
