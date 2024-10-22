document.addEventListener('DOMContentLoaded', () => {
    const urlInput = document.getElementById('urlInput');
    const searchInputs = document.querySelectorAll('.search-container__input');
    const proxyButton = document.querySelector('.search-container button');
    let proxyEnabled = true;

    function openInProxy(url) {
        const encodedUrl = encodeURIComponent(url);
        const proxyUrl = `https://uv-worker.drksrcs.workers.dev/${encodedUrl}`;
        window.open(proxyUrl, '_blank', 'noopener,noreferrer');
    }

    urlInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const url = urlInput.value;
            openInProxy(url);
        }
    });

    proxyButton.addEventListener('click', () => {
        proxyEnabled = !proxyEnabled;
        proxyButton.classList.toggle('active', proxyEnabled);
    });

    searchInputs.forEach(input => {
        input.addEventListener('input', () => {
            const searchTerm = input.value.toLowerCase();
            const overlay = input.closest('.overlay');
            const appButtons = overlay.querySelectorAll('.app-button');

            appButtons.forEach(button => {
                const appName = button.textContent.toLowerCase();
                button.style.display = appName.includes(searchTerm) ? 'block' : 'none';
            });
        });
    });
});
