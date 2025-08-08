import { useNavigate } from 'react-router-dom';
import { projects, projectType } from '../../data';
import s from './MyProjects.module.css';

export const MyProjects = () => {
  const nav = useNavigate();

  const handleSiteClick = (e: projectType) => {
    nav(`${e.site}`);
  };

  return (
    <>
      <div className={s.content}>
        <h2>Мои проекты</h2>
        <div className={s.projects}>
          {projects.map((item) => (
            <div
              key={item.id}
              className={s.iconPosition}
              onClick={() => handleSiteClick(item)}
            >
              {item.icon ? (
                <img className={s.iconImg} src={item.icon} alt="" />
              ) : (
                <div className={s.icon}></div>
              )}

              <div key={item.id} className={s.projectContent}>
                <p className={s.siteName}>{item.siteName}</p>

                {item.gitHubURL && (
                  <p className={s.siteUrl}>
                    GitHUB:
                    <a
                      onClick={(e)=> e.stopPropagation()}
                      className={s.urlText}
                      target="_blank"
                      href={item.gitHubURL}
                    >
                      {item.gitHubURL}
                    </a>
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
