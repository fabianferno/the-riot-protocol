import { useEffect, useState } from "react";
import { Menu, Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { PolygonLogo /* BSCLogo, ETHLogo, AvaxLogo, */ } from "./Logos";
import { useChain, useMoralis } from "react-moralis";

const styles = {
  item: {
    display: "flex",
    alignItems: "center",
    height: "42px",
    fontWeight: "500",
    fontSize: "14px",
    padding: "0 10px",
    color: "#ffffff",
    background: "#4444fc",
  },
};

const menuItems = [
  // {
  //   key: "0x1",
  //   value: "Ethereum",
  //   icon: <ETHLogo />,
  // },
  // {
  //   key: "0x539",
  //   value: "Local Chain",
  //   icon: <ETHLogo />,
  // },
  // {
  //   key: "0x3",
  //   value: "Ropsten Testnet",
  //   icon: <ETHLogo />,
  // },
  // {
  //   key: "0x4",
  //   value: "Rinkeby Testnet",
  //   icon: <ETHLogo />,
  // },
  // {
  //   key: "0x2a",
  //   value: "Kovan Testnet",
  //   icon: <ETHLogo />,
  // },
  // {
  //   key: "0x5",
  //   value: "Goerli Testnet",
  //   icon: <ETHLogo />,
  // },
  // {
  //   key: "0x38",
  //   value: "Binance",
  //   icon: <BSCLogo />,
  // },
  // {
  //   key: "0x61",
  //   value: "Smart Chain Testnet",
  //   icon: <BSCLogo />,
  // },
  {
    key: "0x89",
    value: "Mainnet",
    icon: <PolygonLogo />,
  },
  {
    key: "0x13881",
    value: "Mumbai",
    icon: <PolygonLogo />,
  },
  // {
  //   key: "0xa86a",
  //   value: "Avalanche",
  //   icon: <AvaxLogo />,
  // },
  // {
  //   key: "0xa869",
  //   value: "Avalanche Testnet",
  //   icon: <AvaxLogo />,
  // },
];

function Chains() {
  const { switchNetwork, chainId } = useChain(); // chain
  const { isAuthenticated } = useMoralis();
  const [selected, setSelected] = useState({});

  // console.log("chain", chain);

  useEffect(() => {
    if (!chainId) return null;
    const newSelected = menuItems.find((item) => item.key === chainId);
    setSelected(newSelected);
    // console.log("current chainId: ", chainId);
  }, [chainId]);

  const handleMenuClick = async (e) => {
    // console.log("switch to: ", e.key, chainId);
    switchNetwork(e.key);
    // Wait for two seconds
    await new Promise((resolve) => setTimeout(resolve, 4000));
    window.location.reload();
  };

  const menu = (
    <Menu className="bg-dark" onClick={handleMenuClick}>
      {menuItems.map((item) => (
        <Menu.Item key={item.key} icon={item.icon} style={styles.item}>
          <span style={{ marginLeft: "5px" }}>{item.value}</span>
        </Menu.Item>
      ))}
    </Menu>
  );

  if (!chainId || !isAuthenticated) return null;

  return (
    <div className="mx-2 mb-3 mb-md-0 btn">
      <Dropdown className="w-100" overlay={menu} trigger={["click"]}>
        <Button
          className="btn btn-warning rounded"
          key={selected?.key}
          icon={selected?.icon}
          style={{ ...styles.button, ...styles.item }}
        >
          <span className="text-white" style={{ marginLeft: "5px" }}>
            {selected?.value}
          </span>
          <DownOutlined className="text-white" />
        </Button>
      </Dropdown>
    </div>
  );
}

export default Chains;
