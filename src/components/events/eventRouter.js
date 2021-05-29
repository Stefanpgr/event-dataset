import { Router } from 'express';
import {
  addEvent, eraseEvents, getEventByActorId, getEvents,
} from './eventController';

const router = Router();

router.delete('/erase', eraseEvents);
router.post('/events', addEvent);
router.get('/events', getEvents);
router.get('/events/actors/:actorID', getEventByActorId);

export default router;
