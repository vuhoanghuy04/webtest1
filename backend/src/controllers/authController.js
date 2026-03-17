import { loginUser, registerUser } from '../services/authService.js';

export async function register(req, res, next) {
  try {
    const result = await registerUser(req.body);
    res.status(201).json({
      message: 'Đăng ký tài khoản thành công.',
      ...result,
    });
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const result = await loginUser(req.body);
    res.status(200).json({
      message: 'Đăng nhập thành công.',
      ...result,
    });
  } catch (error) {
    next(error);
  }
}
