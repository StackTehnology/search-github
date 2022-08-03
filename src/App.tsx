import { FC } from 'react'
import { Routes, Route } from 'react-router-dom';
import FavouritesPage from './pages/FavouritesPage';
import HomePage from './pages/HomePage';
import Navigation from './components/Navigation'
const App: FC = () => {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/favourites' element={<FavouritesPage />} />
      </Routes>
    </>
  );
}

export default App;
