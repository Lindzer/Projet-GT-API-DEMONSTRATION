const frisby = require('frisby');

frisby.globalSetup({
  request: {
    headers: {
      token: process.env.__testToken__
    }
  }
});
