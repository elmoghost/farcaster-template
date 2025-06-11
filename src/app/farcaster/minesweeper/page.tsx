import {
  BottomNavbar,
  bottomNavHeight,
} from "@/app/farcaster/components/bottom-navbar";
import { SafeArea } from "@/app/farcaster/components/safe-area";
import { Minesweeper } from "@/app/farcaster/minesweeper/mine-sweeper";

export default function page() {
  return (
    <SafeArea {...{ bottomNavHeight }}>
      <Minesweeper />
      <BottomNavbar />
    </SafeArea>
  );
}
