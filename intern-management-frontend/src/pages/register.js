import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../styles/auth.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Register() {
  const [formData, setFormData] = useState({
    role: '',
    name: '',
    email: '',
    personalEmail: '',
    password: '',
    photo: null,
    college: '',
    contactNo: '',
    familyContactNo: '',
    localAddress: '',
    pincode: '',
    city: '',
    state: '',
    permanentAddress: '',
    resume: null,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Show success message and hide form
    setIsSubmitted(true);

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key]) {
          formDataToSend.append(key, formData[key]);
        }
      });

      const response = await axios.post(
        'http://localhost:3000/register',
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      // Example backend response format for a successful registration
      console.log('Registration successfully!'); // Log success message to console

      // Log the full response data to console
      console.log('Response Data:', response.data);

      alert('Congratulations! Your registration is successful.');
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed!');
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formWrapper}>
        {/* Conditionally render form or success message */}
        {!isSubmitted ? (
          <div className="card p-4">
            <h2 className="text-center mb-4">Create Account</h2>
            <form onSubmit={handleSubmit}>
              <div className="row mb-3">
                <div className="col-md-12">
                  <label className="form-label">Role:</label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className={`form-control ${styles.inputField}`}
                    required
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-12">
                  <label className="form-label">Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`form-control ${styles.inputField}`}
                    required
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-12">
                  <label className="form-label">Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-control ${styles.inputField}`}
                    required
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-12">
                  <label className="form-label">Personal Email:</label>
                  <input
                    type="email"
                    name="personalEmail"
                    value={formData.personalEmail}
                    onChange={handleChange}
                    className={`form-control ${styles.inputField}`}
                    required
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-12">
                  <label className="form-label">Password:</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`form-control ${styles.inputField}`}
                    required
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-12">
                  <label className="form-label">College:</label>
                  <input
                    type="text"
                    name="college"
                    value={formData.college}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-12">
                  <label className="form-label">City:</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="form-control"
                    autoComplete="off"
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-12">
                  <label className="form-label">State:</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="form-control"
                    autoComplete="off"
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-12">
                  <label className="form-label">Permanent Address:</label>
                  <textarea
                    name="permanentAddress"
                    value={formData.permanentAddress}
                    onChange={handleChange}
                    className={`form-control ${styles.inputField}`}
                    rows="3"
                  ></textarea>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-12">
                  <label className="form-label">Photo:</label>
                  <input
                    type="file"
                    name="photo"
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-12">
                  <label className="form-label">Resume:</label>
                  <input
                    type="file"
                    name="resume"
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>

              <button type="submit" className={styles.submitButton}>
                Register
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center absolute inset-0 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">Registration Successful!</h2>
              <button
                onClick={() => router.push('/')}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              >
                Go to Homepage
              </button>
            </div>
          </div>  
        )}
      </div>
    </div>
  );
}
