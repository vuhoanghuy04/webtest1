import jwt from 'jsonwebtoken';

export function optionalAuth(req, _res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    req.user = null;
    return next();
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET || 'super_secret_key_change_me'
    );
    req.user = payload;
    next();
  } catch (_error) {
    req.user = null;
    next();
  }
}
