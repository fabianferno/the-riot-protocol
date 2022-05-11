import React, { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { Link } from "react-router-dom";

function Navbar() {
  const {
    authenticate,
    isAuthenticated,
    isAuthenticating,
    user,
    account,
    logout,
  } = useMoralis();

  useEffect(() => {
    if (isAuthenticated) {
      // add your logic here
      console.dir(user?.attributes.ethAddress);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);
  const login = async () => {
    if (!isAuthenticated) {
      await authenticate({ signingMessage: "Log in using Moralis" })
        .then(function (user) {
          console.log("logged in user:", user);
          console.log(user!.get("ethAddress"));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const logOut = async () => {
    await logout();
    console.log("logged out");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">
          📟 the-riot-platform
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link active fw-bold"
                aria-current="page"
                to="/register"
              >
                Mint a Device
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/monitor"
              >
                Monitor
              </Link>
            </li>
          </ul>
        </div>

        <div className="btn-group">
          {!user ? (
            <button className="btn btn-danger" onClick={login}>
              Connect Wallet
            </button>
          ) : (
            <button
              className="btn btn-secondary"
              onClick={logOut}
              disabled={isAuthenticating}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
