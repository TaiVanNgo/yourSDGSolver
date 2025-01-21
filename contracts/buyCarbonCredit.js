const { ApiPromise, WsProvider } = require('@polkadot/api');

// Set up connection to Polkadot network
async function setup() {
  const wsProvider = new WsProvider('wss://westend-rpc.polkadot.io'); // You can replace this with other RPC endpoints
  const api = await ApiPromise.create({ provider: wsProvider });
  return api;
}
