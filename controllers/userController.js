import { User } from '../models/userModel.js';

const handleSignup = async (req, res) => {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  return res.status(201).redirect('/user/signin');
};

const handleSignin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await User.matchPassword(email, password);

    return res
      .cookie('token', token, { httpOnly: true, secure: true })
      .redirect('/');
  } catch (error) {
    res.status(404).render('signin', {
      error: error.messgae,
    });
    console.log(error.message);
  }
};

const handleLogout = (req, res) => {
  res.clearCookie('token').redirect('/');
};

export { handleSignup, handleSignin, handleLogout };
