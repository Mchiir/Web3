// Contract Configuration
const CONTRACT_ADDRESS = "0x11b94dc4cE869aC5355999DB2273DA775CA766D5";
const CONTRACT_ABI = [
  {
    "inputs": [{"internalType": "uint256","name": "petId","type": "uint256"}],
    "name": "adopt",
    "outputs": [{"internalType": "uint256","name": "","type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256","name": "petId","type": "uint256"}],
    "name": "unadopt",
    "outputs": [{"internalType": "uint256","name": "","type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAdopters",
    "outputs": [{"internalType": "address[20]","name": "","type": "address[20]"}],
    "stateMutability": "view",
    "type": "function"
  }
];