import Coinbase from "./WalletIcons/coinbase.png";
import Metamask from "./WalletIcons/metamaskWallet.png";
import WalletConnect from "./WalletIcons/wallet-connect.svg";
import TrustWallet from "./WalletIcons/TrustWallet.png";
// import Coin98 from "./WalletIcons/Coin98.png";
// import MathWallet from "./WalletIcons/MathWallet.svg";
// import TokenPocket from "!file-loader!./WalletIcons/TokenPocket.svg";
// import SafePal from "!file-loader!./WalletIcons/SafePal.svg";

export const connectors = [
  {
    title: "WalletConnect",
    icon: WalletConnect,
    connectorId: "walletconnect",
    priority: 1,
  },
  {
    title: "Coinbase",
    icon: Coinbase,
    connectorId: "injected",
    priority: 2,
  },
  {
    title: "Metamask",
    icon: Metamask,
    connectorId: "injected",
    priority: 3,
  },
  {
    title: "Trust Wallet",
    icon: TrustWallet,
    connectorId: "injected",
    priority: 4,
  },
  // {
  //   title: "MathWallet",
  //   icon: MathWallet,
  //   connectorId: "injected",
  //   priority: 999,
  // },
  // {
  //   title: "TokenPocket",
  //   icon: TokenPocket,
  //   connectorId: "injected",
  //   priority: 999,
  // },
  // {
  //   title: "SafePal",
  //   icon: SafePal,
  //   connectorId: "injected",
  //   priority: 999,
  // },
  // {
  //   title: "Coin98",
  //   icon: Coin98,
  //   connectorId: "injected",
  //   priority: 999,
  // },
];
