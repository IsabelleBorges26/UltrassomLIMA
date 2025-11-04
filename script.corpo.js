const dates = document.querySelectorAll(".cd-h-timeline__date");
const events = document.querySelectorAll(".cd-h-timeline__event");
const fillingLine = document.querySelector(".cd-h-timeline__filling-line");
const prevBtn = document.querySelector(".cd-h-timeline__navigation--prev");
const nextBtn = document.querySelector(".cd-h-timeline__navigation--next");

let current = 0;

function updateTimeline() {

  const progress = (current / (dates.length - 1)) * 100;
  fillingLine.style.width = `${progress}%`;


  dates.forEach((date, i) => {
    date.classList.toggle("cd-h-timeline__date--selected", i === current);
    events[i].classList.toggle("cd-h-timeline__event--selected", i === current);
  });
}


prevBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (current > 0) current--;
  updateTimeline();
});

nextBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (current < dates.length - 1) current++;
  updateTimeline();
});

dates.forEach((date, i) => {
  date.addEventListener("click", (e) => {
    e.preventDefault();
    current = i;
    updateTimeline();
  });
});

updateTimeline();

const cards = document.querySelectorAll(".card");
const infoBox = document.getElementById("info-box");
const infoTitle = document.getElementById("info-title");
const infoText = document.getElementById("info-text");
const closeBtn = document.getElementById("close-btn");

const info = {
  diagnostico: "A ultrassonografia diagnóstica permite visualizar órgãos, tecidos e vasos em tempo real, ajudando a detectar cistos, tumores e anomalias estruturais.",
  obstetricia: "Essencial para monitorar a gravidez, verificar o desenvolvimento fetal, batimentos cardíacos e posição do bebê.",
  cardiologia: "O ecocardiograma usa ultrassom para avaliar o coração, detectando insuficiências, válvulas defeituosas e má circulação.",
  fisioterapia: "Utilizado desde os anos 40 para tratar dores, inflamações e lesões musculares, estimulando regeneração e circulação.",
  estetica: "O ultrassom é usado para reduzir gordura localizada, melhorar circulação e combater celulite com técnicas não invasivas.",
  odontologia: "Na odontologia, o ultrassom é empregado em limpezas, remoção de tártaro e procedimentos cirúrgicos com precisão."
};

cards.forEach(card => {
  card.addEventListener("click", () => {
    const key = card.getAttribute("data-info");
    infoTitle.textContent = card.querySelector("h3").textContent;
    infoText.textContent = info[key];
    infoBox.classList.remove("hidden");
  });
});

closeBtn.addEventListener("click", () => {
  infoBox.classList.add("hidden");
});
