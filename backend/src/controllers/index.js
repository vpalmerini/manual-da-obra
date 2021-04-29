import { Router } from 'express';

const router = Router();

router.use('/auth', import('./auth.controller'));
router.use('/users', import('./user.controller'));
router.use('/constructions', import('./construction.controller'));
router.use('/constructions/:id', import('./system.controller'));
router.use('/constructions/:id/systems/:nickname/files', import('./file.controller'));

export default router;
