document.addEventListener("DOMContentLoaded", () => {
  const carouselContainer = document.querySelector(
    "#dynamic-carousel .carousel-containerM"
  );

  if (!carouselContainer) {
    console.error("No se encontró el contenedor del carrusel.");
    return;
  }

  // Duplicamos las imágenes para lograr el efecto de bucle infinito
  const images = Array.from(carouselContainer.children);
  images.forEach((img) => {
    const clone = img.cloneNode(true);
    carouselContainer.appendChild(clone);
  });

  let scrollAmount = 0;

  function scrollCarousel() {
    scrollAmount -= 1.5; // Velocidad del desplazamiento
    carouselContainer.style.transform = `translateX(${scrollAmount}px)`;

    // Reinicia el desplazamiento de manera fluida sin cortes
    if (Math.abs(scrollAmount) >= carouselContainer.scrollWidth / 2) {
      scrollAmount = 0;
    }

    requestAnimationFrame(scrollCarousel);
  }

  scrollCarousel();
});
