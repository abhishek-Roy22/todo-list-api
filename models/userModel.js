import { model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import { createToken } from '../services/generateToken.js';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next;

  const salt = await bcrypt.genSalt(10); // Generate Salt
  this.password = await bcrypt.hash(this.password, salt); // hash the password with the salt
  next();
});

userSchema.static('matchPassword', async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) throw new Error('User not found');

  const hashPassword = user.password;

  // Compare the provided password with the hashed password
  const isMatch = await bcrypt.compare(password, hashPassword);

  if (!isMatch) throw new Error('Invalid Password');

  const token = createToken(user);
  return token;
});

export const User = model('User', userSchema);
