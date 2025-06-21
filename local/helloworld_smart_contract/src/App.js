import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import contractArtifact from './abis/NameStorage.json';  // Path to your compiled contract ABI
import "./App.css"

// Set up the web3 instance and contract address
const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:8545"); // Connect to Ganache-CLI

function App() {
  const [name, setName] = useState('');
  const [storedName, setStoredName] = useState('');
  const [message, setMessage] = useState('');
  const [contract, setContract] = useState(null);
  const [contractAddress, setContractAddress] = useState('');
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
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = contractArtifact.networks[networkId];
      if (!deployedNetwork) {
        alert(`Smart contract not deployed to detected network (network ID: ${networkId}).`);
        return;
      }

      const address = deployedNetwork.address;
      setContractAddress(address);

      const instance = new web3.eth.Contract(contractArtifact.abi, address);
      setContract(instance);

      console.log("Contract instance:", instance);
      console.log("Contract address:", address);
    };

    loadWeb3();
    loadContract();
  }, []);

  // Function to set the name in the contract
  const setNameInContract = async () => {
    setMessage('');
    setStoredName('');

    if (contract) {
      await contract.methods.setName(name).send({
        from: account,
        gas: 2000000,  // Provide a reasonable gas limit
        gasPrice: web3.utils.toWei('20', 'gwei'),  // Set the gas price manually
      });

      setMessage(`Name set in blockchain`);
    }
  };

  // Function to get the stored name from the contract
  const getStoredName = async () => {
    setMessage('');
    if (contract) {
      const result = await contract.methods.getName().call();
      setStoredName(result);
    }
  };

  return (
    <div>
      <h1>Hello World and Name <br/>Dapp</h1>
      {message ? <span>{message}</span> : null}
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
        <button onClick={() => getStoredName()}>Get Name</button>
        {storedName ? <h2>Stored Name: { storedName }</h2>: null}
      </div>
    </div>
  );
}

export default App;