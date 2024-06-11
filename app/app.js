import express from 'express';
import userRoutes from '../routes/userRoutes.js';
import productRoutes from '../routes/productRoutes.js';
import { globalErrHandler, notFound } from '../middlewares/globalErrHandler.js';
const app = express();
// MIDDLEWARES
// pass the incoming data
//
app.use(express.json());
// ROUTES
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/product', productRoutes);
//
// error middleware below the routes
app.use(notFound);
app.use(globalErrHandler);
//
//
export default app;
