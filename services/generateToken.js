import jwt from 'jsonwebtoken';

const secretKey = 'HelloWorld';

const createToken = (user) => {
  const payload = {
    _id: user._id,
    name: user.name,
    email: user.email,
  };
  const token = jwt.sign(payload, secretKey);
  return token;
};

const verifyToken = (token) => {
  const payload = jwt.verify(token, secretKey);
  return payload;
};

export { createToken, verifyToken };
