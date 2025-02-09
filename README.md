# T-NAU (Totally Not An UnBlocker)
---

T-NAU is a web-based application that provides a user-friendly interface for accessing online resources. It features a clean, dark-themed design with search functionality and sidebar navigation for games and utilities.

## Features

- **Responsive Design**: Adapts to various screen sizes for optimal user experience.
- **Side Panels**: Quick access to games and utilities.
- **URL Bar**: Direct URL entry for navigation.
- **Proxy Functionality**: [WIP] Access to websites requiring proxying. *(NON FUNCTIONAL)*
- **Search Engine**: [Planned] Website search capability.
- **Utilities**: [WIP] Selection of built-in tools. (See Credits)
- **Games**: [WIP] Curated collection of online games. (See Credits)

## Quick Start

1. Visit [drksrc.pages.dev](https://drksrc.pages.dev) in your web browser.
2. Enter a URL in the search bar or use the server icon to proxy a website.
3. Access games and utilities:
   - **Left Button**: Opens games overlay.
   - **Right Button**: Opens utilities overlay.
4. Close overlays by clicking outside, pressing the Arrow key (desktop), or swiping Left/Right (mobile).
5. Use the in-overlay search to find specific items.

## Development Setup

**Prerequisites**: 
- [Node.js](https://nodejs.org/en) v14+
- [Git](https://git-scm.com/downloads) (or use `curl`/`wget` for direct download)

```bash
# Clone the repository
git clone https://github.com/DrkSource/T-NAU.git

# Navigate to project directory
cd T-NAU

# Install dependencies and build
npm install && npm run build

# Start the server
npm run server

# Access the application at http://localhost:3000
```

## Credits

- [@DRKCTRL](https://github.com/DRKCTRL) - Creator and main developer

### Third-Party Resources

T-NAU incorporates various open-source projects and resources, including:

- **Games**: Paper.io, Superhex.io, Wordle, Starblast.io, Venge.io, 1v1.LOL, Diep.io, Krunker.io, Slither.io, Zombs Royale, and more.

- **Utilities**: 
  - Image & Design: ImageResizer, Photopea, Squoosh, Canva, Pixlr, Color Picker
  - AI & Productivity: Blackbox AI, PrivNote, Scribens, Lorem Ipsum Generator
  - Math & Science: GeoGebra, Desmos Graphing Calculator, Mathway
  - Coding & Development: Code Beautify, Diff Checker
  - Reference & Archives: Wikipedia, Archive.org
  - Miscellaneous: Downfor.io, Morse Code Translator

- **Technologies & Tools**:
  - UI: FontAwesome
  - Styling: Sass
  - JavaScript: Terser
  - Runtime: Node.js
  - Version Control: Git
  - Package Management: npm

For a complete list of integrated games and utilities, please refer to the application's interface.

We are committed to respecting the licences and attributions of all third-party resources. If you believe we've missed any important credits, please let us know, and we'll update accordingly.

## Contributing

Contributions are welcomed!

## Licence

This project is licensed under the [MIT Licence](LICENCE.md).
