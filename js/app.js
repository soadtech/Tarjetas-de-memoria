const cardsContainer = document.getElementById("contenedor-tarjetas");
const prevBtn = document.getElementById("anterior");
const nextBtn = document.getElementById("siguiente");
const currentEl = document.getElementById("actual");
const showBtn = document.getElementById("show");
const hideBtn = document.getElementById("ocultar");
const questionEl = document.getElementById("pregunta");
const answerEl = document.getElementById("respuesta");
const addCardBtn = document.getElementById("agregar-tarjeta");
const clearBtn = document.getElementById("limpiar");
const addContainer = document.getElementById("agregar-contenedor");

// Realizar un seguimiento de la tarjeta actual
let currentActiveCard = 0;

// Almacenar tarjetas DOM
const cardsEl = [];

// Almacenar datos de la tarjeta
const cardsData = getCardsData();

// Crea todas las cartas
function createCards() {
  cardsData.forEach((data, index) => createCard(data, index));
}

// Crea una sola tarjeta en DOM
function createCard(data, index) {
  const card = document.createElement("div");
  card.classList.add("tarjeta");

  if (index === 0) {
    card.classList.add("active");
  }

  card.innerHTML = `
  <div class="tarjeta-interior">
  <div class="tarjeta-interna-frente">
    <p>
      ${data.question}
    </p>
  </div>
  <div class="tarjeta-interna-atras">
    <p>
      ${data.answer}
    </p>
  </div>
</div>
  `;

  card.addEventListener("click", () => card.classList.toggle("show-answer"));

  // Add to DOM cards
  cardsEl.push(card);

  cardsContainer.appendChild(card);

  updateCurrentText();
}

// Mostrar número de tarjetas
function updateCurrentText() {
  currentEl.innerText = `${currentActiveCard + 1}/${cardsEl.length}`;
}

// Obtenga tarjetas del almacenamiento local
function getCardsData() {
  const cards = JSON.parse(localStorage.getItem("cards"));
  return cards === null ? [] : cards;
}

// Agregar tarjeta al almacenamiento local
function setCardsData(cards) {
  localStorage.setItem("cards", JSON.stringify(cards));
  window.location.reload();
}

createCards();

// Boton siguiente
nextBtn.addEventListener("click", () => {
  cardsEl[currentActiveCard].className = "tarjeta left";

  currentActiveCard = currentActiveCard + 1;

  if (currentActiveCard > cardsEl.length - 1) {
    currentActiveCard = cardsEl.length - 1;
  }

  cardsEl[currentActiveCard].className = "tarjeta active";

  updateCurrentText();
});

// Boton anterior
prevBtn.addEventListener("click", () => {
  cardsEl[currentActiveCard].className = "tarjeta right";

  currentActiveCard = currentActiveCard - 1;

  if (currentActiveCard < 0) {
    currentActiveCard = 0;
  }

  cardsEl[currentActiveCard].className = "tarjeta active";

  updateCurrentText();
});

// mostrar add contenedor
showBtn.addEventListener("click", () => addContainer.classList.add("show"));
// ocultar add contenedor
hideBtn.addEventListener("click", () => addContainer.classList.remove("show"));

// Agregar nueva tarjeta
addCardBtn.addEventListener("click", () => {
  const question = questionEl.value;
  const answer = answerEl.value;

  if (question.trim() && answer.trim()) {
    const newCard = { question, answer };

    createCard(newCard);

    questionEl.value = "";
    answerEl.value = "";

    addContainer.classList.remove("show");

    cardsData.push(newCard);
    setCardsData(cardsData);
  }
});

// Botón de borrar tarjetas
clearBtn.addEventListener("click", () => {
  localStorage.clear();
  cardsContainer.innerHTML = "";
  window.location.reload();
});
