# Simple POS System

A simple Point of Sale (POS) web application with a NestJS backend and React frontend.

## Project Structure

```
/project-root
  /backend   - NestJS backend
  /frontend  - React frontend
  README.md  - Setup instructions
```

## Features

### Backend (NestJS)
- Product Management (add, view, search, update)
- Sales System (process orders, reduce stock)
- MongoDB database integration

### Frontend (React)
- Product Search with live filtering
- Shopping Cart with quantity control
- Checkout functionality
- Responsive design with Tailwind CSS

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher)
- MongoDB (installed locally or connection string to MongoDB Atlas)

### Installation

1. Clone the repository:
```
git clone <repository-url>
cd simple-pos-system
```

2. Install dependencies for both backend and frontend:
```
npm run install:all
```

### Running the Application

1. Start both backend and frontend concurrently:
```
npm start
```

2. Or start them individually:
   - Backend: `npm run start:backend`
   - Frontend: `npm run start:frontend`

3. Access the application:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

## API Endpoints

- `GET /products` – Return all products
- `POST /products` – Create a new product
- `GET /products/search?q=milk` – Search products by name or code
- `PUT /products/:id` – Update a product (stock adjustment)
- `POST /sales` – Handle checkout, reduce stock, save sale

## License

This project is licensed under the ISC License.