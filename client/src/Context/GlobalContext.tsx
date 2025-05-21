import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { getCurrentUser } from "../Functions/getCurrentUser";
import { BlogType } from "../types/types";

type GlobalContextType = {
  currentUser: string;
  setCurrentUser: React.Dispatch<React.SetStateAction<string>>;
  blogs: BlogType[];
  setBlogs: React.Dispatch<React.SetStateAction<BlogType[] | []>>
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export function ContextProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState("");
  const [blogs, setBlogs] = useState<BlogType[] | []>([]);

  useEffect(()=> {
    getCurrentUser(setCurrentUser)
  }, [])

  return (
    <GlobalContext.Provider value={{ currentUser, setCurrentUser, blogs, setBlogs }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a ContextProvider");
  }
  return context;
}
