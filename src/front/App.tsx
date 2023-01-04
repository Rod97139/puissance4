// import '../App.css'

import { GameStates, PlayerColor } from "../types"
import { ColorSelector } from "./component/ColorSelector"
import { Grid } from "./component/Grid"
import { NameSelector } from "./component/NameSelector"
import { GameInfo } from "./component/GameInfo"
import { useGame } from "./hooks/useGame"
import { LobbyScreen } from "./screens/LobbyScreen"
import { PlayScreen } from "./screens/PlayScreen"
import { send } from "xstate/lib/actions"
import { currentPlayer } from "../func/game"
import { VictoryScreen } from "./screens/VictoryScreen"
import { DrawScreen } from "./screens/DrawScreen"
import { LoginScreen } from "./screens/LoginScreen"

function App() {

  const {state, context, send} = useGame()
  const canDrop = state === GameStates.PLAY
  const player = canDrop ? currentPlayer(context) : undefined
  const dropToken = canDrop ?  (x: number) => {
    send({type: 'dropToken', x: x})
  } : undefined

  return (
    <div className="container">
      <LoginScreen/>
      {state === GameStates.LOBBY && <LobbyScreen/> }
      {state === GameStates.PLAY && <PlayScreen/> }
      {state === GameStates.VICTORY && <VictoryScreen/> }
      {state === GameStates.DRAW && <DrawScreen/> }
      <Grid winingPositions={context.winingPositions} grid={context.grid} onDrop={dropToken} color={player?.color}/>


     {/* <NameSelector onSelect={() => null}/>
     <hr />
     <ColorSelector onSelect={() => null} players={[{
      id: '1',
      name: 'John',
      color: PlayerColor.RED
     },{
      id: '2',
      name: 'Freddy',
      color: PlayerColor.YELLOW
     }]} colors={[PlayerColor.RED, PlayerColor.YELLOW]} />
     <hr />
      <GameInfo color={PlayerColor.RED} name={'John'}/>
      <Victory color={PlayerColor.RED} name={'John'}/>
      <Grid 
      onDrop={() => null}
      color={PlayerColor.RED}
      grid={[
        ['E','E','E','E','E','E','R'],
        ['E','E','E','E','E','R','Y'],
        ['E','E','E','E','E','R','R'],
        ['E','E','E','E','E','R','Y'],
        ['E','E','E','E','E','Y','R'],
        ['E','E','E','E','E','Y','Y']
      ]}/> */}

    </div>
  )
}

export default App
