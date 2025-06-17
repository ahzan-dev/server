# Brand Management API Documentation

## Overview

This is a comprehensive NestJS backend application for managing brand profiles with support for branches, menus, popular deals, and flexible opening hours.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Start development server
npm run start:dev

# Server will be running at http://localhost:3000
# API available at http://localhost:3000/brands
```

## 📋 API Endpoints

### Brand Management

- `GET /brands` - List all brands with filtering and pagination
- `GET /brands/:id` - Get brand by ID
- `GET /brands/slug/:slug` - Get brand by URL slug
- `POST /brands` - Create new brand
- `PATCH /brands/:id` - Update brand
- `DELETE /brands/:id` - Delete brand

### Brand Resources

- `GET /brands/:id/branches` - Get brand branches
- `GET /brands/:id/menus` - Get brand menus
- `GET /brands/:id/deals` - Get brand popular deals

### User Interactions

- `PATCH /brands/:id/follow` - Follow a brand
- `PATCH /brands/:id/unfollow` - Unfollow a brand

## 🔍 Query Parameters for GET /brands

- `search` - Search in brand name, about, or tag
- `category` - Filter by brand category (RESTAURANT, RETAIL, etc.)
- `tag` - Filter by specific tag
- `isVerified` - Filter by verification status (true/false)
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `sortBy` - Sort field (default: createdAt)
- `sortOrder` - Sort direction (asc/desc, default: desc)

## 📊 Database Schema

### Brand Categories

- RESTAURANT
- RETAIL
- HOTEL
- HEALTHCARE
- AUTOMOTIVE
- EDUCATION
- ENTERTAINMENT
- FITNESS
- BEAUTY
- TECHNOLOGY
- OTHER

### Weekdays

- MONDAY through SUNDAY

## 🛠️ Development Setup

The application uses mock data for development, stored in `src/brands/data/mock-brands.json`. This allows you to start developing immediately without setting up a database.

### Environment Variables

Create a `.env` file with:

```env
DATABASE_URL="file:./dev.db"
PORT=3000
NODE_ENV=development
```

## 🔗 Architecture

- **Repository Pattern**: Abstracted data access
- **Dependency Injection**: Proper IoC container usage
- **DTO Pattern**: Request/response validation
- **Service Layer**: Business logic separation
- **Type Safety**: Full TypeScript implementation

## 📝 Example Request

```json
POST /brands
{
  "name": "McDonald's",
  "logoUrl": "https://example.com/logo.png",
  "coverPhotosUrls": ["https://example.com/cover1.jpg"],
  "category": "RESTAURANT",
  "tag": "Fast Food",
  "brandUrlSlug": "mcdonalds",
  "about": "Global fast food chain",
  "contactDetails": {
    "phoneNumber": "+1234567890",
    "website": "https://mcdonalds.com",
    "email": "contact@mcdonalds.com"
  }
}
```

## 📈 Features

- ✅ Complete CRUD operations for brands
- ✅ Flexible opening hours (uniform or varied)
- ✅ Branch management with individual settings
- ✅ Menu management with validity periods
- ✅ Popular deals with like tracking
- ✅ Advanced search and filtering
- ✅ Pagination support
- ✅ Comprehensive mock data
- ✅ Type-safe API with validation
- ✅ Error handling and proper HTTP status codes
