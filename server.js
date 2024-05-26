const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const ejs = require('ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.engine('ejs', require('ejs').__express);

app.use(express.static(path.join(__dirname, 'public')));

const users = [
  { id: 1, name: 'User One', email: 'userone@example.com' },
  { id: 2, name: 'User Two', email: 'usertwo@example.com' }
];

const articles = [
  { id: 1, title: 'Article One', content: 'Content of article one.' },
  { id: 2, title: 'Article Two', content: 'Content of article two.' }
];

app.get('/', (req, res) => {
  res.render('pug/index');
});

app.get('/users', (req, res) => {
  res.render('pug/users', { users });
});

app.get('/users/:userId', (req, res) => {
  const user = users.find(u => u.id == req.params.userId);
  if (user) {
    res.render('pug/user', { user });
  } else {
    res.status(404).send('User not found');
  }
});

app.get('/articles', (req, res) => {
  ejs.renderFile(path.join(__dirname, 'views/ejs/articles.ejs'), { articles }, (err, html) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.send(html);
    }
  });
});

app.get('/articles/:articleId', (req, res) => {
  const article = articles.find(a => a.id == req.params.articleId);
  if (article) {
    ejs.renderFile(path.join(__dirname, 'views/ejs/article.ejs'), { article }, (err, html) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      } else {
        res.send(html);
      }
    });
  } else {
    res.status(404).send('Article not found');
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
