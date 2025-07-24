import { useRef, type Dispatch, type SetStateAction } from 'react';
import { getWeather, getWeatherFiveDay } from '../../../services/api';
import S from './WeatherHeader.module.css';
import type { dataType } from '../Weather/Weather';

type propWeatherHeader = {
  setCityName: Dispatch<SetStateAction<string>>;
  cityName: string;
  data: dataType;
  setData: Dispatch<SetStateAction<dataType>>;
  nightTheme: boolean;
  setNightTheme: Dispatch<SetStateAction<boolean>>;
  setForecast: Dispatch<SetStateAction<any>>;
  setErr: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

export const WeatherHeader = ({
  setCityName,
  cityName,
  data,
  setData,
  nightTheme,
  setNightTheme,
  setForecast,
  setErr,
  isLoading,
  setIsLoading,
}: propWeatherHeader) => {
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
        res.list.filter((i: forecastType) => {
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

  return (
    <>
      {
        <div className={nightTheme ? S.nightHeader : S.header}>
          <div className={S.logo}></div>
          <div className={S.cityName}>
            <img className={S.locationImg} src="location.png" alt="" />
            <div className={S.cityNameBlock}>
              <p className={S.cityNameText}>{data.name}</p>{' '}
              <span className={S.timezoneText}>({timezone()} UTC)</span>
            </div>
          </div>
          <div className={S.inputContent}>
            <form className={S.form} action="" onSubmit={handleSearchCity}>
              <input
                ref={inputRef}
                placeholder="Введите насленный пункт"
                className={nightTheme ? S.inputCityNameNight : S.inputCityName}
                onChange={(e) => setCityName(e.target.value)}
                type="text"
              />
              <button
                disabled={isLoading}
                className={nightTheme ? S.searchButtonNight : S.searchButton}
                type="submit"
              >
                🔍
              </button>
            </form>
          </div>
          <div className={S.nightTheme}>
            <p className={S.textNightTheme}>Ночной режим </p>
            {<img className={S.icon} src={themeIcon} />}
            <input
              onClick={() => nightThemeButton()}
              className={S.checkbox}
              checked={nightTheme}
              readOnly
              type="checkbox"
            />
          </div>
        </div>
      }
    </>
  );
};
