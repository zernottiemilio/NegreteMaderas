document.addEventListener('DOMContentLoaded', function() {
  // Seleccionar las secciones
  const whiteSection = document.querySelector('.white-section');
  const greenSection = document.querySelector('.green-section');
  const circles = document.querySelectorAll('.circle-icon');
  
  // URLs para redirección (cámbialas por tus URLs reales)
  const whiteSectionURL = "/precios";
  const greenSectionURL = "/optimizador";
  
  // Agregar animación de pulso a los círculos al cargar la página
  setTimeout(() => {
      circles.forEach(circle => {
          circle.style.animation = "pulse 2s infinite";
      });
  }, 1000);
  
  // Eventos para redireccionar al hacer clic
  whiteSection.addEventListener('click', function() {
      // Animación antes de redireccionar
      whiteSection.style.transform = "scale(0.98)";
      setTimeout(() => {
          window.location.href = whiteSectionURL;
      }, 300);
  });
  
  greenSection.addEventListener('click', function() {
      // Animación antes de redireccionar
      greenSection.style.transform = "scale(0.98)";
      setTimeout(() => {
          window.location.href = greenSectionURL;
      }, 300);
  });
  
  // Restaurar escala después de clic
  whiteSection.addEventListener('mouseup', function() {
      setTimeout(() => {
          whiteSection.style.transform = "scale(1)";
      }, 150);
  });
  
  greenSection.addEventListener('mouseup', function() {
      setTimeout(() => {
          greenSection.style.transform = "scale(1)";
      }, 150);
  });
  
  // Efectos adicionales al pasar el cursor
  whiteSection.addEventListener('mouseenter', function() {
      document.querySelector('.white-section h2').style.fontWeight = "bold";
  });
  
  whiteSection.addEventListener('mouseleave', function() {
      document.querySelector('.white-section h2').style.fontWeight = "normal";
  });
  
  greenSection.addEventListener('mouseenter', function() {
      document.querySelector('.green-section h2').style.fontWeight = "bold";
  });
  
  greenSection.addEventListener('mouseleave', function() {
      document.querySelector('.green-section h2').style.fontWeight = "normal";
  });
});
