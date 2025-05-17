import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import contractArtifact from './abis/NameStorage.json';  // Path to your compiled contract ABI
import "./App.css"

// Set up the web3 instance and contract address
const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:8545"); // Connect to Ganache-CLI
const contractAddress = "0x31259B9dF9e7dD7714de8ae43BA00B08d273B2cd"
console.log("address:", contractAddress)

function App() {
  const [name, setName] = useState('');
  const [storedName, setStoredName] = useState('');
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState('');

  // Fetch the contract and the user's MetaMask account
  useEffect(() => {
    const loadWeb3 = async () => {
      if (window.ethereum) {  
        await window.ethereum.request({ method: 'eth_requestAccounts' }); // Request MetaMask access
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
      } else {
        alert("Please install MetaMask!");
      }
    };

    const loadContract = async () => {
      const contract = new web3.eth.Contract(contractArtifact.abi, contractAddress);
      setContract(contract);
    };

    loadWeb3();
    loadContract();
  }, []);

  // Function to set the name in the contract
  const setNameInContract = async () => {
    if (contract) {
      await contract.methods.setName(name).send({
        from: account,
        gas: 2000000,  // Provide a reasonable gas limit
        gasPrice: web3.utils.toWei('20', 'gwei'),  // Set the gas price manually
      });

      getStoredName(); // Update the displayed stored name after setting it
    }
  };

  // Function to get the stored name from the contract
  const getStoredName = async () => {
    if (contract) {
      const result = await contract.methods.getName().call();
      setStoredName(result);
    }
  };

  return (
    <div>
      <h1>Interacting with Smart Contract</h1>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter a name"
        />
        <button onClick={setNameInContract}>Set Name</button>
      </div>
      <div>
        <h2>Stored Name: {storedName ? storedName : "No name set yet"}</h2>
      </div>
    </div>
  );
}

export default App;