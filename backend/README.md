# Backend API

## Chức năng
- Đăng ký tài khoản
- Đăng nhập bằng JWT
- Gửi form tư vấn ngay
- Lưu dữ liệu tạm thời vào `data/db.json`

## Cài đặt
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

## API
### POST `/api/auth/register`
```json
{
  "fullName": "Nguyen Van A",
  "email": "a@gmail.com",
  "password": "123456",
  "confirmPassword": "123456"
}
```

### POST `/api/auth/login`
```json
{
  "email": "a@gmail.com",
  "password": "123456"
}
```

### POST `/api/consultations`
```json
{
  "fullName": "Nguyen Van A",
  "phone": "0912345678",
  "major": "Công nghệ thông tin",
  "notes": "Muốn học vào buổi tối"
}
```

Có thể truyền `Authorization: Bearer <token>` nếu người dùng đã đăng nhập.
