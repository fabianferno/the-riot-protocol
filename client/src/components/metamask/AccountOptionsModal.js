import { faTimes, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";

function AccountOptionsModal({ setShowChainModal, disconnect }) {
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto backdrop-blur-md">
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-slate-500  rounded-xl  min-w-[300px] min-h-[100] p-4 ">
          <div className="flex justify-between">
            <h1 className="text-white text-sm font-semibold ">
              Account Options
            </h1>
            <FontAwesomeIcon
              icon={faTimes}
              width={15}
              height={15}
              className="my-auto mr-2"
              onClick={() => setShowChainModal()}
            />
          </div>
          <div class="border-b my-2 mr-2  border-gray-300 opacity-30 "></div>
          <button
            className="mx-auto p-1 my-2 rounded-lg text-xs bg-transparent hover:bg-white hover:text-black text-white  flex w-[90%] transition ease-in-out delay-100 duration-200 hover:scale-105"
            onClick={() => {
              disconnect();
            }}
          >
            <FontAwesomeIcon
              icon={faPowerOff}
              width={15}
              height={15}
              className="my-auto mx-2"
            />

            <div className=" p-2 text-xs font-semibold my-auto ">
              Disconnect
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AccountOptionsModal;
