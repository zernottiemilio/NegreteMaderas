document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".productos-track");
  const slides = document.querySelectorAll(".producto-slide");
  const prevButton = document.querySelector(".carousel-button.prev");
  const nextButton = document.querySelector(".carousel-button.next");

  let position = 0;
  const slideWidth = slides[0].offsetWidth + 20; // Width + gap
  const slidesToShow = Math.floor(track.offsetWidth / slideWidth);
  const maxPosition = -(slides.length - slidesToShow) * slideWidth;

  function updatePosition() {
    track.style.transform = `translateX(${position}px)`;

    // Update button states
    prevButton.style.opacity = position === 0 ? "0.5" : "1";
    nextButton.style.opacity = position <= maxPosition ? "0.5" : "1";
  }

  function moveNext() {
    if (position > maxPosition) {
      position -= slideWidth;
      updatePosition();
    }
  }

  function movePrev() {
    if (position < 0) {
      position += slideWidth;
      updatePosition();
    }
  }

  // Event listeners
  nextButton.addEventListener("click", moveNext);
  prevButton.addEventListener("click", movePrev);

  // Optional: Add touch/swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
  });

  track.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].clientX;
    if (touchStartX - touchEndX > 50) {
      moveNext();
    } else if (touchEndX - touchStartX > 50) {
      movePrev();
    }
  });

  // Recalculate on window resize
  window.addEventListener("resize", () => {
    const newSlidesToShow = Math.floor(track.offsetWidth / slideWidth);
    let newMaxPosition = -(slides.length - newSlidesToShow) * slideWidth;
    maxPosition = newMaxPosition;

    // Reset position if needed
    if (position < maxPosition) {
      position = maxPosition;
      updatePosition();
    }
  });
});
