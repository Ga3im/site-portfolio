import { useState } from 'react';
import s from './Header.module.css';

export const Header = () => {
  const [isOpenModal, setIsOpenModal] = useState<string>('');
const handleOpenMenu =()=>{
 if(isOpenModal === 'open'){
  setIsOpenModal("close")
 }
 else{
  setIsOpenModal("open")

 }
}
  return (
    <div>
      <div className={s.content}>
        <div onClick={handleOpenMenu} className={s.menu}>
          <div className={s.menuItem}></div>
          <div className={s.menuItem}></div>
          <div className={s.menuItem}></div>
        </div>
      </div>
       <div className={`${isOpenModal === 'open' ? s.modalOpen  : isOpenModal === 'close' ? s.modalClose : s.modal} `}>
        {isOpenModal === 'open' && <div className={s.modalInner}>Большой</div>}
       </div>
    </div>
  );
};
