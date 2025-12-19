const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');

const handleErrors = (err) => {
  let errors = { email: '', password: '' };

  if (err.code === 11000) {
    errors.email = 'That email already exists';
    return errors;
  }

  if (err.message === 'Incorrect Email') {
    errors.email = 'Email Invalid';
  }

  if (err.message === 'Incorrect Password') {
    errors.password = 'Wrong Password';
  }

  if (err.message.includes('User validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

const maxAge = 1000 * 60 * 60 * 24;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};

const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const user = await User.create({ name, email, password, role });

    const token = createToken(user._id);

    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    });
    res.status(200).json({ user: user._id, role: user.role });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);

    const token = createToken(user._id);
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    });

    res.status(200).json({ user: user._id, role: user.role });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};

const getDetailsOfMe = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);

    res
      .status(200)
      .json({ name: user.name, email: user.email, role: user.role });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};

module.exports = { createUser, loginUser, getDetailsOfMe };
