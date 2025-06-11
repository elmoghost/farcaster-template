"use client";

import { useState, useEffect } from "react";
import { GameBoard } from "@/app/farcaster/minesweeper/game-board";
import { GameInfo } from "@/app/farcaster/minesweeper/game-info";
import { ModeSelection } from "@/app/farcaster/minesweeper/mode-selection";
import { toast as sonnerToast } from "sonner";

type Cell = {
  isBomb: boolean;
  isClicked: boolean;
};

type ToastFunction = (
  message: string,
  options?: Record<string, unknown>,
) => string | number;

const toast: ToastFunction = sonnerToast as ToastFunction;

export function Minesweeper() {
  const [gameMode, setGameMode] = useState<"15" | "50" | "100" | null>(null);
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [score, setScore] = useState<number>(0);
  const [board, setBoard] = useState<Cell[][]>([]);
  const [gameOver, setGameOver] = useState<boolean>(false);

  const initializeBoard = (levels: number) => {
    const newBoard: Cell[][] = [];
    for (let level = 1; level <= levels; level++) {
      const numCells = Math.floor(Math.random() * (7 - 2 + 1)) + 2;
      const bombIndex = Math.floor(Math.random() * numCells);
      const row = Array(numCells)
        .fill("")
        .map((_, index) => ({
          isBomb: index === bombIndex,
          isClicked: false,
        }));
      newBoard.push(row);
    }
    setBoard(newBoard);
    setCurrentLevel(1);
    setScore(0);
    setGameOver(false);
  };

  const handleCellClick = (levelIndex: number, cellIndex: number) => {
    if (!gameMode || levelIndex !== currentLevel - 1 || gameOver) return;

    const newBoard = [...board];
    const row = newBoard[levelIndex];
    if (!row) return;
    const cell = row[cellIndex];
    if (!cell) return;

    if (cell.isClicked) return;

    cell.isClicked = true;

    if (cell.isBomb) {
      setGameOver(true);
    } else {
      const multiplier = 1 + (currentLevel - 1) * 0.1;
      setScore((prev) => prev + multiplier);
      if (currentLevel < parseInt(gameMode)) {
        setCurrentLevel(currentLevel + 1);
      } else {
        setGameOver(true);
      }
    }

    setBoard(newBoard);

    const cellElement = document.getElementById(
      `cell-${levelIndex}-${cellIndex}`,
    );
    if (cellElement) {
      cellElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  useEffect(() => {
    const levelElement = document.getElementById(`level-${currentLevel}`);
    if (levelElement) {
      levelElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [currentLevel]);

  useEffect(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    if (gameMode) {
      initializeBoard(parseInt(gameMode));
    }
  }, [gameMode]);

  useEffect(() => {
    if (gameOver) {
      toast(
        gameOver
          ? "Game Over! You hit a bomb!"
          : "Congratulations! You completed all levels!",
      );
    }
  }, [gameOver]);

  if (!gameMode) {
    return <ModeSelection setGameMode={setGameMode} />;
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="mb-4 text-3xl font-bold">Minesweeper</h1>
      <GameBoard
        board={board}
        currentLevel={currentLevel}
        gameOver={gameOver}
        handleCellClick={handleCellClick}
      />
      <GameInfo
        currentLevel={currentLevel}
        score={score}
        gameOver={gameOver}
        onRestart={() => gameMode && initializeBoard(parseInt(gameMode))}
        onChangeMode={() => setGameMode(null)}
      />
    </div>
  );
}
