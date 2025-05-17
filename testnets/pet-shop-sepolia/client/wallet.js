let web3;
let accounts = [];

async function connectWallet() {
  try {
    if (window.ethereum) {
      accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      web3 = new Web3(window.ethereum);
      return true;
    } else {
      alert('Please install MetaMask!');
      return false;
    }
  } catch (error) {
    console.error("Error connecting wallet:", error);
    alert(`Error connecting wallet: ${error.message}`);
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

function getCurrentAccount() {
  return accounts[0];
}