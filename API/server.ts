import express from 'express';
import cors from 'cors';
import { appConfig } from './config/config';
import { dataSource as db } from './config/database';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
