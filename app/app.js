const express = require('express');
const path = require('path')
const app = express();

const { auth, requiresAuth } = require('express-openid-connect');
app.use(
  auth({
    authRequired: false,
    auth0Logout: true,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    secret: process.env.AUTH_SECRET,
    idpLogout: true,
  })
);

app.use(express.static('public'))

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.locals.caption = "this is a local variable"

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
    res.send(req.oidc.isAuthenticated() ? 'logged in' : 'logged out')
});

app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user))
})

app.get('/articles', (req, res) => {
  res.render('pages/articles', {
      articles: posts
  });
});

module.exports = app;