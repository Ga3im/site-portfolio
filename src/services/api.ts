const API_KEY = "a15987dc0c422e4d54af44a529cd398a";

export const getWeather = async (cityName: string): Promise<any> => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`
  );
  if (res.status === 404) {
    throw new Error("Нет данных для данного насленного пункта");
  }
  if (res.status === 400) {
    throw new Error("Введите название насленного пункта");
  }
  if (!res.ok) {
    throw new Error("Ошибка сервера");
  }
  const data = await res.json();
  return data;
};

export const getWeatherFiveDay = async (cityName: string): Promise<any> => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast/?q=${cityName}&appid=${API_KEY}`
  );
  if (res.status === 404) {
    throw new Error("Нет данных для данного насленного пункта");
  }
  if (res.status === 400) {
    throw new Error("Введите название насленного пункта");
  }
  if (!res.ok) {
    throw new Error("Ошибка сервера");
  }
  return res.json();
};
