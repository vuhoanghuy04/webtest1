import React from "react";
import SiteHeader from "../components/SiteHeader";
import "../index.css";

const majors = [
  {
    title: "Công nghệ thông tin",
    description: "Tập trung lập trình, web, phần mềm và kỹ năng triển khai dự án số.",
  },
  {
    title: "Quản trị kinh doanh",
    description: "Trang bị kiến thức quản trị, marketing, vận hành và phát triển doanh nghiệp.",
  },
  {
    title: "Kỹ thuật điện tử viễn thông",
    description: "Phù hợp người học yêu thích mạng viễn thông, thiết bị điện tử và hệ thống số.",
  },
  {
    title: "An toàn thông tin",
    description: "Nền tảng về bảo mật hệ thống, an ninh mạng và kỹ năng phòng chống rủi ro số.",
  },
];

const MajorsPage = () => {
  return (
    <div className="info-page-wrapper">
      <SiteHeader />

      <section className="info-page-hero dark-theme">
        <div>
          <p className="section-tag">NGÀNH HỌC</p>
          <h1>Những ngành học nổi bật dành cho chương trình đại học từ xa</h1>
          <p>
            Giao diện đơn giản, hiện đại, trình bày nội dung dễ nhìn để người học chọn đúng
            ngành phù hợp với mục tiêu nghề nghiệp.
          </p>
        </div>
      </section>

      <section className="info-content-section">
        <div className="major-list">
          {majors.map((major, index) => (
            <article key={major.title} className="major-card">
              <div className="major-number">0{index + 1}</div>
              <div>
                <h3>{major.title}</h3>
                <p>{major.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="info-content-section alt-bg">
        <div className="info-panel full-width-panel">
          <h2>Vì sao nên chọn học từ xa?</h2>
          <p>
            Bạn có thể chủ động thời gian, học ở bất kỳ đâu, vẫn tiếp cận nội dung chuyên môn
            thiết thực và tối ưu cho người vừa học vừa làm.
          </p>
        </div>
      </section>
    </div>
  );
};

export default MajorsPage;
