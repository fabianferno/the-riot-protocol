import React, { useEffect } from "react";
import { useMoralis } from "react-moralis";

function Home() {
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

  return (
    <div className="p-5">
      <h2>Welcome to the</h2>
      <h1 className="fw-bold" style={{ fontSize: "6rem" }}>
        the-riot-platform
      </h1>
      <p className="text-secondary mt-5">
        Current Device Owner address:{" "}
        <strong>{user?.attributes.ethAddress}</strong>
      </p>
    </div>
  );
}

export default Home;
