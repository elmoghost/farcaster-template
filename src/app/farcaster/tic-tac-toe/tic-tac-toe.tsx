"use client";

import { useState, useEffect } from "react";
import { sdk } from "@farcaster/frame-sdk";
import { LocalTicTacToe } from "@/app/farcaster/tic-tac-toe/local-tic-tac-toe";
import { Button } from "@/components/ui/button";
// import { CPUTicTacToe } from "@/app/farcaster/tic-tac-toe/cpu-tic-tac-toe";

export function TicTacToe() {
  const [mode, setMode] = useState<"local" | "cpu" | null>(null);
  const [playerSymbol, setPlayerSymbol] = useState<"X" | "O" | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const signalReady = async () => {
      await sdk.actions.ready();
      setIsReady(true);
    };
    void signalReady();
  }, []);

  if (!isReady) {
    return (
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-xl font-bold">Tic-Tac-Toe</h2>
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  const handleModeSelect = async (selectedMode: "local" | "cpu") => {
    setMode(selectedMode);
    if (selectedMode === "local") {
      setPlayerSymbol(null);
    }
    try {
      // Haptic feedback for mode selection
      await sdk.haptics.impactOccurred("medium");
    } catch (error) {
      console.warn("Haptic feedback failed in handleModeSelect:", error);
    }
  };

  const handleSymbolSelect = async (symbol: "X" | "O") => {
    setPlayerSymbol(symbol);
    try {
      // Haptic feedback for symbol selection
      await sdk.haptics.impactOccurred("medium");
    } catch (error) {
      console.warn("Haptic feedback failed in handleSymbolSelect:", error);
    }
  };

  const resetSelection = async () => {
    setMode(null);
    setPlayerSymbol(null);
    try {
      // Strong haptic for resetting selection
      await sdk.haptics.impactOccurred("heavy");
    } catch (error) {
      console.warn("Haptic feedback failed in resetSelection:", error);
    }
  };

  if (mode === null) {
    return (
      <div className="flex flex-col items-center gap-4">
        <h2 className="mb-4 text-3xl font-bold">Tic-Tac-Toe</h2>
        <div className="text-lg">Select Game Mode</div>
        <div className="flex flex-col gap-4">
          <Button onClick={() => handleModeSelect("local")}>
            Local (2 Players)
          </Button>
          <Button onClick={() => handleModeSelect("cpu")} disabled={true}>
            vs CPU
          </Button>
        </div>
      </div>
    );
  }

  if (mode === "cpu" && playerSymbol === null) {
    return (
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-xl font-bold">Tic-Tac-Toe</h2>
        <div className="text-lg">Choose Your Symbol</div>
        <div className="flex gap-4">
          <button
            className="rounded-full border border-solid border-black/[.08] px-4 py-2 hover:bg-[#f2f2f2] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
            onClick={() => handleSymbolSelect("X")}
          >
            Play as X
          </button>
          <button
            className="rounded-full border border-solid border-black/[.08] px-4 py-2 hover:bg-[#f2f2f2] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
            onClick={() => handleSymbolSelect("O")}
          >
            Play as O
          </button>
        </div>
        <button
          className="rounded-full border border-solid border-black/[.08] px-4 py-2 hover:bg-[#f2f2f2] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
          onClick={resetSelection}
        >
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {/* {mode === "local" ? (
        <LocalTicTacToe />
      ) : (
        // <CPUTicTacToe playerSymbol={playerSymbol!} />
      )} */}
      {mode === "local" ? (
        <LocalTicTacToe />
      ) : (
        <div className="text-lg">CPU mode is not implemented yet.</div>
      )}
      <button
        className="rounded-full border border-solid border-black/[.08] px-4 py-2 hover:bg-[#f2f2f2] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
        onClick={resetSelection}
      >
        Change Mode
      </button>
    </div>
  );
}
