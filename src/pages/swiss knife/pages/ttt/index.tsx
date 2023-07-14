import { useState } from "react";

const TTT = () => {
  const [history, setHistory] = useState<any[][]>([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState<number>(0);
  const [winnerHistory, setWinnerHistory] = useState<any[]>([]);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const calculateWinner = (squares: any[]) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const handlePlay = (nextSquares: any[]) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    const isBoardFull = nextSquares.every((square: any) => square !== null);
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    const winner = calculateWinner(nextSquares);
    if (winner) {
      setWinnerHistory([...winnerHistory, winner]);
    } else if (isBoardFull) {
      setWinnerHistory([...winnerHistory, "TIE"]);
    }
  };

  const restart = () => {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  };

  const jumpTo = (nextMove: any) => {
    setCurrentMove(nextMove);
  };
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to Move # " + move;
    } else {
      description = "GO to game start";
    }
    return (
      <div key={move}>
        <button
          onClick={() => jumpTo(move)}
          className="p-2 m-1 rounded-lg bg-pink-300"
        >
          {description}
        </button>
      </div>
    );
  });

  const isBoardFull = currentSquares.every((square: any) => square !== null);
  const winner = calculateWinner(currentSquares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else if (isBoardFull) {
    status = "TIE!";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  console.log(winnerHistory);

  return (
    <>
      <div className="flex justify-center">
        <div>
          <div>Winner</div>
          <div>
            {winnerHistory.map((winner, index) => (
              <div key={index}>
                Game #{index + 1} winner : {winner}
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="flex justify-around items-center mt-4">
            {status}
            <span>
              <button
                onClick={restart}
                className=" bg-stone-400 rounded-md ml-4 p-1"
              >
                restart
              </button>
            </span>
          </div>
          <Board
            xIsNext={xIsNext}
            squares={currentSquares}
            onPlay={handlePlay}
            calculateWinner={calculateWinner}
          />
        </div>

        <div className="ml-4">{moves}</div>
      </div>
    </>
  );
};

export default TTT;

const Board = ({
  xIsNext,
  squares,
  onPlay,
  calculateWinner,
}: {
  xIsNext: boolean;
  squares: any[];
  onPlay: (nextSquares: any[]) => void;
  calculateWinner: (squares: any[]) => any;
}) => {
  const handleClick = (i: number) => {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  };

  return (
    <>
      <div className="ml-4">
        <div className="flex justify-center">
          <div className="m-2">
            <Square onClick={() => handleClick(0)} value={squares[0]} />
          </div>
          <div className="m-2">
            <Square onClick={() => handleClick(1)} value={squares[1]} />
          </div>
          <div className="m-2">
            <Square onClick={() => handleClick(2)} value={squares[2]} />
          </div>
        </div>
        <div className="flex justify-center">
          <div className="m-2">
            <Square onClick={() => handleClick(3)} value={squares[3]} />
          </div>
          <div className="m-2">
            <Square onClick={() => handleClick(4)} value={squares[4]} />
          </div>
          <div className="m-2">
            <Square onClick={() => handleClick(5)} value={squares[5]} />
          </div>
        </div>
        <div className="flex justify-center">
          <div className="m-2">
            <Square onClick={() => handleClick(6)} value={squares[6]} />
          </div>
          <div className="m-2">
            <Square onClick={() => handleClick(7)} value={squares[7]} />
          </div>
          <div className="m-2">
            <Square onClick={() => handleClick(8)} value={squares[8]} />
          </div>
        </div>
      </div>
    </>
  );
};

const Square = ({ value, onClick }: { value: any; onClick: () => void }) => {
  return (
    <>
      <button
        onClick={onClick}
        className="w-16 h-16 bg-amber-600 rounded-lg text-white text-[40px] font-bold text-center"
      >
        {value}
      </button>
    </>
  );
};
