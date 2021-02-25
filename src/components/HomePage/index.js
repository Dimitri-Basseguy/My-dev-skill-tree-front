import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import './homepage.scss';

import Quote from 'src/components/Quote';
import Button from 'src/components/Button';
import Footer from 'src/components/Footer';
import { back } from 'src/utils/url';

// import logo from 'src/assets/images/logo.png';

const Homepage = () => {
  document.title = 'My Dev Skill Tree';
  const user = useSelector((s) => s.user.user);
  const { pseudonym /* isAdmin */ } = useSelector((s) => s.user.user);
  const isLogged = useSelector((s) => s.user.isLogged);

  return (
    <div className="container">
      <div className="homepage-page">
        <div className="homepage">
          <div className="homepage-logo"><img src="https://www.dimitri-basseguy.fr/MyDevSkillTree/images/logo.png" alt="My Dev Skill Tree Logo" /></div>
          <Quote />
          <div className="headlines">
            <p className="start">Comment ça marche ?</p>
            <p className="explanation">My Dev Skill Tree à pour but de vous donner une idée des compétences à connaître pour un développeur sous la forme d’un arbre technologique. Cet arbre vous permet d’avoir une vue globale et vous aidera dans vos choix si vous ne savez pas quoi apprendre ensuite. Inscrivez-vous puis sélectionnez les compétences que vous maîtrisez déjà, vous obtenez un niveau d’expérience (qui progressera selon vos nouvelles compétences acquises).</p>
          </div>
          <div className="start">
            {!isLogged ? (
              <>
                <p>Commencez votre Skill Tree</p>
                <span className="arrow">⬇</span>
                <div><NavLink to="/signin"><Button content="Inscription" /></NavLink></div>
              </>
            )
              : (
                <>
                  {user.id === 1 || user.id === 2 || user.id === 5 || user.id === 51 ? (
                    // eslint-disable-next-line jsx-a11y/control-has-associated-label
                    <p>Bienvenue {pseudonym} | <a href={`${back}`}><Button classPerso="button backend-button" content="Accès au Backend" /></a></p>
                  )
                    : (
                      <>
                        <p>Bienvenue {pseudonym}</p>
                      </>
                    )}
                  <span className="arrow">⬇</span>
                  <div><NavLink to={`${pseudonym}/tree`}><Button content="My Dev Skill Tree" /></NavLink></div>
                </>
              )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;
