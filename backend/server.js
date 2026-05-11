require('dotenv').config()
const express = require('express')
const cors = require('cors')
const http = require('http')
const { Server } = require('socket.io')
const mongoose = require('mongoose')

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] }
})

app.use(cors())
app.use(express.json())

// Routes
app.use('/api/animals', require('./routes/animals'))
app.use('/api/adoption', require('./routes/adoption'))

app.get('/api/health', (req, res) => res.json({ status: 'ok', app: 'PawMatch' }))

// Socket.io chat
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id)
  socket.on('send_message', (data) => {
    socket.broadcast.emit('receive_message', data)
  })
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id)
  })
})

// DB + Server
const PORT = process.env.PORT || 3001
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/pawmatch'

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected')
    server.listen(PORT, () => console.log(`PawMatch backend running on port ${PORT}`))
  })
  .catch(err => {
    console.error('DB connection error:', err.message)
    // Start without DB for demo purposes
    server.listen(PORT, () => console.log(`PawMatch backend running on port ${PORT} (no DB)`))
  })
