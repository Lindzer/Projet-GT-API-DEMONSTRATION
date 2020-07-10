const frisby = require('frisby');

it('test api run', async function() {
  return frisby.get(process.env.__baseUrl__ + '/routeExemple')
    .expect('status', 200)
    .expect('jsonStrict', {
      result: 'success'
    })
});
