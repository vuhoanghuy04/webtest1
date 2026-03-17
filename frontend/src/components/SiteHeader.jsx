import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const SiteHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const savedUser = localStorage.getItem("user");
  const user = savedUser ? JSON.parse(savedUser) : null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Bạn đã đăng xuất.");
    navigate("/");
    window.location.reload();
  };

  const navItems = [
    { to: "/", label: "Trang chủ" },
    { to: "/degrees", label: "Bằng cấp" },
    { to: "/majors", label: "Ngành học" },
    { to: "/consult", label: "Tư vấn tuyển sinh" },
  ];

  return (
    <header className="header">
      <div className="logo">
        <h2>HỌC VIỆN CÔNG NGHỆ BƯU CHÍNH VIỄN THÔNG</h2>
        <span>Posts and Telecommunications Institute of Technology</span>
      </div>

      <nav className="nav nav-auth">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={location.pathname === item.to ? "nav-link active-nav-link" : "nav-link"}
          >
            {item.label}
          </Link>
        ))}

        {user ? (
          <>
            <span className="user-badge">Xin chào, {user.fullName}</span>
            <button className="logout-btn" onClick={handleLogout}>
              Đăng xuất
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Đăng nhập</Link>
            <Link to="/register">
              <button className="register-btn">Đăng ký ngay</button>
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default SiteHeader;
