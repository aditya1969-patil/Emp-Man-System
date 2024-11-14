// pages/api/user/register.js

export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { email, password } = req.body;
  
      // Call your NestJS API to register the user
      try {
        const response = await fetch('http://localhost:3000/user/register', { // Point to your NestJS backend
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }), // Send email and password
        });
  
        const result = await response.json();
  
        if (response.ok) {
          return res.status(200).json(result); // Return the result from NestJS backend
        } else {
          return res.status(response.status).json({ message: result.message || 'Registration failed' });
        }
      } catch (error) {
        return res.status(500).json({ message: 'Server error. Please try again later.' });
      }
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  }
  