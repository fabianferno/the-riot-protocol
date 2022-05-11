import React, { useEffect } from "react";

import { Routes, Route, Link } from "react-router-dom";
import { useMoralis } from "react-moralis";

import Register from "./Register";
import Home from ".//Home";
import Navbar from "./Navbar";
import Monitor from "./Monitor";

function App() {
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
    <main style={{ minHeight: "100vh" }} className="bg-black text-white">
      <div className="p-5">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="monitor" element={<Monitor />} />
        </Routes>
      </div>
    </main>
  );
}

export default App;
