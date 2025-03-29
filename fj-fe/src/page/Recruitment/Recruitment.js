import React, { useEffect, useState } from "react";
import "./Recruitment.css";
import QuizSection from "../../components/Quiz/QuizSection/QuizSection";
import PositionSection from "../../components/PositionSection/PositionSection";
import Position from "../../components/Position/Position"; // Import component Position
import { GetCompanyByUser } from "../../services/user.service";

function Recruitment() {
  const [jobList, setJobList] = useState([]);
  const [positions, setPositions] = useState([]); // Danh sách các Position

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await GetCompanyByUser();
        if (response) {
          const jobData = response.result.data.jobList;
          setJobList(jobData);
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin công ty:", error);
      }
    };

    fetchCompany();
  }, []);

  const handleAddPosition = () => {
    setPositions([...positions, { id: Date.now() }]);
  };

  const handleRemovePosition = (id) => {
    if (window.confirm("Bạn có chắc muốn xoá?")) {
      setPositions(positions.filter((position) => position.id !== id));
    }
  };

  return (
    <div className="recruitmentContainer">
      <h1>Tuyển dụng nhanh hơn với câu hỏi phỏng vấn trực tuyến!</h1>

      <div className="positionContainer">
        <div className="up-pos">
          {jobList.length > 0 ? (
            jobList.map((job, index) => (
              <PositionSection
                key={index}
                jobName={job.jobName}
                jobDescription={job.jobDescription}
                quantity={job.quantity}
                salary={job.salary}
              />
            ))
          ) : (
            <h2 style={{ textAlign: "center" }}>
              Chưa có công việc nào được đăng.
            </h2>
          )}
        </div>

        <div className="positionForms">
          {positions.map((position) => (
            <div key={position.id} className="position-wrapper">
              <Position />
              <button
                className="del-position-btn"
                onClick={() => handleRemovePosition(position.id)}
              >
                Xóa
              </button>
            </div>
          ))}
        </div>

        <button className="add-position-btn" onClick={handleAddPosition}>
          Thêm vị trí tuyển dụng
        </button>
      </div>

      {/* <QuizSection quiz_title="Phỏng vấn kinh nghiệm ứng viên" /> */}
    </div>
  );
}

export default Recruitment;
