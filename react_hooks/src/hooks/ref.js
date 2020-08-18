import React, {useRef, useState} from "react";

export default function Input() {

    let [name, setName] = useState("Nate");

    let nameRef = useRef();

    const submitButton = () => {
        setName(nameRef.current.value);
    }

    return (
        <div className="App">
            <p>{name}</p>
            <div>
                <input type="text" ref={nameRef}/>
                <button type="button" onClick={submitButton}>Submit</button>
            </div>
        </div>
    );


}