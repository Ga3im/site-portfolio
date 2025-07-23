import S from "./DaylightHours.module.css";

export const DaylightHours = ({ sunrise, sunset, nightTheme, timezone }) => {
  const daylightHours = (sunriseData, sunsetData) => {
    let rise = new Date(sunriseData * 1000);
    let set = new Date(sunsetData * 1000);
    let hour = Math.abs(rise.getHours() - set.getHours());
    let minutes = Math.abs(rise.getMinutes() - set.getMinutes());
    return `${hour}:${minutes < 10 ? "0" + minutes : minutes}`;
  };

  let currentUTCHour = new Date().getUTCHours() + timezone / 3600;
  const dinamicSun = () => {
    let riseHour =
      new Date(sunrise * 1000).getUTCHours() + timezone / 3600 > 24
        ? new Date(sunrise * 1000).getUTCHours() + timezone / 3600 - 24
        : new Date(sunrise * 1000).getUTCHours() + timezone / 3600;

    let setHour = new Date(sunset * 1000).getUTCHours() + timezone / 3600;
    let hour = Math.abs(riseHour - setHour);
    let DL0 = riseHour + 1 >= currentUTCHour;
    let DL1 =
      riseHour <= currentUTCHour && riseHour + hour / 4 >= currentUTCHour;
    let DL2 =
      riseHour + hour / 4 <= currentUTCHour &&
      riseHour + hour / 2 >= currentUTCHour;

    let DL3 =
      riseHour + hour / 2 <= currentUTCHour &&
      riseHour + (3 * hour) / 4 >= currentUTCHour;
    let DL4 =
      riseHour + (3 * hour) / 4 <= currentUTCHour &&
      riseHour + hour + 1 >= currentUTCHour;

    if (DL0) {
      return S.sunIcon0;
    }
    if (DL1) {
      return S.sunIcon25;
    }
    if (DL2) {
      return S.sunIcon50;
    }
    if (DL3) {
      return S.sunIcon75;
    }
    if (DL4) {
      return S.sunIcon100;
    } else {
      return S.none;
    }
  };
  return (
    <div className={nightTheme ? S.mainNight : S.main}>
      <div className={S.grid}>
        <img className={dinamicSun()} src="/public/sun.png" alt="" />
        <svg
          className={S.sunArc}
          width="330px"
          height="150px"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <g>
            <path
              fill="transparent"
              d="M -0.5,-0.5 C 132.5,-0.5 265.5,-0.5 398.5,-0.5C 398.5,83.8333 398.5,168.167 398.5,252.5C 265.5,252.5 132.5,252.5 -0.5,252.5C -0.5,168.167 -0.5,83.8333 -0.5,-0.5 Z"
            />
          </g>
          <g>
            <path
              fill="yellow"
              d="M 212.5,42.5 C 260.883,41.1087 295.383,62.1087 316,105.5C 320.872,117.694 323.372,130.36 323.5,143.5C 322.5,143.5 321.5,143.5 320.5,143.5C 318.652,104.193 300.652,75.0268 266.5,56C 225.159,38.0003 187.493,43.667 153.5,73C 134.046,92.7558 124.046,116.589 123.5,144.5C 122.5,144.5 121.5,144.5 120.5,144.5C 125.01,86.7647 155.677,52.7647 212.5,42.5 Z"
            />
          </g>
        </svg>
      </div>
      <div className={S.textContent}>
        <p className={S.timeText}>
          {`${
            new Date(sunrise * 1000).getUTCHours() + timezone / 3600 > 24
              ? new Date(sunrise * 1000).getUTCHours() + timezone / 3600 - 24
              : new Date(sunrise * 1000).getUTCHours() + timezone / 3600
          }:${
            new Date(sunrise * 1000).getMinutes() < 10
              ? "0" + new Date(sunrise * 1000).getMinutes()
              : new Date(sunrise * 1000).getMinutes()
          }`}{" "}
          ↑
        </p>
        <p className={S.timeText}>
          ↓{" "}
          {`${new Date(sunset * 1000).getUTCHours() + timezone / 3600}:${
            new Date(sunset * 1000).getMinutes() < 10
              ? "0" + new Date(sunset * 1000).getMinutes()
              : new Date(sunset * 1000).getMinutes()
          } `}
        </p>
      </div>
      <p className={S.content}>
        Световой день:
        <span className={S.textBold}> {daylightHours(sunrise, sunset)}</span>
      </p>
    </div>
  );
};
