import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { BlogType } from "../Pages/Home";

type User = {
  username: string;
  role: string;
};

type GlobalContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  errorMsg: string;
  setErrorMsg: React.Dispatch<React.SetStateAction<string>>;
  accessToken: string;
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editBlog: BlogType | null;
  setEditBlog: React.Dispatch<React.SetStateAction<BlogType | null>>;
};

export const GlobalContext = createContext<GlobalContextType | undefined>(
  undefined
);

export function useGlobalContext() {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
}

export function GlobalProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editBlog, setEditBlog] = useState<BlogType | null>(null);

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/token",
          {},
          { withCredentials: true }
        );

        if (response.status === 200) {
          setUser(response.data.user);
          setAccessToken(response.data.accessToken);
          setErrorMsg("");
          // Például: navigate("/my-blogs");
        }
      } catch (error) {
        //console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccessToken();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,
        errorMsg,
        setErrorMsg,
        accessToken,
        setAccessToken,
        isLoading,
        setIsLoading,
        isModalOpen,
        setIsModalOpen,
        editBlog,
        setEditBlog,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
