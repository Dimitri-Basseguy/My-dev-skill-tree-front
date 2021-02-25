import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import './nav.scss'


class Nav extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        menuOpen: false
      }
    }
    handleStateChange (state) {
      this.setState({menuOpen: state.isOpen})  
    }
    // This can be used to close the menu, e.g. when a user clicks a menu item
    closeMenu () {
      this.setState({menuOpen: false})
    }
    toggleMenu () {
      this.setState(state => ({menuOpen: !state.menuOpen}))
    }

    render () {
      return (
          <div>
              <div id="outer-container">
              <Menu  isOpen={this.state.menuOpen}
                     onStateChange={(state) => this.handleStateChange(state)} >
                    <nav id="page-wrap">
                        <ul className="nav-links">
                    <Link to="/" onClick={() => this.closeMenu()} >
                        <li> Home </li>
                    </Link>  
                    <Link to="/tree" onClick={() => this.closeMenu()} >
                        <li> Tree </li>
                    </Link>
                    <Link to="/profile" onClick={() => this.closeMenu()} >
                        <li> Profil </li>
                    </Link>
                        </ul>
                    </nav>
                </Menu>
                </div>
        </div>
      );
    }
}

export default Nav; 
