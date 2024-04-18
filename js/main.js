const heroForm = document.querySelector(".hero__form");
const searchInput = document.querySelector(".hero__form-search-input");
const select = document.querySelector(".hero__form-select");
const heroList = document.querySelector(".hero__list");
const loader_container = document.querySelector(".loader__container");
const loader = document.createElement("div");
loader.className = "loader";
loader_container.append(loader);

const fetchData = async () => {
  let url = "";

  if (searchInput.value.trim() && select.value === "default") {
    const value = searchInput.value.toLowerCase();
    url = `https://restcountries.com/v3.1/name/${value}`;
  } else {
    url = "https://restcountries.com/v3.1/all";
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    createCard(data);
  } catch (error) {
    console.error(error.message);
  }
};

fetchData();

function createCard(array) {
  heroList.innerHTML = "";
  array.forEach((element) => {
    const flag = element.flags.svg;
    const alt = element.flags.alt !== undefined && element.flags.alt;
    const title = element.name.common;
    let population = String(element.population);

    if (population.length === 4) {
      population = `${population.slice(0, 1)},${population.slice(1)}`;
    } else if (population.length === 5) {
      population = `${population.slice(0, 2)},${population.slice(2)}`;
    } else if (population.length === 6) {
      population = `${population.slice(0, 3)},${population.slice(3)}`;
    } else if (population.length === 7) {
      population = `${population.slice(0, 1)},${population.slice(
        1,
        4
      )},${population.slice(4)}`;
    } else if (population.length === 8) {
      population = `${population.slice(0, 2)},${population.slice(
        2,
        5
      )},${population.slice(5)}`;
    } else if (population.length === 9) {
      population = `${population.slice(0, 3)},${population.slice(
        3,
        6
      )},${population.slice(6)}`;
    } else if (population.length === 10) {
      population = `${population.slice(0, 1)},${population.slice(
        1,
        4
      )},${population.slice(4, 7)},${population.slice(7)}`;
    }

    const region = element.region;
    const capital = element.capital !== undefined && element.capital[0];

    heroList.innerHTML += `<li class="hero__item">
    <div class="hero__item-img">
      <img src="${flag}" alt="${alt}" />
    </div>
    <h2 class="hero__item-title">${title}</h2>
    <p class="hero__item-text">
      Population: <span>${population}</span>
    </p>
    <p class="hero__item-text">Region: <span>${region}</span></p>
    <p class="hero__item-text">Capital: <span>${capital}</span></p>
  </li>`;
  });
}
