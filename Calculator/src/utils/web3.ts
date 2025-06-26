import Web3 from "web3";
import ContractJSON from "../abis/Calculator.json";

let contractAddress;
let contractABI;

let web3: any;
let contract: any;

export const initWeb3 = async () => {
  if ((window as any).ethereum) {
    web3 = new Web3((window as any).ethereum);
    await (window as any).ethereum.request({ method: "eth_requestAccounts" });
    contractABI = ContractJSON.abi;
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = (ContractJSON.networks as any)[networkId];
    if(!deployedNetwork) throw new Error(`Contract not deployed on network with ID ${networkId}`);
    contractAddress = deployedNetwork.address;


    contract = new web3.eth.Contract(contractABI, contractAddress);
  } else {
    alert("Please install MetaMask!");
  }
};

export const getMessage = async () => {
  return await contract.methods.message().call({
    gasPrice: await web3.eth.getGasPrice(),
  })
};

export const add = async (a: number, b: number) => {
  return await contract.methods.add(a, b).call({
    gasPrice: await web3.eth.getGasPrice()
  })
};

export const subtract = async (a: number, b: number) => {
  return await contract.methods.subtract(a, b).call({
    gasPrice: await web3.eth.getGasPrice()
  })
};

export const multiply = async (a: number, b: number) => {
  return await contract.methods.multiply(a, b).call({
    gasPrice: await web3.eth.getGasPrice()
  })
};

export const divide = async (a: number, b: number) => {
  return await contract.methods.divide(a, b).call({
    gasPrice: await web3.eth.getGasPrice()
  })
};

export const setMessage = async (newMessage: any) => {
  const accounts = await web3.eth.getAccounts();
  if(accounts.length === 0) throw new Error("No accounts found. Please connect your wallet.");
  if(!newMessage || typeof newMessage !== 'string') throw new Error("Invalid message. Please provide a valid string.");
  if(newMessage.length > 20) throw new Error("Message too long. Please limit to 20 characters.");

  await contract.methods.setMessage(newMessage).send({
    from: accounts[0],
    gas: 3000000,
    gasPrice: await web3.eth.getGasPrice()
  })
 };
