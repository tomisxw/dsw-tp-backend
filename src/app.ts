import express, { NextFunction, Request, Response } from 'express'
import { vueloRouter } from './routes/vuelo.routes.js'
import { clienteRouter } from './routes/cliente.routes.js'

const port = 3000

const app = express()
app.use(express.json())
app.use('/api/vuelos', vueloRouter)
app.use('/api/clientes', clienteRouter)

app.use((req, res) => {
    return res.status(404).send({message:'Resource not found'})
})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})

