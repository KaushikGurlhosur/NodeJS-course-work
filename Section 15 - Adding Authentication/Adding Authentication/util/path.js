const path = require("path");

module.exports = path.dirname(process.mainModule.filename);
// main module is the entry point of the application, and filename gives the path to the file. This will give us the path to the root directory of our project. and its is deprecated in the latest version of node.js. So we can use process.cwd() instead of process.mainModule.filename. process.cwd() gives us the current working directory of the Node.js process. It is a string that represents the absolute path to the directory from which the Node.js process was started. This is useful for resolving relative paths in your application.

// module.exports = path.dirname(require.main.filename);
