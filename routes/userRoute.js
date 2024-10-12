import { Router } from 'express';
import {
  handleSignin,
  handleSignup,
  handleLogout,
} from '../controllers/userController.js';

const userRoute = Router();

userRoute.get('/signup', (req, res) => {
  res.send('SignUp page');
});

userRoute.get('/signin', (req, res) => {
  res.send('SingIn page');
});

userRoute.post('/signup', handleSignup);
userRoute.post('/signin', handleSignin);
userRoute.get('/logout', handleLogout);

export { userRoute };
