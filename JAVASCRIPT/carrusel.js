document.addEventListener("DOMContentLoaded", () => {
  const carouselContainer = document.querySelector(".carousel-container");
  const images = document.querySelectorAll(".carousel-container img");
  const totalImages = images.length;

  let currentIndex = 1; // Empezamos en la primera imagen real
  let imageWidth = images[0].clientWidth; // Inicializamos el ancho

  // Clonamos la primera y última imagen
  const firstClone = images[0].cloneNode(true);
  const lastClone = images[totalImages - 1].cloneNode(true);

  // Agregamos los clones en los extremos
  carouselContainer.insertBefore(lastClone, images[0]);
  carouselContainer.appendChild(firstClone);

  // Actualizamos la lista de imágenes
  const allImages = document.querySelectorAll(".carousel-container img");

  // Función para obtener el ancho actual de la imagen
  function getCurrentImageWidth() {
    return allImages[0].clientWidth;
  }

  // Función para actualizar la posición del carrusel
  function updateCarousel(withTransition = true) {
    imageWidth = getCurrentImageWidth(); // Actualizamos el ancho de la imagen

    if (withTransition) {
      carouselContainer.style.transition = "transform 0.5s ease-in-out";
    } else {
      carouselContainer.style.transition = "none";
    }

    carouselContainer.style.transform = `translateX(-${
      currentIndex * imageWidth
    }px)`;
  }

  // Ajustamos la posición inicial
  updateCarousel(false);

  function nextSlide() {
    currentIndex++;
    updateCarousel(true);

    // Cuando llega al clon de la primera imagen, saltamos a la imagen real sin animación
    if (currentIndex === allImages.length - 1) {
      setTimeout(() => {
        currentIndex = 1;
        updateCarousel(false);
      }, 500);
    }
  }

  // Mueve el carrusel automáticamente cada 3 segundos
  const autoplayInterval = setInterval(nextSlide, 3500);

  // Añadimos funcionalidad para el slide anterior
  function prevSlide() {
    currentIndex--;
    updateCarousel(true);

    // Cuando llega al clon de la última imagen, saltamos a la imagen real sin animación
    if (currentIndex === 0) {
      setTimeout(() => {
        currentIndex = allImages.length - 2;
        updateCarousel(false);
      }, 500);
    }
  }

  // Ajustar el carrusel al redimensionar la ventana
  let resizeTimer;
  window.addEventListener("resize", () => {
    // Usamos debounce para no sobrecargar con eventos de resize
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      updateCarousel(false);
    }, 100);
  });
});
