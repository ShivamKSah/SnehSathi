import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const users = [];

const otpStore = {};

const FAST2SMS_API_KEY = 'VCNA1lep8KLGJkRohOd7uvBa4MjQgiWx3EU5ZXPHntwmTSIzfsfigxwVdaEUTqFDX1I2hYLp4Proj6uH';

app.post('/api/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Missing fields' });
  }
  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }
  const newUser = { id: Date.now().toString(), name, email, password };
  users.push(newUser);
  res.json({ user: newUser });
});


app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  res.json({ user });
});

app.post('/send-otp', async (req, res) => {
  const { mobileNumber } = req.body;

  if (!mobileNumber || mobileNumber.length !== 10) {
    return res.status(400).json({ success: false, message: 'Invalid mobile number' });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[mobileNumber] = otp;

  const message = `Your ASHA Portal OTP is ${otp}. Do not share it with anyone.`;

  try {
    const response = await axios.post(
      'https://www.fast2sms.com/dev/bulkV2',
      {
        variables_values: otp,
        route: 'otp',
        numbers: mobileNumber,
      },
      {
        headers: {
          Authorization: FAST2SMS_API_KEY,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.data.return) {
      return res.json({ success: true, message: 'OTP sent successfully' });
    } else {
      return res.status(500).json({ success: false, message: 'Failed to send OTP' });
    }
  } catch (error) {
    console.error('Fast2SMS Error:', error.message);
    return res.status(500).json({ success: false, message: 'Something went wrong while sending OTP' });
  }
});

app.post('/verify-otp', (req, res) => {
  const { mobileNumber, otp } = req.body;

  if (!mobileNumber || !otp) {
    return res.status(400).json({ success: false, message: 'Missing OTP or mobile number' });
  }

  const storedOtp = otpStore[mobileNumber];

  if (storedOtp && storedOtp === otp) {
    delete otpStore[mobileNumber];
    return res.json({ success: true, message: 'OTP verified successfully' });
  } else {
    return res.status(401).json({ success: false, message: 'Invalid or expired OTP' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
