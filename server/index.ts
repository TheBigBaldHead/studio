import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import jwt from 'jsonwebtoken';

const app = express();
const port = 8080;
const jwtSecret = 'your-super-secret-key'; 

app.use(cors());
app.use(bodyParser.json());

// In-memory "database"
const users: any[] = [];
let userIdCounter = 1;

// Register endpoint
app.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'لطفا تمام فیلدها را پر کنید.' });
  }

  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'کاربری با این ایمیل قبلا ثبت نام کرده است.' });
  }

  const newUser = {
    id: (userIdCounter++).toString(),
    name,
    email,
    password, // In a real app, hash and salt the password!
  };

  users.push(newUser);

  const userPayload = { id: newUser.id, name: newUser.name, email: newUser.email };
  const accessToken = jwt.sign(userPayload, jwtSecret, { expiresIn: '1h' });

  console.log('User registered:', userPayload);
  console.log('Current users:', users.map(u => ({id: u.id, name: u.name, email: u.email})));

  res.status(201).json({
    user: userPayload,
    accessToken,
  });
});

// Login endpoint
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'لطفا ایمیل و رمز عبور را وارد کنید.' });
  }

  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(401).json({ message: 'ایمیل یا رمز عبور نامعتبر است.' });
  }

  if (user.password !== password) { // In a real app, compare hashed passwords!
    return res.status(401).json({ message: 'ایمیل یا رمز عبور نامعتبر است.' });
  }

  const userPayload = { id: user.id, name: user.name, email: user.email };
  const accessToken = jwt.sign(userPayload, jwtSecret, { expiresIn: '1h' });

  console.log('User logged in:', userPayload);

  res.status(200).json({
    user: userPayload,
    accessToken,
  });
});

app.listen(port, () => {
  console.log(`Backend server is running at http://localhost:${port}`);
});
