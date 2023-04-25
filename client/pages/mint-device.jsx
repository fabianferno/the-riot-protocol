import { Default } from 'components/layouts/Default';
import React, { useState } from 'react';

const TransactionsPage = () => {
  const [deviceId, setDeviceId] = useState('');
  const [deviceMetadata, setDeviceMetadata] = useState('');
  const [deviceFirmware, setDeviceFirmware] = useState('');

  return (
    <Default pageName="Transactions">
      {/* A form for minting a new device */}
      <div>
        <form>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Owner
            </label>
            <input type="text" className="form-control" value={'0x64574dDbe98813b23364704e0B00E2e71fC5aD17'} disabled />
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
              value={deviceFirmware}
            ></textarea>
          </div>

          <div className="btn btn-lg btn-danger text-end">Mint your Device to the Blockchain</div>
        </form>
      </div>
    </Default>
  );
};

export default TransactionsPage;
