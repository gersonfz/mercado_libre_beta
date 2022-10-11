const express = require('express')
const path = require('path')
const apiRoutes = require('../routers/app.routes')
const ProductsConstructor = require('../model/productsConstructor')
const MessageConstructor = require('../model/messageConstructor')
const { Server: HttpServer } = require('http')
const { Server: SocketServer } = require('socket.io')


const PORT = process.env.PORT || 8080
const app = express()
const httpServer = new HttpServer(app)
const io = new SocketServer(httpServer)

const productsApi = new ProductsConstructor(path.resolve(__dirname, '../data/product.json'))
const messageSocket = new MessageConstructor(path.resolve(__dirname, '../data/message.json'))


// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'))


// Routes
app.use('/api', apiRoutes)



// Socket Events
io.on('connection', async (socket) => {
    console.log("New client connection!");

    // Emit products
    socket.emit('products', await productsApi.getAll())

    // Update Products
    socket.on('update', async products => {
        io.sockets.emit('products', await productsApi.save(products)
        );
    })

    // Emit message
    socket.emit('message', await messageSocket.getAll());

    // Update Message
    socket.on('newMessage', async message => {
        message.time = new Date().toLocaleString()
        await messageSocket.save(message)
        io.sockets.emit('message', await messageSocket.getAll());
    })
});

// Listen
httpServer.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
})

httpServer.on('error', (error) => {
    console.log(error.message);
})