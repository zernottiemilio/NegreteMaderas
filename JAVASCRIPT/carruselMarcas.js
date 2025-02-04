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
  const totalWidth = images.reduce((acc, img) => acc + img.offsetWidth, 0);

  // Duplicamos las imágenes originales
  images.forEach((img) => {
    const clone = img.cloneNode(true);
    carouselContainer.appendChild(clone);
  });

  let scrollAmount = 0;

  function scrollCarousel() {
    scrollAmount -= 1.5; // Velocidad del desplazamiento
    carouselContainer.style.transform = `translateX(${scrollAmount}px)`;

    // Si la traslación alcanza el ancho de las imágenes originales, reiniciamos suavemente
    if (Math.abs(scrollAmount) >= totalWidth) {
      scrollAmount = 0;
      carouselContainer.style.transform = `translateX(0px)`;
    }

    requestAnimationFrame(scrollCarousel);
  }

  // Aseguramos que las imágenes estén cargadas antes de iniciar
  Promise.all(
    Array.from(carouselContainer.getElementsByTagName("img")).map((img) => {
      if (img.complete) {
        return Promise.resolve();
      } else {
        return new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve;
        });
      }
    })
  ).then(() => {
    carouselContainer.style.transition = "none"; // Evitamos cortes en el reinicio
    scrollCarousel();
  });
});
