// Texte animé
const text = "Solutions numériques innovantes pour l’Afrique.";
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
  "url(photo/Phot1.jpg)",
  "url(photo/Phot2.png)",
  "url(photo/Phot3.png)"
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
// Lancement au chargement
window.addEventListener("load", () => {
  setTimeout(typeLetter, 500); // texte animé
  startSlideshow();           // diaporama avec points
});
