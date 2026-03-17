import { v4 as uuidv4 } from 'uuid';
import { httpError } from '../utils/httpError.js';
import { getPool } from './mysqlService.js';

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

  const id = uuidv4();
  const createdAt = new Date();

  const createdBy = user
    ? { id: user.sub, email: user.email, fullName: user.fullName }
    : null;

  const pool = getPool();

  await pool.execute(
    `INSERT INTO consultations
      (id, full_name, phone, major, notes, created_at, created_by_user_id, created_by_email, created_by_full_name)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      fullName.trim(),
      phone.trim(),
      major,
      notes?.trim() || '',
      createdAt,
      createdBy?.id ?? null,
      createdBy?.email ?? null,
      createdBy?.fullName ?? null,
    ]
  );

  return {
    id,
    fullName: fullName.trim(),
    phone: phone.trim(),
    major,
    notes: notes?.trim() || '',
    createdAt: createdAt.toISOString(),
    createdBy,
  };
}

export async function getConsultations() {
  const pool = getPool();

  const [rows] = await pool.execute(
    `SELECT
      id,
      full_name AS fullName,
      phone,
      major,
      notes,
      created_at AS createdAt,
      created_by_user_id AS createdByUserId,
      created_by_email AS createdByEmail,
      created_by_full_name AS createdByFullName
    FROM consultations
    ORDER BY created_at DESC`
  );

  return rows.map((r) => ({
    id: r.id,
    fullName: r.fullName,
    phone: r.phone,
    major: r.major,
    notes: r.notes || '',
    createdAt: new Date(r.createdAt).toISOString(),
    createdBy: r.createdByUserId
      ? { id: r.createdByUserId, email: r.createdByEmail, fullName: r.createdByFullName }
      : null,
  }));
}