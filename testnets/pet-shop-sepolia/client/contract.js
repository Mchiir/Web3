let contract;

function initContract() {
  contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
}

async function adoptPet(petId) {
  const account = getCurrentAccount();
  return await contract.methods.adopt(petId).send({ from: account });
}

async function unadoptPet(petId) {
  const account = getCurrentAccount();
  return await contract.methods.unadopt(petId).send({ from: account });
}

async function getAdopters() {
  return await contract.methods.getAdopters().call();
}