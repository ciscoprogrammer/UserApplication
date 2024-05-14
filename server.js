const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app); // Create HTTP server for socket.io
const io = socketIo(server); // Attach socket.io to the server
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Environment variables
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// WebSocket connection handler
io.on('connection', (socket) => {
    console.log('New WebSocket connection');

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

//To  Make io accessible in routes via req.app.locals.io
app.locals.io = io;

// To Import routes
const webhookRoutes = require('./routes/webhookRoutes'); 
app.use(webhookRoutes); // Setup webhook routes
app.use('/admin',adminRoutes);
app.use('/users', userRoutes);


// Server setup to use the HTTP server instance
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


