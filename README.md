# AIFindr Documentation

Official documentation for AIFindr - AI-Powered Search and Knowledge Management Platform.

## About

This website is built using [Docusaurus 3](https://docusaurus.io/), a modern static website generator optimized for documentation sites.

## Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
# or
yarn install
```

### Local Development

```bash
npm start
# or
yarn start
```

This command starts a local development server and opens a browser window. Most changes are reflected live without having to restart the server.

### Build

```bash
npm run build
# or
yarn build
```

This command generates static content into the `build` directory that can be served using any static hosting service.

### Test Production Build Locally

```bash
npm run serve
# or
yarn serve
```

## Documentation Structure

```
docs/
├── intro.md                 # Introduction
├── getting-started/         # Getting started guides
│   ├── quickstart.md
│   └── setup.md
├── concepts/                # Core concepts
│   ├── architecture.md
│   ├── projects.md
│   └── ingestors.md
├── guides/                  # How-to guides
│   ├── database-migrations.md
│   ├── authentication.md
│   ├── creating-projects.md
│   └── data-ingestion.md
└── api/                     # API reference
    ├── overview.md
    ├── projects.md
    ├── search.md
    ├── chat.md
    ├── ingestions.md
    ├── permissions.md
    └── examples.md
```

## Contributing

We welcome contributions! Here's how you can help:

1. **Report Issues**: Found a typo or error? [Open an issue](https://github.com/theam/aifindr-docs/issues)
2. **Improve Documentation**: Submit pull requests with improvements
3. **Add Examples**: Share code examples and use cases

### Making Changes

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/improve-docs`
3. Make your changes
4. Test locally: `npm start`
5. Commit your changes: `git commit -m "Improve authentication docs"`
6. Push to your fork: `git push origin feature/improve-docs`
7. Open a Pull Request

## Deployment

This site is designed to be deployed on Cloudflare Pages, Vercel, Netlify, or any static hosting service.

### Cloudflare Pages

1. Connect your GitHub repository
2. Build command: `npm run build`
3. Build output directory: `build`
4. Deploy!

### GitHub Pages

```bash
GIT_USER=<Your GitHub username> npm run deploy
```

## Related Repositories

- [AIFindr Backend](https://github.com/theam/aifindr-backend) - Go backend API
- [AIFindr UI](https://github.com/theam/aifindr-ui) - Frontend application
- [AIFindr Ingestor](https://github.com/theam/aifindr-ingestor) - Document processing service

## License

Copyright © 2024 The Agile Monkeys. All rights reserved.

## Support

- **Documentation**: You're looking at it!
- **Issues**: [GitHub Issues](https://github.com/theam/aifindr-docs/issues)
- **Backend Issues**: [Backend Issues](https://github.com/theam/aifindr-backend/issues)
- **Company**: [The Agile Monkeys](https://www.theagilemonkeys.com)
