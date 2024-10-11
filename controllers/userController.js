import { User } from '../models/userModel.js';

const handleSignup = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
  });
  return res.status(201).send(user);
};

export { handleSignup };
