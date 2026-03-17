import React from "react";
import { Link } from "react-router-dom";
import SiteHeader from "../components/SiteHeader";
import "../index.css";

const HomePage = () => {
  const savedUser = localStorage.getItem("user");
  const user = savedUser ? JSON.parse(savedUser) : null;

  return (
    <div className="homepage">
      <SiteHeader />

      <section className="hero">
        <div className="overlay">
          <h1>ĐẠI HỌC TỪ XA</h1>

          <ul>
            <li>Ứng dụng nền tảng Đại học số tiên tiến</li>
            <li>Tuyển sinh liên tục</li>
            <li>Xét duyệt hồ sơ dự tuyển</li>
            <li>Học tập trực tuyến</li>
            <li>Bằng cấp tương đương hệ chính quy</li>
          </ul>

          {user && <p className="login-success-text">Bạn đã đăng nhập thành công.</p>}

          <div className="hero-actions">
            <Link to="/consult">
              <button className="consult-btn">Tư vấn tuyển sinh</button>
            </Link>
            <Link to="/majors">
              <button className="secondary-btn">Xem ngành học</button>
            </Link>
          </div>
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1584697964403-3f9e8d47c3c3"
            alt="online learning"
          />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
