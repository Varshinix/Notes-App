import React, { useState } from 'react'
import { Sidebar } from './Pages/Sidebar.jsx';
import { Rightside } from './Pages/Rightside.jsx';
import "./App.css";

function App () {
  const [activeNote, setActiveNote] = useState(null);

  return (
    <div className="app-container">
      {/* Left Sidebar */}
      <Sidebar setActiveNote={setActiveNote} />

      {/* Right Content */}
      <Rightside activeNote={activeNote} />
    </div>
  );
}

export default App;
