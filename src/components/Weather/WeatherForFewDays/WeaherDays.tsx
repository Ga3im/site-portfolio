import { windDirection } from "../Main/Main";
import { WeatherIcon } from "../weatherIcon/WeatherIcon";
import S from "./WeatherDays.module.css";
import type { dataType } from "../Weather/Weather";

type propWeatherDaysType = {
  forecast: dataType[];
  nightTheme: boolean;
};

export const WeatherDays = ({ forecast, nightTheme }: propWeatherDaysType) => {
  const timesOfDay = (day: number) => {
    switch (day) {
      case 3:
        return "ночью";
      case 9:
        return "утром";

      case 15:
        return "днем";

      case 21:
        return "вечером";

      default:
        break;
    }
  };

  const formatDate = (date: number) => {
    let day: number = new Date(date).getDate();
    let month: number = new Date(date).getMonth() + 1;
    if (new Date(date).getHours() === 9) {
      return `${day}.${month < 10 ? "0" + month : month}`;
    }
  };

  const months: string[] = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];

  const monthName = (date: number) => {
    let month: number = new Date(date).getMonth();
    let hour: number = new Date(date).getHours();
    if (hour === 9) {
      return months[month];
    }
  };

  return (
    <div className={S.main}>
      <div className={nightTheme ? S.titleNight : S.title}>
        <p className={S.titleDate}>Дата</p>
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
            className={nightTheme ? S.contentNight : S.content}
          >
            <div className={S.monthDate}>
              {formatDate(data.dt_txt)}
              <br />
              {monthName(data.dt_txt)}
            </div>
            <div className={S.timesofDay}>
              {timesOfDay(new Date(data.dt_txt).getHours())}
            </div>
            <WeatherIcon icon={data.weather[0].icon} hour={data.dt_txt} />
            <div className={S.temp}>
              {(data.main.temp - 273.15).toFixed(0)}℃{" "}
              <p className={S.fellsLike}>
                Ощущается: {(data.main.feels_like - 273.15).toFixed(0)}℃
              </p>
            </div>
            <div className={S.wind}>
              {data.wind.speed.toFixed(2)}м/с <br />
              {windDirection(data.wind.deg)}
            </div>
            <div className={S.humidity}>{data.main.humidity.toFixed(0)}%</div>
          </div>
        );
      })}
    </div>
  );
};
