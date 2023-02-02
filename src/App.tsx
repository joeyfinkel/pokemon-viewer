import './App.css';
import { Pokemon } from './components/Pokemon';
import { Routes, Route, Outlet, Link } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route
        path='/pokemon-viewer'
        element={
          <div>
            <Link to='/pokemon'>Pokemon</Link>
            <Outlet />
          </div>
        }
      />
      <Route path='pokemon' element={<Pokemon />} />
    </Routes>
  );
}

export default App;
