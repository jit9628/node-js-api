const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.createUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    
    const newUser = {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword, 
      address: req.body.address,
      profile_image: req.file ? req.file.path : null,
      role: req.body.role
    };

    User.create(newUser, (err, result) => {
      if (err) {
        return res.status(500).send('Error creating user');
      }
      res.status(201).send('User created successfully');
    });
  } catch (error) {
    res.status(500).send('Error hashing password');
  }
};

exports.getAllUsers = (req, res) => {
  User.getAll((err, results) => {
    if (err) {
      return res.status(500).send('Error retrieving users');
    }
    res.json(results);
  });
};

exports.getUserById = (req, res) => {
  const userId = req.params.id;
  User.getById(userId, (err, result) => {
    if (err) {
      return res.status(500).send('Error retrieving user');
    }
    if (result.length === 0) {
      return res.status(404).send('User not found');
    }
    res.json(result[0]);
  });
};

exports.updateUserById = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10); 

    const userId = req.params.id;
    const updatedUser = {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword, 
      address: req.body.address,
      profile_image: req.file ? req.file.path : null,
      role: req.body.role
    };

    User.updateById(userId, updatedUser, (err, result) => {
      if (err) {
        return res.status(500).send('Error updating user');
      }
      res.send('User updated successfully');
    });
  } catch (error) {
    res.status(500).send('Error hashing password');
  }
};

exports.deleteUserById = (req, res) => {
  const userId = req.params.id;

  User.deleteById(userId, (err, result) => {
    if (err) {
      return res.status(500).send('Error deleting user');
    }
    res.send('User deleted successfully');
  });
};


exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    User.findByEmail(email, async (err, user) => {
      if (err || !user) {
        return res.status(400).send('Invalid email or password');
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).send('Invalid email or password');
      }
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' } 
      );

      res.cookie('token', token, {
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production', 
        maxAge: 3600000 
      });

      res.status(200).json({ message: 'SignIn successful', token: token });
    });
  } catch (error) {
    console.error('Server Error:', error); 
    res.status(500).send('Server error');
  }
};


