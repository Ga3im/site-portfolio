import { useState } from 'react';
import s from './Header.module.css';

export const Header = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  return (
    <div>
      <div className={s.content}>
        <div onClick={() => setIsOpenModal(!isOpenModal)} className={s.menu}>
          <div className={s.menuItem}></div>
          <div className={s.menuItem}></div>
          <div className={s.menuItem}></div>
        </div>
      </div>
      {isOpenModal && <div className={s.modal}></div>}
    </div>
  );
};
