// Texte animé
const text = "La solution numérique innovante pour l’Afrique.";
const typedText = document.getElementById("typed-text");
let index = 0;

function typeLetter() {
  if (index < text.length) {
    typedText.textContent += text.charAt(index);
    index++;
    setTimeout(typeLetter, 100); // vitesse de frappe
  } else {
    setTimeout(eraseText, 2000); // délai avant effacement
  }
}

function eraseText() {
  if (index > 0) {
    typedText.textContent = text.substring(0, index - 1);
    index--;
    setTimeout(eraseText, 100); // vitesse d'effacement
  } else {
    setTimeout(typeLetter, 500); // redémarrage
  }
}
// Diaporama avec points
const backgrounds = [
  "url(photo/fonds/Phot1.webp)",
  "url(photo/fonds/Phot2.webp)",
  "url(photo/fonds/Phot3.webp)"
];

const diapo = document.querySelector(".Diapo");
const dots = document.querySelectorAll(".dot");

let bgIndex = 0;
let intervalId = null;

// Affiche la slide et met à jour les points
function showSlide(index) {
  diapo.style.backgroundImage = backgrounds[index];
  dots.forEach(dot => dot.classList.remove("active"));
  dots[index].classList.add("active");
}

// Change de slide automatiquement
function startSlideshow() {
  showSlide(bgIndex);
  intervalId = setInterval(() => {
    bgIndex = (bgIndex + 1) % backgrounds.length;
    showSlide(bgIndex);
  }, 5000);// Toutes les 5 secondes
}
// Menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const menuList = document.querySelector('.Liste1');

menuToggle.addEventListener('click', () => {
  menuList.classList.toggle('active');
});

// Close menu when clicking on a link
menuList.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    menuList.classList.remove('active');
  }
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!menuList.contains(e.target) && !menuToggle.contains(e.target)) {
    menuList.classList.remove('active');
  }
});

// Lancement au chargement
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(typeLetter, 500); // texte animé
  backgrounds.forEach(src => {
  const img = new Image();
  img.src = src.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
});
  startSlideshow();           // diaporama avec points
});
