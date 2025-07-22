const path = require("path");

// Basename
console.log(path.basename(__filename));

//Dir
console.log(path.dirname(__filename));

//ext
console.log(path.extname(__filename));

//Criar objeto path
console.log(path.parse(__filename));

//Juntar path
console.log(path.join(__dirname, "test", "test.html"));
