import { createAuthSlice } from "@/features/auth/authSlice";
import { Store } from "@/types/Store";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useStore = create<Store>()(
  devtools((...a) => ({
    ...createAuthSlice(...a),
  })),
);
