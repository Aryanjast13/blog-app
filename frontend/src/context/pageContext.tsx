// PageContext.tsx
import { createContext, useContext, useState } from "react";

type PageContextType = {
  post: any;
  setPost: (post: any) => void;
};

const PageContext = createContext<PageContextType | null>(null);

export const PageProvider = ({ children }: { children: React.ReactNode }) => {
  const [post, setPost] = useState({});
  

  return (
    <PageContext.Provider value={{ post,setPost }}>
      {children}
    </PageContext.Provider>
  );
};

export const usePage = () => {
  const context = useContext(PageContext);
  if (!context) throw new Error("usePage must be used inside PageProvider");
  return context;
};
