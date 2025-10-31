# S.O.S Automotive Dashboard

A comprehensive automotive business management system built with React, TypeScript, Express.js, and PostgreSQL.

## 🚀 Features

### Frontend (React + TypeScript)
- **Modern Dashboard** - Real-time KPIs, revenue charts, and business metrics
- **Customer Management** - Individual and professional customers with vehicle tracking
- **Job Management** - Complete work order system with status tracking
- **Inventory Management** - Parts and services with stock alerts
- **Financial Management** - Invoicing, expenses, and revenue tracking
- **Reporting** - Comprehensive business analytics and reports
- **Multi-language Support** - English and French
- **Multi-currency Support** - USD, EUR, MAD
- **Responsive Design** - Works on desktop, tablet, and mobile

### Backend (Express.js + TypeScript)
- **RESTful API** - Complete CRUD operations for all business entities
- **JWT Authentication** - Secure user authentication with role-based access control
- **PostgreSQL Database** - Robust data persistence with Prisma ORM
- **Audit Logging** - Track all user actions and data changes
- **Data Backup** - Automated backup and restore functionality
- **Security** - Helmet, CORS, input validation, and password hashing

## 📋 Prerequisites

- **Node.js** 18+
- **PostgreSQL** 12+
- **npm** or **yarn**

## 🛠️ Quick Setup

### Option 1: Automated Setup (Recommended)
```bash
# Make setup script executable
chmod +x setup.sh

# Run setup script
./setup.sh
```

### Option 2: Manual Setup

#### 1. Install Dependencies
```bash
# Frontend dependencies
npm install

# Backend dependencies
cd backend
npm install
cd ..
```

#### 2. Database Setup
```bash
# Create PostgreSQL database
createdb sos_automotive_db

# Set up environment variables
cd backend
cp env.example .env
# Edit .env with your database credentials

# Generate Prisma client and push schema
npx prisma generate
npx prisma db push

# Seed database with initial data
npm run db:seed
```

#### 3. Start the Application
```bash
# Terminal 1: Start backend server
cd backend
npm run dev

# Terminal 2: Start frontend server
cd ..
npm run dev
```

## 🌐 Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/health

## 🔐 Default Login Credentials

- **Admin**: `admin@sos.com` / `admin123`
- **Technician**: `tech@sos.com` / `admin123`

## 📊 Database Management

### Backup Database
```bash
cd backend
npm run backup backup
```

### Restore Database
```bash
cd backend
npm run backup restore path/to/backup.sql
```

### Export Data
```bash
cd backend
npm run backup export
```

## 🏗️ Project Structure

```
s.o.s-automotive-dashboard/
├── components/           # React components
├── services/            # API services
├── store/              # State management
├── types.ts            # TypeScript definitions
├── utils/              # Utility functions
├── backend/            # Express.js backend
│   ├── src/
│   │   ├── routes/     # API routes
│   │   ├── middleware/ # Authentication & validation
│   │   ├── index.ts    # Main server file
│   │   ├── seed.ts     # Database seeding
│   │   └── backup.ts   # Backup system
│   ├── prisma/         # Database schema
│   └── README.md       # Backend documentation
└── README.md           # This file
```

## 🔧 Development

### Frontend Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

### Backend Development
```bash
cd backend
npm run dev          # Start development server with hot reload
npm run build        # Build TypeScript
npm start            # Start production server
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema changes
npm run db:migrate   # Create migration
npm run db:seed      # Seed database
```

## 🚀 Deployment

### Frontend Deployment
```bash
npm run build
# Deploy dist/ folder to your hosting service
```

### Backend Deployment
```bash
cd backend
npm run build
# Deploy dist/ folder and run with: npm start
```

### Environment Variables
Set these environment variables in production:

**Frontend (.env)**
```env
VITE_API_URL=https://your-api-domain.com/api
```

**Backend (.env)**
```env
NODE_ENV=production
PORT=5000
JWT_SECRET=your-super-secret-jwt-key
DATABASE_URL=postgresql://user:pass@host:port/db
FRONTEND_URL=https://your-frontend-domain.com
```

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Role-based Access Control** - Admin and Technician roles
- **Password Hashing** - bcrypt with configurable rounds
- **Input Validation** - Request validation middleware
- **Audit Logging** - Track all user actions
- **CORS Protection** - Configured for frontend origin
- **Helmet Security** - Security headers

## 📈 API Documentation

### Authentication Endpoints
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/me` - Update user profile
- `PUT /api/auth/change-password` - Change password
- `POST /api/auth/logout` - Logout

### Customer Endpoints
- `GET /api/customers` - List customers (with pagination)
- `GET /api/customers/:id` - Get customer details
- `POST /api/customers` - Create customer
- `PUT /api/customers/:id` - Update customer
- `DELETE /api/customers/:id` - Delete customer

### Job Endpoints
- `GET /api/jobs` - List jobs (with pagination)
- `GET /api/jobs/:id` - Get job details
- `POST /api/jobs` - Create job
- `PUT /api/jobs/:id` - Update job
- `DELETE /api/jobs/:id` - Delete job
- `PATCH /api/jobs/:id/status` - Update job status

## 🛠️ Customization

### Adding New Features
1. **Backend**: Add routes in `backend/src/routes/`
2. **Database**: Update Prisma schema in `backend/prisma/schema.prisma`
3. **Frontend**: Add components in `components/`
4. **Types**: Update TypeScript definitions in `types.ts`

### Styling
The application uses Tailwind CSS. Customize styles by:
- Modifying Tailwind classes in components
- Adding custom CSS in `index.css`
- Updating Tailwind configuration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Add tests if applicable
5. Commit your changes: `git commit -m 'Add feature'`
6. Push to the branch: `git push origin feature-name`
7. Submit a pull request

## 📝 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Contact the development team
- Check the documentation in `backend/README.md`

## 🎯 Roadmap

### Planned Features
- [ ] Mobile app (React Native)
- [ ] Real-time notifications (WebSocket)
- [ ] Advanced reporting with charts
- [ ] Integration with accounting software
- [ ] Multi-location support
- [ ] Customer portal
- [ ] Automated email notifications
- [ ] Barcode scanning for inventory
- [ ] Advanced search and filtering
- [ ] Data export/import tools

---

**Built with ❤️ for automotive businesses**