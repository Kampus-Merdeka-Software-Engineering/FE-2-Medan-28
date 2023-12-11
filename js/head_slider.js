let currentIndex = 0;
let slideWidth = '1748';
const totalSlides = 3;

const carouselWrapper = document.querySelector('.cWrapper');
const carousel = document.querySelector(".inews_carousel");

function updateCarousel() {
  slideWidth = document.querySelector('.inews_carousel').clientWidth;
  carouselWrapper.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % totalSlides;
  updateCarousel();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  updateCarousel();
}