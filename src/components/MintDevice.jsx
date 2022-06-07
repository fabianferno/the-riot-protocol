import React, { useEffect } from "react";
import { useMoralis } from "react-moralis";

function MintDevice() {
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
      <h1 className="fw-bold mb-5 text-white">Mint your Device</h1>
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
            Device Identifier
          </label>
          <input type="text" className="form-control" />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Metadata
          </label>
          <textarea className="form-control" name="" id="" rows="3"></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Firmware
          </label>
          <textarea className="form-control" name="" id="" rows="5"></textarea>
        </div>

        <button type="submit" className="btn btn-danger fw-bold text-end">
          Mint your Device to the Blockchain
        </button>
      </form>
    </div>
  );
}

export default MintDevice;
