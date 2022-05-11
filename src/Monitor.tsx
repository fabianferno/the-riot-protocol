import React, { useEffect } from "react";
import { useMoralis } from "react-moralis";

function Monitor() {
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
    <div className="p-5 text">
      <h1 className="fw-bold mb-5">Monitor your devices</h1>
      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Device Owner</th>
            <th scope="col">Metadata Hash</th>
            <th scope="col">Firmware Hash</th>
            <th scope="col">Device Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>0x64574ddbe98813b23364704e0b00e2e71fc5ad17</td>
            <td>0xdbe988</td>
            <td>0xdbe988</td>
            <td>Active</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>0x64574ddbe98813b23364704e0b00e2e71fc5ad17</td>
            <td>0xdbe988</td>
            <td>0xdbe988</td>
            <td>Active</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>0x64574ddbe98813b23364704e0b00e2e71fc5ad17</td>
            <td>0xdbe988</td>
            <td>0xdbe988</td>
            <td className="fw-bold text-danger">Tampered</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Monitor;
