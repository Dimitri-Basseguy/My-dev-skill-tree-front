function LoginPage() {
    let history = useHistory();
    let location = useLocation();
  
    let { from } = location.state || { from: { pathname: "/" } };
    let login = () => {
      fakeAuth.authenticate(() => {
        history.replace(from);
      });
    };
  
    return (
      <div className="log-container"> 
        <h1>Contenue réservé aux utilisateurs</h1>
        <button className="btn-log" onClick={login}>Connexion</button>
      </div>
    );
  }

  export default LoginPage;