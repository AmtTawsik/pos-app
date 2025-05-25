# POS System Backend

This is the backend service for the Simple POS System built with NestJS and MongoDB.

## Description

The backend provides API endpoints for product management and sales processing.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## API Endpoints

- `GET /products` – Return all products
- `POST /products` – Create a new product
- `GET /products/search?q=milk` – Search products by name or code
- `PUT /products/:id` – Update a product (stock adjustment)
- `POST /sales` – Handle checkout, reduce stock, save sale

## Environment Variables

Create a `.env` file in the root of the backend directory with the following variables:

```
MONGODB_URI=mongodb://localhost:27017/pos-system
PORT=3000
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```