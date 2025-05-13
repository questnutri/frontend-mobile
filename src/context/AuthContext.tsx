import React, { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode";
import { router } from "expo-router";

interface AuthContextData {
  getToken: () => string | null;
  getRole: () => string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  doLogin: (token: string, role: string) => Promise<void>;
  doLogout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    async function loadStorageData() {
      if (getToken()) {
        const decodedToken = jwtDecode<any>(getToken()!);
        const role = decodedToken.token;
        if (!decodedToken) {
          //refresh token > Backend
          //if(res == 200)
          // setAuthenticated(true);
          // router.replace("../(drawer)/home");
          //else (403 ou 401) {
          doLogout();
          //}
        } else {
          setAuthenticated(true);
          router.replace(`../(drawer)/(${getRole()})/home`);
        }
      }
    }

    loadStorageData();
  }, []);

  useEffect(() => {
    // console.log("Authenticated: ", isAuthenticated);
  }, [isAuthenticated]);

  async function doLogin(token: string, role: string) {
    SecureStore.setItem("token", token);
    SecureStore.setItem("role", role);
    setAuthenticated(true);
  }

  async function doLogout() {
    await removeRole();
    await removeToken();
    setAuthenticated(false);
  }

  function getRole() {
    return SecureStore.getItem("role");
  }

  function getToken() {
    return SecureStore.getItem("token");
  }

  async function removeToken() {
    await SecureStore.deleteItemAsync("token");
  }

  async function removeRole() {
    await SecureStore.deleteItemAsync("role");
  }

  return (
    <AuthContext.Provider
      value={{
        getToken,
        getRole,
        isAuthenticated,
        isLoading,
        doLogin,
        doLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
