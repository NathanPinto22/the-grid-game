import Grid from "./components/Grid/Grid.tsx"
import CommandConsole from "./components/CommandConsole/CommandConsole.tsx"
import "./App.css"

export default function App(){
  return (
    <div className="container">
      <CommandConsole />
      <Grid />
    </div>
  )
}