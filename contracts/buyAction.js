const { ApiPromise, WsProvider, Keyring } = require('@polkadot/api');
const { ethers } = require('ethers'); // Import ethers.js
const detectEthereumProvider = require('@metamask/detect-provider');
const fs = require('fs');

// Polkadot connection setup
async function setupPolkadot() {
  const wsProvider = new WsProvider('wss://westend-rpc.polkadot.io'); // Replace with your RPC endpoint
  const api = await ApiPromise.create({ provider: wsProvider });
  return api;
}

// MetaMask wallet connection
let provider, signer, contract;
const contractAddress = "0xYourContractAddress"; // Replace with your contract address on Ethereum
const abi = [
  {
    "constant": false,
    "inputs": [
      {
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "buy",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// Connect to MetaMask wallet
async function connectWallet() {
  try {
    const metaMaskProvider = await detectEthereumProvider();

    if (metaMaskProvider) {
      provider = new ethers.providers.Web3Provider(metaMaskProvider);
      signer = provider.getSigner();
      contract = new ethers.Contract(contractAddress, abi, signer);

      const accounts = await provider.listAccounts();
      if (accounts.length > 0) {
        document.getElementById("status").innerText = `Connected to ${accounts[0]}`;
        document.getElementById("buyButton").disabled = false; // Enable buy button
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

// Buy action using MetaMask (sending a transaction)
async function buyTokens() {
  try {
    const amount = 1000; // The amount of tokens the user wants to buy
    const tx = await contract.buy(amount, {
      value: ethers.utils.parseEther("1.0"), // 1 ETH sent with transaction, adjust accordingly
    });

    document.getElementById("status").innerText = `Transaction sent: ${tx.hash}`;

    await tx.wait();
    document.getElementById("status").innerText = `Transaction confirmed: ${tx.hash}`;
  } catch (err) {
    console.error(err);
    document.getElementById("status").innerText = "Error buying tokens!";
  }
}

// Polkadot contract interaction for buying action
async function buyActionPolkadot(api, contractAddress, senderAddress, price, amount) {
  const keyring = new Keyring({ type: 'sr25519' });
  const sender = keyring.addFromUri(senderAddress); // Replace with the sender's private key or address

  const abi = JSON.parse(fs.readFileSync('./contract_abi.json')); // Replace with your ABI file for Polkadot contract
  const contract = new ContractPromise(api, abi, contractAddress);

  const gasLimit = 1000000000; // Set an appropriate gas limit
  const value = amount; // Funds to send in the transaction (in smallest unit, like planck for Polkadot)
  const tx = contract.tx.buy({ gasLimit, value });

  const { dispatchError, events, result } = await tx.signAndSend(sender);

  if (dispatchError) {
    console.log('Transaction failed:', dispatchError.toString());
    return;
  }

  console.log('Transaction successful:', result.toHuman());

  // Watch for the event emitted by the contract (e.g., successful purchase)
  events.forEach(({ event }) => {
    console.log('Event:', event.toString());
  });
}

// Main function to handle both Polkadot and Ethereum transactions
async function main() {
  try {
    const api = await setupPolkadot();
    const contractAddressPolkadot = '0xYourPolkadotContractAddress'; // Replace with your Polkadot contract address
    const senderAddress = 'yourSenderAddress'; // Replace with the sender's address
    const price = 1000; // Example price
    const amount = 1500; // Example amount (should be >= price)

    // Connect wallet and perform Ethereum-based action (buy tokens)
    await connectWallet();

    // Perform Polkadot-based buy action
    await buyActionPolkadot(api, contractAddressPolkadot, senderAddress, price, amount);
  } catch (error) {
    console.error("Error in main:", error);
  }
}

// Button Event Listeners
document.getElementById("connectWallet").addEventListener("click", connectWallet);
document.getElementById("buyButton").addEventListener("click", buyTokens);

// Call the main function to execute both actions
main().catch(console.error);
