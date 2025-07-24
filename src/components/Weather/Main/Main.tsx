import S from "./Main.module.css";
import { DaylightHours } from "../DaylightHours/DaylightHours";
import { useState } from "react";
import type { dataType } from "../Weather/Weather";

type propMainType = {
  data: dataType;
  nightTheme: boolean;
};

export const windDirection = (data: number) => {
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

export const Main = ({ data, nightTheme }: propMainType) => {
  setTimeout(() => {
    // setErr("");
  }, 5000);

  const getDate = (): string => {
    let currentTime: Date = new Date();
    let day: number = currentTime.getDate();
    let month: number = 1 + currentTime.getMonth();
    return `${day}.${month < 10 ? "0" + month : month}`;
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
    }:${minutes < 10 ? "0" + minutes : minutes}`;
  };

  const mainIcon = (icon: string, timezone: number) => {
    let iconImg = "";
    let getHour = new Date(timezone).getHours();
    switch (icon) {
      case "02d":
        iconImg = "/public/fewClouds.png"; // few clowds 11-25%
        break;
      case "03d":
        iconImg = "/public/scatteredClouds.png"; // scattered clouds 25-50%
        break;
      case "04d":
        iconImg = "/public/brokenClouds.png"; // broken clouds 51-84%
        break;
      case "09d":
        iconImg = "/public/rain3.png"; // shower rain
        break;
      case "10d":
        iconImg = "/public/rain.png"; // rain
        break;
      case "11d":
        iconImg = "/public/thunderstorm.png"; // thunderstorm
        break;
      case "13d":
        iconImg = "/public/snow.png"; // snow
        break;
      case "50d":
        iconImg = "/public/mist.png"; //mist
        break;
      case "02n":
        iconImg = "/public/fewClouds.png"; // few clowds 11-25%
        break;
      case "03n":
        iconImg = "/public/scatteredClouds.png"; // scattered clouds 25-50%
        break;
      case "04n":
        iconImg = "/public/brokenClouds.png"; //broken clouds
        break;
      case "09n":
        iconImg = "/public/rain3.png"; // shower rain
        break;
      case "10n":
        iconImg = "/public/rain.png"; // rain
        break;
      case "11n":
        iconImg = "/public/thunderstorm.png"; // thunderstorm
        break;
      case "13n":
        iconImg = "/public/snow.png"; // snow
        break;
      case "50n":
        iconImg = "/public/mist.png"; //mist
        break;
      default:
        if (
          (icon === "01n" && getHour === 21) ||
          (icon === "01d" && getHour === 3)
        ) {
          iconImg = "/public/moon.png"; // moon
        } else {
          iconImg = "/public/sun.png"; //sun
        }
        break;
    }
    return <img className={S.icon} src={iconImg} alt="" />;
  };

  return (
    <div className={nightTheme ? S.mainNight : S.main}>
      <div className={S.currentDayInfo}>
        <div
          className={nightTheme ? S.positioningInfoNight : S.positioningInfo}
        >
          <div>
            <p className={S.textNow}>Сейчас</p>
            <p className={S.todayDay}>{getDate()}</p>
            <p>{currentDate(data.timezone)}</p>
          </div>
          <div>{mainIcon(data.weather[0].icon, data.timezone)}</div>
          <div className={S.currentTemp}>
            {(data.main.temp - 273.15).toFixed(0)} ℃
            <p className={S.currentFeelsLike}>
              Ощущается: {(data.main.feels_like - 273.15).toFixed(0)}℃
            </p>
          </div>
          <div className={S.currentWind}>
            <p>{data.wind.speed.toFixed(2)}м/с</p>
            <p>{windDirection(data.wind.deg)}</p>
          </div>
          <div className={S.currentHumidity}>
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
  );
};
