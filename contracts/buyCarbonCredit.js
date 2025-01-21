const { ApiPromise, WsProvider, Keyring } = require('@polkadot/api');
const { ContractPromise } = require('@polkadot/api-contract');
const { ethers } = require('ethers');
const detectEthereumProvider = require('@metamask/detect-provider');
const Web3 = require('web3');
const fs = require('fs');

// Configuration
const config = {
  ethereum: {
    contractAddress: "0xYourEthereumContractAddress",
    abi: [
      {
        "constant": false,
        "inputs": [{ "name": "amount", "type": "uint256" }],
        "name": "buy",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
      },
    ],
  },
  moonbeam: {
    rpcUrl: "https://rpc.api.moonbeam.network",
    contractAddress: "0xYourMoonbeamContractAddress",
    abi: [
      {
        "constant": false,
        "inputs": [{ "name": "amount", "type": "uint256" }],
        "name": "bridgeBuy",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
      },
    ],
  },
  polkadot: {
    rpcUrl: "wss://westend-rpc.polkadot.io",
    contractAddress: "0xYourPolkadotContractAddress",
    abiPath: "./contract_abi.json",
  },
};

// Polkadot Setup
async function setupPolkadot() {
  const wsProvider = new WsProvider(config.polkadot.rpcUrl);
  return await ApiPromise.create({ provider: wsProvider });
}

// MetaMask Wallet Connection
async function connectWallet() {
  try {
    const metaMaskProvider = await detectEthereumProvider();
    if (!metaMaskProvider) throw new Error("MetaMask not detected!");

    const provider = new ethers.providers.Web3Provider(metaMaskProvider);
    const signer = provider.getSigner();
    const accounts = await provider.listAccounts();

    if (accounts.length === 0) throw new Error("No MetaMask accounts connected!");
    return { provider, signer, accounts };
  } catch (error) {
    console.error(error.message);
    document.getElementById("status").innerText = error.message;
  }
}

// Ethereum Buy Action
async function buyTokensOnEthereum(signer) {
  try {
    const contract = new ethers.Contract(config.ethereum.contractAddress, config.ethereum.abi, signer);
    const amount = 1000;
    const tx = await contract.buy(amount, { value: ethers.utils.parseEther("1.0") });

    console.log(`Ethereum transaction sent: ${tx.hash}`);
    await tx.wait();
    console.log(`Ethereum transaction confirmed: ${tx.hash}`);
  } catch (error) {
    console.error("Ethereum transaction failed:", error);
  }
}

// Moonbeam Buy Action
async function buyTokensOnMoonbeam(web3) {
  try {
    const accounts = await web3.eth.getAccounts();
    const userAccount = accounts[0];
    const contract = new web3.eth.Contract(config.moonbeam.abi, config.moonbeam.contractAddress);

    const tx = await contract.methods.bridgeBuy(1000).send({ from: userAccount });
    console.log("Moonbeam transaction confirmed:", tx);
  } catch (error) {
    console.error("Moonbeam transaction failed:", error);
  }
}

// Polkadot Buy Action
async function buyTokensOnPolkadot(api) {
  try {
    const keyring = new Keyring({ type: "sr25519" });
    const sender = keyring.addFromUri("yourSenderPrivateKey");
    const abi = JSON.parse(fs.readFileSync(config.polkadot.abiPath));
    const contract = new ContractPromise(api, abi, config.polkadot.contractAddress);

    const gasLimit = 1000000000;
    const value = 1500;
    const tx = contract.tx.buy({ gasLimit, value });

    const { dispatchError, events } = await tx.signAndSend(sender);
    if (dispatchError) throw new Error(dispatchError.toString());

    events.forEach(({ event }) => console.log("Event:", event.toString()));
    console.log("Polkadot transaction successful");
  } catch (error) {
    console.error("Polkadot transaction failed:", error);
  }
}

// Additional Polkadot Functions (keeping all previous functions)
const CONFIG = {
  wsProviderUrl: "wss://westend-rpc.polkadot.io",
  contractAddress: "5YourContractAddress",
  abiPath: "./metadata.json",
  senderSeed: "//Alice",
  gasLimit: 1000000000,
};

async function setupPolkadot() {
  const wsProvider = new WsProvider(CONFIG.wsProviderUrl);
  const api = await ApiPromise.create({ provider: wsProvider });
  return api;
}

async function buyTokens(api, amount) {
  const keyring = new Keyring({ type: 'sr25519' });
  const sender = keyring.addFromUri(CONFIG.senderSeed);

  const abi = JSON.parse(fs.readFileSync(CONFIG.abiPath));
  const contract = new ContractPromise(api, abi, CONFIG.contractAddress);

  try {
    const value = amount;
    const { gasConsumed, result, events } = await contract.tx.buy({ gasLimit: CONFIG.gasLimit, value }).signAndSend(sender);

    if (result.isErr) {
      console.error("Transaction failed:", result.toHuman());
      return;
    }

    console.log(`Gas consumed: ${gasConsumed}`);
    events.forEach(({ event }) => {
      console.log("Event:", event.toHuman());
    });

    console.log("Transaction successful!");
  } catch (error) {
    console.error("Error in buyTokens:", error);
  }
}

async function getBalance(api) {
  const abi = JSON.parse(fs.readFileSync(CONFIG.abiPath));
  const contract = new ContractPromise(api, abi, CONFIG.contractAddress);

  try {
    const { output } = await contract.query.getBalance(CONFIG.contractAddress, { gasLimit: CONFIG.gasLimit });
    console.log("Contract balance:", output?.toHuman());
  } catch (error) {
    console.error("Error in getBalance:", error);
  }
}

async function getPrice(api) {
  const abi = JSON.parse(fs.readFileSync(CONFIG.abiPath));
  const contract = new ContractPromise(api, abi, CONFIG.contractAddress);

  try {
    const { output } = await contract.query.getPrice(CONFIG.contractAddress, { gasLimit: CONFIG.gasLimit });
    console.log("Item price:", output?.toHuman());
  } catch (error) {
    console.error("Error in getPrice:", error);
  }
}

// Main Function to execute all transactions
async function main() {
  try {
    const api = await setupPolkadot();
    const { provider, signer } = await connectWallet();
    const web3 = new Web3(config.moonbeam.rpcUrl);

    // Perform transactions
    await buyTokensOnEthereum(signer);
    await buyTokensOnMoonbeam(web3);
    await buyTokensOnPolkadot(api);

    // Additional Polkadot interactions
    const amount = 1000000000;
    await buyTokens(api, amount);
    await getBalance(api);
    await getPrice(api);

  } catch (error) {
    console.error("Error in main process:", error.message);
  }
}

// Execute Main
main().catch(console.error);
