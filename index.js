import express from 'express';

import recordsRoutes from './routes/records.js'
import whoisRoutes from './routes/whois.js'

const app = express();
const PORT = 5005;

app.use('/records', recordsRoutes);

app.use('/whois', whoisRoutes);

app.listen(PORT, () => console.log("server running"));