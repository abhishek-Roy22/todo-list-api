import 'dotenv/config';

import express from 'express';
import { userRoute } from './routes/userRoute.js';
import connectToDb from './connection.js';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT || 3000;
const DbUrl = process.env.MONGO_URL;

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/user', userRoute);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Connected to DB
connectToDb(DbUrl)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server is running at port: ${PORT} & Connedted to DB`);
    });
  })
  .catch((err) => {
    console.error(err.message);
  });
