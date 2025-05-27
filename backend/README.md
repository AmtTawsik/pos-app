# SimplePos Backend

Robust and scalable backend for the SimplePos system, built with NestJS and MongoDB.

## ✨ Features

### 🗄️ Data Management
- Product CRUD operations
- Sales processing
- Stock management
- Search functionality

### 🔒 Security
- Input validation
- Error handling
- Data sanitization
- Type safety

### 📊 Business Logic
- Stock verification
- Sales calculations
- Product search
- Transaction management

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- npm (v8+)
- MongoDB

### Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment:
Create `.env` file:
```env
MONGODB_URI=your_mongodb_connection_string
PORT=3000
```

### Development

Start development server:
```bash
npm run start:dev
```

### Production

Build and start:
```bash
npm run build
npm run start:prod
```

## 🔧 API Documentation

### Products

#### Get All Products
```
GET /products
```

#### Create Product
```
POST /products
Body: {
  "name": "string",
  "code": "string",
  "price": number,
  "stockQty": number
}
```

#### Search Products
```
GET /products/search?q=query
```

#### Update Product
```
PUT /products/:id
Body: {
  "name?": "string",
  "code?": "string",
  "price?": number,
  "stockQty?": number
}
```

### Sales

#### Create Sale
```
POST /sales
Body: {
  "items": [{
    "productId": "string",
    "name": "string",
    "price": number,
    "quantity": number
  }]
}
```

#### Get All Sales
```
GET /sales
```

## 📦 Project Structure

```
src/
├── products/           # Product module
│   ├── dto/           # Data transfer objects
│   ├── schemas/       # MongoDB schemas
│   └── services/      # Business logic
├── sales/             # Sales module
│   ├── dto/
│   ├── schemas/
│   └── services/
└── app.module.ts      # Main module
```

## ⚙️ Configuration

### MongoDB
- Uses Mongoose ODM
- Schemas with timestamps
- Indexed fields for performance

### Validation
- DTOs with class-validator
- Schema validation
- Error handling

### Error Handling
- Custom exceptions
- Error transformations
- Consistent responses