import 'core-js/stable'
import 'regenerator-runtime/runtime'
import express from 'express'
import morgan from 'morgan'
import { config } from 'dotenv'
import { log } from 'debug'
import cors from 'cors'
import mongoose from 'mongoose'

config()
const app = express()

const port = process.env.PORT || 4000

mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
mongoose.set('useUnifiedTopology', true)

const DB_URL = process.env.MONGO_URI

mongoose.connect(
  DB_URL,
  {
    auth: { authSource: 'admin' },
    user: process.env.DB_USER,
    pass: process.env.DB_USER_PASS,
    // useMongoClient: true,
  },
  (error) => {
    // eslint-disable-next-line no-unused-expressions
    !error ? log('Connected to database') : log('An error occurred while connecting to database: ', error.message)
  },
)
app.use(cors())

app.use((req, res, next) => {
  req.socket.setKeepAlive()
  next()
})

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// app.use(Router)

app.use((req, res, next) => {
  const error = new Error('Your request could not be found')
  error.status = 404
  next(error)
})
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, _next) => {
  const { message } = error
  res.status(error.status || 500).send({
    message,
  })
})

app.listen(port, () => log('app started at port', port))
export default app
