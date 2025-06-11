"use client";

import { Button } from "@/components/ui/button";

type ModeSelectionProps = {
  setGameMode: (mode: "15" | "50" | "100" | null) => void;
};

export function ModeSelection({ setGameMode }: ModeSelectionProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="mb-4 text-3xl font-bold">Minesweeper</h2>
      <div className="text-lg">Select Game Mode</div>
      <div className="flex flex-col gap-4">
        <Button onClick={() => setGameMode("15")}>15 Levels</Button>
        <Button onClick={() => setGameMode("50")}>50 Levels</Button>
        <Button onClick={() => setGameMode("100")}>100 Levels</Button>
      </div>
    </div>
  );
}
