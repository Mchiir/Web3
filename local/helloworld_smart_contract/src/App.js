import "./App.css"
import React, { useState } from 'react';
import Web3 from 'web3';
import contractArtifact from './abis/NameStorage.json';  // Path to your compiled contract ABI

// Set up the web3 instance and contract address
const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545"); // Connect to Ganache-CLI

function App() {
  const [name, setName] = useState('');
  const [storedName, setStoredName] = useState('');
  const [message, setMessage] = useState('');
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const clearMessages = () => {
    setMessage('');
    setErrorMessage('');
    setStoredName('');
  };

  const connectMetamask = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
      } catch (error) {
        console.error("User denied account access or error occurred:", error);
      }

      if(account){
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = contractArtifact.networks[networkId];
        if (!deployedNetwork) {
          setErrorMessage(`Smart contract not deployed to detected network (network ID: ${networkId}).`);
          return;
        }

        const instance = new web3.eth.Contract(contractArtifact.abi, deployedNetwork.address);
        setContract(instance);
      }else{
          setErrorMessage("Please connect metamask to the correct network and it's address!");
          return;
      }
    } else {
      setErrorMessage("Please install MetaMask!");
      return;
    }

    clearMessages();
    setMessage('Connected to Metamask successfully!');
  }


  // Function to set the name in the contract
  const setNameInContract = async () => {
    clearMessages();

    if (contract) {
      if(name.trim() === '') {
        setMessage('Please enter a name or word');
        return;
      }else if(name.trim().length > 32) {
        setMessage('Name should not exceed 32 characters');
        return;
      }

      await contract.methods.setName(name).send({
        from: account,
        gas: 2000000,  // Provide a reasonable gas limit
        gasPrice: web3.utils.toWei('20', 'gwei'),  // Set the gas price manually
      })

      setMessage("Name set in contract.")
    }else {
      connectMetamask();
    }
  };

  // Function to get the stored name from the contract
  const getStoredName = async () => {
    clearMessages();
    
    if (contract) {
      const result = await contract.methods.getName().call();

      if(result === '') {
        setMessage('No name stored in the contract');
        return;
      }

      setStoredName(result);
    }else{
      connectMetamask();
    }
  };

  return (
    <div>
      <div style={{ position: 'absolute', top: 10, left: 4, padding: '10px' }}>
          <button onClick={() => connectMetamask()} class='connect_button'>Connect Metamask</button>
      </div>
      <h1>Hello World and Name <br/>Dapp</h1>
      {message ? <span>{message}</span> : null}
      {errorMessage ? <span style={{ color:"red" }}>{errorMessage}</span>: null}
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter a name"
        />
        <button onClick={() => setNameInContract()}>Set Name</button>
      </div>
      <div>
        <button onClick={() => getStoredName()}>Get Name</button>
        {storedName ? <h2>Stored Name: { storedName }</h2>: null}
      </div>
    </div>
  );
}

export default App;