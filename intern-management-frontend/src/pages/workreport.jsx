"use client";
import styles from "./workreport.module.css";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { useState } from "react";

const WorkReport = () => {
  const [workReport, setWorkReport] = useState("");

  const handleWorkreport = (e) => {
    const { value } = e.target;
    setWorkReport(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    /*
    try {
      const response = await fetch("/api/workreport", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ workReport }),
      });

      if (response.ok) {
        alert("Work report saved successfully!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error while saving work report");
    }
    */
  };

  return (
    <div className={`container-fluid ${styles.body1}`}>
      <div className="row justify-content-center">
        <div className="col-12 co-sm-12 col-md-6 col-lg-6">
          <section>
            <h2 className={`text-center ${styles.heading_margin}`}>
              Today's Work Report
            </h2>
            <form onSubmit={handleSubmit}>
              <textarea
                className={`${styles.workrpt_section} ${styles.textarea}`}
                placeholder="Enter today's work report"
                id="workreport"
                rows={10}
                name="workreport"
                value={workReport}
                onChange={handleWorkreport}
                required
              ></textarea>
              <div className="d-flex justify-content-center">
                <button type="submit" className={styles.button1}>
                  Submit
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default WorkReport;
