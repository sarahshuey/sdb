const models = require("./models");

function createUser() {
const user = models.User.build({
  name: "Sarah Shuey",
  email:"sarah@shuey.com",
  bio: "student"
});
user.save().then(function(newUser){
console.log(newUser.dataValues);
})
}
createUser();

function listUsers() {
  models.User.findAll().then(function (users) {
    users.forEach(function(users){
      console.log(users.dataValues);
    })
  })
}
listUsers();
