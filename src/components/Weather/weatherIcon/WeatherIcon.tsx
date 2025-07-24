import S from "./WeatherIcon.module.css";

type propWeatherIconWtype = {
  icon: string;
  hour: number;
};

export const WeatherIcon = ({ icon, hour }: propWeatherIconWtype) => {
  let iconImg: string = "";
  let getHour: number = new Date(hour).getHours();
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
