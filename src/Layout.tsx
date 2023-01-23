import { Link, Outlet } from 'react-router-dom';
import { useEndpoints } from './hooks/useEndpoints';

export const Layout = () => {
  const endpoints = useEndpoints();

  return (
    <div className='App'>
      <nav>
        <ul>
          {endpoints.map(([endpoint]) =>
            endpoint === 'pokemon' ? (
              <li key={endpoint}>
                <Link to={endpoint}>{endpoint}</Link>
              </li>
            ) : null
          )}
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};
