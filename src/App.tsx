import { Content } from './components/Content';
import { SideBar } from './components/SideBar';
import { MoviesContextProvider } from './contexts/MoviesContext';

import './styles/global.scss';

export function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <MoviesContextProvider>
        <SideBar />
        <Content />
      </MoviesContextProvider>
    </div>
  );
}
