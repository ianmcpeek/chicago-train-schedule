import React from 'react';
import './App.css';
import ViewRecord from './pages/ViewRecord';

function App() {
  return (
    <div className="App" style={{ 
      backgroundImage: `url(${process.env.PUBLIC_URL + '/jeremiah-higgins-lzBHm2sbJPM-unsplash.jpg'})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover'
    }}>
      <ViewRecord></ViewRecord>
    </div>
  );
}

export default App;
