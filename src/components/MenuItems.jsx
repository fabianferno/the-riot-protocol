// import { useLocation } from "react-router";
// import { Menu } from "antd";
import { NavLink } from "react-router-dom";
import React, { useEffect } from "react";
import { useMoralis } from "react-moralis";

function MenuItems() {
  // const { pathname } = useLocation();
  const { isAuthenticated, user } = useMoralis(); // eslint-disable-line

  useEffect(() => {
    if (isAuthenticated) {
      // add your logic here
      // console.dir(user?.attributes.ethAddress);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  function Items() {
    return (
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        {/* <li className="bg-black btn badge btn-sm nav-item mx-2 my-2 my-md-0">
          <NavLink className="nav-link active text-white" to="/">
            Home
          </NavLink>
        </li> */}
        {isAuthenticated && (
          <React.Fragment>
            <li className="bg-black btn badge btn-sm nav-item mx-2 my-2 my-md-0">
              <NavLink className="nav-link active text-white" to="/mint-device">
                Mint a Device
              </NavLink>
            </li>
            <li className="bg-black btn badge btn-sm nav-item mx-2 my-2 my-md-0">
              <NavLink
                className="nav-link active text-white"
                to="/manage-devices"
              >
                Manage Devices
              </NavLink>
            </li>
            <li className="bg-black btn badge btn-sm nav-item mx-2 my-2 my-md-0">
              <NavLink className="nav-link active text-white" to="/validate">
                Validate Devices
              </NavLink>
            </li>

            <li className="bg-black btn badge btn-sm nav-item mx-2 my-2 my-md-0">
              <NavLink className="nav-link active text-white" to="/wallet">
                Wallet
              </NavLink>
            </li>
            <li className="bg-black btn badge btn-sm nav-item mx-2 my-2 my-md-0">
              <NavLink
                className="nav-link active text-white"
                to="/erc20transfers"
              >
                Transfers
              </NavLink>
            </li>
          </React.Fragment>
        )}
      </ul>
    );
  }

  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // function OldMenu() {
  //   return (
  //     <Menu
  //       mode="horizontal"
  //       className="bg-dark"
  //       style={{
  //         display: "flex",
  //         fontSize: "17px",
  //         fontWeight: "500",
  //         width: "100%",
  //       }}
  //       defaultSelectedKeys={[pathname]}
  //     >
  //       <Menu.Item key="/wallet">
  //         <NavLink
  //           className="text-white btn"
  //           style={{ background: "#4444fc" }}
  //           to="/wallet"
  //         >
  //           Wallet
  //         </NavLink>
  //       </Menu.Item>
  //       <Menu.Item key="/erc20balance">
  //         <NavLink
  //           className="text-white btn"
  //           style={{ background: "#4444fc" }}
  //           to="/erc20balance"
  //         >
  //           Balances
  //         </NavLink>
  //       </Menu.Item>
  //       <Menu.Item key="/erc20transfers">
  //         <NavLink
  //           className="text-white btn"
  //           style={{ background: "#4444fc" }}
  //           to="/erc20transfers"
  //         >
  //           Transfers
  //         </NavLink>
  //       </Menu.Item>
  //       <Menu.Item key="/nftBalance">
  //         <NavLink
  //           className="text-white btn"
  //           style={{ background: "#4444fc" }}
  //           to="/nftBalance"
  //         >
  //           NFTs
  //         </NavLink>
  //       </Menu.Item>
  //       <Menu.Item key="/contract">
  //         <NavLink
  //           className="text-white btn"
  //           style={{ background: "#4444fc" }}
  //           to="/contract"
  //         >
  //           Contract
  //         </NavLink>
  //       </Menu.Item>
  //     </Menu>
  //   );
  // }

  return <Items />;
}

export default MenuItems;
