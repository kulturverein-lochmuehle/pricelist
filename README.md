# @kvlm/pricelist

> creates non-persistent price lists with print preview

A simple web tool to create and manage price lists with a print preview feature. Price lists created are non-persistent and exist only for the current session.

![Screenshot](https://kulturverein-lochmuehle.github.io/pricelist/screenshot.png)

## Features

- Create customizable price lists
- Real-time print preview
- Non-persistent (no data stored on servers)
- Built with Lit components for optimal performance

## Development Setup

### Prerequisites

- Node.js (latest LTS recommended)
- npm or yarn

### Development Setup

1. Clone the repository

```bash
git clone https://github.com/kulturverein-lochmuehle/pricelist.git
cd pricelist
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

The development server will start with hot-reload enabled.

### Building for Production

```bash
npm run build
```

The built files can be deployed to any static web server.

## Tech Stack

- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Lit](https://lit.dev/) - Lightweight web components
- [Vite](https://vitejs.dev/) - Fast build tool and dev server

## Author

David Enke - [david@kvlm.de](mailto:david@kvlm.de)

## License

[MIT License](LICENSE)
