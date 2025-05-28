const SEPOLIA_CHAIN_ID = "0xaa36a7"; // 11155111 in hex
const SEPOLIA_NAME = "Sepolia Testnet";

let web3;
let accounts = [];

async function connectWallet() {
  try {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        return true;
    } else {
      toastr.warning('Please install or enable MetaMask!');
      return false;
    }
  } catch (error) {
    console.error("Error connecting wallet:", error);
    toastr.info(`Error connecting wallet: ${error.message}`);
    return false;
  }
}

async function checkWalletConnection() {
  if (window.ethereum) {
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    return accounts.length > 0;
  }
  return false;
}

async function checkCorrectNetwork() {
  if (!window.ethereum) {
    toastr.info("Please install MetaMask to use this DApp.");
    return false;
  }

  const chainId = await window.ethereum.request({ method: 'eth_chainId' });

  if (chainId !== SEPOLIA_CHAIN_ID) {
    toastr.info(`You are connected to an unsupported network.\nPlease switch to ${SEPOLIA_NAME}.`);
    return false;
  }

  return true;
}


 async function checkEthBalance(address) {
  const balance = await web3.eth.getBalance(address);
  const ethBalance = web3.utils.fromWei(balance, 'ether');

  if (parseFloat(ethBalance) < 0.001) {
    toastr.error(`Your wallet has low ETH (${ethBalance} ETH).\nPlease get some Sepolia ETH from a faucet to proceed.`);
    return false;
  }

  return true;
}

function getCurrentAccount() {
  return accounts[0];
}