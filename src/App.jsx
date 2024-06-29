import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import TopBar from './components/TopBar/TopBar';
import { Context } from './context/Context';

function App() {
  const { user } = useContext(Context);
  return (
    <div className="App">
    <TopBar />
    
      <Outlet context={{ user }} />
    </div>
  );
}

export default App;
