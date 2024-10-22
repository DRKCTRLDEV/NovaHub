document.addEventListener('DOMContentLoaded', () => {
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

  document.addEventListener('click', ({ target }) => {
    const button = target.closest('[data-overlay-target]');
    if (button) {
      toggleOverlay(button.dataset.overlayTarget, button);
    } else if (!target.closest('.overlay.active') && !target.closest('[data-overlay-target]')) {
      overlays.forEach(overlay => overlay.classList.remove('active'));
      [leftButton, rightButton].forEach(btn => btn.classList.remove('active'));
    }
  });

  const swipeThreshold = 100;
  let touchStartX = 0;

  overlays.forEach(overlay => {
    overlay.addEventListener('touchstart', e => touchStartX = e.touches[0].clientX);
    overlay.addEventListener('touchend', e => {
      const swipeDistance = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(swipeDistance) > swipeThreshold) {
        if (overlay.id === 'gamesOverlay' && swipeDistance < 0) {
          toggleOverlay('gamesOverlay', leftButton);
        } else if (overlay.id === 'utilsOverlay' && swipeDistance > 0) {
          toggleOverlay('utilsOverlay', rightButton);
        }
      }
    });
  });
});
