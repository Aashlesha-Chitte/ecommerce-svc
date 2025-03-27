# E-Commerce Backend Application

## Project Overview
A TypeScript-based backend service for an e-commerce application, featuring CRUD operations and deployed on Vercel.

## Tech Stack
- TypeScript
- Express.js
- JSON Web Token (JWT) for authentication
- Bcrypt for password hashing

## Prerequisites
- Node.js (v16+ recommended)
- npm or yarn
- Vercel account
- MongoDB Atlas or local MongoDB instance

## Project Structure
```
project-root/
│
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── index.ts
│
├── dist/              # Compiled TypeScript files
├── vercel.json        # Vercel deployment configuration
├── tsconfig.json      # TypeScript configuration
├── package.json
└── .env               # Environment variables
```

## Local Development

### Installation
```bash
# Clone the repository
git clone https://your-repo-url.git

# Navigate to project directory
cd your-project-directory

# Install dependencies
npm install
```

### Available Scripts
- `npm run dev`: Start development server with nodemon
- `npm start`: Start production server
- `npm run build`: Compile TypeScript to JavaScript
- `npm run lint`: Run linter
- `npm test`: Run tests (currently not configured)

## Vercel Deployment

### Vercel Configuration (vercel.json)
```json
{
  "version": 2,
  "builds": [
    {
      "src": "dist/index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "dist/index.js"
    }
  ]
}
```

### Deployment Steps
1. Ensure all environment variables are set in Vercel
2. Push your code to the connected GitHub repository
3. Vercel will automatically deploy your application

## Key Features
- User Authentication
- Product Management
- Add to cart feature
- Secure API Endpoints

## API Endpoints
- `/api/users`: User registration and authentication
- `/api/products`: Product CRUD operations

## Security Measures
- Password hashing with bcrypt
- JWT-based authentication
- Input validation with express-validator
- CORS configuration

## Performance Optimization
- TypeScript for type safety
- Minimal middleware usage

## Troubleshooting
- Verify environment variables
- Ensure all dependencies are correctly installed

## Future Improvements
- Add comprehensive test coverage
- Implement more advanced error handling
- Add advanced caching mechanisms

## Dependencies Overview
- Express: Web framework
- JSONWebToken: Authentication
- Bcrypt: Password hashing
- Cors: Cross-origin resource sharing
- Dotenv: Environment variable management

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Resources
- [Vercel Documentation](https://vercel.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Express.js Guide](https://expressjs.com/)