const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, User_Leave } = require('../models');
const { ApiError } = require('../middleware/ApiError');

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, role, address, grade, job_location, reporting_manager, joining_date } = req.body;

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      throw new ApiError(400, 'Email already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      address,
      grade,
      job_location,
      reporting_manager,
      joining_date,
    });

    // add leaves for user.
    await User_Leave.bulkCreate([
      {
      leave_type: 'Casual Leave',
      total_leave: 12,
      leave_balance: 12,
      user_id: newUser.id
    },
    {
      leave_type: 'Sick Leave',
      total_leave: 12,
      leave_balance: 12,
      user_id: newUser.id
    },
  ]
  );


    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new ApiError(401, 'Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new ApiError(401, 'Invalid email or password');
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY }
    );

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token
      },
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser, loginUser
}