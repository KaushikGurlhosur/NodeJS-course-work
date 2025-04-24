const path = require("path");

module.exports = path.dirname(process.mainModule.filename); // this will give the path of the file where the code is running
