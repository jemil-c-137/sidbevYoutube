require('dotenv').config();

const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const PORT = 5000;
const app = express();

let corsOptions = {
  origin: 'http://localhost:3000',
};
// parse requests with json content type
app.use(express.json());

app.use(cors(corsOptions));

const users = [
  {
    username: 'michael',
    password: 'admin',
  },
  {
    username: 'jim',
    password: 'qwerty',
  },
  {
    username: 'dwight',
    password: 'password',
  },
];

let refreshTokens = [];

app.delete('/logout', (req, res) => {
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  res.sendStatus(204);
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res.status(401).send({ message: 'Введите логин или пароль пользователя' });
    }
    const loggingUser = { name: username };

    const validUser = users.find((user) => user.username === username && user.password === password);

    if (!validUser) {
      return res.status(401).send({ message: 'Неверные логин или пароль пользователя' });
    }

    const accessToken = generateAccessToken(loggingUser);

    res.json({ accessToken: accessToken, username: validUser.username });
  } catch (error) {
    res.send({ message: error });
  }
});

function generateAccessToken(loggingUser) {
  return jwt.sign(loggingUser, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '7d' });
}
app.listen(PORT, () => {
  console.log('server open on port', PORT);
});
