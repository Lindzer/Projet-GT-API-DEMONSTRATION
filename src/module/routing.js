const fs = require('fs');
const path = require('path');
const express = require('express');

let loRouter = express.Router();

let loDirectoriPath = path.normalize(__dirname + '/routes/');

let ltFileList = fs.readdirSync(loDirectoriPath, {
  withFileTypes: true
});

for (let lsFile of ltFileList) {
  if (lsFile.isFile()) {
    let lsFileName = lsFile.name;
    let ltFileNameSplit = lsFileName.split('.');
    if (ltFileNameSplit.length == 3 && ltFileNameSplit[1] == "route" && ltFileNameSplit[2] == "js") {

      let lsRouteName = ltFileNameSplit[0]
        .toLowerCase()
        .split('-')
        .reduce((lsAccumulator, lsCurrentValue) => {
          if (lsAccumulator == "")
            return lsCurrentValue;
          else
            return lsAccumulator + lsCurrentValue[0].toUpperCase() + lsCurrentValue.substring(1)
        }, "")

      console.log(`load router /${lsRouteName} in ${lsFileName}`);

      let loRoute = require("./routes/" + lsFileName);

      loRouter.use("/" + lsRouteName, loRoute);
    }
  }
}

module.exports = loRouter;
