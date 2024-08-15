import { useState } from "react"
import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

const PLAYERS = {
  X: 'player 1',
  O: 'player 2'
};

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]


function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';
      
  if(gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...initialGameBoard.map(item => [...item])];
  console.log('notudated', gameBoard) 
for(const turn of gameTurns) {
    const {square, player} = turn;
    const {row, col} = square;
        gameBoard[row][col] = player;
}
return gameBoard;
}

function deriveWinner(gameBoard, players) {
  let winner;

  for(const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];
  
    if(firstSquareSymbol &&
       firstSquareSymbol === secondSquareSymbol && 
       firstSquareSymbol === thirdSquareSymbol
       ) {
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS)

  const [gameTurns, setGameTurns] = useState([]);
  
  const activePlayer = deriveActivePlayer(gameTurns);

  const gameBoard = deriveGameBoard(gameTurns);
  console.log('updated',gameBoard)

  const winner = deriveWinner(gameBoard, players);

  const draw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowInd, colInd) {
   
    setGameTurns((prevTurn) => {
     const currentPlayer = deriveActivePlayer(prevTurn)

      const updatedTurns = [{ square: { row: rowInd, col: colInd }, player: currentPlayer },...prevTurn,];
      return updatedTurns;
     
    })  
  }

  function handleRestart() { 
    setGameTurns([]);
  }

  function handlePlayerName(symbol, newName){
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      }
    })
  }

 
  
  return (
    <main>   
      <div id="game-container">
      <ol id="players" className="highlight-player">
        <Player 
        initialName={PLAYERS.X}
        symbol="X"
         isActive={activePlayer === 'X'}
         onHandleName={handlePlayerName}
          />
        <Player 
        initialName={PLAYERS.O}
        symbol="O" 
        isActive={activePlayer === 'O'} 
        onHandleName={handlePlayerName}
        />
      </ol>
      {(winner || draw) && <GameOver restart={handleRestart} winner={winner} />}
      <GameBoard 
      board={gameBoard}  
      onSelectSquare={handleSelectSquare}
       />
    </div>
    <Log turns={gameTurns}/>
    </main>
  )
}

export default App
