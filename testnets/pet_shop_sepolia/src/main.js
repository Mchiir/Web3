let dogs = [];
const viewBtn = $(".view-btn").removeClass('disabled');

async function initApp() {
  // Initializing data
  dogs = generateDogs();
  renderDogs(dogs);
  
  // event listeners
  $('#connectWallet').click(handleWalletConnection);
  $('#dogs-container')
    .on('click', '.adopt-btn', handleAdoption)
    .on('click', '.unadopt-btn', handleUnadoption)
    .on('click', '.view-btn', handleViewDog);
  
  // existing connection checkup
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
  const button = $(e.target);
  const index = button.data('index');
  
  try {
    
    await adoptPet(index);
    await updateAdoptionDisplay();
    window.loader.showLoader("Adopting pet...")
    
    // Showing success feedback
    button.closest('.card').addClass('border-success');
    setTimeout(() => button.closest('.card').removeClass('border-success'), 2000);
    
    alert(`Successfully adopted ${dogs[index].name}!`);
  } catch (error) {
    console.error("Adoption error:", error);
    alert(`Adoption failed. make sure you connected your wallet`);
    window.location.reload() // reloading to update ui
  } finally {
    window.loader.hideLoader();
    // re-enabling button if still applicable
    const adopters = await getAdopters();
    if (adopters[index] === '0x0000000000000000000000000000000000000000') {
      button.removeClass('btn-disabled');
      button.siblings().removeClass('btn-disabled');
    }

    window.location.reload() // reloading to update ui
  }
}

async function handleUnadoption(e) {
  const button = $(e.target);
  const index = button.data('index');
  
  try {
    // Disabling all buttons during transaction
    disableAllBtns()
    window.loader.showLoader('Unadopting pet...');
    
    await unadoptPet(index);
    await updateAdoptionDisplay();
    
    // showing success feedback
    button.closest('.card').addClass('border-primary');
    setTimeout(() => button.closest('.card').removeClass('border-primary'), 2000);
    
    alert(`Successfully unadopted ${dogs[index].name}.`);
  } catch (error) {
    console.error("Unadoption error:", error);
    alert(`Unadoption failed. make sure you connected your wallet`);
    window.location.reload()
  } finally {
    window.loader.hideLoader();
    // re-enabling a button if still applicable
    enableUnadoptedBtns()

    window.location.reload() // reloading to update ui
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

// Initializing the app when the DOM is ready
$(document).ready(initApp);