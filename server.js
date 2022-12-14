const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');

const routes = require('./controllers');
const sequelize = require('./config/config');
const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3009;

const sess = {
  secret: 'secret',
  resave: false,
  cookie: {maxAge: 1000000},
  saveUninitialized: true
};

app.use(session(sess));

const hbs = exphbs.create({ helpers });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
   console.log('listening on' + PORT)
   );
});