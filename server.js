// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = 3000;
const JWT_SECRET = 'supersecretkey123';

app.use(cors());
app.use(bodyParser.json());

const users = [];
const animeCatalog = [
  {
    id: 'naruto',
    title: 'Наруто',
    img: 'https://i.imgur.com/7r3ZdYO.jpg',
    desc: 'Наруто Узумаки — күчтүү ниндзянын окуясы.',
    video: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm'
  },
  {
    id: 'attack-on-titan',
    title: 'Атака на Титан',
    img: 'https://i.imgur.com/dJ6rSgQ.jpg',
    desc: 'Адамзат титандардан коргонуу үчүн дубал курган.',
    video: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm'
  }
];

// Каттоо
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ msg: 'Бардык талааларды толтуруңуз' });
  if (users.find(u => u.email === email)) return res.status(400).json({ msg: 'Бул email катталган' });

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ email, password: hashedPassword });
  res.json({ msg: 'Каттоо ийгиликтүү болду' });
});

// Кирүү
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) return res.status(400).json({ msg: 'Колдонуучу табылган жок' });

  const isPassValid = await bcrypt.compare(password, user.password);
  if (!isPassValid) return res.status(400).json({ msg: 'Пароль туура эмес' });

  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '2h' });
  res.json({ token });
});

// Тасмалар
app.get('/api/anime', (req, res) => {
  res.json(animeCatalog);
});

app.listen(PORT, () => {
  console.log(`Сервер http://localhost:${PORT} дарегинде иштеп жатат`);
});
