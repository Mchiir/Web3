function renderDogs(dogs) {
  const container = $('#dogs-container');
  container.empty();
  
  dogs.forEach((dog, index) => {
    container.append(createDogCard(dog, index));
  });
}

function createDogCard(dog, index) {
  return `
    <div class="col-md-6 col-lg-4">
      <div class="card h-100 shadow-sm">
        <img src="${dog.image}" class="card-img-top" alt="${dog.name}">
        <div class="card-body">
          <h5 class="card-title">${dog.name}</h5>
          <p class="card-text">Origin: ${dog.origin}</p>
          <p class="card-text fw-bold text-success">$${dog.cost}</p>
          <div class="d-flex justify-content-between">
            <button class="btn btn-success adopt-btn" data-index="${index}">Adopt</button>
            <button class="btn btn-danger unadopt-btn" data-index="${index}">Unadopt</button>
            <button class="btn btn-info view-btn" data-index="${index}" data-bs-toggle="modal" data-bs-target="#dogModal">View</button>
          </div>
          <div class="mt-2" id="adopter-${index}"></div>
        </div>
      </div>
    </div>
  `;
}

function showDogDetails(dog) {
  $('#dogModalLabel').text(dog.name);
  $('#dogModalBody').html(`
    <img src="${dog.image}" class="img-fluid mb-3" alt="${dog.name}">
    <p><strong>Breed:</strong> ${dog.name}</p>
    <p><strong>Origin:</strong> ${dog.origin}</p>
    <p><strong>Cost:</strong> $${dog.cost}</p>
    <p><strong>Description:</strong> ${dog.description}</p>
  `);
}

function updateWalletUI(account) {
  $('#walletInfo').removeClass('d-none');
  $('#walletInfo').text(`Connected: ${account.substring(0, 6)}...${account.substring(38)}`);
  $('#connectWallet').text('Wallet Connected')
                   .removeClass('btn-primary')
                   .addClass('btn-success');
}

function updateAdoptionStatus(adopters, dogs) {
  const currentAccount = getCurrentAccount().toLowerCase();
  
  dogs.forEach((dog, index) => {
    const adopterElement = $(`#adopter-${index}`);
    const adoptBtn = $(`.adopt-btn[data-index="${index}"]`);
    const unadoptBtn = $(`.unadopt-btn[data-index="${index}"]`);

    const isAdopted = adopters[index] !== '0x0000000000000000000000000000000000000000'

    if (isAdopted) {
      const shortAddress = `${adopters[index].substring(0, 6)}...${adopters[index].substring(38)}`;
      adopterElement.html(`
        <span class="badge bg-success">Adopted</span>
        <br>
        <small class="text-muted">Adopted by: ${shortAddress}</small>
      `);
      
      // Disabling adopt button if pet is adopted
      adoptBtn.prop('disabled', true);
      
      // Enabling unadopt only if current user is the adopter
      const isAdopter = adopters[index].toLowerCase() === currentAccount;
      unadoptBtn.prop('disabled', !isAdopter);
      
      // Visual feedback
      if (isAdopter) {
        adoptBtn.parent().find('.btn').addClass('disabled');
        unadoptBtn.removeClass('disabled');
      }
    } else {
      // adopterElement.empty();
      adopterElement.html(`<span class="badge bg-secondary">Available</span>`);
      adoptBtn.prop('disabled', false);
      unadoptBtn.prop('disabled', true);
      
      // Reseting visual state
      adoptBtn.parent().find('.btn').removeClass('disabled');
    }
  });
}

function generateDogs() {
  const names = ["Buddy", "Max", "Bella", "Charlie", "Lucy", "Rocky", "Daisy", "Luna", "Milo", "Sadie"];
  const origins = ["USA", "Germany", "UK", "Japan", "France", "Canada", "India", "Brazil", "Australia", "Italy"];
  return names.map((name, i) => ({
    name,
    origin: origins[i % origins.length],
    cost: (Math.random() * 100 + 50).toFixed(2),
    image: `https://placedog.net/500/400?id=${i + 1}`,
    description: `Meet ${name}, a lovable dog from ${origins[i % origins.length]}. Full of energy and joy.`
  }));
}

function disableAllBtns(){
    button.addClass('btn-disabled');
    button.siblings().addClass('btn-disabled');
    showLoader('Adopting pet...');
}

async function enableUnadoptedBtns(){
    const adopters = await getAdopters();
    if (adopters[index] === '0x0000000000000000000000000000000000000000') {
      button.removeClass('btn-disabled');
      button.siblings().removeClass('btn-disabled');
    }
}