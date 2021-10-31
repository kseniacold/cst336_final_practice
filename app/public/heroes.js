/***
 *
 * HELPERS
 */
const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

// Basic pipe for functional programming
const pipe =
  (...fns) =>
  (x) =>
    fns.reduce((acc, curr) => curr(acc), x);

/***
 *
 * SELECTORS & DOM HELPERS
 */
const selectors = {
  app: "[data-app]",
  loader: "[data-loader]",
  heroCard: "[data-hero-card]",
  form: "[data-form]",
  select: "[data-select]",
  results: "[data-results]",
};

const createElementFromHTMLStr = (html) => {
  const template = document.createElement("template");
  template.innerHTML = html.trim();
  return template.content.firstChild;
};

/***
 *
 * RENDERING
 */
const makeBgColorClass = (valid) => (!valid ? "bg-cl--red" : "bg-cl--green");
const makeColorClass = (valid) => (!valid ? "txt-cl--red" : "txt-cl--green");

const Hero = (image) => {
  return createElementFromHTMLStr(
    `<article class="hero-card__card">
        <img src="images/superheroes/${image}.png" alt="Hero Image"/>
    </article>`
  );
};

const loader = createElementFromHTMLStr(
  "<img class='loader-img' src='images/img/loading.gif' alt='Page is Loading' />"
);

const optionStr = ({ value, label }) =>
  `<option value="${value}">${label}</option>`;

const Options = (heroes) => {
  const $options = heroes.map(({ id, fullName }) =>
    createElementFromHTMLStr(`${optionStr({ value: id, label: fullName })}`)
  );

  $options.unshift(
    createElementFromHTMLStr("<option value>-- Select Hero's Name --</option>")
  );
  return $options;
};

const Message = (text, isError) =>
  createElementFromHTMLStr(
    `<p class="${makeBgColorClass(isError)}">${text}</p>`
  );

const Result = (isValid, numCorrect, numWrong) =>
  createElementFromHTMLStr(
    `<div class="quiz-result">
    <p class="quiz-result__text txt--bold ${makeColorClass(isValid)}" >${
      isValid ? "Your Answer is Correct!" : "Sorry, you missed it. Try again!"
    }</p>
    <div class="quiz-result__stats">
     <p class="quiz_result__stat">
      This question was answered correctly <b class="${makeColorClass(
        true
      )}">${numCorrect}</b> times.
     </p> 
     <p class="quiz-result__stat">
      This question was answered wrong <b class="${makeColorClass(
        false
      )}">${numWrong}</b> times.
     </p> 
    </div>
  </div>`
  );

/***
 *
 * DATA
 */
class DataStore {
  constructor() {
    this.data = new Map();
    this.data.set("records", new Map());
    this.callbacks = [];
  }

  set(key, data) {
    this.data.set(key, data);
    this.notify(key, data);
  }

  addRecord(superheroId, isValid, numCorrect, numWrong) {
    const recordsMap = this.data.get("records");
    recordsMap.set(superheroId, {
      isValid,
      numCorrect,
      numWrong,
    });

    this.notify("records", {
      superheroId,
      isValid,
      numCorrect,
      numWrong,
    });
  }

  get(key) {
    return this.data.get(key);
  }

  subscribe(callbackFn) {
    this.callbacks.push(callbackFn);
  }

  notify(key, data) {
    for (const cb of this.callbacks) {
      cb(key, data);
    }
  }
}

/**
 * MAPPINGS
 * MASSAGE DATA
 */
const mapFullNames = (heroes) =>
  heroes.map((hero) => ({
    ...hero,
    fullName: `${hero.firstName} ${hero.lastName}`,
  }));

const sortHeroes = (heroes) =>
  heroes.sort((hero1, hero2) => hero1.fullName.localeCompare(hero2.fullName));

const mapHeroes = (heroes) => pipe(mapFullNames, sortHeroes)(heroes);

/**
 * API REQUESTS
 */
const fetchHeroes = async () => {
  return await (await fetch("/api/heroes")).json();
};

const sendResults = async (isValid, superheroId) =>
  await fetch("/api/records", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      value: isValid ? 1 : 0,
      superheroId,
    }),
  });

const retrieveStats = async (value, superheroId) =>
  await (
    await fetch(`/api/records?value=${value}&superheroId=${superheroId}`)
  ).json();

/**
 *
 * HANDLE EVENTS & DATA CHANGE
 */
const handleFormSubmit = ($select, $form, dataStore) => async (event) => {
  event.preventDefault();
  if (!$select.validity.valid && $select.validity.valueMissing) {
    dataStore.set("error", "Please select hero's name");
  } else {
    dataStore.set("loading", { prop: "results", isLoading: true });
    const formData = new FormData($form);
    const answeredId = parseInt(formData.get("heroSelect"));
    const superheroId = dataStore.get("image");
    const isValid = answeredId === superheroId;

    await sendResults(isValid, superheroId);
    const numCorrect = await retrieveStats(1, superheroId);
    const numWrong = await retrieveStats(0, superheroId);
    // TODO handle errors
    dataStore.set("loading", { prop: "results", isLoading: false });

    dataStore.addRecord(superheroId, isValid, numCorrect, numWrong);
  }
};

const updateError = ($results, data) => {
  $results.replaceChildren("");
  if (data) {
    $results.appendChild(Message("Please select hero's name", true));
  }
};

const updateLoading = ($results, $heroCard, data) => {
  const { prop, isLoading } = data;
  if (prop === "results") {
    $results.replaceChildren("");
    if (isLoading) {
      $results.appendChild(loader);
    }
  } else if (prop === "heroes") {
    debugger;
    $heroCard.replaceChildren("");
    if (isLoading) {
      $heroCard.appendChild(loader);
    }
  }
};

const updateHeroes = ($select, $heroCard, data, dataStore) => {
  if (Array.isArray(data)) {
    $heroCard.replaceChildren("");
    // place options into select
    $select.replaceChildren(...Options(data));
    // place hero
    const randHero = data[getRandomInt(data.length)];
    dataStore.set("image", randHero.id);

    const $hero = Hero(randHero.image);
    $heroCard.appendChild($hero);
  }
};

const updateResults = ($results, data) => {
  const { isValid, numCorrect, numWrong } = data;
  $results.replaceChildren("");
  if (data) {
    $results.appendChild(Result(isValid, numCorrect, numWrong));
  }
};

const onDataChange =
  ($select, $results, $heroCard, dataStore) => (key, data) => {
    switch (key) {
      case "error":
        updateError($results, data);
        break;
      case "heroes":
        updateHeroes($select, $heroCard, data, dataStore);
        break;
      case "loading":
        updateLoading($results, $heroCard, data);
        break;
      case "records":
        updateResults($results, data);
        break;
      default:
        break;
    }
  };

const app = async () => {
  // elements we need
  const $select = document.querySelector(selectors.select);
  const $heroCard = document.querySelector(selectors.heroCard);
  const $form = document.querySelector(selectors.form);
  const $results = document.querySelector(selectors.results);

  const dataStore = new DataStore();
  dataStore.subscribe(onDataChange($select, $results, $heroCard, dataStore));

  // add event listener
  $form.addEventListener("submit", handleFormSubmit($select, $form, dataStore));

  dataStore.set("loading", { prop: "heroes", isLoading: true });
  const heroesRaw = await fetchHeroes(dataStore);
  dataStore.set("loading", { prop: "heroes", isLoading: false });

  if (!Array.isArray(heroesRaw)) return;
  const heroes = mapHeroes(heroesRaw);
  dataStore.set("heroes", heroes);
};

(function () {
  app();
})();
