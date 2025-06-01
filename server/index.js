const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const fs = require('fs');
const path = require('path');

app.use(cors());
app.use(express.json());

const usersFile = path.join(__dirname, 'users.json');

function loadUsers() {
  if (!fs.existsSync(usersFile)) {
    fs.writeFileSync(usersFile, '[]');
  }

  const data = fs.readFileSync(usersFile);
  return JSON.parse(data);
}

function saveUsers(users) {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

let posts = [
  { title: 'Трава', body: 'зелена' },
  { title: 'Небо', body: 'синє' },
  { title: 'Сервер', body: 'вроді працює' }
];

app.get('/', (req, res) => {
  res.send('Сервер працює!');
});

app.get('/api/data', (req, res) => {
  res.json([
    { title: 'Трава', body: 'зелена' },
    { title: 'Небо', body: 'синє' },
    { title: 'Сервер', body: 'вроді працює' }
  ]);
});

// POST запит для додавання нових даних
app.post('/api/data', (req, res) => {
  const newPost = req.body;
  posts.unshift(newPost); // Додаємо новий запис на початок
  res.status(201).json(newPost);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


app.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  const users = loadUsers();

  if (users.find(user => user.email.toLowerCase().trim() === email.toLowerCase().trim())) {
    return res.status(400).json({ message: 'Користувач з таким email вже існує' });
  }

  const newUser = { username, email, password };
  users.push(newUser);
  saveUsers(users);

  console.log('Зареєстровано:', newUser);
  res.status(201).json({ message: 'Користувача зареєстровано успішно' });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const users = loadUsers();

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Неправильний email або пароль' });
  }

  res.status(200).json({ message: 'Вхід успішний', user });
});
