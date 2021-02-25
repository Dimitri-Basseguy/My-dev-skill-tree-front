function AuthButton() {
  let history = useHistory();

  return fakeAuth.isAuthenticated ? (
    <div className="co-container">
      <button className="btn-deco"
        onClick={() => {
          fakeAuth.signout(() => history.push("/"));
        }}
      >
        Déconnexion
      </button>
    </div>
  ) : (
      <p className="disco"></p>
    );
}

export default AuthButton;