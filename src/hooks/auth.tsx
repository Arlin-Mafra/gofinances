import React, { createContext, ReactNode, useContext } from "react";

interface AuthPrviderProps {
  children: ReactNode;
}

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface IAuthProps {
  user: User;
}

const AuthContext = createContext({} as IAuthProps);

function AuthProvider({ children }: AuthPrviderProps) {
  const user = {
    id: "1",
    name: "arlin Mafra",
    email: "arlinsantanta@gmail.com",
  };
  return (
    <AuthContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
