function start() {
    const cryptoSelect = document.getElementById('crypto-select');
    cryptoSelect.onchange = handleCryptoSelection;
    populateDropdown();
}

function populateDropdown() {
    fetch('https://api.coincap.io/v2/assets')
        .then(response => response.json())
        .then(data => {
            const cryptoSelect = document.getElementById('crypto-select');
            data.data.forEach(crypto => {
                const option = document.createElement('option');
                option.value = crypto.id;
                option.textContent = crypto.name;
                cryptoSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching cryptocurrency list:', error));
}

function handleCryptoSelection() {
    const selectedCryptoId = document.getElementById('crypto-select').value;
    if (selectedCryptoId) fetchCryptoData(selectedCryptoId);
}

function fetchCryptoData(cryptoId) {
    fetch(`https://api.coincap.io/v2/assets/${cryptoId}`)
        .then(response => response.json())
        .then(data => displayCryptoInfo(data.data))
        .catch(error => console.error('Error fetching cryptocurrency data:', error));
}

function displayCryptoInfo(crypto) {
    document.getElementById('crypto-name').textContent = crypto.name;
    document.getElementById('crypto-symbol').textContent = crypto.symbol;
    document.getElementById('crypto-supply').textContent = Number(crypto.supply).toLocaleString();
    document.getElementById('crypto-price').textContent = Number(crypto.priceUsd).toFixed(2);
    document.getElementById('crypto-change').textContent = Number(crypto.changePercent24Hr).toFixed(2);
}

window.onload = start;
