// 1. Lógica del Contador (Cambia la fecha aquí abajo)
const fechaInicio = new Date("January 24, 2025 20:00:00").getTime();

function actualizarTimer() {
    const ahora = new Date().getTime();
    const diferencia = ahora - fechaInicio;

    const d = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const h = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diferencia % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = d;
    document.getElementById("hours").innerText = h;
    document.getElementById("minutes").innerText = m;
    document.getElementById("seconds").innerText = s;
}

setInterval(actualizarTimer, 1000);

// 2. Abrir sobre
const envelope = document.getElementById('envelope');
envelope.addEventListener('click', () => {
    envelope.classList.toggle('open');
});

// 3. Corazones flotantes en el fondo (Canvas)
const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let hearts = [];

class Heart {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 10;
        this.size = Math.random() * 15 + 5;
        this.speed = Math.random() * 2 + 1;
        this.opacity = 1;
    }
    draw() {
        ctx.font = `${this.size}px serif`;
        ctx.globalAlpha = this.opacity;
        ctx.fillText('❤️', this.x, this.y);
    }
    update() {
        this.y -= this.speed;
        this.opacity -= 0.005;
    }
}

function handleHearts() {
  if (Math.random() < 0.05) hearts.push(new Heart());
  for (let i = 0; i < hearts.length; i++) {
    hearts[i].update();
    hearts[i].draw();
    if (hearts[i].opacity <= 0) {
      hearts.splice(i, 1);
      i--;
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handleHearts();
  requestAnimationFrame(animate);
}

animate();