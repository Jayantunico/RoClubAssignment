"use client";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useAuth } from "../hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";
import { useSession } from "next-auth/react";

export const AuthMenu = () => {
  const { user, isAuthenticated, getUserInitials, signIn, signOut } = useAuth();
  const { data } = useSession();

  if (isAuthenticated && user) {
    return (
      <Menubar className="rounded-full border-none">
        <MenubarMenu>
          <MenubarTrigger className="cursor-pointer p-0 focus:bg-transparent data-[state=open]:bg-transparent">
            <Avatar>
              <AvatarImage
                src={user.profile_picture ?? undefined}
                alt={user.name ?? "User"}
              />
              <AvatarFallback>{getUserInitials()}</AvatarFallback>
            </Avatar>
          </MenubarTrigger>
          <MenubarContent className="mr-2 mt-1 min-w-[400px]">
            <div className="flex flex-col justify-center items-center w-100 py-3">
              <Avatar className="h-20 w-20">
                <AvatarImage
                  src={user.profile_picture ?? undefined}
                  alt={user.name ?? "User"}
                  className="h-full w-full"
                />
                <AvatarFallback className="text-2xl">
                  {getUserInitials()}
                </AvatarFallback>
              </Avatar>
              <div className="px-2 py-1.5 text-lg font-large">{user.name}</div>
              <div className="px-2 py-1.5 text-md font-large">{user.email}</div>
            </div>
            <MenubarItem
              className="flex items-center justify-center px-4 py-2 space-x-2 
            bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 
            rounded-md cursor-pointer transition-colors"
              onClick={signOut}
            >
              <LogOut />
              <span>Sign out</span>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    );
  }

  return (
    <Button variant="outline" onClick={signIn}>
      Sign In
    </Button>
  );
};
