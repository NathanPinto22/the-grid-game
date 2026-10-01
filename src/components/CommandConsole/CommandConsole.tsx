import { useState, useRef } from "react";
import "./CommandConsole.css";

export default function CommandConsole() {
    const actionsList = {
        "deploy": true
    }
    const [ccInputs, setCcInputs] = useState([] as string[]);
    const [commandIn, setCommandIn] = useState("");
    const commandRef = useRef(null);

    // Validate the parsed command to ensure the action is valid
    function validateCommand(parsedCommand: {action: string, obj: string, options: string[], valid: boolean, message: string}){
        if (!actionsList[parsedCommand.action as keyof typeof actionsList]) {
            parsedCommand.valid = false;
            parsedCommand.message = `Invalid action: ${parsedCommand.action}`;
        }
        return parsedCommand;
    }

    // Parse the command input into an object with action, object, and options
    function parseCommand(command: string){
        const parts = command.trim().split(/\s+/);

        const parsedCommand = {
            action: "",
            obj: "",
            options: [] as string[],
            valid: true,
            message: "valid command"
        }

        parsedCommand.action = parts[0]
        parsedCommand.obj = parts[1]
        parsedCommand.options = [];

        for(let i = 2; i < parts.length; i++){
            if(parts[i].startsWith("--")){
                parsedCommand.options.push(parts[i])
            }
        }

        return validateCommand(parsedCommand);
    }


    // Handle invalid command input by logging an error message
    function handleInvalidCommand(message: string) {
        console.error("Invalid command");
        const errorMessage = message || "Invalid command";
        setCcInputs(prev => [...prev, errorMessage]);
    }
    
    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCommandIn(e.target.value);

        // Reset first so the textarea can shrink when text is deleted
        e.target.style.height = "auto";
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            setCcInputs(prev => [...prev, commandIn]);
            console.log("Command entered:", commandIn);
            console.log("Command history:\n ", ccInputs);
            if (commandIn.trim() === "") return;
            const command = parseCommand(commandIn);
            setCommandIn("");
            if (!command.valid) handleInvalidCommand(command.message);
            // Send command to server
        }
    };

    return (
        <div className="command-console">
            <div className="cc-header">
                <span>_/command console</span>
            </div>

            <div className="cc-input">
                {ccInputs.map((ccInput, index) => (
                    <div className="cc-line" key={index}>
                        <span>&gt;</span>
                        <p>{ccInput}</p>
                    </div>
                ))}

                <div className="cc-line">
                    <span>&gt;</span>

                    <textarea
                        ref={commandRef}
                        id="command-in"
                        rows={1}
                        value={commandIn}
                        onChange={handleInput}
                        onKeyDown={handleKeyDown}
                    />
                </div>
            </div>
        </div>
    );
}
