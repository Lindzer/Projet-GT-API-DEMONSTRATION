module.exports = async () => {
  return await (new Promise(function(resolve, reject) {
    if (global.__app__)
      global.__app__.close(err => {
        console.log("app end");
        resolve()
      })
    else resolve()
  }))
}
