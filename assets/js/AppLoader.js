class AppLoader {
    constructor(ovlId) {
        this.ovl = document.getElementById(ovlId);
        this.searchInput = this.ovl.querySelector('.search-container__input');
        this.appContainer = document.createElement('div');
        this.appContainer.className = 'app-container';
        this.ovl.appendChild(this.appContainer);
        this.apps = [];
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.searchInput.addEventListener('input', () => {
            this.filterApps();
        });
    }

    setApps(apps) {
        this.apps = apps;
        this.renderApps();
    }

    renderApps(appsToRender = this.apps) {
        const fragment = document.createDocumentFragment();
        appsToRender.forEach(app => {
            const button = document.createElement('button');
            button.className = 'app-button';
            button.textContent = app.name;
            button.addEventListener('click', () => window.open(app.url, '_blank'));
            fragment.appendChild(button);
        });
        this.appContainer.innerHTML = '';
        this.appContainer.appendChild(fragment);
        this.ovl.scrollTop = 0;
    }

    filterApps() {
        const searchTerm = this.searchInput.value.toLowerCase().trim();
        const filteredApps = searchTerm === '' ? this.apps : this.apps.filter(app => 
            app.name.toLowerCase().includes(searchTerm)
        );
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
        { name: "Minesweeper", url: "https://minesweeper.online/" },
        { name: "Sudoku", url: "https://sudoku.com/" },
    ];

    const utilsData = [
        { name: "ImageResizer", url: "https://imageresizer.com/" },
        { name: "Photopea", url: "https://www.photopea.com/" },
        { name: "Squoosh", url: "https://squoosh.app/" },
        { name: "Blackbox AI", url: "https://blackbox.ai/" },
        { name: "Canva", url: "https://www.canva.com/" },
        { name: "GeoGebra", url: "https://www.geogebra.org/calculator" },
        { name: "Pixlr", url: "https://pixlr.com/" },
        { name: "Wikipedia", url: "https://www.wikipedia.org/" },
        { name: "Archive.org", url: "https://archive.org/" },
        { name: "Wiby", url: "https://wiby.me/" },
        { name: "PrivNote", url: "https://privnote.com/" },
        { name: "Downfor.io", url: "https://downfor.io/" },
        { name: "Desmos Graphing Calculator", url: "https://www.desmos.com/calculator" },
        { name: "Scribens", url: "https://www.scribens.com/" },
        { name: "Mathway", url: "https://www.mathway.com/Algebra" },
        { name: "Color Picker", url: "https://colorpicker.me/" },
        { name: "Morse Code Translator", url: "https://morsecode.world/international/translator.html" },
        { name: "Lorem Ipsum Generator", url: "https://loremipsum.io/generator/" },
        { name: "Code Beautify", url: "https://codebeautify.org/" },
        { name: "Diff Checker", url: "https://www.diffchecker.com/" },
        { name: "Character Counter", url: "https://wordcounter.net/" },
        { name: "Markdown Editor", url: "https://dillinger.io/" },
    ];

    gamesLoader.setApps(gamesData);
    utilsLoader.setApps(utilsData);
});
