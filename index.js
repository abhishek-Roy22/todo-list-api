import 'dotenv/config';

import express from 'express';
import { userRoute } from './routes/userRoute.js';
import connectToDb from './connection.js';
import cookieParser from 'cookie-parser';
import authenticateCookie from './middleware/auth.js';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;
const DbUrl = process.env.MONGO_URL;

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(authenticateCookie('token'));
// app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.render('Home', {
    user: req.user,
  });
});

app.use('/user', userRoute);

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
