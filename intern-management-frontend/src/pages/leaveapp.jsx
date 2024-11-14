import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles1 from "./leaveapp.module.css";
export default function LeaveForm() {
  const [formData, setFormData] = useState({
    fromDate: "",
    toDate: "",
    cause: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    alert("Form submitted successfully");
  };

  const handleCancel = () => {
    setFormData({ fromDate: "", toDate: "", cause: "" });
  };

  return (
    <div className={`container-fluid  ${styles1.body1} `}>
      <div className={`row justify-content-center ${styles1.leave_section}`}>
        <div className="col-12 co-sm-12 col-md-6 col-lg-6">
          <section>
            <h1
              className={`text-center  ${styles1.top_margin}`}
            >
              Leave Application{" "}
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="fromDate" className="form-label">
                  From Date:
                </label>
                <input
                  type="date"
                  id="fromDate"
                  name="fromDate"
                  value={formData.fromDate}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="toDate" className="form-label">
                  To Date:
                </label>
                <input
                  type="date"
                  id="toDate"
                  name="toDate"
                  value={formData.toDate}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="cause" className="form-label">
                  Cause:
                </label>
                <textarea
                  id="cause"
                  name="cause"
                  value={formData.cause}
                  onChange={handleChange}
                  className="form-control"
                  rows="4"
                  required
                />
              </div>
              <div className="d-flex justify-content-between">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
                <button type="button" onClick={handleCancel} className="btn btn-danger">
                  Cancel
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
