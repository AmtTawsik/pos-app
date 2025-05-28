# SimplePos - Modern Point of Sale System

A professional Point of Sale (POS) system built with NestJS (backend) and React (frontend), featuring a modern UI and robust functionality.

![SimplePos Screenshot](https://images.pexels.com/photos/7621138/pexels-photo-7621138.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)

## ✨ Features

### 🔒 Authentication & Security
- JWT-based admin authentication
- Protected routes and API endpoints
- Secure password hashing
- Token-based session management

### 🛍️ Product Management
- Add, edit, and search products
- Real-time stock tracking
- Barcode/code support
- Stock level indicators

### 🛒 Shopping Cart
- Add/remove products
- Adjust quantities
- Real-time total calculation
- Stock verification

### 💳 Sales Processing
- Quick checkout process
- Automatic stock updates
- PDF invoice generation
- Sales history tracking

### 📊 Real-time Updates
- Socket.io integration
- Live stock updates
- Instant notifications
- Multi-device synchronization

### 🎨 Modern UI/UX
- Responsive design
- Professional animations
- Clean, intuitive interface
- Real-time updates

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher)
- MongoDB (local or Atlas connection string)

### Installation

1. Install dependencies:
```bash
npm run install:all
```

2. Configure environment variables:

Backend (.env):
```env
MONGODB_URI=your_mongodb_connection_string
PORT=3000
JWT_SECRET=your_jwt_secret_key
```

Frontend (.env):
```env
VITE_API_URL=http://localhost:3000
```

### Running the Application

Start both services:
```bash
npm start
```

Or individually:
```bash
# Backend only
npm run start:backend

# Frontend only
npm run start:frontend
```

Access the application:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

## 💻 Usage Guide

### Authentication
1. Access the login page
2. Enter admin credentials
3. System will redirect to dashboard upon successful login

### Product Management
1. Add new products with:
   - Name
   - Code
   - Price
   - Stock quantity
2. Edit existing products
3. Search by name or code
4. Monitor stock levels

### Sales Process
1. Add products to cart
2. Adjust quantities
3. Process checkout
4. Download invoice
5. View transaction in sales history

### Sales History
1. View all past transactions
2. Download PDF invoices
3. Track sales performance
4. Monitor inventory changes

## 🔧 API Endpoints

### Authentication
- `POST /auth/login` - Admin login
- `GET /auth/me` - Get admin profile

### Products
- `GET /products` - List all products
- `POST /products` - Create product
- `GET /products/search` - Search products
- `PUT /products/:id` - Update product

### Sales
- `POST /sales` - Process sale
- `GET /sales` - View sales history
- `GET /invoices/:saleId` - Download invoice

## 📱 Responsive Design

SimplePos is fully responsive and works seamlessly on:
- Desktop computers
- Tablets
- Mobile phones

## 🔌 Real-time Features

- Stock updates via Socket.io
- Live inventory tracking
- Instant notifications
- Multi-device synchronization

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
.
├── backend/                 # NestJS backend
│   ├── src/
│   │   ├── auth/           # Authentication
│   │   ├── products/       # Product management
│   │   └── sales/          # Sales processing
│   └── package.json
│
└── frontend/               # React frontend
    ├── src/
    │   ├── components/     # React components
    │   ├── contexts/       # Context providers
    │   ├── services/       # API services
    │   └── types/         # TypeScript types
    └── package.json
```

## 🔧 Development Tools

- Vite for fast development
- ESLint for code quality
- TypeScript for type safety
- Prettier for formatting
- Socket.io for real-time features
- JWT for authentication

## 📄 License

MIT © [Abdullah Al Mubin](https://github.com/AmtTawsik)