import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
{/* import { Sidebar } from './Pages/Sidebar.jsx';
import { Rightside } from './Pages/Rightside.jsx'; */}


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/*<Sidebar />
    <Rightside /> */}
  </StrictMode>,
);
