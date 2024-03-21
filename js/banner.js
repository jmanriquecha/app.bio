let currentSlide = 0;
const slides = document.querySelectorAll('.banner-container img');
const prev = document.getElementById('prev');
const next = document.getElementById('next');

next.addEventListener('click', function () {
    nextSlide();
});

prev.addEventListener('click', function () {
    prevSlide();
});

function showSlide(n) {
    currentSlide = (n + slides.length) % slides.length;
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }
    slides[currentSlide].style.display = 'block';
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

setInterval(() => {
    showSlide(currentSlide + 1);
}, 5000);

showSlide(currentSlide);
