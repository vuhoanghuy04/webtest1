import React from "react";
import SiteHeader from "../components/SiteHeader";
import "../index.css";

const degrees = [
  {
    title: "Bằng cử nhân đại học",
    description:
      "Chương trình dành cho người học muốn hoàn thiện bằng cấp chính quy tương đương hệ đào tạo từ xa, linh hoạt thời gian và phù hợp người đang đi làm.",
    badge: "Linh hoạt thời gian",
  },
  {
    title: "Chứng chỉ kỹ năng số",
    description:
      "Bổ sung năng lực ứng dụng công nghệ, làm việc trực tuyến, phân tích dữ liệu và sử dụng công cụ số trong môi trường học tập và doanh nghiệp.",
    badge: "Ứng dụng thực tế",
  },
  {
    title: "Chứng nhận hoàn thành học phần",
    description:
      "Xác nhận từng học phần đã hoàn thành để người học dễ dàng tích lũy tín chỉ và theo dõi lộ trình học tập rõ ràng.",
    badge: "Tích lũy tín chỉ",
  },
];

const highlights = [
  "Bằng cấp có giá trị theo quy định hiện hành",
  "Phù hợp người đã đi làm hoặc cần học từ xa",
  "Học online nhưng vẫn có cố vấn học tập hỗ trợ",
  "Lộ trình học tập rõ ràng và minh bạch",
];

const DegreesPage = () => {
  return (
    <div className="info-page-wrapper">
      <SiteHeader />

      <section className="info-page-hero red-theme">
        <div>
          <p className="section-tag">BẰNG CẤP</p>
          <h1>Chương trình bằng cấp rõ ràng, hiện đại và phù hợp học từ xa</h1>
          <p>
            Nội dung hiển thị ngắn gọn để người dùng dễ xem nhanh, đồng bộ phong cách với
            trang chủ và phù hợp demo frontend.
          </p>
        </div>
      </section>

      <section className="info-content-section">
        <div className="info-grid three-cols">
          {degrees.map((degree) => (
            <article key={degree.title} className="info-card">
              <span className="card-badge">{degree.badge}</span>
              <h3>{degree.title}</h3>
              <p>{degree.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="info-content-section alt-bg">
        <div className="info-two-column">
          <div className="info-panel">
            <h2>Điểm nổi bật</h2>
            <ul className="feature-list">
              {highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="info-panel emphasis-panel">
            <h2>Thông điệp tuyển sinh</h2>
            <p>
              Học tập linh hoạt, nâng cao trình độ và nhận bằng cấp phù hợp với định hướng
              nghề nghiệp trong thời đại số.
            </p>
            <div className="stats-row">
              <div>
                <strong>100%</strong>
                <span>học trực tuyến</span>
              </div>
              <div>
                <strong>24/7</strong>
                <span>nền tảng học tập</span>
              </div>
              <div>
                <strong>4+</strong>
                <span>nhóm ngành nổi bật</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DegreesPage;
