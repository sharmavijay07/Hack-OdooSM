require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const operationRoutes = require('./routes/operationRoutes');
const warehouseRoutes = require('./routes/warehouseRoutes');
const locationRoutes = require('./routes/locationRoutes');
const ledgerRoutes = require('./routes/ledgerRoutes');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/ai', require('./routes/aiRoutes')); // AI Routes
app.use('/api/products', productRoutes);
app.use('/api/operations', operationRoutes);
app.use('/api/warehouses', warehouseRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/ledger', ledgerRoutes);

app.get('/', (req, res) => {
    res.send('Inventory Management System API is running...');
});

// Socket.io Connection
io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

// Make io accessible in routes
app.set('io', io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
