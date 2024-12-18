import express from 'express'
import { UsuarioRouter } from './routes/usuario.routes.js'
import { AvionRouter } from './routes/avion.routes.js'
import { AeropuertoRouter } from './routes/aeropuerto.routes.js'
import { VueloRouter } from './routes/vuelo.routes.js'
import { MantenimientoRouter } from './routes/mantenimiento.routes.js';
import cors from 'cors'
import { PasajeRouter } from './routes/pasaje.routes.js'
import { LocalidadRouter } from './routes/localidad.routes.js'
import { ProvinciaRouter } from './routes/provincia.routes.js'


const app = express()
const port = 3000

app.use(cors({
    origin: 'http://localhost:4200'  
  }));



app.use(express.json())


app.use('/api/usuario', UsuarioRouter);
app.use('/api/avion', AvionRouter);
app.use('/api/aeropuerto', AeropuertoRouter);
app.use('/api/localidad', LocalidadRouter);
app.use('/api/provincia', ProvinciaRouter);
app.use('/api/vuelo', VueloRouter);
app.use('/api/mantenimiento', MantenimientoRouter);
app.use('/api/pasaje', PasajeRouter);


app.use((req, res) => {
    return res.status(404).json({message:'NO HAY NADA'})
})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})