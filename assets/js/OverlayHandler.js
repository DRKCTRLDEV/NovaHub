const buttons = document.querySelectorAll('.ovl-button');
const overlays = document.querySelectorAll('.ovl-games, .ovl-utils, .ovl-config');

const overlayMap = {
    left: '.ovl-games',
    right: '.ovl-utils',
    top: '.ovl-config'
};

async function loadMarkdownContent(file, targetOverlay) {
    try {
        const response = await fetch(`assets/data/${file}.md`);
        const text = await response.text();
        const lines = text.split('\n').filter(line => line.trim() && !line.startsWith('#'));
        
        const searchContainer = document.createElement('div');
        searchContainer.className = 'overlay-search';
        
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Search...';
        
        const searchIcon = document.createElement('i');
        searchIcon.className = 'fas fa-search';
        
        searchContainer.appendChild(searchInput);
        searchContainer.appendChild(searchIcon);
        
        const container = document.createElement('div');
        container.className = 'overlay-content';
        
        const buttons = lines.map(line => {
            const [title, url] = line.replace('- ', '').split('|');
            if (title && url) {
                const button = document.createElement('button');
                button.textContent = title;
                button.dataset.searchText = title.toLowerCase();
                button.addEventListener('click', () => {
                    console.log('Button clicked, URL:', url.trim());
                    if (!window.appsHandler) {
                        console.error('AppsHandler not initialized');
                        return;
                    }
                    window.appsHandler.launchApp(url.trim());
                });
                return button;
            }
            return null;
        }).filter(Boolean);
        
        searchInput.addEventListener('input', (e) => {
            const searchText = e.target.value.toLowerCase();
            buttons.forEach(button => {
                button.style.display = 
                    button.dataset.searchText.includes(searchText) ? 'block' : 'none';
            });
        });
        
        buttons.forEach(button => container.appendChild(button));
        
        targetOverlay.innerHTML = '';
        targetOverlay.appendChild(searchContainer);
        targetOverlay.appendChild(container);
    } catch (error) {
        console.error('Error loading content:', error);
    }
}

const gamesOverlay = document.querySelector('.ovl-games');
const utilsOverlay = document.querySelector('.ovl-utils');

loadMarkdownContent('games', gamesOverlay);
loadMarkdownContent('utils', utilsOverlay);

function toggleOverlay(button) {
    const overlayClass = overlayMap[Object.keys(overlayMap).find(key => button.classList.contains(key))];
    
    if (button.classList.contains('active')) {
        button.classList.remove('active');
        overlayClass && document.querySelector(overlayClass).classList.remove('active');
    } else {
        buttons.forEach(btn => btn.classList.remove('active'));
        overlays.forEach(overlay => overlay.classList.remove('active'));
        button.classList.add('active');
        overlayClass && document.querySelector(overlayClass).classList.add('active');
    }
}

buttons.forEach(button => {
    button.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleOverlay(button);
    });
});

overlays.forEach(overlay => {
    overlay.addEventListener('click', (event) => {
        event.stopPropagation();
    });
});

document.addEventListener('click', (event) => {
    const isClickOutside = !Array.from(overlays).some(overlay => 
        overlay.contains(event.target) || 
        Array.from(buttons).some(button => button.contains(event.target))
    );

    if (isClickOutside) {
        buttons.forEach(btn => btn.classList.remove('active'));
        overlays.forEach(overlay => overlay.classList.remove('active'));
    }
});

let startX, startY;

document.addEventListener('touchstart', (event) => {
    [startX, startY] = [event.touches[0].clientX, event.touches[0].clientY];
});

document.addEventListener('touchend', (event) => {
    const [diffX, diffY] = [
        event.changedTouches[0].clientX - startX,
        event.changedTouches[0].clientY - startY
    ];
    
    const activeOverlay = document.querySelector('.ovl-games.active, .ovl-utils.active, .ovl-config.active');
    const activeButton = document.querySelector('.ovl-button.active');

    if (!activeOverlay) {
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 80) {
            toggleOverlay(document.querySelector(`.ovl-button.${diffX > 0 ? 'left' : 'right'}`));
        } else if (Math.abs(diffY) > 80 && diffY > 0) {
            toggleOverlay(document.querySelector('.ovl-button.top'));
        }
    } else {
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 80) {
            if ((diffX > 0 && activeOverlay.classList.contains('ovl-utils')) ||
                (diffX < 0 && activeOverlay.classList.contains('ovl-games'))) {
                activeOverlay.classList.remove('active');
                activeButton?.classList.remove('active');
            }
        } else if (Math.abs(diffY) > 80 && diffY < 0 && activeOverlay.classList.contains('ovl-config')) {
            activeOverlay.classList.remove('active');
            activeButton?.classList.remove('active');
        }
    }
});
