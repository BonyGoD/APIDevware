import cors from 'cors'

const ACCEPTED_ORIGINS = ['http://localhost:3000', 'https://dev-ware.netlify.app', 'http://localhost:5173', 'https://www.grifolls.es', 'https://www.devware.es'] // <== Añadir el dominio de producción aquí TODO

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) =>
  cors({
    origin: (origin, callback) => {
      if (ACCEPTED_ORIGINS.includes(origin)) {
        return callback(null, true)
      }

      if (!origin) {
        return callback(null, true)
      }
      return callback(new Error('Not allowed by CORS'))
    }
  })