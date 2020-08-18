import React from 'react';
import './App.css';
import LightBulb from './hooks/state.js'
import Effect from './hooks/effect.js'
import {JediContext} from "./hooks/context";
import Display from "./hooks/contextComp";
import Input from "./hooks/ref";
import CustomHook from "./hooks/customHook";

function App() {
    return (
        <div className="App">
            <p>Hello world</p>
            <LightBulb/>
            <Effect/>
            <hr/>
            <JediContext.Provider value={"Test value"}>
                <Display/>
            </JediContext.Provider>
            <hr/>
            <Input/>
            <hr/>
            <CustomHook/>
        </div>
    );
}

export default App;


