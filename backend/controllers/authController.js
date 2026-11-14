import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || 'tezscale_secret_admin_jwt_key_2026_xyz',
    { expiresIn: '7d' }
  );
};

// @desc    Auth admin & get token
// @route   POST /api/auth/login
export const loginAdmin = async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;

    if (!usernameOrEmail || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email/username and password',
      });
    }

    // Auto-seed default admin if database has no admin yet
    let count = await Admin.countDocuments();
    if (count === 0) {
      await Admin.create({
        username: 'admin',
        email: 'admin@tezscale.com',
        password: 'admin123',
      });
      console.log('👤 Default admin account seeded (admin@tezscale.com / admin123)');
    }

    // Search by username or email
    const query = usernameOrEmail.toLowerCase().trim();
    const admin = await Admin.findOne({
      $or: [{ email: query }, { username: query }],
    });

    if (admin && (await admin.matchPassword(password))) {
      const token = generateToken(admin._id);
      return res.status(200).json({
        success: true,
        message: 'Login successful!',
        token,
        admin: {
          id: admin._id,
          username: admin.username,
          email: admin.email,
          role: admin.role,
        },
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Invalid email/username or password',
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during authentication',
      error: error.message,
    });
  }
};

// @desc    Get logged in admin profile
// @route   GET /api/auth/me
export const getAdminProfile = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      admin: req.admin,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching admin profile',
    });
  }
};
