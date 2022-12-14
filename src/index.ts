import express from 'express'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc'
import rateLimiterMiddleware from '@middlewares/rate-limiter'
import { callRouter, usersRouter } from '@routes/index'

const app = express()
const HOST = process.env.HOST !== undefined ? process.env.HOST : '127.0.0.1'
const PORT = process.env.PORT !== undefined ? process.env.PORT : 5000

// Middlewares
app.use(rateLimiterMiddleware)
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Express Template API DOCS',
      version: '0.0.1',
      description: 'A sample API'
    }
  },
  apis: ['./src/routes/**/*.ts']
}

const swaggerDocument = swaggerJsDoc(swaggerOptions)

app.use('/api-docs/', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use('/users/', usersRouter)
app.use('/call/', callRouter)

app.listen(PORT, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`)
})
