import { Routes, Route, useNavigate } from 'react-router-dom';
import { MainPage } from './pages/Main/MainPage';
import { routes } from './pages/routes';
import { useEffect, useState } from 'react';
import { WeatherPage } from './pages/WeatherPage/WeatherPage';
import { tasksArray } from './data';

function App() {
  // const [filterTask, setFilterTask] = useState({
  //   myTasks: true,
  //   commonTasks: false,
  // });
  // const [isAuth, setIsAuth] = useState(false);
  // const [search, setSearch] = useState('');
  // const [isDarkTheme, setIsDarkTheme] = useState(false);
  // const [isArchive, setIsArchive] = useState(false);
  // const [currentTask, setCurrentTask] = useState({
  //   id: '',
  //   title: '',
  //   description: '',
  //   common: false,
  //   date: '',
  // });
  // const [isloading, setIsloading] = useState(false);

  // const [archiveTasks, setArchiveTasks] = useState(
  //   localStorage.getItem('archiveTasks')
  //     ? JSON.parse(localStorage.getItem('archiveTasks'))
  //     : [],
  // );
  // const [tasks, setTasks] = useState(
  //   localStorage.getItem('tasks')
  //     ? JSON.parse(localStorage.getItem('tasks'))
  //     : tasksArray,
  // );
  // const [initialTasks, setInitialTasks] = useState(tasksArray);

  // useEffect(() => {
  //   if (localStorage.getItem('tasks') === null) {
  //     localStorage.setItem('tasks', JSON.stringify(tasks));
  //   }
  // }, [isAuth, tasks]);

  // useEffect(() => {
  //   if (localStorage.getItem('theme')) {
  //     setIsDarkTheme(localStorage.getItem('theme'));
  //   }
  // }, []);

  // const updateTask = (newTasks) => {
  //   localStorage.setItem('tasks', JSON.stringify(newTasks));
  //   setTasks(newTasks);
  // };

  // const updateArchiveTasks = (newTask) => {
  //   const arr = [...archiveTasks, newTask];
  //   localStorage.setItem('archiveTasks', JSON.stringify(arr));
  //   setArchiveTasks(arr);
  // };

  const nav = useNavigate();
  useEffect(() => {
    nav(routes.main);
  }, []);
  
  return (
    <Routes>
      <Route path={routes.main} element={<MainPage />} />
      <Route path={routes.weather} element={<WeatherPage />} />
    </Routes>
  );
}

export default App;
