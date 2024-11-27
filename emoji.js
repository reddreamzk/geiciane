const face = document.querySelector('.face');
const pupils = document.querySelectorAll('.pupil');
const mouth = document.querySelector('.mouth');
const eyes = document.querySelectorAll('.eye');


document.addEventListener('mousemove', (event) => {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const angle = Math.atan2(event.clientY - centerY, event.clientX - centerX);
  const distance = Math.min(30, Math.hypot(event.clientX - centerX, event.clientY - centerY) / 10);

  pupils.forEach(pupil => {
    pupil.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`;
  });
});