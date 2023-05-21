import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';
import checkConnectCompatibility from './checkConnectCompatibility';

export default async function contractCall(
  contractAddress,
  currentAccount,
  abi,
  params,
  value,
  functionSignature,
  isReadOnly,
) {
  let ethereum = await detectEthereumProvider();
  let ethereumData = checkConnectCompatibility(ethereum);
  if (ethereumData != 'MetaMask is installed!') {
    return;
  }
  const web3 = new Web3(window.web3.currentProvider);
  let encodedData;
  console.log('Contract address:', contractAddress);
  console.log('Current account:', currentAccount);
  console.log('Params:', params);
  console.log('Value:', value);
  console.log('Function signature:', functionSignature);
  console.log('Function Name:', functionSignature.split('(')[0]);
  //   console.log("Return types:", returnTypes);
  console.log('Is read-only:', isReadOnly);
  const inputs = abi.filter((e) => e.type == 'function' && e.name == functionSignature.split('(')[0])[0].inputs;
  const outputs = abi.filter((e) => e.type == 'function' && e.name == functionSignature.split('(')[0])[0].outputs;
  if (params.length > 0) {
    try {
      encodedData = web3.eth.abi.encodeFunctionCall(
        {
          name: functionSignature.split('(')[0],
          type: 'function',
          inputs,
        },
        params,
      );
    } catch (e) {
      return 'Invalid Params';
    }
  } else {
    encodedData = web3.eth.abi.encodeFunctionCall(
      {
        name: functionSignature.split('(')[0],
        type: 'function',
        inputs: [],
      },
      [],
    );
  }

  // Create a new JSON-RPC request to call the function
  let request;
  if (isReadOnly) {
    request = {
      jsonrpc: '2.0',
      method: 'eth_call',
      params: [
        {
          from: currentAccount,
          to: contractAddress,
          data: encodedData,
        },
        `latest`, // Use the latest block number
      ],
      id: 1, // The request ID (can be any number)
    };
  } else {
    request = {
      jsonrpc: '2.0',
      method: 'eth_sendTransaction',
      params: [
        {
          from: currentAccount,
          to: contractAddress,
          data: encodedData,
        },
        'latest', // Use the latest block number
      ],
      value,
      id: 1, // The request ID (can be any number)
    };
  }

  try {
    console.log(request);
    // Send the JSON-RPC request using ethereum.request and wait for the response
    const response = await ethereum.request(request);
    console.log(response);
    // Decode the response data using web3-utils
    const result = web3.eth.abi.decodeParameters(outputs, response);
    console.log(result);
    // Log the result to the console
    if (result['__length__'] == 0) return 'Execution Complete';
    else return result[0];
  } catch (error) {
    console.error(error);
    return 'Error';
  }
}
