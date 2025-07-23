import { useEffect, useState } from "react";
import s from "./Weather.module.css";
import { Header } from "../Header/Header";
import { Main } from "../Main/Main";
import { WeatherDays } from "../WeatherForFewDays/WeaherDays";
import { Footer } from "../Footer/Footer";
import { getWeather, getWeatherFiveDay } from "../../api/api";

export const Weather = () => {
  const [data, setData] = useState({
    main: {
      temp: 293.15,
      feels_like: 293.15,
      humidity: 50,
    },
    sys: {
      sunrise: "",
      sunset: "",
    },
    name: "",
    weather: {
      0: {
        icon: "",
      },
    },
    wind: {
      speed: 1,
      deg: "",
    },
    timezone: 18000,
  });
  const [cityName, setCityName] = useState("Ufa");
  const [forecast, setForecast] = useState([]);
  let [nightTheme, setNightTheme] = useState(false);
  const [err, setErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [weatherDaysLoading, setWeatherDaysLoading] = useState(false);

  setTimeout(() => {
    setErr("");
  }, 5000);

  useEffect(() => {
    getWeather(cityName)
      .then((res) => {
        setData(res);
        return res;
      })
      .then((res) => {
        if (
          new Date(res ? res.sys.sunrise * 1000 : "") <= new Date() &&
          new Date() <= new Date(res ? res.sys.sunset * 1000 : "")
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
          res.list.filter((i) => {
            let hour = new Date(i.dt_txt).getHours();
            if (new Date(i.dt_txt) > new Date()) {
              if (hour === 3 || hour === 9 || hour === 15 || hour === 21) {
                return i;
              }
            }
          })
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
      <Header
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        cityName={cityName}
        setCityName={setCityName}
        setNightTheme={setNightTheme}
        nightTheme={nightTheme}
        data={data}
        setData={setData}
        setForecast={setForecast}
        err={err}
        setErr={setErr}
      />
      {err && (
        <div className={s.error}>
          <p className={s.errorMessage}>{err}</p>
        </div>
      )}
      <Main
        setNightTheme={setNightTheme}
        nightTheme={nightTheme}
        data={data}
        setData={setData}
        cityName={cityName}
      />
      {weatherDaysLoading ? (
        <div className={s.weatherDaysLoading}>Загрузка...</div>
      ) : (
        <WeatherDays forecast={forecast} nightTheme={nightTheme} />
      )}

      <Footer />
    </div>
  );
};
