import express from 'express';
import cors from 'cors';
import { appConfig } from './config/config';
import { dataSource as db } from './config/database';
import bodyParser from 'body-parser';
import userRouter from './routes/user.router';
import advertisementRouter from './routes/advertisement.router';
import path from 'path';

const app = express();

app.use(cors());
app.use(express.json());
//app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/user', userRouter);
app.use('/api/advertisement', advertisementRouter);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use((req, res, next) => {
  console.log('Received headers:', req.headers);
  console.log('Received body:', req.body);
  next();
});
// Routes

db.initialize() 
  .then(() => {
    console.log('Database connection has been established successfully.');
    
    
    return db.synchronize(); 
  })
  .then(() => {
    console.log('Database synced successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

app.listen(appConfig.port, () => {
  console.log(`Server running at http://localhost:${appConfig.port}`);
});
