import React, { useState } from "react";
import { toast } from "sonner";
import api from "../lib.api";
import "../index.css";

const majors = [
  "Công nghệ thông tin",
  "Quản trị kinh doanh",
  "Kỹ thuật điện tử viễn thông",
  "An toàn thông tin",
];

const ConsultPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    major: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await api.post("/consultations", formData);
      toast.success(response.data.message);
      setFormData({ fullName: "", phone: "", major: "", notes: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Gửi tư vấn thất bại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="consult-container">
      <div className="consult-card">
        <h2>ĐẠI HỌC TỪ XA</h2>
        <p>HỌC VIỆN CÔNG NGHỆ BƯU CHÍNH VIỄN THÔNG</p>

        <form className="consult-form" onSubmit={handleSubmit}>
          <input
            name="fullName"
            type="text"
            placeholder="Nhập họ tên"
            value={formData.fullName}
            onChange={handleChange}
          />

          <input
            name="phone"
            type="text"
            placeholder="Nhập số điện thoại"
            value={formData.phone}
            onChange={handleChange}
          />

          <select name="major" value={formData.major} onChange={handleChange}>
            <option value="">Chọn ngành đăng ký dự tuyển</option>
            {majors.map((major) => (
              <option key={major} value={major}>
                {major}
              </option>
            ))}
          </select>

          <textarea
            className="consult-textarea"
            name="notes"
            placeholder="Ghi chú thêm nếu có"
            value={formData.notes}
            onChange={handleChange}
          />

          <button className="consult-submit" type="submit" disabled={loading}>
            {loading ? "Đang gửi..." : "Gửi"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConsultPage;
