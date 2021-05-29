import { Router } from 'express';
import { getActors, getActorsStreak, updateActorAvatar } from './actorController';

const router = Router();

router.get('/actors', getActors);
router.get('/actors/streak', getActorsStreak);
router.put('/actors', updateActorAvatar);

export default router;
