import "./Grid.css"
import GridCell from "../GridCell/GridCell";

export default function Grid(){
    const gameScale = 12;
    const cells = [];

    for(let i = 0; i < gameScale; i++){
        for(let j = 0; j < gameScale; j++){
            cells.push(
                <GridCell x={i} y={j} />
            )
        }    
    }
    return(
        <div className="game-grid">
            {
                cells
            }
        </div>
    )
}