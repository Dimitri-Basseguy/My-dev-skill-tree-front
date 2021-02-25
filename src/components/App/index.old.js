// == Import npm
import React, { useEffect } from 'react';
import Tree from 'src/containers/Tree';
import HomePage  from 'src/components/HomePage';
import Header from 'src/components/Header';
import LoginPage from 'src/components/LoginPage';
import Profile from 'src/containers/Profile'

import  history  from 'src/components/_helpers/history';
import  authenticationService from 'src/components/_services/authenticationService';
import  PrivateRoute  from 'src/components/_components/PrivateRoute';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
} from 'react-router-dom';
// == Import
import './app.scss';

// == Composant


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null
        };
        
    }


    
    componentDidMount() {
        console.log('test', localStorage)
        authenticationService.currentUser.subscribe(x => this.setState({ currentUser: x }));
        user ? getUserById(user) : '';
    }

    logout() {
        authenticationService.logout();
        history.push('/login');
    }

    render() { 
        const { currentUser } = this.state;

        const childrenTest = [
            {
              name: 'Enfant1',
              isValidate: true,
            },
            {
              name: 'Enfant2',
              isValidate: false,
            },
          ];
  return (
            <Router history={history}>
            <div>
                {currentUser &&
                    <nav className="navbar navbar-expand navbar-dark bg-dark">
                        <div className="navbar-nav">
                            <a onClick={this.logout} className="nav-logout">Déconnexion</a>
                        </div>
                    </nav>
                }
                <Header />
                <div className="jumbotron">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 offset-md-3">
                                <PrivateRoute exact path="/" component={HomePage} />
                                <Route path="/login" component={LoginPage} />
                                <PrivateRoute  path="/tree" component={() => <Tree userId={'test'} />} /> 
                                <PrivateRoute  path="/profile" component={() => <Profile userId={'test'} />} /> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Router>
  );
}
}

// == Export
export default App;
