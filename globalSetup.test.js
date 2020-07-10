const frisby = require('frisby');

const gsBaseUrl = 'http://localhost:3000/API'

module.exports = async () => {
  if (process.env.TRAVIS == "true")
    global.__app__ = require('./' + (process.env.NODE_ENV == "production" ? "dist" : "src") + '/index.js');
  // else if (process.env.testWatch == "true")
  //   global.__app__ = require('./src/index.js');

  // if (true)
  //   global.__app__ = require('./src/index.js');

  let loPromise = new Promise(function(resolve, reject) {
    frisby.post(gsBaseUrl + '/authentification/login', {
        userLogin: "root",
        userPassword: "root"
      }).expect('status', 200)
      .then(loRes => {
        if (!!loRes.json.token) {
          return frisby.setup({
              request: {
                headers: {
                  token: loRes.json.token
                }
              }
            }).post(gsBaseUrl + '/user', {
              userLogin: "test@test.test",
              userFirstName: "test",
              userLastName: "test",
              userPassword: "test",
              userRight: 0
            }).expect('status', 200)
            .then(loRes3 => {
              return frisby.post(gsBaseUrl + '/authentification/login', {
                  userLogin: "test@test.test",
                  userPassword: "test"
                }).expect('status', 200)
                .then(loRes2 => {
                  resolve(loRes2.json.token)
                })
            })
        } else {
          return frisby.post(gsBaseUrl + '/authentification/login', {
              userLogin: "test@test.test",
              userPassword: "test"
            }).expect('status', 200)
            .then(loRes2 => {
              resolve(loRes2.json.token)
            })
        }
      })
  });

  process.env.__testToken__ = await loPromise
  process.env.__baseUrl__ = gsBaseUrl
}
