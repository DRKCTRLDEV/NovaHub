const openStrategies = {
    blank: code => {
        const win = window.open();
        if (!win) return false;
        win.document.body.innerHTML = code;
        return true;
    },
    newTab: url => window.open(url, '_blank') !== null
};

class ABC {
    constructor({ type = "blank", url = "about:blank" } = {}) {
        this.type = type;
        this.url = url;
    }

    open() {
        const code = `<iframe style="height:100%; width:100%; border:none; position:fixed; inset:0;" sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts allow-top-navigation-by-user-activation" src="${this.url}"></iframe>`;
        if (!openStrategies[this.type](code) && !openStrategies.newTab(this.url)) {
            alert("Pop-up blocked. Please allow pop-ups for this site to use this feature.");
        }
    }
}

const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
};

const isValidUrl = (url) => /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(url);

const go = async () => {
    try {
        const url = urlInput.value.trim();
        if (!url || !isValidUrl(url)) throw new Error("Invalid URL. Please enter a valid URL (e.g., https://example.com)");
        
        const finalUrl = url.startsWith('http') ? url : `https://${url}`;
        new ABC({ url: finalUrl }).open();
    } catch (error) {
        console.error('Error opening URL:', error);
        alert(`Error: ${error.message}`);
    }
};

const urlInput = document.getElementById("urlInput");
const proxyToggleButton = document.querySelector('.search-container button');

proxyToggleButton.addEventListener('click', () => proxyToggleButton.classList.toggle('active'));

urlInput.addEventListener("keydown", event => event.key === "Enter" && go());
