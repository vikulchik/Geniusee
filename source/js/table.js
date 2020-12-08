(function() {
  const REQUEST_URL = 'https://api.coincap.io/v2/assets/?limit=';
  const AMOUNT_PER_PAGE = 10;

  const container = document.querySelector('.crypto-table__content');

  function toHTML(row) {
    return `
      <tr class="crypto-table__row">
        <td class="crypto-table__data">${row.rank}</td>
        <td class="crypto-table__data">${row.id}</td>
        <td class="crypto-table__data">${row.name}</td>
        <td class="crypto-table__data">${row.symbol}</td>
        <td class="crypto-table__data">${Number(row.priceUsd).toFixed(2)}</td>
      </tr>
    `;
  }

  function render(data) {
    let html = '';

    data.forEach((row) => html += toHTML(row));
    container.innerHTML += html;
  }

  fetch(`${REQUEST_URL}${AMOUNT_PER_PAGE}`)
    .then((response) => response.json())
    .then((json) => render(json.data));
}());
