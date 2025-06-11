"use client";

import { Button } from "@/components/ui/button";

type GameInfoProps = {
  currentLevel: number;
  score: number;
  gameOver: boolean;
  onRestart: () => void;
  onChangeMode: () => void;
};

export function GameInfo({
  currentLevel,
  score,
  gameOver,
  onRestart,
  onChangeMode,
}: GameInfoProps) {
  return (
    <div className="border border-lime-300 w-full flex flex-col items-around p-4 mb-4 rounded-lg gap-1 bg-lime-950/60">
      <div className="flex justify-between w-full font-semibold">
        <p>{currentLevel} .Lvl</p>
        <p className="text-lime-300">{score.toFixed(1)} .Score</p>
      </div>
      <Button onClick={onRestart} variant="default" disabled={!gameOver}>
        Restart Game
      </Button>
      <Button onClick={onChangeMode} variant="default" className="mt-2">
        Change Mode
      </Button>
    </div>
  );
}
