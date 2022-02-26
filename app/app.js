const express = require('express');
const path = require('path')
const app = express();

app.use(express.static('public'))

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.locals.caption = "this is a caption"

const posts = [
  {title: 'Title 1', body: 'Body 1' },
  {title: 'Title 2', body: 'Body 2' },
  {title: 'Title 3', body: 'Body 3' },
  {title: 'Title 4', body: 'Body 4' },
]

const user = {
  firstName: 'Tim',
  lastName: 'Cook',
  
}

app.get('/', (req, res) => {
    res.render('pages/index', {
      user: user,
      title: "home"
    });
});

app.get('/articles', (req, res) => {
  res.render('pages/articles', {
      articles: posts
  });
});

module.exports = app;