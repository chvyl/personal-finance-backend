const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv'); // Thêm dotenv để quản lý biến môi trường

dotenv.config(); // Nạp biến môi trường từ file .env
console.log('SECRET_KEY:', process.env.SECRET_KEY); // Kiểm tra SECRET_KEY có đúng không


const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

let expenses = [];
const users = []; // Nên dùng cơ sở dữ liệu thực

// Middleware xác thực
const authenticateJWT = (req, res, next) => {
  const token = req.headers['authorization'];
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY || 'defaultSecretKey', (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token' });
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ message: 'Authorization token is required' });
  }
};

// Lấy danh sách chi tiêu (cần xác thực)
app.get('/api/expenses', authenticateJWT, (req, res) => {
  const userExpenses = expenses.filter(exp => exp.userId === req.user.username);
  res.json(userExpenses);
});

// Thêm chi tiêu (cần xác thực)
app.post('/api/expenses', authenticateJWT, (req, res) => {
  const { description, amount, category } = req.body;
  if (!description || !amount || !category) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  const expense = { description, amount, category, userId: req.user.username };
  expenses.push(expense);
  res.status(201).json(expense);
});

// Đăng ký người dùng
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ message: 'User already exists' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  res.status(201).json({ message: 'User registered successfully' });
});

// Đăng nhập
// Đăng nhập
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  
  // Thêm dòng console.log để kiểm tra dữ liệu
  console.log('Username:', username); // Kiểm tra username gửi từ client
  console.log('Password:', password); // Kiểm tra password gửi từ client
  
  const user = users.find(u => u.username === username);
  console.log('User found:', user);  // Kiểm tra user có trong mảng không
  
  if (!user) {
    return res.status(401).json({ message: 'User not found' });
  }
  
  const isMatch = await bcrypt.compare(password, user.password);
  console.log('Password match:', isMatch); // Kiểm tra mật khẩu có khớp không
  
  if (isMatch) {
    const token = jwt.sign({ username }, process.env.SECRET_KEY || 'defaultSecretKey', { expiresIn: '1h' });
    console.log('Generated Token:', token); // In token ra để kiểm tra
    res.json({ token });    
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});


// Khởi động máy chủ
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
