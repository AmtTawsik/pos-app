# SimplePos Frontend

Modern and responsive frontend for the SimplePos system, built with React and Tailwind CSS.

![Frontend Screenshot](https://images.pexels.com/photos/7621138/pexels-photo-7621138.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)

## ✨ Features

### 🎨 Modern UI Components
- Professional product cards
- Animated shopping cart
- Real-time search
- Responsive layout
- Stock level indicators
- Clean checkout process

### 🛠️ Technical Features
- React with TypeScript
- Tailwind CSS for styling
- Context API for state management
- Real-time API integration
- Form validation
- Error handling
- Toast notifications

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- npm (v8+)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment:
Create `.env` file:
```env
VITE_API_URL=http://localhost:3000
```

### Development

Start development server:
```bash
npm run dev
```

### Building

Create production build:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## 📱 Component Guide

### Product Management
- Use `AddProductForm` to create new products
- Real-time validation
- Success/error notifications

### Search
- Type in search bar to filter products
- Searches both names and codes
- Debounced API calls

### Shopping Cart
- Click "Add to Cart" on products
- Adjust quantities
- Remove items
- View total
- Process checkout

### Notifications
- Success/error messages
- Stock warnings
- Transaction confirmations

## 🎨 Styling

### Tailwind Classes
- `.btn` - Button styles
- `.btn-primary` - Primary actions
- `.btn-success` - Success actions
- `.btn-danger` - Dangerous actions
- `.input` - Form inputs
- `.card` - Product cards

### Customization
Edit `tailwind.config.js` to modify:
- Colors
- Typography
- Spacing
- Animations
- Breakpoints

## 📦 Project Structure

```
src/
├── components/     # React components
├── contexts/      # Context providers
├── services/      # API services
├── types/         # TypeScript types
├── App.tsx        # Main component
└── main.tsx       # Entry point
```

## 🔧 Development Tools

- Vite for fast development
- ESLint for code quality
- TypeScript for type safety
- Prettier for formatting