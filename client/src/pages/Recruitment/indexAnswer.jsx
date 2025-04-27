import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";

import { AuthAPI } from "../../services";

import Authenticated from "../../components/ui/Authenticated";
import ApplicantCard from "../../components/ui/ApplicantCard";
import ResultCard from "../../components/ui/ResultCard";
import SpinningLoader from "../../components/common/SpinningLoading";
import PaginationButton from "../../components/common/PaginationButton";
import { Typography } from "@mui/material";

function ApplicantAnswer() {
  const [applicants, setApplicants] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    AuthAPI.getAllJobs((err, result) => {
      console.log("Result: ", result);
      if (!err && result.data) {
        setJobs(result?.data?.paginatedJobs);
        setLoading(false);
        return;
      }
      setJobs([]);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    AuthAPI.getApplicantList(currentPage, (err, result) => {
      if (!err && result.data) {
        setApplicants(result?.data?.paginatedApplicants);
        setCurrentPage(result.data.currentPage);
        setLoading(false);
        return;
      }
      setJobs([]);
      setLoading(false);
    });
  }, [currentPage]);

  console.log("Total page: ", totalPages);

  if (loading) return <SpinningLoader />;

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        backgroundColor: "white",
      }}
    >
      {applicants.length > 0 ? (
        <Box sx={{ width: "100%", minHeight: "560px", p: 4 }}>
          {applicants.map((applicant) => (
            <ApplicantCard
              key={applicant.id}
              id={applicant.id}
              jobId={applicant.jobId}
              name={applicant.name}
              email={applicant.email}
              phone={applicant.phone}
              date={applicant.createdAt}
            />
          ))}
        </Box>
      ) : (
        <Authenticated message={"Hiện chưa ứng viên nộp hồ sơ"} />
      )}
      {applicants.length > 0 && (
        <PaginationButton
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          colorText={"primary.main"}
        />
      )}
    </Box>
  );
}

export default ApplicantAnswer;
