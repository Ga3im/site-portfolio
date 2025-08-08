type routesType = {
  main: string;
  weather: string;
  cards: string;
  createTask: string;
  notFound: string;
};

export const routes: routesType = {
  main: '/main',
  weather: '/main/weather',
  cards: '/main/tasks',
  createTask: '/main/tasks/create',
  notFound: '*',
};
