"use strict";

// Sticky navigation when scrolling

window.onscroll = function (){
  stickyNav();
}

var nav = document.getElementById("header");
var sticky = nav.offsetTop;

function stickyNav() {
  if (window.scrollY > sticky) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
}


/*
* Mobile navbar toggle
*/ 

const navbar =document.querySelector("[data-navbar]");
const navToggler = document.querySelector("[data-nav-toggler]");

navToggler.addEventListener("click", function(){
  navbar.classList.toggle("active");
  this.classList.toggle("active");
})



document.querySelectorAll('.read-more').forEach(function(readMoreLink){
  readMoreLink.addEventListener('click', function (e) {
    e.preventDefault(); // Prevent the default link behavior
    
    // Get the corresponding more-text span for this read-more link
    var moreText = this.previousElementSibling.querySelector('.more-text');
    if(moreText.style.display === 'none' || moreText.style.display === ''){
      moreText.style.display = 'inline';
      this.textContent = 'Read Less'; // Change link text to to 'Read Less'
    }else{
      moreText.style.display = 'none';
      this.textContent = 'Read More'; // Change text back to "Read More"
    }
  });
});

// Carousel
let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const dots = document.querySelectorAll('.dot'); // Get all the dots


// Function to show the slide
function showSlide(index) {
  const carousel = document.querySelector('.carousel');
  const offset = -index * 100;
  carousel.style.transform = `translateX(${offset}%)`;
  
  // Update dots to reflect current slide
  updateDots(index);
}

// Function to go to the next slide
function nextSlide() {
  currentIndex = (currentIndex + 1) % totalSlides;
  showSlide(currentIndex);
}

// Function to go to the previous slide
function prevSlide() {
  currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  showSlide(currentIndex);
}

// Function to go to a specific slide when a dot is clicked
function currentSlide(index) {
  currentIndex = index;
  showSlide(currentIndex);
}

// Function to update the dots
function updateDots(index) {
  dots.forEach(dot => dot.classList.remove('active')); // Remove active class from all dots
  dots[index].classList.add('active'); // Add active class to the current dot
}

// Add click event listeners to dots
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentSlide(index);
  });
});

// Auto-slide functionality
const autoSlideInterval = 5000; // 3000 ms = 3 seconds
let slideTimer = setInterval(nextSlide, autoSlideInterval);

// Optional: Pause auto-slide when hovering over carousel
const carouselContainer = document.querySelector('.carousel-container');
carouselContainer.addEventListener('mouseenter', () => {
  clearInterval(slideTimer);
});

// Resume auto-slide when mouse leaves the carousel
carouselContainer.addEventListener('mouseleave', () => {
  slideTimer = setInterval(nextSlide, autoSlideInterval);
});





