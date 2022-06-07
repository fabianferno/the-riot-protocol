import React, { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { motion, AnimatePresence } from "framer-motion";

function Home() {
  const { isAuthenticated, user } = useMoralis();

  useEffect(() => {
    if (isAuthenticated) {
      // add your logic here
      console.dir(user?.attributes.ethAddress);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 20 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 2.5 }}
        className="container mt-5"
      >
        <div className="d-block d-md-flex justify-content-start align-items-center ">
          <motion.div
            className="me-4"
            animate={{ x: [1, -15, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <img
              height={300}
              src="https://media2.giphy.com/media/fWdPHRnu10flWfsLp7/giphy.gif?cid=790b7611f8451c8302fa9472662d6a4a2ac09df8a5b4e2a1&rid=giphy.gif&ct=s"
              alt=""
            />
          </motion.div>
          <div className="text-white text-start col-12 col-md-9 ps-3">
            <h1 className="fw-bold text-white " style={{ fontSize: "5em" }}>
              rIOT
            </h1>

            <h2 className="mt-3 pb-2 text-white w-75">
              A Decentalized IoT Gateway platform
            </h2>
            <h5 className="text-secondary fw-light w-75">
              The rIOT platform is blockchain enabled decentralized IoT gateway
              that aims to utilize the blockchain technology to register and
              validate the legitimacy of the connected devices in a smart
              infrastructure also providing means to store data on a
              decentralized storage medium that can solve the data, security and
              the communication problems of “Internet of Things”.
            </h5>
          </div>
        </div>

        <h5 className="py-5 text-end mt-5 mb-3 text-white">Powered by</h5>
        <div className="d-flex justify-content-end align-items-center mb-5 pb-5">
          <img
            className="mx-2"
            height="100px"
            src="https://cryptologos.cc/logos/polygon-matic-logo.png"
            alt="Polygon"
          />

          <img
            className="mx-2"
            height="100px"
            src="https://seeklogo.com/images/W/walletconnect-logo-EE83B50C97-seeklogo.com.png"
            alt="Wallet Connect"
          />
          <img
            className="mx-2"
            height="100px"
            src="https://images.ctfassets.net/q5ulk4bp65r7/1rFQCqoq8hipvVJSKdU3fQ/21ab733af7a8ab404e29b873ffb28348/coinbase-icon2.svg"
            alt=""
          />
        </div>

        <div className="d-md-flex align-items-center justify-content-center my-5 container">
          <div className="col-md-4 mx-md-5">
            <img
              src="https://media3.giphy.com/media/QsOq3W7wCoa0sC2QEN/giphy.gif?cid=ecf05e47vw37g2a9n4oymaagriqb2ongpm9kz137qwk47b3l&rid=giphy.gif&ct=s"
              height={400}
              alt=""
              srcSet=""
            />
          </div>
          <div className="col-md-7 mt-5 mt-md-0">
            <h1 className="fw-bold text-white w-75">
              Secure and state of the art
            </h1>
            <h4 className="text-secondary fw-light w-75">
              Devices connected to the platform are verified based on their
              firmware, owner details, manufacturer metadata and a device
              identifier. This merkle hash is used to call a smart contract on a
              blockchain to check if the device was already minted (registered)
              on the platform. The project consists of three layers - a front
              end dApp, a device firmware and a smart contract that is deployed
              on the blockchain network, “Polygon”. The decentralized data
              storage is provided by IPFS.
            </h4>
          </div>
        </div>

        <div className="d-md-flex align-items-center justify-content-center my-5 container">
          <div className="col-md-6 mt-5 mt-md-0 text-end">
            <h1 className="fw-bold text-white">
              Towards Decentalized Security
            </h1>
            <h4 className="text-secondary fw-light">
              Simply, a device is first minted (registered) on the blockchain
              similar to the NFTs on their smart contract. The mint occurs by
              creating the rIOT hash based on firmware, metadata, owner address
              and the device identifier. The next time the device tries to
              authenticate using the rIOT platform, this rIOT hash is compared
              with the on-chain data and allows further access to the IPFS API
              to transact the sensor data. The admin can use the front end dApp
              to mint, view devices and look at the sensor data collected by the
              rIOT platform. This is done completely decentralized from end to
              end, meaning there’s no single point of failure and hence
              byzantine fault tolerance is achieved.
            </h4>
          </div>
          <div className="col-md-5 mx-md-5">
            <img
              src="https://media1.giphy.com/media/VIWbOd3V8yVap4VQLt/giphy.gif?cid=ecf05e47el66l7t6vr83ibahm737l9kp0je8wvyrbb852kl3&rid=giphy.gif&ct=s"
              height={300}
              alt=""
              srcSet=""
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default Home;
