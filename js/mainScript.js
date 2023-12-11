const myCarousel = document.getElementById("celias-Slider");
const carouselIndicators = myCarousel.querySelectorAll(".carousel-indicators button span");


let intervalID;

const carousel = new bootstrap.Carousel(myCarousel);


/*Scroll lässt die Slideshow erst bei Scrollen staren */
window.addEventListener("scroll", function start () { 
  fillCarouselIndicator(1);
  this.removeEventListener("scroll", start);
});



/* Slide Show anhalten wenn touch oder Mouseclick*/
myCarousel.addEventListener("touchstart", function() {
  clearInterval(intervalID);
  myCarousel.style.touchAction = "pan-y"
});

myCarousel.addEventListener("touchend", function() {
  fillCarouselIndicator();
});

myCarousel.addEventListener("mousedown", function() {
  clearInterval(intervalID);
});

myCarousel.addEventListener("mouseup", function() {
  fillCarouselIndicator();
});



/*Slideshow Balken die sich füllen */
myCarousel.addEventListener("slide.bs.carousel", function (e) {
  let index = e.to;
  fillCarouselIndicator(++index);
});

function fillCarouselIndicator(index) {
  let i = 0;
  for (const carouselIndicator of carouselIndicators) {
    carouselIndicator.style.width = 0;
  }
  clearInterval(intervalID);

    intervalID = setInterval(function () {
      i++;

      myCarousel.querySelector(".carousel-indicators .active span").style.width =
        i + "%";

      if (i >= 100) {
        // i = 0; -> just in case
        carousel.next();
      }
    }, 50); /*die Zahl bestimmt die Geschwindigkeit*/
}



/*Next und Prev Button*/
function prevSlide(){
  carousel.prev();
}

function nextSlide(){
  carousel.next();
}



/* Slideshow anhalten wenn Find out more-Button gedrückt wird */
function on(n) {
  document.getElementsByClassName("overlay")[n].style.display = "flex";
  clearInterval(intervalID);  /*hält die Slideshow an */
  document.querySelector("body").style.overflow = "hidden"; /*verhindert das Scrollen nach unten und oben*/
 }

function off(n) {
  document.getElementsByClassName("overlay")[n].style.display = "none";
   fillCarouselIndicator();
   document.querySelector("body").style.overflow = "revert";
}



/*Spielt die Videos automatisch ab, da autoplay und Co in HTML5 nicht immer funktioniert hat*/
function playVideo(){
  var video = document.querySelector("video");
  video.muted = true;
  video.loop = true;
  video.playsinline = true;
  video.play();
}
