export type projectType = {
  id: number;
  icon: string;
  siteName: string;
  site: string;
  gitHubURL: string;
};

export type tasksType = {
  id: number;
  order: number;
  title: string;
  description: string;
  common: boolean;
  date: string;
};

export const projects: projectType[] = [
  {
    id: 1,
    icon: 'sun.png',
    siteName: 'Погода',
    site: 'weather',
    gitHubURL: 'https://github.com/Ga3im/weather/tree/api/weather',
  },
  {
    id: 2,
    icon: 'tasks.png',
    siteName: 'Сайт задач',
    site: 'tasks',
    gitHubURL: 'https://github.com/Ga3im/tasks',
  },
  {
    id: 3,
    icon: '',
    siteName: '',
    site: '',
    gitHubURL: '',
  },
  {
    id: 4,
    icon: '',
    siteName: '',
    site: '',
    gitHubURL: '',
  },
  {
    id: 5,
    icon: '',
    siteName: '',
    site: '',
    gitHubURL: '',
  },
];

export const tasksArray: tasksType[] = [
  {
    id: 1,
    order: 1,
    title: 'Питание',
    description: 'Приготвить рулет',
    common: false,
    date: '14.05.2025',
  },
  {
    id: 2,
    order: 3,
    title: 'Тренировка',
    description: 'Отжиматься 20 раз, 3 подхода',
    common: false,
    date: '14.05.2025',
  },
  {
    id: 3,
    order: 4,
    title: 'Тестовое задание',
    description: 'Реализовать API',
    common: true,
    date: '13.05.2025',
  },
  {
    id: 4,
    order: 6,
    title: 'Дизайн сайта',
    description: 'Сверстать сайт задачи',
    common: true,
    date: '13.05.2025',
  },
  {
    id: 5,
    order: 5,
    title: 'Тренировка',
    description: 'Подтянуться 25 раз',
    common: false,
    date: '6.08.25',
  },
  {
    id: 6,
    order: 3,
    title: 'Сайт',
    description: 'Добавить типизацию',
    common: false,
    date: '6.08.25',
  },
];
