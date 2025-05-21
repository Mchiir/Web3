// Contract Configuration
const CONTRACT_ADDRESS = "0xF4a5b44FA19373544F6a9fB414695dD2666f156c";
const CONTRACT_ABI = [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "petId",
          "type": "uint256"
        }
      ],
      "name": "adopt",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "adopters",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAdopters",
      "outputs": [
        {
          "internalType": "address[20]",
          "name": "",
          "type": "address[20]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "petId",
          "type": "uint256"
        }
      ],
      "name": "unadopt",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    }
]