

export default function GameBoard({onSelectSquare, board}) {
  
    // const [gameBoard, setGameBoard] = useState(initialGameBoard);
    
    // function handleSelectSquare(rowInd, colInd) {
    //     setGameBoard(prevGameBoard => {
    //         const updatedBoard = [...prevGameBoard.map(innerArr => [...innerArr])]
    //         updatedBoard[rowInd][colInd] = activePayerSymbol;
    //         return updatedBoard;
    //     });
    //     onSelectSquare();
    // }

    return (
        <ol id="game-board">
            {board.map((row, rowInd) =>
             <li key={rowInd}>
                <ol>
                    {row.map((playerSymbol, colInd) => 
                    <li key={colInd}>
                        <button
                         onClick={() => onSelectSquare(rowInd, colInd)}
                         disabled={playerSymbol !== null}
                        >{playerSymbol}
                        </button>
                        </li>
                        )}
                </ol>
            </li>)}
        </ol>
    )
}