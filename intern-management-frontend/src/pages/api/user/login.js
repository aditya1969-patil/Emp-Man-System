// pages/api/user/login.js

export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { email, password } = req.body;
  
      // Call your NestJS API to login the user
      try {
        const response = await fetch('http://localhost:3000/user/login', { // Point to your NestJS backend
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }), // Send email and password
        });
  
        const result = await response.json();
        console.log('Backend response:', result); // Log the backend response to see the full object

  
        if (response.ok) {
          return res.status(200).json(result); // Return the result from NestJS backend
        } else {
          return res.status(response.status).json({ message: result.message || 'Login failed' });
        }
      } catch (error) {
        console.error('Login API error:', error);
        return res.status(500).json({ message: 'Server error. Please try again later.' });
      }
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  }
  