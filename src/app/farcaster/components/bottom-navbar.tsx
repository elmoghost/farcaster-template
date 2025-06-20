"use client";

import { BottomNavbarWrapper } from "@/app/farcaster/components/bottom-navbar-wrapper";
import { cn } from "@/lib/utils";
import { Gamepad2, GamepadIcon, HomeIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navRoutes = [
  "/farcaster",
  "/farcaster/minesweeper",
  "/farcaster/tic-tac-toe",
] as const;

type NavRoutes = (typeof navRoutes)[number];

const navSetup: Record<
  NavRoutes,
  {
    name: string;
    isActive: string[];
    icon: React.ReactNode;
  }
> = {
  "/farcaster": {
    name: "Home",
    isActive: ["/farcaster"],
    icon: <HomeIcon className="size-6" />,
  },
  "/farcaster/minesweeper": {
    name: "Minesweeper",
    isActive: ["/farcaster/minesweeper"],
    icon: <Gamepad2 className="size-6" />,
  },
  "/farcaster/tic-tac-toe": {
    name: "Tic Tac Toe",
    isActive: ["/farcaster/tic-tac-toe"],
    icon: <GamepadIcon className="size-6" />,
  },
} as const;

export const bottomNavHeight = "calc(4rem + 1px)";

export function BottomNavbar() {
  const pathname = usePathname();

  return (
    <BottomNavbarWrapper>
      <nav className="max-w-global flex h-full w-full items-center justify-evenly">
        {navRoutes.map((route, index) => {
          const activeRoutes = navSetup[route].isActive;

          const isActive = activeRoutes.includes(pathname);

          return (
            <Link
              key={`bottom-navbar-link-${route}-${index}`}
              href={route}
              className={cn(
                "hover:bg-muted flex h-full flex-1 flex-col items-center justify-center overflow-hidden",
                isActive && "underline",
              )}
            >
              {navSetup[route].icon}
              <div className="text-xs">{navSetup[route].name}</div>
            </Link>
          );
        })}
      </nav>
    </BottomNavbarWrapper>
  );
}
