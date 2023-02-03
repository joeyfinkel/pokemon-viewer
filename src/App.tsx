import './App.css';
import { Pokemon } from './components/Pokemon';
import { Routes, Route, Outlet, Link } from 'react-router-dom';

function App() {
  const params = { limit: 560, offset: 0 };
  const path = `pokemon?limit=${params.limit}&offset=${params.offset}`;

  return (
    <Routes>
      {/* <Route
        path='/pokemon-viewer'
        element={
          <div>
            <Link to={`/${path}`}>Pokemon</Link>
            <Outlet />
          </div>
        }
      /> */}
      <Route path='pokemon-viewer' element={<Pokemon {...params} />} />
    </Routes>
  );
}

export default App;
