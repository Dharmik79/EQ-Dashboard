import React from 'react';
import './App.css';

import Text from './components/Text';
import Map from './components/Map';
import BarChart from './components/BarChart';
import TimeLine from './components/TimeLine';
import DepthChart from './components/DepthChart';


function App() {
  return (
    <div className="dashboard">
    <div className="row1">
    <Text/>
    <Map/>
    </div>
    <div className='row2'>
    <BarChart/>
    <DepthChart/>
    </div>
    <div className='row3'>
    <TimeLine/>
    </div>
    </div>
  );
}

export default App;
