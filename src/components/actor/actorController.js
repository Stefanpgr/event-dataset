/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-undef */
import asyncHandler from '../../middlewares/async';
import EventModel from '../events/eventModel';
import { filterAndRemoveDuplicates } from '../../helpers'

export const updateActorAvatar = asyncHandler(async (req, res) => {
  const { id, avatar_url } = req.body

  const event = await EventModel.findOne({ 'actor.id': Number(id) })

  if (!event) return res.status(404).json({ message: 'Event with actorId not found.' });
  event.set({
    'actor.avatar_url': avatar_url,
  })

  await event.save()

  return res.status(200).json();
})

export const getActors = asyncHandler(async (req, res) => {
  const events = await EventModel.find()
    .sort({ actor: -1, created_at: -1, 'actor.login': 1 })

  const actors = await filterAndRemoveDuplicates(events)

  return res.status(200).json(actors);
})

export const getActorsStreak = asyncHandler(async (req, res) => {
  const events = await EventModel.find().sort({ created_at: -1, 'actor.login': 1 })
  const actors = await fiterAndRemoveDuplicates(events)

  return res.status(200).json(actors);
})
