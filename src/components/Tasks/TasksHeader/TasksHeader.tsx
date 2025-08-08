import { useContext, useEffect, useRef, useState } from 'react'
import s from './TaskHeader.module.css'
import { useNavigate } from 'react-router-dom'
import { Router } from '../../../pages/routes'
import { SetContext } from '../../../context/context'
import { useOutsideClick } from '../../hooks/modalClose'

export const TaskHeader = () => {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState()
  const menuRef = useRef(null)
  const btnRef = useRef(null)

  const {
    isAuth,
    setIsAuth,
    isDarkTheme,
    setIsDarkTheme,
    isArchive,
    setIsArchive,
  } = useContext(SetContext)

  useEffect(() => {
    localStorage.setItem('theme', isDarkTheme)
  }, [isDarkTheme])

  const logo = () => {
    navigate(Router.cards)
  }

  const addTaskButton = () => {
    navigate(Router.createTask)
  }

  const openMenu = (e) => {
    e.stopPropagation()
    setIsOpen(!isOpen)
  }

  const authButton = () => {
    if (isAuth) {
      setIsAuth(false)
      localStorage.removeItem('user')
    } else {
      setIsAuth(true)
      navigate(Router.login)
    }
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  useOutsideClick(menuRef, btnRef, closeMenu)

  return (
    <>
      <div className={isDarkTheme ? s.wrapperDark : s.wrapper}>
        <img
          onClick={logo}
          src={isDarkTheme ? '/logo-dark.png' : '/logo.png'}
          className={s.logo}
        />
        <button onClick={addTaskButton} className={s.addTask}>
          Добавить задачу
        </button>
        <nav ref={btnRef} className={s.navbutton} onClick={openMenu}>
          <div className={s.navitems}></div>
          <div className={s.navitems}></div>
          <div className={s.navitems}></div>
        </nav>
      </div>
      {isOpen && (
        <div ref={menuRef} className={s.menu}>
          <div className={s.darkTheme}>
            Темный режим{' '}
            <input
              className={s.checkbox}
              onChange={(e) => setIsDarkTheme(e.target.checked)}
              type="checkbox"
              checked={isDarkTheme ? true : false}
            />
          </div>
          <p className={s.archive} onClick={() => setIsArchive(!isArchive)}>
            {isArchive ? 'Все задачи ' : 'Архив'}
          </p>
          <p className={s.authButton} onClick={authButton}>
            {isAuth ? 'Выйти' : 'Войти'}{' '}
          </p>
        </div>
      )}
    </>
  )
}
