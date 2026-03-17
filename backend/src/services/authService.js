import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { readDb, writeDb } from './dbService.js';
import { httpError } from '../utils/httpError.js';

function signToken(user) {
  return jwt.sign(
    {
      sub: user.id,
      email: user.email,
      fullName: user.fullName,
    },
    process.env.JWT_SECRET || 'super_secret_key_change_me',
    { expiresIn: '7d' }
  );
}

function sanitizeUser(user) {
  const { password, ...safeUser } = user;
  return safeUser;
}

export async function registerUser({ fullName, email, password, confirmPassword }) {
  if (!fullName || !email || !password || !confirmPassword) {
    throw httpError('Vui lòng nhập đầy đủ thông tin.', 400);
  }

  if (password.length < 6) {
    throw httpError('Mật khẩu phải có ít nhất 6 ký tự.', 400);
  }

  if (password !== confirmPassword) {
    throw httpError('Mật khẩu xác nhận không khớp.', 400);
  }

  const normalizedEmail = email.trim().toLowerCase();
  const db = await readDb();
  const existingUser = db.users.find((user) => user.email === normalizedEmail);

  if (existingUser) {
    throw httpError('Email đã được đăng ký.', 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: uuidv4(),
    fullName: fullName.trim(),
    email: normalizedEmail,
    password: hashedPassword,
    createdAt: new Date().toISOString(),
  };

  db.users.push(newUser);
  await writeDb(db);

  return {
    user: sanitizeUser(newUser),
    token: signToken(newUser),
  };
}

export async function loginUser({ email, password }) {
  if (!email || !password) {
    throw httpError('Vui lòng nhập email và mật khẩu.', 400);
  }

  const normalizedEmail = email.trim().toLowerCase();
  const db = await readDb();
  const user = db.users.find((item) => item.email === normalizedEmail);

  if (!user) {
    throw httpError('Email hoặc mật khẩu không đúng.', 401);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw httpError('Email hoặc mật khẩu không đúng.', 401);
  }

  return {
    user: sanitizeUser(user),
    token: signToken(user),
  };
}
