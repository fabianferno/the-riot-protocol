import React, { useEffect, useState } from "react";
import { useMoralis, useWeb3Contract } from "react-moralis";
import * as keccak256 from "keccak256";

// Import ABI Json from file
const ABI = require("../contracts/riot_abi.json");
const contractAddress = "0xd9145CCE52D386f254917e481eB44e9943F39138";

function MintDevice() {
  const { runContractFunction, contractResponse, error, isRunning, isLoading } =
    useWeb3Contract({
      abi: ABI,
      contractAddress: contractAddress,
      functionName: "observe",
      params: {
        secondsAgos: [0, 10],
      },
    });

  console.log(contractResponse, error, isRunning, isLoading);

  const { isAuthenticated, user } = useMoralis();
  const [riotHash, setRiotHash] = useState("");

  const [deviceId, setDeviceId] = useState("");
  const [deviceMetadata, setDeviceMetadata] = useState("");
  const [deviceFirmware, setDeviceFirmware] = useState("");

  const handleMintDevice = async () => {
    let riotHash = keccak256(
      keccak256(deviceId) +
        keccak256(deviceMetadata) +
        keccak256(deviceFirmware),
    ).toString("hex");

    runContractFunction();

    setRiotHash(riotHash);
  };

  useEffect(() => {
    if (isAuthenticated) {
      // add your logic here
      console.dir(user?.attributes.ethAddress);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <div className="text-white mt-5">
      <h1 className="text-white">{!isLoading && contractResponse}</h1>

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
          <input
            onChange={(e) => setDeviceId(e.target.value)}
            value={deviceId}
            type="text"
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Metadata - (Manufacturer Name, Model Name, etc)
          </label>
          <textarea
            onChange={(e) => setDeviceMetadata(e.target.value)}
            className="form-control"
            name=""
            id=""
            rows="3"
          >
            {deviceMetadata}
          </textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Firmware (Paste the firmware code here)
          </label>
          <textarea
            onChange={(e) => setDeviceFirmware(e.target.value)}
            className="form-control"
            name=""
            id=""
            rows="5"
          >
            {deviceFirmware}
          </textarea>
        </div>

        <div
          onClick={handleMintDevice}
          className="btn btn-lg btn-danger text-end"
        >
          Mint your Device to the Blockchain
          <p className="text-white h5 fw-normal">
            <span className="fw-bold">
              {riotHash && "rIOT_Hash: " + riotHash}
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}

export default MintDevice;
