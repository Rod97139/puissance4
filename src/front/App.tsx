// import '../App.css'

import { PlayerColor } from "../types"
import { ColorSelector } from "./component/ColorSelector"
import { Grid } from "./component/Grid"
import { NameSelector } from "./component/NameSelector"
import { GameInfo } from "./component/GameInfo"
import { Victory } from "./component/Victory"

function App() {

  return (
    <div className="container">
     <NameSelector onSelect={() => null}/>
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
      ]}/>
    </div>
  )
}

export default App
