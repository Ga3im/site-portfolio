import { useState } from 'react';
import S from './Footer.module.css';

export const Footer = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className={S.footerBg}>
      <div
        className={isOpen ? S.showMoreActive : S.showMore}
        onClick={() => setIsOpen(!isOpen)}
      >
        Подробнее...
      </div>
      {isOpen && (
        <div className={S.description}>
          На этом сайте я использовал React + Vite, TypeScript, style modules.{' '}
          <br />
          1. Сайт показывает погоду на данный момент, и на 5 дней, <br />
          есть направление ветра, ощущаемая температура, время, дату. <br />
          2. Реализовал световой день, показывает где находится солнце. <br />
          3. Есть ночной режим.
        </div>
      )}
    </div>
  );
};
