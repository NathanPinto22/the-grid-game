import { useState, useEffect } from 'react'
import "./CommandConsole.css"

export default function CommandConsole(){
    const [ccInputs, setCcInputs] = useState([]);
    const [commandIn, setCommandIn] = useState("");

    useEffect(()=>{

    })

    return (
        <>
        <div className="command-console">
            <div className="cc-header">
                <span>_/command console</span>
            </div>
            <div className="cc-input">
                {
                    ccInputs.map(ccInput => (
                        <div className="cc-line">
                            <span>&gt;</span><p>{ccInput}</p>
                        </div>
                    ))
                }
                <div className="cc-line">
                    <span>&gt;</span>
                    <input
                     id="command-in"
                     name="command-in"
                     type="text"
                     value={commandIn}
                     onChange={(e)=>{setCommandIn(e.target.value)}}
                    />
                </div>
                
            </div>
        </div>
        </>
    )
}