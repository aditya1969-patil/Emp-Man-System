import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const userData = { email, password };
  
    try {
      const response = await fetch("/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
  
      const result = await response.json();
      console.log("Backend response:", result); // Log the response for debugging
  
      if (response.ok) {
        // Make sure result.data exists before accessing email
        setMessage(`Registration successful. Welcome, ${result.data ? result.data.email : 'User'}`);
      } else {
        setMessage(result.message || "Registration failed.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setMessage("An error occurred during registration.");
    }
  };
  

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Register
        </button>
      </form>

      {message && <p className="text-center mt-3">{message}</p>}
    </div>
  );
};

export default RegisterForm;
