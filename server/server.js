require('dotenv').config();

const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

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
    password: 'admin'
  },
  {
    username: 'jim',
    password: 'qwerty'
  },
  {
    username: 'dwight',
    password: 'password'
  }
]


let refreshTokens = [

]


// 
app.get('/users', authenticateToken,  (req, res) => {
  res.json(users.filter(user => user.username === req.loggingUser.name))
})

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if(token == null) return res.status(401).send({message: 'No provided token'})

  
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, loggingUser) => {
    if (err) return res.sendStatus(403)
    req.loggingUser = loggingUser;
    next()
  })
}




app.post('/token', (req, res) => {
  const refreshToken = req.body.token;
  if(refreshToken == null) return res.sendStatus(401)
  if(!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, loggingUser) => {
    if (err) return res.sendStatus(403)
    const accessToken = generateAccessToken({name: loggingUser.name})
    res.json({accessToken: accessToken})
  })
})

app.delete('/logout', (req, res) => {
  refreshTokens = refreshTokens.filter(token => token !== req.body.token);
  res.sendStatus(204)
})

app.post('/login', (req, res) => {
  // Authenticate
  const username = req.body.username;
  const password = req.body.password;
  
  console.log('fired', username, password);

  try {
    
    if(!username || !password) {
      throw new Error('не предоставлены логин или пароль')
    }
    const loggingUser = { name: username };

    const validUser = users.find(user => user.username === username && user.password === password)

    if(!validUser) {
      res.send({message: 'Неверные логин или пароль'})
    }
  
    const accessToken = generateAccessToken(loggingUser);
    const refreshToken = jwt.sign(loggingUser, process.env.REFRESH_TOKEN_SECRET);
    refreshTokens.push(refreshToken)
    res.json({ accessToken: accessToken, refreshToken: refreshToken, username: validUser.username });

  } catch (error) {
    res.send({message: `${error.message}`})
  }
});

function generateAccessToken(loggingUser) {
  return jwt.sign(loggingUser, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' });
}

const PORT = 5000;

app.listen(PORT, () => {
  console.log('server open on port', PORT);
})