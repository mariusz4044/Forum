import React, { createContext, useContext, useState } from "react";
import { fetchData } from "@/functions/fetchData";
import { mutate } from "swr";

export interface User {
  id: number | null;
  name: string;
  avatar: string;
  points: number;
  role: "USER" | "ADMIN";
}

interface UserContextType {
  user: User;
  setNewUser: (user: User) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>({
    id: null,
    name: "",
    avatar: "",
    points: 0,
    role: "USER",
  });

  function setNewUser(user: User) {
    setUser(user);
  }

  async function logout() {
    await fetchData("/api/user/logout", {});

    setNewUser({
      ...user,
      id: null,
    });

    //stop auto fetching user data (SWR)
    await mutate(`${process.env.SERVER_URL}/api/user`, null, {
      revalidate: false,
    });
  }

  return (
    <UserContext.Provider value={{ user, setNewUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
};
