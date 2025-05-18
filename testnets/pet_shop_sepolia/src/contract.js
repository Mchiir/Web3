import { updateLoaderText } from './loader.js';

let contract;

function initContract() {
  contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
}

async function adoptPet(petId) {
  const account = getCurrentAccount();
  try {
    updateLoaderText('Waiting for your confirmation...');
    const tx = await contract.methods.adopt(petId).send({ from: account });
    
    updateLoaderText('Transaction confirmed. Waiting for block...');
    await waitForTransactionCompletion(tx.transactionHash);
    
    return tx;
  } catch (error) {
    console.error("Adoption error:", error);
    updateLoaderText('Transaction failed. Please try again.');
    await new Promise(resolve => setTimeout(resolve, 2000));
    throw error;
  }
}

async function unadoptPet(petId) {
  const account = getCurrentAccount();
  updateLoaderText('Waiting for your confirmation...');
  const tx = await contract.methods.unadopt(petId).send({ from: account });
  
  updateLoaderText('Transaction confirmed. Waiting for block...');
  await waitForTransactionCompletion(tx.transactionHash);
  
  return tx;
}

async function getAdopters() {
  return await contract.methods.getAdopters().call();
}

async function waitForTransactionCompletion(txHash) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      clearInterval(interval);
      reject(new Error('Transaction timeout'));
    }, 60000); // 1 minute timeout
    
    const interval = setInterval(async () => {
      try {
        const receipt = await web3.eth.getTransactionReceipt(txHash);
        if (receipt && receipt.blockNumber) {
          clearInterval(interval);
          clearTimeout(timeout);
          resolve(receipt);
        }
      } catch (error) {
        clearInterval(interval);
        clearTimeout(timeout);
        reject(error);
      }
    }, 1000);
  });
}

export { initContract, adoptPet, unadoptPet, getAdopters, waitForTransactionCompletion }