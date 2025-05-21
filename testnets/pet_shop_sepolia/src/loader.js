const loaderModal = new bootstrap.Modal(document.getElementById('loaderModal'));
let loaderInterval;

function showLoader(text = 'Processing transaction...') {
  const loaderText = document.getElementById('loaderText');
  loaderText.textContent = text;
  loaderModal.show();
  
  // Adding animated dots
  let dots = 0;
  loaderInterval = setInterval(() => {
    dots = (dots + 1) % 4;
    loaderText.textContent = text + '.'.repeat(dots) + ' '.repeat(3 - dots);
  }, 500);
}

function hideLoader() {
  clearInterval(loaderInterval);
  loaderModal.hide();
}

function updateLoaderText(text) {
  document.getElementById('loaderText').textContent = text;
}

// Adding loader to window for easy debugging
window.loader = { showLoader, hideLoader, updateLoaderText };