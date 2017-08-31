const express = require('express')
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const sequelize = require('sequelize')
const app = express();
const models = require("./models");

app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')
app.use(bodyParser.urlencoded({
  extended: false
}))

app.get('/', function(req, res) {
  res.render("index");
})
app.get('/users', function(req, res) {
  models.User.findAll()
    .then(function(users) {
      res.render('users', {
        users: users
      });
    })
})
app.get('/add', function(req, res) {
  res.render("add");
})
app.post('/add', function(req, res) {
  let name = req.body.name
  let email = req.body.email
  let bio = req.body.bio
  const newUser = models.User.build({
    name: name,
    email: email,
    bio: bio
  })
  newUser.save()
    .then(function() {
      res.redirect('/users')
    })
})

app.post('/delete/:id', function(req, res) {
  let id = req.params.id
  models.User.destroy({
      where: {
        id: id
      }
    })
    .then(function() {
      res.redirect('/users')
    })

})

app.listen(3000, function() {
  console.log('Express running on http://localhost:3000/.')
});

process.on('SIGINT', function() {
  console.log("\nshutting down");
  const index = require('./models/index')
  index.sequelize.close()

  // give it a second
  setTimeout(function() {
    console.log('process exit');
    process.exit(0);
  }, 1000)
});









// function createUser() {
// const user = models.User.build({
//   name: "Sarah Shuey",
//   email:"sarah@shuey.com",
//   bio: "student"
// });
// user.save().then(function(newUser){
// console.log(newUser.dataValues);
// })
// }
// createUser();
//
// function listUsers() {
//   models.User.findAll().then(function (users) {
//     users.forEach(function(users){
//       console.log(users.dataValues);
//     })
//   })
// }
// listUsers();
