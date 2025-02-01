document.addEventListener("DOMContentLoaded", () => {
  const carouselContainer = document.querySelector(".carousel-container");
  const images = document.querySelectorAll(".carousel-container img");
  const totalImages = images.length;

  let currentIndex = 1; // Empezamos en la primera imagen real

  // Clonamos la primera y última imagen
  const firstClone = images[0].cloneNode(true);
  const lastClone = images[totalImages - 1].cloneNode(true);

  // Agregamos los clones en los extremos
  carouselContainer.insertBefore(lastClone, images[0]);
  carouselContainer.appendChild(firstClone);

  // Actualizamos la lista de imágenes
  const allImages = document.querySelectorAll(".carousel-container img");
  const imageWidth = allImages[0].clientWidth;

  // Ajustamos la posición inicial
  carouselContainer.style.transform = `translateX(-${
    currentIndex * imageWidth
  }px)`;

  function updateCarousel() {
    carouselContainer.style.transition = "transform 0.5s ease-in-out";
    carouselContainer.style.transform = `translateX(-${
      currentIndex * imageWidth
    }px)`;
  }

  function nextSlide() {
    currentIndex++;
    updateCarousel();

    // Cuando llega al clon de la primera imagen, saltamos a la imagen real sin animación
    if (currentIndex === allImages.length - 1) {
      setTimeout(() => {
        carouselContainer.style.transition = "none";
        currentIndex = 1;
        carouselContainer.style.transform = `translateX(-${
          currentIndex * imageWidth
        }px)`;
      }, 500);
    }
  }

  // Mueve el carrusel automáticamente cada 3 segundos
  setInterval(nextSlide, 2000);

  // Ajustar el carrusel al redimensionar la ventana
  window.addEventListener("resize", () => {
    const newWidth = allImages[0].clientWidth;
    carouselContainer.style.transition = "none";
    carouselContainer.style.transform = `translateX(-${
      currentIndex * newWidth
    }px)`;
  });
});
