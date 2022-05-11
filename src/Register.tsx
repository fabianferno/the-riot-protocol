import React, { useEffect } from "react";
import { useMoralis } from "react-moralis";
const keccak256 = require("keccak256");

function Register() {
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

  // keccak256('hello').toString('hex')
  // "1c8aff950685c2ed4bc3174f3472287b56d9517b9c948127319a09a7a36deac8"
  // keccak256(Buffer.from('hello')).toString('hex')
  // "1c8aff950685c2ed4bc3174f3472287b56d9517b9c948127319a09a7a36deac8"
  return (
    <div className="p-5">
      <h1 className="fw-bold mb-5">Mint your device</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Device Owner
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
            Device Identifier
          </label>
          <input type="text" className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Device Metadata
          </label>
          <textarea className="form-control" cols={30} rows={5}></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Device Firmware
          </label>
          <textarea className="form-control" cols={30} rows={5}></textarea>
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Mint the device
        </button>
      </form>
    </div>
  );
}

export default Register;
