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
  } else if (!searchInput.value.trim() && select.value === "Africa") {
    url = `https://restcountries.com/v3.1/region/${select.value}`;
  } else if (!searchInput.value.trim() && select.value === "America") {
    url = `https://restcountries.com/v3.1/region/${select.value}`;
  } else if (!searchInput.value.trim() && select.value === "Asia") {
    url = `https://restcountries.com/v3.1/region/${select.value}`;
  } else if (!searchInput.value.trim() && select.value === "Europe") {
    url = `https://restcountries.com/v3.1/region/${select.value}`;
  } else if (!searchInput.value.trim() && select.value === "Oceania") {
    url = `https://restcountries.com/v3.1/region/${select.value}`;
  } else if (
    (!searchInput.value.trim() && select.value === "default") ||
    (!select.value === "Africa" &&
      !select.value === "America" &&
      !select.value === "Asia" &&
      !select.value === "Europe" &&
      !select.value === "Oceania")
  ) {
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

heroForm.addEventListener("submit", (e) => {
  e.preventDefault();
  select.value === "default" && fetchData();
  searchInput.value = "";
});

select.onchange = () => {
  if (select.value === "default") {
    searchInput.placeholder = "Search for a country…";
    fetchData();
  } else {
    searchInput.placeholder = "Search doesn't work…";
    fetchData();
  }
};

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

    const heroItem = document.createElement("li");
    heroItem.classList.add("hero__item");
    let attr = document.createAttribute("data-region");
    attr.value = region;
    heroItem.setAttributeNode(attr);

    const heroItemImgDiv = document.createElement("div");
    heroItemImgDiv.classList.add("hero__item-img");
    heroItem.appendChild(heroItemImgDiv);

    const heroItemImg = document.createElement("img");
    heroItemImg.src = flag;
    heroItemImg.alt = alt;
    heroItemImgDiv.appendChild(heroItemImg);

    const heroItemTitle = document.createElement("h2");
    heroItemTitle.classList.add("hero__item-title");
    heroItemTitle.innerText = title;
    heroItem.appendChild(heroItemTitle);

    const heroItemPopulation = document.createElement("p");
    heroItemPopulation.classList.add("hero__item-text");
    heroItemPopulation.innerText = "Population: ";

    const populationSpan = document.createElement("span");
    populationSpan.textContent = population;
    heroItemPopulation.appendChild(populationSpan);
    heroItem.appendChild(heroItemPopulation);

    const heroItemRegion = document.createElement("p");
    heroItemRegion.classList.add("hero__item-text");
    heroItemRegion.innerText = "Region: ";

    const regionSpan = document.createElement("span");
    regionSpan.textContent = region;
    heroItemRegion.appendChild(regionSpan);
    heroItem.appendChild(heroItemRegion);

    const heroItemCapital = document.createElement("p");
    heroItemCapital.classList.add("hero__item-text");
    heroItemCapital.innerText = "Capital: ";

    const capitalSpan = document.createElement("span");
    capitalSpan.textContent = capital;
    heroItemCapital.appendChild(capitalSpan);
    heroItem.appendChild(heroItemCapital);

    heroList.append(heroItem);
  });
}
