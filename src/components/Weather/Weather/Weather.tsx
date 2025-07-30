import { useEffect, useState, type SetStateAction } from 'react';
import s from './Weather.module.css';
import { Main } from '../Main/Main';
import { Footer } from '../Footer/Footer';
import { getWeather, getWeatherFiveDay } from '../../../services/api';
import { WeatherHeader } from '../WeatherHeader/WeatherHeader';
import { WeatherDays } from '../WeatherForFewDays/WeaherDays';

export type dataType = {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  sys: {
    sunrise: number;
    sunset: number;
  };
  name: string;
  weather: {
    0: {
      icon: string;
    };
  };
  wind: {
    speed: number;
    deg: number;
  };
  timezone: number;
  dt_txt?: number;
  dt?: number;
};

export const Weather = () => {
  const [data, setData] = useState<dataType>({
    main: {
      temp: 293.15,
      feels_like: 293.15,
      humidity: 50,
    },
    sys: {
      sunrise: 0,
      sunset: 0,
    },
    name: '',
    weather: {
      0: {
        icon: '',
      },
    },
    wind: {
      speed: 1,
      deg: 0,
    },
    timezone: 18000,
  });

  const [cityName, setCityName] = useState<string>('Ufa');
  const [forecast, setForecast] = useState<dataType[]>([]);
  let [nightTheme, setNightTheme] = useState<boolean>(false);
  const [err, setErr] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [weatherDaysLoading, setWeatherDaysLoading] =
    useState<SetStateAction<boolean>>(false);

  setTimeout(() => {
    setErr('');
  }, 5000);

  useEffect(() => {
    getWeather(cityName)
      .then((res) => {
        setData(res);
        return res;
      })
      .then((res) => {
        if (
          new Date(res ? res.sys.sunrise * 1000 : '') <= new Date() &&
          new Date() <= new Date(res ? res.sys.sunset * 1000 : '')
        ) {
          setNightTheme(false);
        } else {
          setNightTheme(true);
        }
      })
      .catch((error) => {
        setErr(error.message);
      });
  }, []);

  useEffect(() => {
    setWeatherDaysLoading(true);
    getWeatherFiveDay(cityName)
      .then((res) => {
        console.log(res);
        setForecast(
          res.list.filter((i: dataType) => {
            let hour: number | Date = new Date(i.dt_txt).getHours();
            if (new Date(i.dt_txt) > new Date()) {
              if (hour === 3 || hour === 9 || hour === 15 || hour === 21) {
                return i;
              }
            }
          }),
        );
        setWeatherDaysLoading(false);
      })
      .catch((error) => {
        setErr(error.message);
        setWeatherDaysLoading(false);
      });
  }, []);

  return (
    <div className={nightTheme ? s.wrapperNight : s.wrapper}>
      <WeatherHeader
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        cityName={cityName}
        setCityName={setCityName}
        setNightTheme={setNightTheme}
        nightTheme={nightTheme}
        data={data}
        setData={setData}
        setForecast={setForecast}
        setErr={setErr}
      />
      {err && (
        <div className={s.error}>
          <p className={s.errorMessage}>{err}</p>
        </div>
      )}
      <Main nightTheme={nightTheme} data={data} />
      {weatherDaysLoading ? (
        <div className={s.weatherDaysLoading}>Загрузка...</div>
      ) : (
        <WeatherDays forecast={forecast} nightTheme={nightTheme} />
      )}

      <Footer />
    </div>
  );
};
