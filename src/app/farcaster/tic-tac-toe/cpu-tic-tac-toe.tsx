// "use client";

// import { useState, useEffect } from "react";
// import { sdk } from "@farcaster/frame-sdk";
// import { checkWinner, getLineStyle } from "@/utils/game-logic";

// export function CPUTicTacToe({ playerSymbol }: { playerSymbol: "X" | "O" }) {
//   const [board, setBoard] = useState<Array<string | null>>(Array(9).fill(null));
//   const [isPlayerTurn, setIsPlayerTurn] = useState(playerSymbol === "X");
//   const [winner, setWinner] = useState<string | null>(null);
//   const [winningLine, setWinningLine] = useState<number[] | null>(null);

//   const cpuSymbol = playerSymbol === "X" ? "O" : "X";

//   const makeCPUMove = async (currentBoard: (string | null)[]) => {
//     const emptyCells = currentBoard
//       .map((cell, index) => (cell === null ? index : null))
//       .filter((index): index is number => index !== null);
//     if (emptyCells.length === 0) return;

//     const randomIndex =
//       emptyCells[Math.floor(Math.random() * emptyCells.length)];
//     const newBoard = [...currentBoard];
//     newBoard[randomIndex] = cpuSymbol;
//     setBoard(newBoard);
//     setIsPlayerTurn(true);

//     try {
//       const gameWinner = checkWinner(newBoard, setWinningLine);
//       if (gameWinner) {
//         setWinner(gameWinner);
//         // Haptic for CPU win
//         await sdk.haptics.impactOccurred("heavy");
//       } else if (!newBoard.includes(null)) {
//         setWinner("Draw");
//         // Haptic for draw
//         await sdk.haptics.impactOccurred("heavy");
//       }
//       // Haptic for CPU move
//       await sdk.haptics.impactOccurred("soft");
//     } catch (error) {
//       console.warn("Haptic feedback failed in makeCPUMove:", error);
//     }
//   };

//   const handleClick = async (index: number) => {
//     if (board[index] || winner || !isPlayerTurn) return;

//     const newBoard = [...board];
//     newBoard[index] = playerSymbol;
//     setBoard(newBoard);
//     setIsPlayerTurn(false);

//     try {
//       const gameWinner = checkWinner(newBoard, setWinningLine);
//       if (gameWinner) {
//         setWinner(gameWinner);
//         // Haptic for player win
//         await sdk.haptics.impactOccurred("heavy");
//       } else if (!newBoard.includes(null)) {
//         setWinner("Draw");
//         // Haptic for draw
//         await sdk.haptics.impactOccurred("heavy");
//       }
//       // Haptic for player cell click
//       await sdk.haptics.impactOccurred("rigid");
//     } catch (error) {
//       console.warn("Haptic feedback failed in handleClick:", error);
//     }
//   };

//   useEffect(() => {
//     if (!isPlayerTurn && !winner) {
//       const timer = setTimeout(() => makeCPUMove(board), 500);
//       return () => clearTimeout(timer);
//     }
//   }, [isPlayerTurn, board, winner]);

//   const resetGame = async () => {
//     setBoard(Array(9).fill(null));
//     setIsPlayerTurn(playerSymbol === "X");
//     setWinner(null);
//     setWinningLine(null);
//     try {
//       // Strong haptic for game reset
//       await sdk.haptics.impactOccurred("heavy");
//     } catch (error) {
//       console.warn("Haptic feedback failed in resetGame:", error);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center gap-4">
//       <h2 className="text-xl font-bold">Tic-Tac-Toe (vs CPU)</h2>
//       <div className="text-lg">
//         {winner
//           ? winner === "Draw"
//             ? "It's a Draw! No one won."
//             : `Winner: ${winner}!`
//           : `Player's turn: ${isPlayerTurn ? playerSymbol : cpuSymbol}`}
//       </div>
//       <div className="relative grid grid-cols-3 gap-2 w-[300px] sm:w-[360px]">
//         {board.map((cell, index) => (
//           <button
//             key={index}
//             className="aspect-square border border-black/[.08] dark:border-white/[.145] text-4xl font-bold flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a]"
//             onClick={() => handleClick(index)}
//           >
//             {cell}
//           </button>
//         ))}
//         {winningLine && <div style={getLineStyle(winningLine)} />}
//       </div>
//       <button
//         className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] px-4 py-2 hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a]"
//         onClick={resetGame}
//       >
//         Reset Game
//       </button>
//     </div>
//   );
// }
