const { error } = require("console");
const fs = require("fs");

const path = require("path");

fs.mkdir(path.join(__dirname, "/test"), (error) => {
  if (error) {
    return console.log("Erro:", error);
  }
  console.log("Pasta Criada com sucesso");
});

/* fs.writeFile(
  path.join(__dirname, "/test", "test.txt"),
  "ai calica",
  (error) => {
    if (error) {
      return console.log("Erro:", error);
    }
    console.log("Arquivo criado com sucesso");
  }
);
 */

fs.appendFile(path.join(__dirname, "/test", "test.txt"), "ai aaa", (error) => {
  if (error) {
    return console.log("Erro:", error);
  }
  console.log("Arquivo editado com sucesso");
});
