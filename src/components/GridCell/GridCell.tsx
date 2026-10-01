import "./GridCell.css"

export default function GridCell(props: {x: number, y: number}){
    return (
        <div className="grid-cell" id={`cell-${props.x}-${props.y}`} data-x={props.x} data-y={props.y}>
            
        </div>
    )
}