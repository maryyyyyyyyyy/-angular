const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors()); // Для дозволу кросдоменної взаємодії
app.use(express.json()); // Для обробки JSON запитів

// Збереження даних
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
  console.log('Отримано:', { username, email, password });
  res.status(200).json({ message: 'Користувача зареєстровано' });
});

