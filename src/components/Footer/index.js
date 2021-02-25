import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from 'src/components/Button';

import './Footer.scss';

const Footer = () => (
  <footer className="Footer">
    <p className="textFooter">My Dev Skill Tree | 2020 © Tous droits réservés | Suivez-nous : <a href="https://www.linkedin.com/company/mydevskilltree" target="_blank" rel="noopener noreferrer">Linkedin</a> - <a href="https://twitter.com/skill_dev" target="_blank" rel="noopener noreferrer">Twitter</a></p>
  </footer>
);


export default Footer;
