document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('[data-overlay-target]');
  const overlays = document.querySelectorAll('.overlay');
  const [leftButton, rightButton] = ['leftButton', 'rightButton'].map(id => document.getElementById(id));

  function toggleOverlay(targetId, button) {
    const overlay = document.getElementById(targetId);
    const isActive = overlay.classList.toggle('active');
    button.classList.toggle('active', isActive);
    
    overlays.forEach(otherOverlay => {
      if (otherOverlay.id !== targetId) otherOverlay.classList.remove('active');
    });
    
    (button === leftButton ? rightButton : leftButton).classList.remove('active');
  }

  buttons.forEach(button => {
    button.addEventListener('click', () => toggleOverlay(button.dataset.overlayTarget, button));
  });

  document.addEventListener('click', ({ target }) => {
    if (!target.closest('.overlay.active') && !target.closest('[data-overlay-target]')) {
      overlays.forEach(overlay => overlay.classList.remove('active'));
      buttons.forEach(btn => btn.classList.remove('active'));
    }
  });

  let touchStartX = 0;
  let touchEndX = 0;
  const swipeThreshold = 100; // minimum distance for a swipe

  function handleTouchStart(event) {
    touchStartX = event.touches[0].clientX;
  }

  function handleTouchMove(event) {
    touchEndX = event.touches[0].clientX;
  }

  function handleTouchEnd(event) {
    const swipeDistance = touchEndX - touchStartX;
    const overlay = event.target.closest('.overlay');
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (overlay.id === 'gamesOverlay' && swipeDistance < 0) {
        toggleOverlay('gamesOverlay', leftButton);
      } else if (overlay.id === 'utilsOverlay' && swipeDistance > 0) {
        toggleOverlay('utilsOverlay', rightButton);
      }
    }
  }

  overlays.forEach(overlay => {
    overlay.addEventListener('touchstart', handleTouchStart);
    overlay.addEventListener('touchmove', handleTouchMove);
    overlay.addEventListener('touchend', handleTouchEnd);
  });
});