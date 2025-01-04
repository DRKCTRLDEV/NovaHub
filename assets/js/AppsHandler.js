// ABC class definition
class ABC {
    constructor({ type = "blank", url = "about:blank" } = {}) {
        this.type = type;
        this.url = url;
    }

    getCode() {
        return `<iframe style="height:100%; width: 100%; border: none; position: fixed; top: 0; right: 0; left: 0; bottom: 0;" sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts allow-top-navigation allow-top-navigation-by-user-activation" src="${this.url}"></iframe>`;
    }

    open() {
        const code = this.getCode();
        try {
            switch (this.type) {
                case "blank":
                    const win = window.open();
                    if (win) {
                        win.document.body.innerHTML = code;
                    } else {
                        console.error("Popup blocked");
                    }
                    break;
                case "blob":
                    const blob = new Blob([code], { type: "text/html" });
                    window.open(URL.createObjectURL(blob));
                    break;
                case "overwrite":
                    document.body.innerHTML = code;
                    break;
                default:
                    console.error("Invalid type");
            }
        } catch (error) {
            console.error("Error opening page:", error);
        }
    }
}

class AppsHandler {
    constructor() {
        this.urlInput = document.getElementById('urlInput');
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.urlInput?.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const url = this.urlInput.value.trim();
                if (url) this.launch(url);
            }
        });
    }

    launch(url) {
        if (!url) return;

        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
        }

        if (!this.validURL(url)) {
            console.error('Invalid URL');
            return;
        }

        const useProxy = window.settingsHandler?.getAllSettings()?.proxy || false;
        this.openWithABC(url, useProxy);
    }

    launchApp(url) {
        console.log('launchApp called with URL:', url);
        if (!url) {
            console.error('No URL provided to launchApp');
            return;
        }
        
        const useProxy = window.settingsHandler?.getAllSettings()?.proxy || false;
        this.openWithABC(url, useProxy);
    }

    openWithABC(url, useProxy) {
        console.log('Opening with ABC:', { url, useProxy });
        const abc = new ABC({
            type: 'blank',
            url: useProxy ? this.proxyURL(url) : url
        });

        try {
            abc.open();
        } catch (error) {
            console.error('Failed to launch:', error);
        }
    }

    validURL(url) {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }

    proxyURL(url) {
        const settings = window.settingsHandler?.getAllSettings();
        const proxyurl = settings?.proxyurl || 'https://uv.studentportal.lol/service/';
        
        try {
            return `${proxyurl}${btoa(url)}`;
        } catch (error) {
            console.error('Error creating proxy URL:', error);
            return url;
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.appsHandler = new AppsHandler();
});
