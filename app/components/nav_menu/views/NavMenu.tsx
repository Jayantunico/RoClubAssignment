"use client";
import { useAuth } from "../hooks/useAuth";
import { AuthMenu } from "./AuthMenu";

const NavMenu = () => {
  const { user, isAuthenticated } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <h1 className="text-lg">
        RoClub Assignment, Hi {user?.name} 
      </h1>
      <div className="flex items-center gap-4">
        <AuthMenu />
      </div>
    </div>
  );
};

export default NavMenu;
