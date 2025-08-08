import { useEffect, useRef, useState, type SetStateAction } from 'react';
import s from './Weather.module.css';
import { Main } from '../Main/Main';
import { Footer } from '../Footer/Footer';
import { getWeather, getWeatherFiveDay } from '../../../services/api';
import { WeatherDays } from '../WeatherForFewDays/WeaherDays';
import { DaylightHours } from '../DaylightHours/DaylightHours';
import { WeatherIcon } from '../weatherIcon/WeatherIcon';

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
  dt?: number;
  dt_txt?: string | number;
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

  const [isOpen, setIsOpen] = useState<boolean>(false);
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
        setForecast(
          res.list.filter((i: dataType[]) => {
            let hour: number = new Date(i.dt_txt).getHours();
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

  const handleSearchCity = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const res = await getWeather(cityName);
      setData(res);
      setIsLoading(false);
      if (
        new Date(res ? res.sys.sunrise * 1000 : '') <= new Date() &&
        new Date() <= new Date(res ? res.sys.sunset * 1000 : '')
      ) {
        setNightTheme(false);
      } else {
        setNightTheme(true);
      }
      if (inputRef.current !== null) {
        inputRef.current.value = '';
      }
    } catch (error: unknown) {
      const err = error as Error;
      setIsLoading(false);
      setErr(err.message);
    }

    try {
      const res = await getWeatherFiveDay(cityName);
      setIsLoading(false);
      setForecast(
        res.list.filter((i: dataType[]) => {
          let hour = new Date(i.dt_txt).getHours();
          if (new Date(i.dt_txt) > new Date()) {
            if (hour === 3 || hour === 9 || hour === 15 || hour === 21) {
              return i;
            }
          }
        }),
      );
    } catch (error: unknown) {
      const err = error as Error;
      setIsLoading(false);
      setErr(err.message);
    }
  };

  const nightThemeButton = () => {
    setNightTheme(nightTheme ? (nightTheme = false) : (nightTheme = true));
  };

  let themeIcon = nightTheme ? '/moon.png' : '/sun.png';
  const inputRef = useRef<HTMLInputElement>(null);

  let timezone = () => {
    let time = data.timezone / (60 * 60);
    if (time === 0) {
      return;
    }
    if (time > 0) {
      return `+${time}`;
    }
    if (time < 0) {
      return `+${Math.abs(time)}`;
    }
  };

  const windDirection = (data: number) => {
    if (0 < data && data <= 22.5) {
      return `С ↓`;
    }
    if (22.5 < data && data <= 67.5) {
      return `СВ ↙`;
    }
    if (67.5 < data && data <= 112.5) {
      return `В ←`;
    }
    if (112.5 < data && data <= 157.5) {
      return `ЮВ ↖	`;
    }
    if (157.5 < data && data <= 202.5) {
      return `Ю ↑`;
    }
    if (202.5 < data && data <= 247.5) {
      return `ЮЗ ↗`;
    }
    if (247.5 < data && data <= 292.5) {
      return `З →`;
    }
    if (292.5 < data && data <= 337.5) {
      return `СВ ↘`;
    }
    if (337.5 < data && data <= 360) {
      return `С ↓`;
    }
  };

  setTimeout(() => {
    // setErr("");
  }, 5000);

  const getDate = (): string => {
    let currentTime: Date = new Date();
    let day: number = currentTime.getDate();
    let month: number = 1 + currentTime.getMonth();
    return `${day}.${month < 10 ? '0' + month : month}`;
  };

  const currentDate = (timezone: number): string => {
    const [minutes, setMinutes] = useState(new Date().getUTCMinutes());
    const [hour, setHour] = useState(new Date().getUTCHours());
    setInterval(() => {
      setMinutes(new Date().getUTCMinutes());
      setHour(new Date().getUTCHours());
    }, 1000);

    return `${
      hour + timezone / 3600 > 24
        ? hour + timezone / 3600 - 24
        : hour + timezone / 3600
    }:${minutes < 10 ? '0' + minutes : minutes}`;
  };

  const mainIcon = (icon: string, timezone: number) => {
    let iconImg = '';
    let getHour = new Date(timezone).getHours();
    switch (icon) {
      case '02d':
        iconImg = '/public/fewClouds.png'; // few clowds 11-25%
        break;
      case '03d':
        iconImg = '/public/scatteredClouds.png'; // scattered clouds 25-50%
        break;
      case '04d':
        iconImg = '/public/brokenClouds.png'; // broken clouds 51-84%
        break;
      case '09d':
        iconImg = '/public/rain3.png'; // shower rain
        break;
      case '10d':
        iconImg = '/public/rain.png'; // rain
        break;
      case '11d':
        iconImg = '/public/thunderstorm.png'; // thunderstorm
        break;
      case '13d':
        iconImg = '/public/snow.png'; // snow
        break;
      case '50d':
        iconImg = '/public/mist.png'; //mist
        break;
      case '02n':
        iconImg = '/public/fewClouds.png'; // few clowds 11-25%
        break;
      case '03n':
        iconImg = '/public/scatteredClouds.png'; // scattered clouds 25-50%
        break;
      case '04n':
        iconImg = '/public/brokenClouds.png'; //broken clouds
        break;
      case '09n':
        iconImg = '/public/rain3.png'; // shower rain
        break;
      case '10n':
        iconImg = '/public/rain.png'; // rain
        break;
      case '11n':
        iconImg = '/public/thunderstorm.png'; // thunderstorm
        break;
      case '13n':
        iconImg = '/public/snow.png'; // snow
        break;
      case '50n':
        iconImg = '/public/mist.png'; //mist
        break;
      default:
        if (
          (icon === '01n' && getHour === 21) ||
          (icon === '01d' && getHour === 3)
        ) {
          iconImg = '/public/moon.png'; // moon
        } else {
          iconImg = '/public/sun.png'; //sun
        }
        break;
    }
    return <img className={s.icon} src={iconImg} alt="" />;
  };

  const timesOfDay = (day: number) => {
    switch (day) {
      case 3:
        return 'ночью';
      case 9:
        return 'утром';

      case 15:
        return 'днем';

      case 21:
        return 'вечером';

      default:
        break;
    }
  };

  const formatDate = (date: number) => {
    let day: number = new Date(date).getDate();
    let month: number = new Date(date).getMonth() + 1;
    if (new Date(date).getHours() === 9) {
      return `${day}.${month < 10 ? '0' + month : month}`;
    }
  };

  const months: string[] = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ];

  const monthName = (date: number) => {
    let month: number = new Date(date).getMonth();
    let hour: number = new Date(date).getHours();
    if (hour === 9) {
      return months[month];
    }
  };

  return (
    <div className={nightTheme ? s.wrapperNight : s.wrapper}>
      {/* header */}
      <div className={nightTheme ? s.nightHeader : s.header}>
        <div className={s.logo}></div>
        <div className={s.cityName}>
          <img className={s.locationImg} src="/location.png" alt="" />
          <div className={s.cityNameBlock}>
            <p className={s.cityNameText}>{data.name}</p>{' '}
            <span className={s.timezoneText}>({timezone()} UTC)</span>
          </div>
        </div>
        <div className={s.inputContentHeader}>
          <form className={s.form} action="" onSubmit={handleSearchCity}>
            <input
              ref={inputRef}
              placeholder="Введите насленный пункт"
              className={
                nightTheme ? s.inputCityNameHeaderNight : s.inputCityNameHeader
              }
              onChange={(e) => setCityName(e.target.value)}
              type="text"
            />
            <button
              disabled={isLoading}
              className={
                nightTheme ? s.searchButtonHeaderNight : s.searchButtonHeader
              }
              type="submit"
            >
              🔍
            </button>
          </form>
        </div>
        <div className={s.nightTheme}>
          <p className={s.textNightTheme}>Ночной режим </p>
          {<img className={s.iconHeader} src={themeIcon} />}
          <input
            onClick={() => nightThemeButton()}
            className={s.checkbox}
            checked={nightTheme}
            readOnly
            type="checkbox"
          />
        </div>
      </div>
      {err && (
        <div className={s.error}>
          <p className={s.errorMessage}>{err}</p>
        </div>
      )}

      {/* main */}
      <div className={nightTheme ? s.mainNight : s.main}>
        <div className={s.currentDayInfo}>
          <div
            className={nightTheme ? s.positioningInfoNight : s.positioningInfo}
          >
            <div>
              <p className={s.textNow}>Сейчас</p>
              <p className={s.todayDay}>{getDate()}</p>
              <p>{currentDate(data.timezone)}</p>
            </div>
            <div>{mainIcon(data.weather[0].icon, data.timezone)}</div>
            <div className={s.currentTemp}>
              {(data.main.temp - 273.15).toFixed(0)} ℃
              <p className={s.currentFeelsLike}>
                Ощущается: {(data.main.feels_like - 273.15).toFixed(0)}℃
              </p>
            </div>
            <div className={s.currentWind}>
              <p>{data.wind.speed.toFixed(2)}м/с</p>
              <p>{windDirection(data.wind.deg)}</p>
            </div>
            <div className={s.currentHumidity}>
              {data.main.humidity.toFixed(0)}%
            </div>
          </div>
          <DaylightHours
            sunrise={data.sys.sunrise}
            sunset={data.sys.sunset}
            timezone={data.timezone}
            nightTheme={nightTheme}
          />
        </div>
      </div>

      {/* weatherForFewDays */}
      {weatherDaysLoading ? (
        <div className={s.weatherDaysLoading}>Загрузка...</div>
      ) : (
        <div className={s.mainDays}>
          <div className={nightTheme ? s.titleNight : s.title}>
            <p className={s.titleDate}>Дата</p>
            <p></p>
            <p></p>
            <p>Температура</p>
            <p>Скорость ветра</p>
            <p>Влажность</p>
          </div>
          {forecast.map((data) => {
            return (
              <div
                key={data.dt}
                className={nightTheme ? s.contentNight : s.content}
              >
                <div className={s.monthDate}>
                  {formatDate(data.dt_txt)}
                  <br />
                  {monthName(data.dt_txt)}
                </div>
                <div className={s.timesofDay}>
                  {timesOfDay(new Date(data.dt_txt).getHours())}
                </div>
                <WeatherIcon icon={data.weather[0].icon} hour={data.dt_txt} />
                <div className={s.temp}>
                  {(data.main.temp - 273.15).toFixed(0)}℃{' '}
                  <p className={s.fellsLike}>
                    Ощущается: {(data.main.feels_like - 273.15).toFixed(0)}℃
                  </p>
                </div>
                <div className={s.wind}>
                  {data.wind.speed.toFixed(2)}м/с <br />
                  {windDirection(data.wind.deg)}
                </div>
                <div className={s.humidity}>
                  {data.main.humidity.toFixed(0)}%
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* footer */}
      <div className={s.footerBg}>
        <div
          className={isOpen ? s.showMoreActive : s.showMore}
          onClick={() => setIsOpen(!isOpen)}
        >
          Подробнее...
        </div>
        {isOpen && (
          <div className={s.description}>
            На этом сайте я использовал React + Vite, TypeScript, style modules.{' '}
            <br />
            1. Сайт показывает погоду на данный момент, и на 5 дней, <br />
            есть направление ветра, ощущаемая температура, время, дату. <br />
            2. Реализовал световой день, показывает где находится солнце. <br />
            3. Есть ночной режим.
          </div>
        )}
      </div>
    </div>
  );
};
