import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { api, type User } from "./api";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<string | null>;
  register: (
    fullName: string,
    email: string,
    password: string,
    passwordConfirmation: string
  ) => Promise<string | null>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .me()
      .then((res) => {
        if (res.ok && "user" in res.data) {
          setUser(res.data.user);
        }
      })
      .catch(() => {
        // Not authenticated or network error — that's fine
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const login = useCallback(
    async (email: string, password: string): Promise<string | null> => {
      const res = await api.login({ email, password });
      if (res.ok && "user" in res.data) {
        setUser(res.data.user);
        return null;
      }
      return "error" in res.data ? res.data.error : "Login failed";
    },
    []
  );

  const register = useCallback(
    async (
      fullName: string,
      email: string,
      password: string,
      passwordConfirmation: string
    ): Promise<string | null> => {
      const res = await api.register({
        full_name: fullName,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });
      if (res.ok && "user" in res.data) {
        setUser(res.data.user);
        return null;
      }
      return "error" in res.data ? res.data.error : "Registration failed";
    },
    []
  );

  const logout = useCallback(async () => {
    await api.logout();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
