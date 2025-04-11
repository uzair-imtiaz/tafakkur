import { Router } from 'express';

import { register, login } from './authentication.controller';
import { catchAsync } from '#utils/catchAsync.js';

const router = Router();

router.post('/register', catchAsync(register));
router.post('/login', catchAsync(login));

export default router;