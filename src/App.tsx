import { Routes, Route, useNavigate } from 'react-router-dom';
import { MainPage } from './pages/Main/MainPage';
import { routes } from './pages/routes';
import { useEffect } from 'react';
import { WeatherPage } from './pages/WeatherPage/WeatherPage';

function App() {

  const nav = useNavigate()
  useEffect(() => {
    nav(routes.main);
  }, []);
  return (
    <Routes>
      <Route path={routes.main} element={<MainPage />} />
      <Route path={routes.weather} element={<WeatherPage />} />

    </Routes>
  );
}

export default App;
