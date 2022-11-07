import express from 'express';
import apiRoutes from './routes/app.routes';
import { HTTP_STATUS } from './constants/api.constants';
import logger from "./middleware/logger.middleware";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger);

// Routes
app.use('/api', apiRoutes)
app.use('*', (req, res) => {
    res.status(HTTP_STATUS.NOT_FOUND).send('Not found');
})

export default app;