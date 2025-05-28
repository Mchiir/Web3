let dogs = [];
const viewBtn = $(".view-btn").removeClass('disabled');

let listenersAdded = false;

async function initApp() {
  if (window.ethereum && !listenersAdded) {
    window.ethereum.on('chainChanged', (_chainId) => {
      toastr.info("Network changed. Reloading...");
      window.location.reload();
    });

    window.ethereum.on('accountsChanged', () => {
      toastr.info("Wallet account changed. Reloading...");
      window.location.reload();
    });

    listenersAdded = true;
  }

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
  const isCorrectNet = await checkCorrectNetwork();
  if (!isCorrectNet) return;

  const account = getCurrentAccount();
  const hasEnoughEth = await checkEthBalance(account);
  if (!hasEnoughEth) return;

  initContract();
  updateWalletUI(account);
  await updateAdoptionDisplay();
}

async function handleAdoption(e) {

  const button = $(e.target);
  const index = button.data('index');
  try {
    window.loader.showLoader("Adopting pet...")

    // Disabling all buttons during transaction
    // button.addClass('btn-disabled');
    // button.siblings().addClass('btn-disabled');
    button.prop('disabled', true);
    button.siblings('.btn').prop('disabled', true);

    await adoptPet(index);
    await updateAdoptionDisplay();

    // Showing success feedback
    button.closest('.card').addClass('border-success');
    setTimeout(() => button.closest('.card').removeClass('border-success'), 2000);

    toastr.success(`Successfully adopted ${dogs[index].name}!`);
  } catch (error) {
    console.error("Adoption error:", error);
    toastr.error(`Adoption failed. make sure you connected your wallet`);
    // alert(`Adoption failed.`, error);

    window.location.reload();
  } finally {
    window.loader.hideLoader();

    try {
      const adopters = await getAdopters();
      if (adopters[index] === '0x0000000000000000000000000000000000000000') {
        button.removeClass('btn-disabled');
        button.siblings().removeClass('btn-disabled');
      }
    } catch (error) {
      console.error("Error fetching adopters:", error);
      // alert("Please connect your wallet!")

      window.location.reload();
    }
  }
}

async function handleUnadoption(e) {
  const button = $(e.target);
  const index = button.data('index');

  try {
    window.loader.showLoader('Unadopting pet...');

    // Disabling all buttons during transaction
    button.addClass('btn-disabled');
    button.siblings().addClass('btn-disabled');

    await unadoptPet(index);
    await updateAdoptionDisplay();

    // showing success feedback
    button.closest('.card').addClass('border-primary');
    setTimeout(() => button.closest('.card').removeClass('border-primary'), 2000);

    toastr.success(`Successfully unadopted ${dogs[index].name}.`);
  } catch (error) {
    console.error("Unadoption error:", error);
    toastr.error(`Unadoption failed. make sure you connected your wallet`);
    // alert(`Unadoption failed.`, error);

    window.location.reload();
  } finally {
    window.loader.hideLoader();

    try {
      const adopters = await getAdopters();
      if (adopters[index] === '0x0000000000000000000000000000000000000000') {
        button.removeClass('btn-disabled');
        button.siblings().removeClass('btn-disabled');
      }
    } catch (error) {
      console.error("Error fetching adopters:", error);
      // alert("Please connect your wallet!")

      window.location.reload();
    }

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