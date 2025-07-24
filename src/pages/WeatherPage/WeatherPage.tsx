import s from './WeatherPage.module.css';
import { Weather } from '../../components/Weather/Weather/Weather';
import { Link } from 'react-router-dom';
import { routes } from '../routes';

export const WeatherPage = () => {
  return (
    <>
      <div className={s.back}>
        <Link className={s.link} to={routes.main}>
          <div className={s.icon}></div> Назад
        </Link>
      </div>
      <Weather />
    </>
  );
};
