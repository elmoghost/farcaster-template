"use client";

import { useEffect, useState } from "react";
import { sdk } from "@farcaster/frame-sdk";
import { checkWinner, getLineStyle } from "@/utils/game-logic";

export function LocalTicTacToe() {
  const [board, setBoard] = useState<Array<string | null>>(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);
  const [hasTriggeredHaptic, setHasTriggeredHaptic] = useState(false);

  // Handle haptic feedback (once per win)
  useEffect(() => {
    const isWinner = winner === "X" || winner === "O";

    if (isWinner && !hasTriggeredHaptic) {
      const triggerHaptic = async () => {
        try {
          await sdk.haptics.impactOccurred("heavy");
          setHasTriggeredHaptic(true); // Mark haptic as triggered
        } catch (error) {
          console.warn("Haptic feedback failed in useEffect:", error);
        }
      };
      void triggerHaptic();
    }
  }, [winner, hasTriggeredHaptic]);

  const handleClick = async (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXTurn ? "X" : "O";
    setBoard(newBoard);
    setIsXTurn(!isXTurn);

    try {
      const gameWinner = checkWinner(newBoard, setWinningLine);
      if (gameWinner) {
        setWinner(gameWinner);
      } else if (!newBoard.includes(null)) {
        setWinner("Draw");
        // Haptic for draw
        await sdk.haptics.impactOccurred("heavy");
      }
      // Haptic for cell click
      await sdk.haptics.impactOccurred("light");
    } catch (error) {
      console.warn("Haptic feedback failed in handleClick:", error);
    }
  };

  const resetGame = async () => {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
    setWinner(null);
    setWinningLine(null);
    setHasTriggeredHaptic(false); // Reset haptic flag
    try {
      // Strong haptic for game reset
      await sdk.haptics.impactOccurred("heavy");
    } catch (error) {
      console.warn("Haptic feedback failed in resetGame:", error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-xl font-bold">Tic-Tac-Toe (Local)</h2>
      <div className="text-lg">
        {winner
          ? winner === "Draw"
            ? "It's a Draw! No one won."
            : `Winner: ${winner}!`
          : `Player's turn: ${isXTurn ? "X" : "O"}`}
      </div>
      <div className="relative grid w-[300px] grid-cols-3 gap-2 sm:w-[360px]">
        {board.map((cell, index) => (
          <button
            key={index}
            className="flex aspect-square items-center justify-center border border-black/[.08] text-4xl font-bold hover:bg-[#f2f2f2] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
            onClick={() => handleClick(index)}
          >
            {cell}
          </button>
        ))}
        {winningLine && <div style={getLineStyle(winningLine)} />}
      </div>
      <button
        className="rounded-full border border-solid border-black/[.08] px-4 py-2 hover:bg-[#f2f2f2] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
        onClick={resetGame}
      >
        Reset Game
      </button>
    </div>
  );
}
