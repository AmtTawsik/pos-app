# SimplePos - Modern Point of Sale System

A professional Point of Sale (POS) system built with NestJS (backend) and React (frontend), featuring a modern UI and robust functionality.

![SimplePos Screenshot](https://images.pexels.com/photos/7621138/pexels-photo-7621138.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)

## ✨ Features

### 🛍️ Product Management
- Add new products with name, code, price, and stock quantity
- Real-time product search
- Stock level indicators
- Automatic stock updates on sales

### 🛒 Shopping Cart
- Add/remove products
- Adjust quantities
- Real-time total calculation
- Smooth animations

### 💳 Sales Processing
- Quick checkout process
- Stock verification
- Sale history tracking
- Transaction management

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

1. Clone the repository:
```bash
git clone <repository-url>
cd simplepos
```

2. Install dependencies:
```bash
npm run install:all
```

3. Configure environment variables:

Backend (.env):
```env
MONGODB_URI=your_mongodb_connection_string
PORT=3000
```

Frontend (.env):
```env
VITE_API_URL=http://localhost:3000
```

### Running the Application

1. Start both services:
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

2. Access the application:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

## 💻 Usage Guide

### Adding Products
1. Click "Add New Product" button
2. Fill in product details:
   - Name
   - Code (unique identifier)
   - Price
   - Stock quantity
3. Click "Add Product"

### Searching Products
- Use the search bar to find products by name or code
- Results update in real-time as you type

### Managing Cart
1. Click "Add to Cart" on any product
2. Adjust quantities using + and - buttons
3. Remove items using the trash icon
4. View cart total at the bottom

### Processing Sales
1. Review items in cart
2. Click "Checkout"
3. Confirm the transaction
4. Stock levels update automatically

## 🔧 API Endpoints

### Products
- `GET /products` - List all products
- `POST /products` - Create product
- `GET /products/search?q=query` - Search products
- `PUT /products/:id` - Update product

### Sales
- `POST /sales` - Process sale
- `GET /sales` - View sales history

## 📱 Responsive Design

SimplePos is fully responsive and works seamlessly on:
- Desktop computers
- Tablets
- Mobile phones

## 🤝 Contributing

Contributions welcome! Please read our contributing guidelines first.

## 📄 License

MIT © [Abdullah Al Mubin](https://github.com/AmtTawsik)