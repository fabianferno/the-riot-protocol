import React, { useEffect } from "react";
import { useMoralis } from "react-moralis";

function Validate() {
  const { isAuthenticated, user } = useMoralis();

  useEffect(() => {
    if (isAuthenticated) {
      // add your logic here
      console.dir(user?.attributes.ethAddress);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <div className="text-white mt-5">
      <h1 className="fw-bold mb-5 text-white">Validate your Device</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Owner
          </label>
          <input
            type="text"
            className="form-control"
            value={user?.attributes.ethAddress}
            disabled
          />
          <div id="emailHelp" className="form-text">
            Connected with Metamask wallet
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Device's rIOT Hash
          </label>
          <input type="text" className="form-control" />
        </div>

        <h5 className="text-secondary">
          Device Validated: Your Device is{" "}
          <span className="text-success">Secure</span>
        </h5>

        <div className="btn btn-danger fw-bold d-flex justify-content-end">
          Validate your Device on the blockchain
        </div>
      </form>
    </div>
  );
}

export default Validate;
