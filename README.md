<<<<<<< HEAD
# 🏢 Inventra IMS - Modern Inventory Management System
=======
# Inventra IMS
>>>>>>> 260cfc7fde369b4ac56fbf90698f60884783915a

A premium, full-stack Inventory Management System with AI-powered insights, real-time updates, and a beautiful glassmorphic UI.

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat-square&logo=next.js)
![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=flat-square&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=flat-square&logo=mongodb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=flat-square&logo=typescript)

## ✨ Features

### 🎨 Modern UI/UX
- **Glassmorphic Design**: Premium, modern interface with smooth animations
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile
- **Dark Mode Ready**: Fully themed with Tailwind CSS
- **Interactive Charts**: Real-time data visualization with Recharts

### 🤖 AI-Powered Features
- **AI Chatbot**: Intelligent assistant powered by Google Gemini AI
- **Daily Insights**: Automated business intelligence and recommendations
- **Natural Language**: Ask questions in plain English

### 📊 Dashboard & Analytics
- **Real-time KPIs**: Revenue, Orders, Products, Low Stock alerts
- **Interactive Charts**: Area charts, bar charts, and pie charts
- **Activity Feed**: Live updates on system events
- **Custom Reports**: Sales, inventory value, and category analysis

### 📦 Core Features
- **Inventory Management**: Track products with categories, UOM, and stock levels
- **Order Management**: Full order lifecycle from pending to delivered
- **Supplier Management**: Vendor relationships and contact information
- **User Authentication**: Secure JWT-based auth with social login (Google, GitHub)
- **Settings**: Profile management and preferences

### 🔄 Real-time Updates
- **Socket.io Integration**: Live stock updates across all clients
- **Instant Notifications**: Real-time alerts for low stock and critical events

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript 5.9
- **Styling**: Tailwind CSS 3.4
- **UI Components**: Radix UI, Lucide React
- **Charts**: Recharts 3.4
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Real-time**: Socket.io Client

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js 4.18
- **Database**: MongoDB (Mongoose 8.0)
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **AI Integration**: Google Generative AI (Gemini Pro)
- **Real-time**: Socket.io 4.7
- **Environment**: dotenv

## 📋 Prerequisites

- Node.js 18 or higher
- MongoDB Atlas account (or local MongoDB)
- Google Gemini API key (for AI features)

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/Hack-OdooSM.git
cd Hack-OdooSM
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:
```env
MONGO_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_here
PORT=5000
GEMINI_API_KEY=your_google_gemini_api_key_here
```

Start the backend server:
```bash
npm run dev
```

The server will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd client
npm install
```

Start the development server:
```bash
npm run dev
```

The app will run on `http://localhost:3000`

## 🔑 Environment Variables

### Server (.env)
| Variable | Description | Required |
|----------|-------------|----------|
| `MONGO_URI` | MongoDB connection string | ✅ Yes |
| `JWT_SECRET` | Secret key for JWT signing | ✅ Yes |
| `PORT` | Server port (default: 5000) | ❌ No |
| `GEMINI_API_KEY` | Google Gemini API key for AI features | ⚠️ Optional* |

*AI features (Chatbot & Insights) will not work without this key.

### Getting API Keys

#### MongoDB Atlas
1. Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get your connection string from "Connect" → "Connect your application"

#### Google Gemini API
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy and paste into your `.env` file

## 📁 Project Structure

```
Hack-OdooSM/
├── client/                 # Next.js Frontend
│   ├── src/
│   │   ├── app/           # App Router pages
│   │   │   ├── dashboard/ # Dashboard pages
│   │   │   ├── login/     # Auth pages
│   │   │   └── ...
│   │   ├── components/    # React components
│   │   │   ├── ui/        # Reusable UI components
│   │   │   ├── dashboard/ # Dashboard-specific
│   │   │   ├── landing/   # Landing page
│   │   │   └── ai/        # AI components
│   │   ├── context/       # React Context
│   │   └── lib/           # Utilities
│   └── package.json
│
├── server/                # Node.js Backend
│   ├── src/
│   │   ├── config/        # Database config
│   │   ├── controllers/   # Route controllers
│   │   ├── middleware/    # Auth middleware
│   │   ├── models/        # Mongoose models
│   │   ├── routes/        # API routes
│   │   └── index.js       # Entry point
│   └── package.json
│
└── README.md
```

## 🎯 Key Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page with features showcase |
| `/login` | User login with social auth |
| `/signup` | User registration |
| `/dashboard` | Main dashboard with KPIs and charts |
| `/dashboard/inventory` | Inventory management |
| `/dashboard/products` | Product catalog |
| `/dashboard/orders` | Order tracking |
| `/dashboard/suppliers` | Supplier management |
| `/dashboard/reports` | Analytics and reports |
| `/dashboard/settings` | User settings |

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/mock-login` - Social login (mock)
- `GET /api/auth/me` - Get current user

### AI Features
- `POST /api/ai/chat` - Chat with AI assistant
- `POST /api/ai/insights` - Get AI-generated insights

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

## 🎨 Design System

### Color Palette
- **Primary**: Vibrant blue gradient
- **Secondary**: Emerald green
- **Accent**: Purple, Amber
- **Background**: Dark navy with subtle gradients
- **Glass Effect**: Backdrop blur with transparency

### Typography
- **Font**: System fonts (optimized for performance)
- **Headings**: Bold, tracking-tight
- **Body**: Regular, muted foreground

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

Built with ❤️ for the Odoo Hackathon

## 🙏 Acknowledgments

- Google Gemini AI for intelligent features
- Radix UI for accessible components
- Recharts for beautiful data visualization
- MongoDB Atlas for cloud database
- Vercel for Next.js framework
