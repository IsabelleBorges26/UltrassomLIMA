const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 500;

// Permitir som no primeiro clique
document.addEventListener("click", () => {
  somUltrassom.play().then(() => {
    somUltrassom.pause();
    somUltrassom.currentTime = 0;
  }).catch(() => {});
}, { once: true });


// Carrega a imagem do morcego
const morcegoImg = new Image();
morcegoImg.src = "morcego.png";

// Carrega o som
const somUltrassom = new Audio("somMorcego.mp3");
somUltrassom.volume = 0.5;

let morcego = { x: canvas.width / 3, y: canvas.height / 5, tamanho: 100 };
let destino = { x: morcego.x, y: morcego.y };
let ondas = [];
let movendo = false;

morcegoImg.onload = () => loop();

// Clique define o novo destino
canvas.addEventListener("click", (e) => {
    const rect = canvas.getBoundingClientRect();
    destino.x = e.clientX - rect.left;
    destino.y = e.clientY - rect.top;
    movendo = true;
});

// Move o morcego até o destino
function moverMorcego() {
    const dx = destino.x - morcego.x;
    const dy = destino.y - morcego.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > 2) {
        morcego.x += dx * 0.05;
        morcego.y += dy * 0.05;

        // Emite ondas e som enquanto se move
        if (Math.random() < 0.1) { // controla a frequência das ondas
            ondas.push({ x: morcego.x, y: morcego.y, raio: 0 });
            somUltrassom.currentTime = 0;
            somUltrassom.play();
        }
    } else {
        movendo = false; // Parou de andar
    }
}

// Desenha as ondas sonoras
function desenharOndas() {
    ondas.forEach((onda, i) => {
        onda.raio += 5;
        ctx.beginPath();
        ctx.arc(onda.x, onda.y, onda.raio, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,255,255,${1 - onda.raio / 400})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        if (onda.raio > 400) ondas.splice(i, 1);
    });
}

// Desenha o morcego
function desenharMorcego() {
    ctx.drawImage(
        morcegoImg,
        morcego.x - morcego.tamanho / 2,
        morcego.y - morcego.tamanho / 2,
        morcego.tamanho,
        morcego.tamanho
    );
}

// Loop de animação
function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    desenharOndas();
    moverMorcego();
    desenharMorcego();
    requestAnimationFrame(loop);
}
