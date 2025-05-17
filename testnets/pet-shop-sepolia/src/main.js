document.addEventListener('DOMContentLoaded', () => {
  const dogs = generateDogs();
  const container = document.getElementById('dogs-container');

  dogs.forEach((dog, index) => {
    const col = document.createElement('div');
    col.className = 'col-md-6 col-lg-4';

    col.innerHTML = `
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
        </div>
      </div>
    `;
    container.appendChild(col);
  });

  // Event delegation
  container.addEventListener('click', (e) => {
    const index = e.target.dataset.index;
    if (e.target.classList.contains('adopt-btn')) {
      alert(`Adopted ${dogs[index].name}!`);
    } else if (e.target.classList.contains('unadopt-btn')) {
      alert(`Unadopted ${dogs[index].name}.`);
    } else if (e.target.classList.contains('view-btn')) {
      const dog = dogs[index];
      document.getElementById('dogModalLabel').textContent = dog.name;
      document.getElementById('dogModalBody').innerHTML = `
        <img src="${dog.image}" class="img-fluid mb-3" alt="${dog.name}">
        <p><strong>Breed:</strong> ${dog.name}</p>
        <p><strong>Origin:</strong> ${dog.origin}</p>
        <p><strong>Cost:</strong> $${dog.cost}</p>
        <p><strong>Description:</strong> ${dog.description}</p>
      `;
    }
  });
});

// Dummy data
function generateDogs() {
  const names = ["Buddy", "Max", "Bella", "Charlie", "Lucy", "Rocky", "Daisy", "Luna", "Milo", "Sadie", "Bailey", "Coco", "Bear", "Duke", "Lily", "Toby", "Roxy", "Oscar", "Maggie", "Zeus"];
  const origins = ["USA", "Germany", "UK", "Japan", "France", "Canada", "India", "Brazil", "Australia", "Italy"];
  return names.map((name, i) => ({
    name,
    origin: origins[i % origins.length],
    cost: (Math.random() * 100 + 50).toFixed(2),
    image: `https://placedog.net/500/400?id=${i + 1}`,
    description: `Meet ${name}, a lovable dog from ${origins[i % origins.length]}. Full of energy and joy.`
  }));
}