export const checkWinner = (
  squares: (string | null)[],
  setWinningLine: (line: number[] | null) => void,
) => {
  const lines = [
    [0, 1, 2], // Row 1
    [3, 4, 5], // Row 2
    [6, 7, 8], // Row 3
    [0, 3, 6], // Column 1
    [1, 4, 7], // Column 2
    [2, 5, 8], // Column 3
    [0, 4, 8], // Diagonal 1
    [2, 4, 6], // Diagonal 2
  ];

  for (const line of lines) {
    const [a, b, c] = line;
    if (
      typeof a === "number" &&
      typeof b === "number" &&
      typeof c === "number" &&
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      setWinningLine(line);
      return squares[a];
    }
  }
  return null;
};

export const getLineStyle = (winningLine: number[] | null) => {
  if (!winningLine) return {};
  const [a] = winningLine;

  const baseStyle = {
    position: "absolute" as const,
    background: "white",
  };

  if (a === 0 && winningLine.includes(1)) {
    // Row 1
    return {
      ...baseStyle,
      height: "4px",
      width: "100%",
      top: "16.67%",
      left: "0",
    };
  } else if (a === 3 && winningLine.includes(4)) {
    // Row 2
    return {
      ...baseStyle,
      height: "4px",
      width: "100%",
      top: "50%",
      left: "0",
    };
  } else if (a === 6 && winningLine.includes(7)) {
    // Row 3
    return {
      ...baseStyle,
      height: "4px",
      width: "100%",
      top: "83.33%",
      left: "0",
    };
  } else if (a === 0 && winningLine.includes(3)) {
    // Column 1
    return {
      ...baseStyle,
      width: "4px",
      height: "100%",
      left: "16.67%",
      top: "0",
    };
  } else if (a === 1 && winningLine.includes(4)) {
    // Column 2
    return {
      ...baseStyle,
      width: "4px",
      height: "100%",
      left: "50%",
      top: "0",
    };
  } else if (a === 2 && winningLine.includes(5)) {
    // Column 3
    return {
      ...baseStyle,
      width: "4px",
      height: "100%",
      left: "83.33%",
      top: "0",
    };
  } else if (a === 0 && winningLine.includes(4)) {
    // Diagonal 1
    return {
      ...baseStyle,
      width: "100%",
      height: "4px",
      top: "50%",
      left: "0",
      transform: "rotate(45deg)",
      transformOrigin: "center",
    };
  } else if (a === 2 && winningLine.includes(4)) {
    // Diagonal 2
    return {
      ...baseStyle,
      width: "100%",
      height: "4px",
      top: "50%",
      left: "0",
      transform: "rotate(-45deg)",
      transformOrigin: "center",
    };
  }
  return {};
};
