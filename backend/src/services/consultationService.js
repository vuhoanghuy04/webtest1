import { v4 as uuidv4 } from 'uuid';
import { readDb, writeDb } from './dbService.js';
import { httpError } from '../utils/httpError.js';

const validMajors = [
  'Công nghệ thông tin',
  'Quản trị kinh doanh',
  'Kỹ thuật điện tử viễn thông',
  'An toàn thông tin',
];

export async function createConsultation({ fullName, phone, major, notes }, user) {
  if (!fullName || !phone || !major) {
    throw httpError('Vui lòng điền họ tên, số điện thoại và ngành học.', 400);
  }

  if (!/^0\d{9,10}$/.test(phone.trim())) {
    throw httpError('Số điện thoại không hợp lệ.', 400);
  }

  if (!validMajors.includes(major)) {
    throw httpError('Ngành đăng ký không hợp lệ.', 400);
  }

  const consultation = {
    id: uuidv4(),
    fullName: fullName.trim(),
    phone: phone.trim(),
    major,
    notes: notes?.trim() || '',
    createdAt: new Date().toISOString(),
    createdBy: user ? { id: user.sub, email: user.email, fullName: user.fullName } : null,
  };

  const db = await readDb();
  db.consultations.push(consultation);
  await writeDb(db);

  return consultation;
}

export async function getConsultations() {
  const db = await readDb();
  return db.consultations.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}
