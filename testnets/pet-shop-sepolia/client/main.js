let dogs = [];

async function initApp() {
  // Initialize data
  dogs = generateDogs();
  renderDogs(dogs);
  
  // Setup event listeners
  $('#connectWallet').click(handleWalletConnection);
  $('#dogs-container')
    .on('click', '.adopt-btn', handleAdoption)
    .on('click', '.unadopt-btn', handleUnadoption)
    .on('click', '.view-btn', handleViewDog);
  
  // Check existing connection
  if (await checkWalletConnection()) {
    await completeWalletConnection();
  }
}

async function handleWalletConnection() {
  if (await connectWallet()) {
    await completeWalletConnection();
  }
}

async function completeWalletConnection() {
  initContract();
  updateWalletUI(getCurrentAccount());
  await updateAdoptionDisplay();
}

async function handleAdoption(e) {
  const index = $(e.target).data('index');
  try {
    await adoptPet(index);
    await updateAdoptionDisplay();
    alert(`Successfully adopted ${dogs[index].name}!`);
  } catch (error) {
    console.error("Adoption error:", error);
    alert('Adoption failed. See console for details.');
  }
}

async function handleUnadoption(e) {
  const index = $(e.target).data('index');
  try {
    await unadoptPet(index);
    await updateAdoptionDisplay();
    alert(`Successfully unadopted ${dogs[index].name}.`);
  } catch (error) {
    console.error("Unadoption error:", error);
    alert('Unadoption failed. See console for details.');
  }
}

function handleViewDog(e) {
  const index = $(e.target).data('index');
  showDogDetails(dogs[index]);
}

async function updateAdoptionDisplay() {
  try {
    const adopters = await getAdopters();
    updateAdoptionStatus(adopters, dogs);
  } catch (error) {
    console.error("Error fetching adopters:", error);
  }
}

// Initialize the app when DOM is ready
$(document).ready(initApp);