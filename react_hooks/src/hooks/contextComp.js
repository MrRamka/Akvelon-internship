import React, {useContext} from "react";
import {JediContext} from "./context";


export default function Display() {
    const value = useContext(JediContext);
    return <div>{value}, value from Context</div>
}
