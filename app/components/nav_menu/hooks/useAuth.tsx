"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export const useAuth = () => {
  const { data: session, status } = useSession();

  const user = session?.user;
  const isAuthenticated = !!user;

  const getUserInitials = () => {
    if (!user?.name) return "U";
    return user.name
      .split(" ")
      .map((n) => n[0])
      .join("");
  };

  return {
    user,
    isAuthenticated,
    getUserInitials,
    signIn: () => signIn(),
    signOut: () => signOut(),
  };
};
