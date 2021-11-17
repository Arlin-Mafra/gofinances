import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import * as Google from "expo-google-app-auth";
import * as AppleAuthentication from "expo-apple-authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
  signInWithGoogle(): Promise<void>;
  signInWithApple(): Promise<void>;
  signOut(): Promise<void>;
  userStorageLoading: boolean;
}

const AuthContext = createContext({} as IAuthProps);

function AuthProvider({ children }: AuthPrviderProps) {
  const [user, setUser] = useState<User>({} as User);

  const [userStorageLoading, setUserStorageLoading] = useState(true);

  const userDataStorage = "@gofinances:user";

  async function signInWithGoogle() {
    try {
      const result = await Google.logInAsync({
        iosClientId:
          "147867004203-f2jt923mlj3cnb5b804kmdq2prjf3cm6.apps.googleusercontent.com",
        androidClientId:
          "147867004203-fuslk7ed7u1pa7i8ku4vug1mcfh9ns9u.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        const userLogged = {
          id: result.user.id,
          email: result.user.email,
          name: result.user.name,
          photo: result.user.photoUrl,
        };

        setUser(userLogged);

        await AsyncStorage.setItem(
          "@gofinances:user",
          JSON.stringify(userLogged)
        );

        console.log(userLogged);
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async function signInWithApple() {
    try {
      const credentials = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (credentials) {
        const name = credentials.fullName.givenName;
        const photo = `https://ui-avatars.com/api/?name=${name}`;

        const userLogged = {
          id: credentials.user,
          email: credentials.email,
          name,
          photo,
        };
        setUser(userLogged);
        await AsyncStorage.setItem(userDataStorage, JSON.stringify(userLogged));
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async function signOut() {
    setUser({} as User);

    await AsyncStorage.removeItem(userDataStorage);
  }

  useEffect(() => {
    async function loadUserStorageData() {
      const userStoraged = await AsyncStorage.getItem(userDataStorage);

      if (userStoraged) {
        const userLogged = JSON.parse(userStoraged) as User;
        setUser(userLogged);
      }

      setUserStorageLoading(false);
    }

    loadUserStorageData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithGoogle,
        signInWithApple,
        signOut,
        userStorageLoading,
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
