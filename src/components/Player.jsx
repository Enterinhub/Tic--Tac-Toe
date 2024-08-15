import { useState } from "react"

export default function Player({initialName, symbol, isActive, onHandleName}){
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  function editing(){
    setIsEditing((editing) => !editing);
    console.log(isEditing)
    if(isEditing) {
    onHandleName(symbol, playerName)
  }
  }

  function chng(event){
    setPlayerName(event.target.value);
  }

  let editablePlayerName = <span className="player-name">{playerName}</span>;
  let btnCaption = 'Edit';

  if(isEditing) {
    editablePlayerName = <input type="text" required value={playerName} onChange={chng} />;
    btnCaption='Save';
  }

    return (
        <li className={isActive ? 'active' : undefined}>
          <span className="player">
            {editablePlayerName}
            <span className="player-symbol">{symbol}</span>
          </span>
          <button onClick={editing}>{btnCaption}</button>
        </li>
    )
}