import express from 'express';
import cors from 'cors';

import { getAllRecords } from '../controllers/records.js';

const router = express.Router();

router.get('/:domain', cors(), getAllRecords);

export default router;