import express from 'express';
import cors from 'cors';

import { getWhois } from '../controllers/whois.js';

const router = express.Router();

router.get('/:domain', cors(), getWhois);

export default router;