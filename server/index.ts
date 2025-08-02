
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { Pool } from 'pg';
import bcrypt from 'bcrypt';
import 'dotenv/config';

const app = express();
const port = 8080;
const jwtSecret = 'your-super-secret-key';
const saltRounds = 10;

// Database connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

// Create users table if it doesn't exist
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );
`;

pool.connect()
  .then(client => {
    return client.query(createTableQuery)
      .then(() => {
        client.release();
        console.log('Users table is ready');
      })
      .catch(err => {
        client.release();
        console.error('Error creating users table', err);
        process.exit(1);
      });
  })
  .catch(err => {
    console.error('Failed to connect to the database:', err);
    process.exit(1);
  });


app.use(cors());
app.use(bodyParser.json());

// Register endpoint
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'لطفا تمام فیلدها را پر کنید.' });
  }

  try {
    // Check if user already exists
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'کاربری با این ایمیل قبلا ثبت نام کرده است.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert the new user
    const newUserResult = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
      [name, email, hashedPassword]
    );

    const newUser = newUserResult.rows[0];

    const userPayload = { id: newUser.id, name: newUser.name, email: newUser.email };
    const accessToken = jwt.sign(userPayload, jwtSecret, { expiresIn: '1h' });

    console.log('User registered:', userPayload);
    res.status(201).json({
      user: userPayload,
      accessToken,
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'خطایی در سرور رخ داد. لطفا دوباره تلاش کنید.' });
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'لطفا ایمیل و رمز عبور را وارد کنید.' });
  }

  try {
    // Find the user by email
    const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userResult.rows.length === 0) {
      return res.status(401).json({ message: 'ایمیل یا رمز عبور نامعتبر است.' });
    }

    const user = userResult.rows[0];

    // Compare the password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'ایمیل یا رمز عبور نامعتبر است.' });
    }

    const userPayload = { id: user.id, name: user.name, email: user.email };
    const accessToken = jwt.sign(userPayload, jwtSecret, { expiresIn: '1h' });

    console.log('User logged in:', userPayload);
    res.status(200).json({
      user: userPayload,
      accessToken,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'خطایی در سرور رخ داد. لطفا دوباره تلاش کنید.' });
  }
});

app.listen(port, () => {
  console.log(`Backend server is running at http://localhost:${port}`);
});
