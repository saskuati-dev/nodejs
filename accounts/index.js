const inquirer = require("inquirer");
const chalk = require("chalk");
const fs = require("fs");
const { json } = require("stream/consumers");

function operation() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "O que deseja fazer?",
        choices: [
          "Criar conta",
          "2- Consultar saldo",
          "3- Depositar",
          "4- Sacar",
          "0- Sair",
        ],
      },
    ])
    .then((answers) => {
      const action = answers["action"];
      switch (action) {
        case "Criar conta":
          createAccount();
          break;
        case "2- Consultar saldo":
          consult();
          break;
        case "3- Depositar":
          deposit();
          break;
        case "4- Sacar":
          withdraw();
          break;
        default:
          console.log("Digite um valor de entrada aceito!");
      }
    })
    .catch((err) => console.log());
}

function withdraw() {
  console.log(chalk.bgYellow.black("Insira o nome da conta"));
  inquirer
    .prompt([
      {
        name: "accountInformed",
      },
    ])
    .then((answers) => {
      const informed = answers["accountInformed"];

      if (!checkAccount(informed)) {
        operation();
      }

      inquirer
        .prompt([
          {
            name: "amount",
            message: "Valor de saque:",
          },
        ])
        .then((answers) => {
          const amount = answers["amount"];

          withdrawValue(amount, informed);
          operation();
        })
        .catch((err) => console.log(err));
    });
}

function consult() {
  console.log(chalk.bgYellow.black("Insira o nome da conta"));
  inquirer
    .prompt([
      {
        name: "accountInformed",
      },
    ])
    .then((answers) => {
      const informed = answers["accountInformed"];

      if (!checkAccount(informed)) {
        operation();
      }

      const conta = getAccount(informed);
      console.log(
        chalk.bgYellow.black(`Saldo da conta: ${parseFloat(conta.balance)}`)
      );
      return operation();
    });
}

function checkAccount(accountInformed) {
  if (!fs.existsSync(`accounts/${accountInformed}.json`)) {
    console.log(chalk.bgRed.black("Esta conta nao existe"));
    return false;
  }
  return true;
}

function deposit() {
  console.log(chalk.bgYellow.black("Insira o nome da conta"));
  inquirer
    .prompt([
      {
        name: "accountInformed",
      },
    ])
    .then((answers) => {
      const informed = answers["accountInformed"];

      if (!checkAccount(informed)) {
        operation();
      }

      inquirer
        .prompt([
          {
            name: "amount",
            message: "Valor do deposito:",
          },
        ])
        .then((answers) => {
          const amount = answers["amount"];

          addAmout(amount, informed);
          operation();
        })
        .catch((err) => console.log(err));
    });
}

function buildAccount() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Digite um nome para sua conta:",
      },
    ])
    .then((answers) => {
      const accountName = answers["accountName"];

      if (!fs.existsSync("accounts")) {
        fs.mkdirSync("accounts");
      }

      if (fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(
          chalk.bgRed.black("Esta conta já existe, escolha outro nome!")
        );
        buildAccount(); // Volta para o início do processo de criação de conta
        return; // Retorna para evitar que o código continue a ser executado
      }

      try {
        // Usa `writeFileSync` em um bloco `try...catch` para lidar com erros.
        fs.writeFileSync(
          `accounts/${accountName}.json`,
          '{"balance":0}',
          (err) => {
            console.log(err);
          }
        );
        console.log(
          chalk.bgGreen.black("Parabéns, a sua conta foi criada com sucesso!")
        );
        operation();
      } catch (err) {
        console.log(
          chalk.bgRed.black("Ocorreu um erro ao criar a conta:"),
          err
        );
      }
    })
    .catch((err) => console.log());
}

function createAccount() {
  console.log(chalk.bgGreen.black("Obrigado por escoher o nosso banco"));
  console.log(chalk.green("Defina as opções para a criação do banco"));
  buildAccount();
}

function addAmout(amount, accountName) {
  if (!amount) {
    console.log(chalk.bgRed.black("Insira um valor para o deposito"));
    return deposit();
  }
  const accountData = getAccount(accountName);

  accountData.balance = parseFloat(amount) + parseFloat(accountData.balance);
  fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(accountData),
    function (err) {
      console.log(err);
    }
  );

  console.log(chalk.bgGreen.black("Deposito realizado com sucesso"));
  operation();
}

function withdrawValue(amount, accountName) {
  if (!amount) {
    console.log(chalk.bgRed.black("Insira um valor para o saque"));
    return deposit();
  }
  const accountData = getAccount(accountName);

  accountData.balance = parseFloat(accountData.balance) - parseFloat(amount);
  fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(accountData),
    function (err) {
      console.log(err);
    }
  );

  console.log(chalk.bgGreen.black("Saque realizado com sucesso"));
  operation();
}

function getAccount(accountName) {
  const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
    encoding: "utf-8",
    flag: "r",
  });
  return JSON.parse(accountJSON);
}

operation();
