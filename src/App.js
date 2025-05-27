import { useState } from "react";
import "./App.css";

const WIN_CONDITIONS = [
  [0, 1, 2],[3,4,5],[6,7,8], // Horizontal
  [0, 3, 6],[1,4,7],[2,5,8], // Vertical
  [0, 4, 8],[2, 4, 6] // Diagonal
];

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [isTie, setIsTie] = useState(false);

  const checkWinner = (board) => {
    for(const [a,b,c] of WIN_CONDITIONS) {
      if(board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  }

  const handleClick = (index) => {
    if (board[index] || winner) return; // Ignore if cell is already filled or game is over

    const newBoard = [... board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    }
    else if (!newBoard.includes(null)) {
      setIsTie(true);
    }
    else {
      setIsXNext(!isXNext);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setIsTie(false);
  };  

  return (
    <div style= {{textAlign:"center"}}>
      <h1>Tic Tac Toe</h1>
      <div 
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 100px)",
          gridgap: "5px",
          justifyContent: "center",
          margin: "20px auto" 
        }}
        > 
        {board.map((cell, idx) => (
          <button
            key={idx}
            onClick={() => handleClick(idx)}
            style={{
              width: "100px",
              height: "100px",
              fontSize: "2rem",
              cursor: board[idx] || winner ? "default" : "pointer",
            }}
            >
            {cell}
            </button>
        ))}
        </div>
      {winner && <h2>Winner: {winner}</h2>}
      {!winner && isTie && <h2>It's a Tie!</h2>}
      {!winner && !isTie && (
        <h2>Next Player: {isXNext ? 'X' : 'O'}</h2>
      )}
      <button onClick={resetGame} style={{ marginTop: "20px", padding: "10px 20px", fontSize: "1rem" }}>
        Reset Game
      </button>
    </div>
      
  );

}

export default App;
// This code implements a simple Tic Tac Toe game using React.