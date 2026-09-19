import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'अनधिकृत प्रवेश. कृपया लॉगिन करा.',
      error: 'अनधिकृत प्रवेश. कृपया लॉगिन करा.'
    });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'login_computer_centre_default_jwt_secret');
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'लॉगिन सत्र संपले आहे किंवा चुकीचे आहे.',
      error: 'लॉगिन सत्र संपले आहे किंवा चुकीचे आहे.'
    });
  }
};
