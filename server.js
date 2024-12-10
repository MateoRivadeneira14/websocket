const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

// Configuración básica
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Servir archivos estáticos
app.use(express.static('public'));

// Escuchar conexiones de WebSocket
io.on('connection', (socket) => {
    console.log('Un usuario se ha conectado');

    // Escuchar un evento personalizado
    socket.on('mensaje', (data) => {
        console.log('Mensaje recibido:', data);

        // Enviar un mensaje de vuelta a todos los clientes
        io.emit('mensaje', data);
    });

    // Detectar desconexión
    socket.on('disconnect', () => {
        console.log('Un usuario se ha desconectado');
    });
});

// Iniciar el servidor
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
