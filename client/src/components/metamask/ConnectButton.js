import Image from 'next/image';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { metamaskActions } from '../../store/metamaskSlice';
import detectEthereumProvider from '@metamask/detect-provider';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { getAccounts, connectWallet, checkConnectCompatibility, connectToChain } from './lib/index';
import { chains } from './lib/constants';
import ChainsModal from './SelectChainModal';
import getBalance from './lib/getBalance';
import AccountOptionsModal from './AccountOptionsModal';

export default function ConnectButton() {
  const { currentAccount, currentChain, currentBalance, metamaskMessage } = useSelector((state) => state.metamask);
  const [showAccountOptions, setShowAccountOptions] = useState(false);
  const [showChainModal, setShowChainModal] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      let ethereum = await detectEthereumProvider();
      let ethereumData = checkConnectCompatibility(ethereum);
      dispatch(metamaskActions.setMetamaskMessage(ethereumData));
      if (ethereumData != 'MetaMask is installed!') {
        return;
      }
      if (ethereum.isConnected()) {
        console.log('Already connected');

        const accounts = await getAccounts(ethereum);
        if (accounts.length > 0) {
          dispatch(metamaskActions.setAccounts(accounts));
          dispatch(metamaskActions.setCurrentAccount(accounts[0]));
          let balance = Number(await getBalance(accounts[0]));
          dispatch(metamaskActions.setBalance((balance / 10 ** 18).toFixed(4)));
          let chainId = await ethereum.request({ method: 'eth_chainId' });
          if (!chains.map((obj) => obj.chainId).includes(Number(chainId))) {
            chainId = await connectToChain(chains[0]);
          }
          dispatch(metamaskActions.setCurrentChain(chains.filter((obj) => obj.chainId == chainId)[0]));
          console.log('Current chain: ', chainId);
        } else {
          console.log('No accounts Connected ');
        }
      } else {
        console.log('not connected');
      }
    })();
  }, []);
  useEffect(() => {
    (async () => {
      let ethereum = await detectEthereumProvider();
      let ethereumData = checkConnectCompatibility(ethereum);
      if (ethereumData != 'MetaMask is installed!') {
        return;
      }
      ethereum.on('accountsChanged', async (accounts) => {
        console.log('accounts changed');
        if (accounts.length == 0) {
          dispatch(metamaskActions.setAccounts([]));
          dispatch(metamaskActions.setCurrentAccount(''));
        } else {
          dispatch(metamaskActions.setAccounts(accounts));
          dispatch(metamaskActions.setCurrentAccount(accounts[0]));
          let chainId = await ethereum.request({ method: 'eth_chainId' });
          if (chains.map((obj) => obj.chainId).includes(Number(chainId))) {
            dispatch(metamaskActions.setCurrentChain(chains.filter((obj) => obj.chainId == chainId)[0]));
          } else {
            const result = await connectToChain(chains[0]);
            if (result != 0) dispatch(metamaskActions.setCurrentChain(result));
          }

          let balance = Number(await getBalance(accounts[0]));
          dispatch(metamaskActions.setBalance((balance / 10 ** 18).toFixed(4)));
        }
      });
      ethereum.on('chainChanged', async (chainId) => {
        console.log('chain changed ' + chains.filter((obj) => obj.chainId == Number(chainId))[0]);
        dispatch(metamaskActions.setCurrentChain(chains.filter((obj) => obj.chainId == Number(chainId))[0]));
        let balance = Number(await getBalance(currentAccount));
        dispatch(metamaskActions.setBalance((balance / 10 ** 18).toFixed(4)));
      });
    })();
  }, []);

  return (
    <>
      {metamaskMessage == 'MetaMask is installed!' ? (
        <div className="space-x-4 flex">
          {showChainModal && (
            <ChainsModal
              setShowChainModal={() => {
                setShowChainModal(false);
              }}
              setSelectedChain={(chain) => {
                dispatch(metamaskActions.setCurrentChain(chain));
              }}
              setNewBalance={async () => {
                let balance = Number(await getBalance(currentAccount));
                dispatch(metamaskActions.setBalance((balance / 10 ** 18).toFixed(4)));
              }}
            />
          )}{' '}
          {showAccountOptions && (
            <AccountOptionsModal
              setShowChainModal={() => {
                setShowAccountOptions(false);
              }}
              disconnect={() => {
                dispatch(metamaskActions.setAccounts([]));
                dispatch(metamaskActions.setCurrentAccount(''));
                dispatch(metamaskActions.setBalance(0));
                setShowAccountOptions(false);
              }}
            />
          )}
          {currentAccount != '' && chains.map((obj) => obj.chainId).includes(currentChain.chainId) ? (
            <button
              className="flex bg-[#343434] rounded-lg border-2 border-white px-2 hover:bg-slate-900 transition ease-in-out delay-100 duration-200 hover:scale-105"
              onClick={() => {
                setShowChainModal(true);
              }}
            >
              <Image alt="Chain" src={currentChain.icon} width={20} height={20} className="my-auto" />

              <div className=" p-2 text-xs font-semibold my-auto ">{currentChain.name}</div>
              <FontAwesomeIcon icon={faChevronDown} width={12} height={12} className="my-auto mr-2" />
            </button>
          ) : (
            currentAccount != '' && (
              <div className="flex bg-[#D22B2B] rounded-lg">
                <button
                  className=" p-2 text-xs font-semibold my-auto "
                  onClick={() => {
                    setShowChainModal(true);
                  }}
                >
                  Wrong Network
                </button>
                <FontAwesomeIcon icon={faChevronDown} width={12} height={12} className="my-auto mr-2" />
              </div>
            )
          )}
          <button
            className="flex relative  bg-[#F08000] rounded-r-2xl rounded-l-3xl transition ease-in-out delay-100 duration-200 hover:bg-white group hover:scale-105  border-white"
            onClick={async () => {
              if (currentAccount != '') {
                setShowAccountOptions(true);
              } else {
                let ethereum = await detectEthereumProvider();
                let ethereumData = checkConnectCompatibility(ethereum);
                if (ethereumData != 'MetaMask is installed!') {
                  return;
                }
                const accounts = await connectWallet(ethereum);
                let chainId = await ethereum.request({ method: 'eth_chainId' });
                if (chains.map((obj) => obj.chainId).includes(Number(chainId))) {
                  dispatch(metamaskActions.setCurrentChain(chains.filter((obj) => obj.chainId == chainId)[0]));
                } else {
                  const result = await connectToChain(chains[0]);
                  if (result != 0) dispatch(metamaskActions.setCurrentChain(result));
                }

                if (accounts.length > 0) {
                  dispatch(metamaskActions.setAccounts(accounts));
                  dispatch(metamaskActions.setCurrentAccount(accounts[0]));
                  let balance = Number(await getBalance(accounts[0]));
                  dispatch(metamaskActions.setBalance((balance / 10 ** 18).toFixed(4)));
                }
              }
            }}
          >
            <div className="p-2 bg-[#343434] rounded-l-lg transition ease-in-out delay-100 duration-200 group-hover:bg-slate-900 border-y-2 border-l-2">
              <Image
                alt="Metamask"
                src={'https://raw.githubusercontent.com/MetaMask/brand-resources/master/SVG/metamask-fox.svg'}
                width={16}
                height={16}
              />
            </div>
            <div
              className={`grow px-5 text-xs my-auto py-2 font-semibold text-gray-200  group-hover:text-black transition ease-in-out delay-100 duration-200 border-y-2 ${
                currentAccount == '' && ' border-r-2 rounded-r-lg'
              } `}
            >
              {currentAccount != '' ? (
                <p className="my-auto">{currentAccount.slice(0, 6) + '....' + currentAccount.slice(38)}</p>
              ) : (
                <p className="my-auto">Connect Wallet</p>
              )}
            </div>
            {currentAccount != '' && (
              <div className=" border-y-2 border-r-2 p-2 text-xs font-semibold bg-[#343434] rounded-r-lg group-hover:bg-slate-900 transition ease-in-out delay-100 duration-200">
                <p>
                  {chains.map((obj) => obj.chainId).includes(currentChain.chainId)
                    ? currentBalance + ' ' + currentChain.coinName
                    : '🚫🚫🚫'}{' '}
                </p>
              </div>
            )}
          </button>
        </div>
      ) : metamaskMessage == 'Multiple wallets Installed. Disable other wallets to use metamask' ? (
        <Link
          className="flex relative  bg-[#F08000] rounded-r-2xl rounded-l-3xl transition ease-in-out delay-100 duration-200 hover:bg-white group hover:scale-105  border-white"
          href={'https://metamask.io/download/'}
        >
          <div className="p-2 bg-[#343434] rounded-l-lg transition ease-in-out delay-100 duration-200 group-hover:bg-slate-900 border-y-2 border-l-2">
            <Image
              alt="Metamask"
              src={'https://raw.githubusercontent.com/MetaMask/brand-resources/master/SVG/metamask-fox.svg'}
              width={16}
              height={16}
            />
          </div>
          <div
            className={`grow px-5 text-xs my-auto py-2 font-semibold text-gray-200  group-hover:text-black transition ease-in-out delay-100 duration-200 border-y-2 border-r-2 rounded-r-lg`}
          >
            <p className="my-auto">Disable other wallets to use MetaMask</p>
          </div>
        </Link>
      ) : (
        <Link
          className="flex relative  bg-[#F08000] rounded-r-2xl rounded-l-3xl transition ease-in-out delay-100 duration-200 hover:bg-white group hover:scale-105  border-white"
          href={'https://metamask.io/download/'}
        >
          <div className="p-2 bg-[#343434] rounded-l-lg transition ease-in-out delay-100 duration-200 group-hover:bg-slate-900 border-y-2 border-l-2">
            <Image
              alt="Metamask"
              src={'https://raw.githubusercontent.com/MetaMask/brand-resources/master/SVG/metamask-fox.svg'}
              width={16}
              height={16}
            />
          </div>
          <div
            className={`grow px-5 text-xs my-auto py-2 font-semibold text-gray-200  group-hover:text-black transition ease-in-out delay-100 duration-200 border-y-2 border-r-2 rounded-r-lg`}
          >
            <p className="my-auto">Download MetaMask</p>
          </div>
        </Link>
      )}
    </>
  );
}
