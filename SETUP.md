# Local Development Setup & Safety Guide

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

4. **Preview Production Build**
   ```bash
   npm run preview
   ```

## Environment Setup

### Environment Variables

This project uses Vite's environment variable system. Variables prefixed with `VITE_` are exposed to the client.

1. **Create `.env.local`** (optional, for local overrides)
   ```bash
   cp .env.example .env.local
   ```

2. **Add any required variables** to `.env.local`
   - Never commit `.env.local` to version control
   - `.env.local` is already in `.gitignore`

### Available Environment Variables

- `VITE_APP_ENV` - Automatically set by Vite (development/production)
- Add custom variables as needed (prefixed with `VITE_`)

## Safety Features

### Error Handling

- **Error Boundaries**: React error boundaries catch component errors
- **Image Fallbacks**: Failed image loads show placeholder UI
- **Graceful Degradation**: Features degrade gracefully on errors
- **Development Logging**: Errors logged in dev mode only

### Security

- **No Sensitive Data**: No API keys or secrets in code
- **Environment Variables**: Secrets loaded from `.env.local` only
- **Gitignore**: `.env` files excluded from version control
- **Production Builds**: Sourcemaps disabled in production

### Cross-Platform Compatibility

- **Path Handling**: Uses path-agnostic imports
- **OS Checks**: Window/document checks for SSR safety
- **Case Sensitivity**: Handles different file systems

## Troubleshooting

### Common Issues

1. **Port Already in Use**
   - Vite will automatically try the next available port
   - Or specify a port: `npm run dev -- --port 3000`

2. **Image Loading Errors**
   - Check that images exist in `src/Images/`
   - Verify image file names match imports exactly
   - Check browser console for specific errors

3. **Build Errors**
   - Clear cache: `rm -rf node_modules dist && npm install`
   - Check for TypeScript/ESLint errors
   - Verify all dependencies are installed

4. **Hot Reload Not Working**
   - Restart dev server
   - Clear browser cache
   - Check for syntax errors in console

### Development Tips

- **Error Logging**: Errors only log in development mode
- **Console Warnings**: Check browser console for warnings
- **Network Tab**: Monitor image loading in DevTools
- **React DevTools**: Use for component debugging

## File Structure

```
src/
├── components/          # React components
│   ├── ErrorBoundary.jsx    # Error boundary wrapper
│   ├── ImageWithFallback.jsx # Image with error handling
│   └── ...
├── utils/              # Utility functions
│   └── errorHandler.js      # Error handling utilities
├── Images/             # Image assets
├── App.jsx            # Main app component
└── main.jsx           # Entry point
```

## Performance

- **Code Splitting**: Automatic code splitting for vendor libraries
- **Image Optimization**: Vite optimizes images during build
- **Lazy Loading**: Images load lazily for better performance
- **Tree Shaking**: Unused code removed in production

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development Commands

```bash
# Development server with hot reload
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

## Notes

- All images are imported statically for optimization
- Error boundaries prevent full app crashes
- Form submissions are client-side only (no backend)
- Instagram links open in new tabs with security attributes
