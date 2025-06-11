import {
  BottomNavbar,
  bottomNavHeight,
} from "@/app/farcaster/components/bottom-navbar";
import { SafeArea } from "@/app/farcaster/components/safe-area";
import { TicTacToe } from "@/app/farcaster/tic-tac-toe/tic-tac-toe";

export default function page() {
  return (
    <SafeArea {...{ bottomNavHeight }}>
      <TicTacToe />
      <BottomNavbar />
    </SafeArea>
  );
}
