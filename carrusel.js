document.addEventListener('DOMContentLoaded', () => {
  const carouselContainer = document.querySelector('.carousel-container');
  const images = document.querySelectorAll('.carousel-container img');
  const prevButton = document.querySelector('.carousel-prev');
  const nextButton = document.querySelector('.carousel-next');

  let currentIndex = 0;

  // Función para actualizar la posición del carrusel
  function updateCarousel() {
    const imageWidth = images[0].clientWidth;
    carouselContainer.style.transition = 'transform 0.5s ease-in-out'; // Animación suave
    carouselContainer.style.transform = `translateX(-${currentIndex * imageWidth}px)`;
  }

  // Función para avanzar al siguiente slide
  function nextSlide() {
    const totalImages = images.length;

    if (currentIndex < totalImages - 1) {
      currentIndex++;
    } else {
      // Cuando esté en la última imagen, salta directamente a la primera
      currentIndex = 0;
      carouselContainer.style.transition = 'none'; // Quita la animación temporalmente
      carouselContainer.style.transform = `translateX(0px)`;

      // Espera un instante antes de activar nuevamente la animación
      setTimeout(() => {
        carouselContainer.style.transition = 'transform 0.5s ease-in-out';
      }, 50);
    }

    updateCarousel();
  }

  // Función para retroceder al slide anterior
  function prevSlide() {
    const totalImages = images.length;

    if (currentIndex > 0) {
      currentIndex--;
    } else {
      // Si está en la primera imagen, salta directamente a la última
      currentIndex = totalImages - 1;
      carouselContainer.style.transition = 'none'; // Quita la animación temporalmente
      const imageWidth = images[0].clientWidth;
      carouselContainer.style.transform = `translateX(-${currentIndex * imageWidth}px)`;

      // Espera un instante antes de activar nuevamente la animación
      setTimeout(() => {
        carouselContainer.style.transition = 'transform 1s ease-in-out';
      }, 50);
    }

    updateCarousel();
  }

  // Eventos de los botones
  nextButton.addEventListener('click', nextSlide);
  prevButton.addEventListener('click', prevSlide);

  // Ajustar el carrusel al redimensionar la ventana
  window.addEventListener('resize', updateCarousel);

  // Inicializar el carrusel
  updateCarousel();
});
