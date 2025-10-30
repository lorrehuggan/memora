# Memora

A modern Expo React Native application with comprehensive linting and formatting setup.

## Development Setup

### Prerequisites

- [Node.js](https://nodejs.org/) or [Bun](https://bun.sh/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

### Installation

```bash
# Install dependencies
bun install

# Start the development server
bun start
```

## Code Quality Tools

This project uses a modern, comprehensive setup for code quality:

### ESLint Configuration

- **Modern flat config** (`eslint.config.js`) with ES modules
- **TypeScript support** with `@typescript-eslint` plugins
- **React/React Native rules** including hooks and platform-specific linting
- **Prettier integration** for consistent formatting
- **Custom rules** for React Native best practices

### Prettier Configuration

- **Double quotes** for consistency with TypeScript/React conventions
- **Import sorting** with `@trivago/prettier-plugin-sort-imports`
- **Tailwind class sorting** with `prettier-plugin-tailwindcss`
- **Custom import order**: React → React Native → Expo → Third-party → Local

### Available Scripts

```bash
# Linting
bun run lint          # Check for linting issues
bun run lint:fix      # Fix auto-fixable linting issues

# Formatting
bun run format        # Format all files with Prettier
bun run format:check  # Check if files are formatted correctly

# Type checking
bun run type-check    # Run TypeScript compiler without emitting files

# Development
bun start            # Start Expo development server
bun run android      # Start Android development
bun run ios          # Start iOS development
bun run web          # Start web development
```

## VS Code Integration

The project includes VS Code configuration for optimal development experience:

- **Auto-format on save** with Prettier
- **Auto-fix ESLint issues** on save
- **Import organization** on save
- **Recommended extensions** for React Native development

### Recommended Extensions

- ESLint (`dbaeumer.vscode-eslint`)
- Prettier (`esbenp.prettier-vscode`)
- Tailwind CSS IntelliSense (`bradlc.vscode-tailwindcss`)
- Expo Tools (`expo.vscode-expo-tools`)
- React Native Tools (`ms-vscode.vscode-react-native`)

## Styling

### Tailwind CSS Setup

The project is configured for Tailwind CSS with React Native through NativeWind:

- **Configuration**: `tailwind.config.js`
- **Content paths**: Automatically scans components, screens, and app files
- **Custom theme**: Extended with primary color palette
- **Prettier integration**: Automatic class sorting

## Project Structure

```
memora/
├── .vscode/              # VS Code configuration
├── assets/               # Static assets
├── App.tsx              # Main application component
├── index.ts             # Application entry point
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── eslint.config.js     # ESLint configuration
├── .prettierrc          # Prettier configuration
├── .prettierignore      # Prettier ignore patterns
├── tailwind.config.js   # Tailwind CSS configuration
└── README.md           # This file
```

## Linting Rules Highlights

### TypeScript

- Unused variables error (with underscore prefix exception)
- Consistent type imports enforcement
- Explicit any warnings

### React/React Native

- No unused styles detection
- Platform component splitting enforcement
- Inline styles warnings (prefer StyleSheet)
- Color literal warnings (use theme/constants)

### Code Style

- Prefer const over let/var
- Console warnings (remove in production)
- Debugger statements error in production

## Contributing

1. Follow the established code style (ESLint + Prettier)
2. Run `bun run lint` and `bun run format` before committing
3. Ensure TypeScript compilation passes with `bun run type-check`
4. Test on multiple platforms when making UI changes

## License

Private project - All rights reserved
