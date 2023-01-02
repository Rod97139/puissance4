// import '../App.css'

import { PlayerColor } from "../types"
import { ColorSelector } from "./screen/ColorSelector"
import { NameSelector } from "./screen/NameSelector"

function App() {

  return (
    <div className="container">
     <NameSelector disabled onSelect={() => null}/>
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
    </div>
  )
}

export default App
