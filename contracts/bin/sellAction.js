const { ApiPromise, WsProvider, Keyring } = require('@polkadot/api');
const { ContractPromise } = require('@polkadot/api-contract');
const fs = require('fs');

async function setup() {
  const wsProvider = new WsProvider('wss://westend-rpc.polkadot.io'); // Replace with your Polkadot RPC URL
  const api = await ApiPromise.create({ provider: wsProvider });
  return api;
}

async function sellAction(api, contractAddress, senderAddress, amount) {
  const keyring = new Keyring({ type: 'sr25519' });
  const sender = keyring.addFromUri(senderAddress); // Sender's private key or address

  // Get the contract ABI and create the contract instance
  const abi = JSON.parse(fs.readFileSync('./contract_abi.json')); // The ABI of your deployed contract
  const contract = new ContractPromise(api, abi, contractAddress);

  // Call the 'sell' function in the contract
  const gasLimit = 1000000000; // Set an appropriate gas limit
  const value = 0; // No value is sent for the sell action
  const tx = contract.tx.sell({ gasLimit, value }, amount);

  const { dispatchError, events, result } = await tx.signAndSend(sender);

  if (dispatchError) {
    console.log('Transaction failed:', dispatchError.toString());
    return;
  }

  console.log('Transaction successful:', result.toHuman());

  // Watch for the event emitted by the contract (e.g., successful withdrawal)
  events.forEach(({ event }) => {
    console.log('Event:', event.toString());
  });
}

async function main() {
  const api = await setup();
  const contractAddress = '0xYourContractAddress'; // Replace with your contract address
  const senderAddress = 'yourSenderAddress'; // Replace with the sender's address
  const amountToSell = 1000; // Amount the seller wants to withdraw

  await sellAction(api, contractAddress, senderAddress, amountToSell);
}

main().catch(console.error);

// JavaScript for interacting with MetaMask and calling the sell method on the contract

let provider;
let signer;
let contract;

// Contract details (replace with your deployed contract's details)
const contractAddress = "0xYourContractAddress";  // Deployed contract address
const abi = [
  // Simplified ABI for the sell method
  {
    "constant": false,
    "inputs": [
      {
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "sell",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getSellerBalance",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
];

async function connectWallet() {
  try {
    // Detect MetaMask provider
    const metaMaskProvider = await detectEthereumProvider();

    if (metaMaskProvider) {
      // Connect to MetaMask
      provider = new ethers.providers.Web3Provider(metaMaskProvider);
      signer = provider.getSigner();
      contract = new ethers.Contract(contractAddress, abi, signer);

      const accounts = await provider.listAccounts();
      if (accounts.length > 0) {
        document.getElementById("status").innerText = `Connected to ${accounts[0]}`;
        document.getElementById("sellButton").disabled = false;
      } else {
        document.getElementById("status").innerText = "Please connect your wallet";
      }
    } else {
      document.getElementById("status").innerText = "MetaMask not detected!";
    }
  } catch (err) {
    console.error(err);
    document.getElementById("status").innerText = "Error connecting wallet!";
  }
}

async function sellTokens() {
  try {
    const amount = 1000; // The amount the seller wants to sell

    // Call the sell function on the contract
    const tx = await contract.sell(amount);
    document.getElementById("status").innerText = `Transaction sent: ${tx.hash}`;

    await tx.wait();
    document.getElementById("status").innerText = `Transaction confirmed: ${tx.hash}`;
  } catch (err) {
    console.error(err);
    document.getElementById("status").innerText = "Error selling tokens!";
  }
}

// Button Event Listeners
document.getElementById("connectWallet").addEventListener("click", connectWallet);
document.getElementById("sellButton").addEventListener("click", sellTokens);

