// On récupère tous les indicateurs du caroussel
let indicators = document.querySelectorAll(".myIndicator");

// On récupère la flèche précédente et la flèche suivante
let prevArrow = document.querySelector(".myCarousel-control-prev");
let nextArrow = document.querySelector(".myCarousel-control-next");

// On récupère les icones dédiées au fullscreen
let fullscreenIcon = document.querySelector(".fullscreen-icon");
let fullscreenExitIcon = document.querySelector(".fullscreenExit-icon");

// On récupère les slides du caroussel
let slides = document.querySelectorAll(".mySlide");

// Fonctions permettant de changer l'affichage des éléments
function displayNone(elem) {
  elem.classList.remove("displayFlex");
  elem.classList.remove("displayBlock");
  elem.classList.add("displayNone");
}

function displayBlock(elem) {
  elem.classList.remove("displayNone");
  elem.classList.add("displayBlock");
}

function displayFlex(elem) {
  elem.classList.remove("displayNone");
  elem.classList.add("displayFlex");
}

/*******************************   FullScreen  *******************************/

function showFullscreenIcon() {
  // On change l'icon: fullscreenExitIcon -> fullscreenIcon
  displayNone(fullscreenExitIcon);
  displayBlock(fullscreenIcon);
}

function showFullscreenExitIcon() {
  // On change l'icon: fullscreenIcon -> fullscreenExitIcon
  displayNone(fullscreenIcon);
  displayBlock(fullscreenExitIcon);
}

function affichageFullscreen() {
  slides.forEach(function (slide) {
    slide.classList.remove("widthNormal");
    slide.classList.add("widthFullscreen");
  });
}

function affichageNormal() {
  slides.forEach(function (slide) {
    slide.classList.remove("widthFullscreen");
    slide.classList.add("widthNormal");
  });
}

// Fonction pour passer en fullscreen
function fullscreen(event) {
  showFullscreenExitIcon();
  affichageFullscreen();
  // On récupère l'élément que nous souhaitons faire passer en fullscreen
  let elem = document.querySelector(".carousel-inner");
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Safari */
    elem.webkitRequestFullscreen();
  }
}

// Fonction pour quitter le fullscreen
function exitFullscreen(event) {
  showFullscreenIcon();
  affichageNormal();
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    /* Safari */
    document.webkitExitFullscreen();
  }
}

// Evénement quand on clique sur les icones dédiées au fullscreen
fullscreenIcon.addEventListener("click", fullscreen);
fullscreenExitIcon.addEventListener("click", exitFullscreen);

// Evénement pour changer l'icone quand on quitte le mode fullscreen avec la touche ESCAPE
document.addEventListener("fullscreenchange", function (e) {
  // null si on est en mode normal
  if (document.fullscreenElement == null) {
    showFullscreenIcon();
    affichageNormal();
  } else {
    showFullscreenExitIcon();
    affichageFullscreen();
  }
  // Pour safari : webkitFullscreenElement
});

/*******************************   Next / Prev  *******************************/

// Evénement pour détecter les touches ArrowRight et ArrowLeft
document.addEventListener("keyup", function (e) {
  let active = document.querySelector(".active");
  let numActive = active.getAttribute("data-slide-to");
  if (e.key == "ArrowRight" || e.code === "ArrowRight") {
    if (numActive != indicators.length - 1) {
      nextArrow.click();
    }
  }
  if (e.key == "ArrowLeft" || e.code === "ArrowLeft") {
    if (numActive != 0) {
      prevArrow.click();
    }
  }
});

// Fonction qui permet d'afficher les 3 indicateurs désirés quand on clique sur les flèches prevArrow et nextArrow
function onArrowClick(e) {
  hideIndicators();
  // L'indicateur actif est l'élément qui a la classe active
  let active = document.querySelector(".myIndicator.active");
  changeIndicators(active);
}

// Evénement quand on clique sur les flèches
prevArrow.addEventListener("click", onArrowClick);
nextArrow.addEventListener("click", onArrowClick);

/*******************************   Indicators  *******************************/

// Fonction qui permet de cacher tous les indicateurs du caroussel
function hideIndicators() {
  indicators.forEach(function (indicator) {
    displayNone(indicator);
  });
}

// Fonction qui permet de récupérer un indicateur à partir de son numéro data-slide-to
function getSlide(num) {
  return document.querySelector('[data-slide-to="' + num + '"]');
}

// Fonction qui permet d'afficher les 3 indicateurs désirés : prev, active, next
function changeIndicators(indicator) {
  displayFlex(prevArrow);
  displayFlex(nextArrow);
  displayBlock(indicator);
  // On récupère le numéro de l'indicateur actif
  let numberActive = indicator.getAttribute("data-slide-to");

  let prev = getSlide(parseInt(numberActive) - 1);
  let next = getSlide(parseInt(numberActive) + 1);

  // Si c'est le premier élément
  if (numberActive == 0) {
    // On affiche le deuxième élément suivant et on cache la flèche prevArrow
    prev = getSlide(parseInt(numberActive) + 2);
    displayNone(prevArrow);
  }
  // Si c'est le dernier élément
  if (numberActive == indicators.length - 1) {
    // On affiche le deuxième élément précédent et on cache la flèche nextArrow
    next = getSlide(parseInt(numberActive) - 2);
    displayNone(nextArrow);
  }

  displayBlock(prev);
  displayBlock(next);
}

// Pour chaque indicateur, on crée un événement onclick
indicators.forEach(function (indicator) {
  indicator.addEventListener("click", function (e) {
    // On cache tous les indicateurs
    hideIndicators();
    // On récupère l'indicateur sur lequel nous avons cliqué, qui est donc l'indicateur actif
    let indicator = e.target.parentNode;
    // On affiche les 3 indicateurs désirés
    changeIndicators(indicator);
  });
});
