import React from 'react';
import './App.css';
import LightBulb from './hooks/state.js'
import Effect from './hooks/effect.js'

function App() {
    return (
        <div className="App">
            <p>Hello world</p>
            <LightBulb/>
            <Effect/>
        </div>
    );
}

export default App;


