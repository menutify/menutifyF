// server.js
const express = require('express')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express()
const PORT = 3000
const SECRET_KEY = 'your_secret_key' // Cambia esto por una clave secreta

// Middleware
app.use(cors({ origin: 'http://localhost:3001', credentials: true })) // Ajusta el origen si es necesario
app.use(express.json())
app.use(cookieParser())

// Ruta de login
app.post('/login', (req, res) => {
  // Obtenemos la IP del cliente
  const ip = req.ip // O req.connection.remoteAddress si no funciona correctamente
  // Obtenemos el User-Agent del navegador
  const userAgent = req.headers['user-agent']
  const { userAgent: explicitUserAgent } = req.body

  console.log('Datos enviados por login', { userAgent, explicitUserAgent, ip })
  // Información que queremos almacenar en el token
  const payload = {
    id: '12345', // Este sería el ID del usuario real
    ip,
    userAgent
  }

  // Generamos el token
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '4h' })

  // Guardamos el token en una cookie HttpOnly
  res.cookie('authToken', token, {
    httpOnly: true,
    secure: false, // Cambia a true si estás usando HTTPS
    maxAge: 4 * 60 * 60 * 1000 // 4 horas en milisegundos
  })

  res.json({ message: 'Login exitoso' })
})

// Middleware de autenticación
const authenticateToken = (req, res, next) => {
  const token = req.cookies.authToken
  if (!token) return res.status(401).json({ message: 'Token no encontrado' })

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err)
      return res.status(403).json({ message: 'Token inválido o expirado' })

    const currentUserAgent = req.headers['user-agent']
    const currentIp = req.ip

    // Verificamos si el User-Agent y la IP del token coinciden con los de la solicitud actual
    if (decoded.userAgent !== currentUserAgent || decoded.ip !== currentIp) {
      return res.status(403).json({ message: 'Autenticación inválida' })
    }

    req.user = decoded
    next()
  })
}

// Ruta protegida
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Acceso permitido', user: req.user })
})

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`)
})
