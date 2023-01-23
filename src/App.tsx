import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Pokemon } from './components/Pokemon';
import { useEndpoints } from './hooks/useEndpoints';
import { Layout } from './Layout';

function App() {
  const endpoints = useEndpoints();

  return (
    <div>
      <h1>Hello From Pokemon App</h1>
      <Routes>
        <Route path='/' element={<Layout />}>
          {endpoints.map(([endpoint]) =>
            endpoint === 'pokemon' ? (
              <Route key={endpoint} path={endpoint} element={<Pokemon />} />
            ) : null
          )}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
