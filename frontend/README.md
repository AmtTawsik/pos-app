# POS System Frontend

This is the frontend application for the Simple POS System built with React and Tailwind CSS.

## Features

- Product Search with live filtering
- Shopping Cart with quantity control
- Checkout functionality
- Responsive design

## Installation

```bash
npm install
```

## Running the app

```bash
# development mode
npm run dev

# build for production
npm run build

# preview production build
npm run preview
```

## Environment Variables

Create a `.env` file in the root of the frontend directory with the following variables:

```
VITE_API_URL=http://localhost:3000
```

## Project Structure

The project follows a standard React application structure:

- `src/components` - React components
- `src/services` - API services
- `src/contexts` - React context providers
- `src/types` - TypeScript type definitions
- `src/App.tsx` - Main application component