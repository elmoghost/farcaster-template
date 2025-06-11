"use client";

import { cn } from "@/lib/utils";
type Cell = {
  isBomb: boolean;
  isClicked: boolean;
};
type GameBoardProps = {
  board: Cell[][];
  currentLevel: number;
  gameOver: boolean;
  handleCellClick: (levelIndex: number, cellIndex: number) => void;
};

export function GameBoard({
  board,
  currentLevel,
  gameOver,
  handleCellClick,
}: GameBoardProps) {
  if (!board.length) return null;

  return (
    <div className="flex flex-col-reverse mb-4">
      {board.map((row, levelIndex) => (
        <div
          key={levelIndex}
          id={`level-${levelIndex + 1}`}
          className="flex items-center gap-2 mb-2"
        >
          <span className="text-sm text-muted-foreground font-semibold">
            {(1 + levelIndex * 0.1).toFixed(2)}x
          </span>
          <div className="flex justify-center gap-1">
            {row.map((cell, cellIndex) => (
              <button
                key={cellIndex}
                id={`cell-${levelIndex}-${cellIndex}`}
                onClick={() => handleCellClick(levelIndex, cellIndex)}
                disabled={
                  levelIndex !== currentLevel - 1 || cell.isClicked || gameOver
                }
                className={cn(
                  "size-10 border-2 flex items-center justify-center rounded-xl",
                  !cell.isClicked && "bg-muted border-muted",
                  cell.isClicked && cell.isBomb && "bg-red-500 border-red-500",
                  cell.isClicked &&
                    !cell.isBomb &&
                    "bg-lime-500 border-lime-500",
                  (levelIndex !== currentLevel - 1 || cell.isClicked) &&
                    "opacity-50 cursor-not-allowed",
                  !cell.isClicked &&
                    levelIndex === currentLevel - 1 &&
                    "hover:bg-neutral-600",
                  gameOver && cell.isBomb && !cell.isClicked && "bg-red-300"
                )}
              >
                {gameOver && cell.isBomb && "💣"}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
