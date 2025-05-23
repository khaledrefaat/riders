// auth-store.ts
import { COOKIE_NAME } from "@/constants";
import { AuthCustomer } from "@/types/auth-requests-types";
import { setCookie, deleteCookie, getCookie } from "cookies-next";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Defining the store’s state interface
interface AuthStoreInterface {
  authenticated: boolean;
  setAuthentication: (
    val: boolean,
    token?: string,
    customer?: AuthCustomer
  ) => void;
  user: AuthCustomer;
  setUser: (customer: AuthCustomer) => void;
  logout: () => void;
  getToken: () => string | null;
  getAuth: () => boolean;
}

// A blank “guest” customer
const defaultUser: AuthCustomer = {
  id: 0,
  name: "",
  country_code: "",
  phone: "",
};

export const useAuthStore = create(
  persist<AuthStoreInterface>(
    (set, get) => ({
      authenticated: false,
      user: defaultUser,

      // Flip auth flag, stash token cookie, store customer
      setAuthentication: (val, token, customer) => {
        set({ authenticated: val });

        if (token) {
          setCookie(COOKIE_NAME, token);
        }
        if (customer) {
          set({ user: customer });
        }
      },

      // Read token back out
      getToken: () => {
        const token = getCookie(COOKIE_NAME);
        return token ? token.toString() : null;
      },

      getAuth: () => get().authenticated,

      // Replace user in state
      setUser: (customer) => set({ user: customer }),

      // Clear out everything
      logout: () => {
        set({ authenticated: false, user: defaultUser });
        deleteCookie(COOKIE_NAME);
        localStorage.removeItem("auth-storage");
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
