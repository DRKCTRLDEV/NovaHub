class AppLoader {
    constructor(ovlId) {
        this.ovl = document.getElementById(ovlId);
        this.searchInput = this.ovl.querySelector('.search-container__input');
        this.appContainer = document.createElement('div');
        this.appContainer.className = 'app-container';
        this.ovl.appendChild(this.appContainer);
        this.apps = [];
        this.searchInput.addEventListener('input', () => this.filterApps());
    }

    setApps(apps) {
        this.apps = Array.isArray(apps) ? apps : Object.values(apps).flat();
        this.renderApps();
    }

    renderApps(appsToRender = this.apps) {
        const fragment = document.createDocumentFragment();

        if (Array.isArray(appsToRender)) {
            appsToRender.forEach(app => fragment.appendChild(this.createAppButton(app)));
        } else {
            Object.entries(appsToRender).forEach(([category, apps]) => {
                const categoryHeader = document.createElement('h3');
                categoryHeader.textContent = category;
                categoryHeader.className = 'app-category';
                fragment.appendChild(categoryHeader);
                apps.forEach(app => fragment.appendChild(this.createAppButton(app)));
            });
        }

        this.appContainer.innerHTML = '';
        this.appContainer.appendChild(fragment);
        this.ovl.scrollTop = 0;
    }

    createAppButton(app) {
        const button = document.createElement('button');
        button.className = 'app-button';
        button.textContent = app.name;
        button.addEventListener('click', () => {
            const encodedUrl = encodeURIComponent(app.url);
            const proxyUrl = `https://uv-worker.drksrcs.workers.dev/${encodedUrl}`;
            window.open(proxyUrl, '_blank', 'noopener,noreferrer');
        });
        return button;
    }

    filterApps() {
        const searchTerm = this.searchInput.value.toLowerCase().trim();
        const filteredApps = searchTerm
            ? (Array.isArray(this.apps)
                ? this.apps.filter(app => app.name.toLowerCase().includes(searchTerm))
                : Object.fromEntries(Object.entries(this.apps).map(([category, apps]) => [
                    category,
                    apps.filter(app => app.name.toLowerCase().includes(searchTerm))
                ]).filter(([, apps]) => apps.length > 0)))
            : this.apps;

        this.renderApps(filteredApps);
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const gamesLoader = new AppLoader('gamesOverlay');
    const utilsLoader = new AppLoader('utilsOverlay');

    const gamesData = [
        { name: "Paper.io", url: "https://paper-io.com/" },
        { name: "Superhex.io", url: "https://superhex.io/" },
        { name: "Wordle", url: "https://wordlegame.org/" },
        { name: "Starblast.io", url: "https://starblast.io/" },
        { name: "Venge.io", url: "https://venge.io/" },
        { name: "Warbot.io", url: "https://warbot.io/" },
        { name: "1v1.LOL", url: "https://1v1.lol/" },
        { name: "Diep.io", url: "https://diep.io" },
        { name: "Hole.io", url: "https://hole-io.com" },
        { name: "Krunker.io", url: "https://krunker.io" },
        { name: "nzp.gay", url: "https://nzp.gay" },
        { name: "Shell Shockers", url: "https://algebra.monster" },
        { name: "slither.io", url: "https://slither.io" },
        { name: "Zombs Royale", url: "https://zombsroyale.io" },
        { name: "Minesweeper", url: "https://github.com/DRKCTRL" },
        { name: "Sudoku", url: "https://sudoku.com/" },
    ];

    const utilsData = [
        // Image & Design
        { name: "Figma", url: "https://www.figma.com/" },
        { name: "Photopea", url: "https://www.photopea.com/" },
        { name: "Canva", url: "https://www.canva.com/" },
        { name: "Remove.bg", url: "https://www.remove.bg/" },
        { name: "TinyPNG", url: "https://tinypng.com/" },
        { name: "Coolors", url: "https://coolors.co/" },

        // AI & Productivity
        { name: "ChatGPT", url: "https://chat.openai.com/" },
        { name: "Notion", url: "https://www.notion.so/" },
        { name: "Grammarly", url: "https://www.grammarly.com/" },
        { name: "Trello", url: "https://trello.com/" },
        { name: "Todoist", url: "https://todoist.com/" },
        { name: "Hemingway Editor", url: "https://hemingwayapp.com/" },

        // Maths & Science
        { name: "Wolfram Alpha", url: "https://www.wolframalpha.com/" },
        { name: "Desmos Graphing", url: "https://www.desmos.com/calculator" },
        { name: "GeoGebra", url: "https://www.geogebra.org/" },
        { name: "Symbolab", url: "https://www.symbolab.com/" },
        { name: "Periodic Table", url: "https://ptable.com/" },

        // Reference & Learning
        { name: "Wikipedia", url: "https://www.wikipedia.org/" },
        { name: "Khan Academy", url: "https://www.khanacademy.org/" },
        { name: "Coursera", url: "https://www.coursera.org/" },
        { name: "Duolingo", url: "https://www.duolingo.com/" },

        // Coding & Development
        { name: "GitHub", url: "https://github.com/" },
        { name: "CodePen", url: "https://codepen.io/" },
        { name: "Stack Overflow", url: "https://stackoverflow.com/" },
        { name: "JSFiddle", url: "https://jsfiddle.net/" },
        { name: "RegExr", url: "https://regexr.com/" },

        // File Conversion & Sharing
        { name: "Convertio", url: "https://convertio.co/" },
        { name: "WeTransfer", url: "https://wetransfer.com/" },
        { name: "PDF24 Tools", url: "https://tools.pdf24.org/en/" },

        // Miscellaneous
        { name: "Down Detector", url: "https://downdetector.com/" },
        { name: "Temp-Mail", url: "https://temp-mail.org/" },
        { name: "Random.org", url: "https://www.random.org/" },
        { name: "URL Shortener", url: "https://bitly.com/" },
    ];

    gamesLoader.setApps(gamesData);
    utilsLoader.setApps(utilsData);
});
