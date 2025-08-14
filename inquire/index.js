const inquirer = require("inquirer");
const chalk = require("chalk");

let nome1;
let idade2;

inquirer
  .prompt([
    {
      name: "user__name",
      type: "input",
      message: "Seu Nome:",
    },
    {
      name: "age",
      type: "input",
      message: "Sua Idade:",
    },
  ])
  .then((answers) => {
    if (
      !answers.user__name ||
      !answers.age ||
      !Number.isInteger(parseInt(answers.age))
    ) {
      throw new Error("Insira os campos corretamente");
    }
    const resposta = `Nome : ${answers.user__name}\nIdade: ${answers.age}`;
    console.log(chalk.bgYellow.green(resposta));
  })
  .catch((error) => console.log(error));
