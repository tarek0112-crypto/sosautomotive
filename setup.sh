#!/bin/bash

# S.O.S Automotive Dashboard - Setup Script
# This script helps set up both frontend and backend

echo "🚀 Setting up S.O.S Automotive Dashboard..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL is not installed. Please install PostgreSQL 12+ first."
    exit 1
fi

echo "✅ Prerequisites check passed"

# Setup Backend
echo "🔧 Setting up backend..."
cd backend

# Install dependencies
echo "📦 Installing backend dependencies..."
npm install

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp env.example .env
    echo "⚠️  Please edit backend/.env with your database credentials"
fi

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

echo "✅ Backend setup complete"

# Setup Frontend
echo "🔧 Setting up frontend..."
cd ..

# Install dependencies
echo "📦 Installing frontend dependencies..."
npm install

echo "✅ Frontend setup complete"

echo ""
echo "🎉 Setup complete! Next steps:"
echo ""
echo "1. 📝 Edit backend/.env with your database credentials:"
echo "   DATABASE_URL=\"postgresql://username:password@localhost:5432/sos_automotive_db?schema=public\""
echo ""
echo "2. 🗄️  Create PostgreSQL database:"
echo "   createdb sos_automotive_db"
echo ""
echo "3. 🚀 Push database schema:"
echo "   cd backend && npx prisma db push"
echo ""
echo "4. 🌱 Seed database with initial data:"
echo "   cd backend && npm run db:seed"
echo ""
echo "5. 🚀 Start the backend server:"
echo "   cd backend && npm run dev"
echo ""
echo "6. 🚀 Start the frontend server (in a new terminal):"
echo "   npm run dev"
echo ""
echo "7. 🌐 Open http://localhost:3000 in your browser"
echo ""
echo "🔐 Default login credentials:"
echo "   Admin: admin@sos.com / admin123"
echo "   Technician: tech@sos.com / admin123"
echo ""
echo "📚 For more information, see backend/README.md"






