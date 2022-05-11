import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { BrowserRouter } from "react-router-dom";
import { MoralisProvider } from "react-moralis";

ReactDOM.render(
  <React.StrictMode>
    <MoralisProvider
      serverUrl="https://spo7cc1zgorg.usemoralis.com:2053/server"
      appId="rCyUM1zSfzrlCRuQ46ItxRaqMo2RCLMgWft75hTm"
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
