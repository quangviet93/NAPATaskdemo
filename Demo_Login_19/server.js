const express = require('express');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const app = express();
const path = require('path');

dotenv.config();

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));

const users = [
  {
    id: 1,
    username: 'boy',
    password: '123'
  },
  {
    id: 2,
    username: 'girl',
    password: '234'
  }
];

app.get('/home', authenToken, (req, res) => {
  res.json({ status: 'my posts' });
});

// HTML load Nodejs
// app.get('/', function (req, res) {
//   res
//     .status(200)
//     .sendFile(path.join(__dirname, "client", "text.html"))
// });

// micdeque kiểm tra token gửi lên có hợp lệ hay ko.
function authenToken(req, res, next) {
  // Lấy ra headers gửi lên từ phía client.
  const authenHeader = req.headers['authorization'];
  const token = authenHeader.split(' ')[1];
  // Trường hợp ko có token trả về status mã 401.
  if (!token) res.sendStatus(401);
  // Trường hợp có token ta sẽ tiến hành verify token có hợp lệ hay ko.
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
    // Nếu có lỗi thì trả về  phía client mã 403 ko có quyền truy xuất.
    if (err) res.sendStatus(403);
    // Nếu token hợp lệ thì gọi phương thức next.
    next();
  });
};

app.post('/login', (req, res) => {
  const userNameInput = req.body.username;
  const passWordInput = req.body.password;
  // lấy về  1 obj theo key là username.
  const user = users.find(user => user.username == userNameInput);
  // Nếu ko có user trả về  error.
  if (!user) {
    return res.json({ error: 403, message: "Không tồn tại user" });
  };
  // Mã hóa mật khẩu.
  const hash = bcrypt.hashSync(passWordInput, saltRounds);
  // So sánh mậu khẩu trong db và mật khẩu đã mã hóa.
  const isHash = bcrypt.compareSync(user.password, hash);
  // Nếu ko trùng nhau thì trả mã 403 ko có quyền truy xuất.
  if (!isHash) res.sendStatus(403);
  // Ngược lại trả về  phía client 1 obj tạm có mật khẩu đã đc mã hóa.
  const userTmp = {
    ...user,
    password: hash
  };
  console.log('userTmp', userTmp);
  const accessToken = jwt.sign(userTmp, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '60s' });
  res.json({ accessToken });
});

