const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.tech-card');
const search = document.querySelector('#search');
const empty = document.querySelector('#empty');
let category = 'all';

function updateCatalogue() {
  const term = search.value.trim().toLowerCase();
  let visible = 0;
  cards.forEach((card) => {
    const categories = card.dataset.category.split(' ');
    const matchesCategory = category === 'all' || categories.includes(category);
    const matchesSearch = card.dataset.name.toLowerCase().includes(term);
    const show = matchesCategory && matchesSearch;
    card.hidden = !show;
    if (show) visible += 1;
  });
  empty.hidden = visible !== 0;
}

filters.forEach((filter) => filter.addEventListener('click', () => {
  category = filter.dataset.category;
  filters.forEach((item) => item.classList.toggle('active', item === filter));
  updateCatalogue();
}));

search.addEventListener('input', updateCatalogue);

let sortAscending = false;

document.querySelector('#sortButton').addEventListener('click', (event) => {
  const grid = document.querySelector('#techGrid');
  sortAscending = !sortAscending;
  [...cards]
    .sort((a, b) => a.dataset.name.localeCompare(b.dataset.name) * (sortAscending ? 1 : -1))
    .forEach((card) => grid.append(card));
  event.currentTarget.innerHTML = `Trier : ${sortAscending ? 'A-Z' : 'Z-A'} <b>v</b>`;
});
