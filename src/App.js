import React from 'react';
import './App.css';
import Current from './Component/Current';
import Forecast from './Component/Forecast';


function App() {

  return (
    <div className="App">
      <Current/>
      <Forecast/>
    </div>
  );
}

export default App;
