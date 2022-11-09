import express from 'express';
import apiRoutes from './routes/app.routes';
import logger from "./middleware/logger.middleware";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger);

// Routes
app.use('/api', apiRoutes)

export default app;