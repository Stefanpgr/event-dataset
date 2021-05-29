import express from 'express'
import eventRoutes from '../components/events/eventRouter'
import actorRoutes from '../components/actor/actorRouter'

const Router = express.Router()

Router.use(eventRoutes)
Router.use(actorRoutes)

export default Router
