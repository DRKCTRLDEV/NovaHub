# T-NAU (Totally, Not An UnBlocker...)

T-NAU is a web-based application that provides a user-friendly interface for accessing online resources. It features a clean, dark-themed design with search functionality and sidebar navigation for games and utilities.

## Features

- **Responsive Design**: Adapts to various screen sizes for an optimal user experience.
- **Side Panels**: Provides fast, easy access to games and utilities.
- **URL Bar**: Allows users to enter URLs directly.
- **Proxy Functionality**: [WIP] Enables access to websites that require proxying. *(Currently works intermittently)*
- **Search Engine**: [*Not Started*] Allows users to search for websites.
- **Utilities**: [*WIP*] Provides a selection of inbuilt utilities. (See Credits for links)
- **Games**: [*WIP*] Provides a selection of inbuilt games. (See Credits for links)

## Usage

1. Open [drksrc.pages.dev](https://drksrc.pages.dev) in your web browser.
2. Enter a URL in the search bar to navigate or use the server icon to proxy a website (required for some websites).
3. Use the side buttons to access games and utilities:
   - **Left Button**: Opens the games overlay.
   - **Right Button**: Opens the utilities overlay.
4. Close overlays by clicking outside of them, pressing the Arrow key (on desktop), or swiping Left/Right (on mobile).
5. Use the search bar within the overlays to find specific items.

## Building

**Note**: T-NAU requires [Node.js](https://nodejs.org/en) version 14 or higher. Make sure you have the correct version installed before proceeding with the build process. Additionally, you'll need [git](https://git-scm.com/downloads) to clone the repository, or alternatively, you can use tools like `curl` or `wget` to download the source code directly.

1. Clone the repository:
   ```
   git clone https://github.com/DrkSource/T-NAU.git
   ```
2. Navigate to the project directory:
   ```
   cd T-NAU
   ```
3. Install project dependencies:
   ```
   vnpm install && npm run build
   ```
4. Start the server:
   ```
   npm run server
   ```
5. Open your browser and visit `http://localhost:3000` to view the application.

## Contributing

We welcome contributions to T-NAU! If you have any ideas or suggestions, please open an issue or submit a pull request.

## Credits
- [@DrkSource](https://github.com/DrkSource) - Creator and main developer of T-NAU, including some integrated games (Work in Progress).
- [@azz](https://github.com/azz) - Original creator of the Minesweeper game, which has been adapted for T-NAU.
- [3kh0](https://github.com/3kh0) - Provider of various game resources integrated into T-NAU.
- [Titanium Network](https://github.com/titaniumnetwork-dev) - Developers of the Ultraviolet proxy used in T-NAU.
- [You!] - We welcome contributions from the community. Your ideas and code could be featured here!

Special thanks to all open-source contributors whose work has made T-NAU possible.
