import asyncHandler from '../../middlewares/async'
import EventModel from './eventModel'

export const eraseEvents = asyncHandler(async (req, res) => {
  await EventModel.deleteMany({})
  return res.status(200).json();
})

export const addEvent = asyncHandler(async (req, res) => {
  const chkIfExist = await EventModel.findOne({ id: req.body.id })
  if (chkIfExist) return res.status(400).json({ message: 'Event with id already exists.' });

  const event = await EventModel.create(req.body)
  return res.status(201).json(event);
})

export const getEvents = asyncHandler(async (req, res) => {
  const events = await EventModel.find().sort({ id: 1 })
  return res.status(200).json(events);
})

export const getEventByActorId = asyncHandler(async (req, res) => {
  const { actorID } = req.params
  const event = await EventModel.find({ 'actor.id': Number(actorID) }).sort({ id: 1 })

  return res.status(200).json(event);
})
