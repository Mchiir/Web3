import Web3 from "web3";

const contractAddress = "0x293C4811A558717f2065E4BF3b1A58894F842051";
const contractABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "message",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "_message", type: "string" }],
    name: "setMessage",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "a", type: "uint256" },
      { internalType: "uint256", name: "b", type: "uint256" },
    ],
    name: "add",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "a", type: "uint256" },
      { internalType: "uint256", name: "b", type: "uint256" },
    ],
    name: "subtract",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "a", type: "uint256" },
      { internalType: "uint256", name: "b", type: "uint256" },
    ],
    name: "multiply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "a", type: "uint256" },
      { internalType: "uint256", name: "b", type: "uint256" },
    ],
    name: "divide",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "pure",
    type: "function",
  },
];

let web3: any;
let contract: any;

export const initWeb3 = async () => {
  if ((window as any).ethereum) {
    web3 = new Web3((window as any).ethereum);
    await (window as any).ethereum.request({ method: "eth_requestAccounts" });
    contract = new web3.eth.Contract(contractABI, contractAddress);
  } else {
    alert("Please install MetaMask!");
  }
};

export const getMessage = async () => {
  return await contract.methods.message().call();
};

export const add = async (a: number, b: number) => {
  return await contract.methods.add(a, b).call();
};

export const subtract = async (a: number, b: number) => {
  return await contract.methods.subtract(a, b).call();
};

export const multiply = async (a: number, b: number) => {
  return await contract.methods.multiply(a, b).call();
};

export const divide = async (a: number, b: number) => {
  return await contract.methods.divide(a, b).call();
};

export const setMessage = async (newMessage: any) => {
  const accounts = await web3.eth.getAccounts();
  await contract.methods.setMessage(newMessage).send({ from: accounts[0] });
};
