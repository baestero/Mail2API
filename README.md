# Mail2API Integration

### Descrição

Este projeto utiliza **Node.js** e **Cypress** para validar APIs que têm como **endpoint um endereço de e-mail**. Ele permite o envio de arquivos XML por e-mail para plataformas de integração, com logs detalhados e configuração simples. Ideal para casos de uso onde o e-mail é utilizado como um ponto de comunicação entre sistemas.

---

## Estrutura do Projeto

- **Node.js**: Envio de e-mails via `nodemailer`.
- **Cypress**: Teste automatizado para validar o funcionamento do envio de e-mails e integração com APIs baseadas em e-mail.
- **Dotenv**: Configuração de variáveis de ambiente para garantir segurança e flexibilidade.

---

## Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/mail2api.git
cd mail2api
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

- Copie o arquivo `env.example` como `.env`:
  ```bash
  cp .env.example .env
  ```
- Edite o arquivo `.env` com suas credenciais:
  ```plaintext
  EMAIL_USER=seu-email@gmail.com
  EMAIL_PASS=sua-senha
  EMAIL_TO=email-destino@gmail.com
  ```

### 4. Configuração do serviço de e-mail

Se estiver utilizando **Gmail** como serviço:

- **Crie ou use uma conta existente no Gmail**.
- Ative a **autenticação de dois fatores** na conta.
- **Gere uma senha de aplicativo** na seção de segurança da conta Google.
- Copie e cole essa senha na variável `EMAIL_PASS` no arquivo `.env`.

---

## Uso

### Rodar Testes com Cypress

1. Abra o Cypress:
   ```bash
   npx cypress open
   ```
2. Execute o teste descrito em `cypress/e2e/test.cy.js`:

```javascript
describe("Enviar e-mail com sucesso", () => {
  it("Enviar e-mail e consultar logs", () => {
    cy.wait(5000);
    cy.task("sendEmailTask").then((result) => {
      cy.log("Resultado do envio de e-mail:", result);
    });
  });
});
```

Este teste usa a task `sendEmailTask`, definida no arquivo de configuração do Cypress, para enviar um e-mail e registrar os logs.

---

### Arquivo `email.js`

O arquivo responsável pelo envio de e-mails utiliza `nodemailer` e pode ser ajustado conforme suas necessidades. Exemplo básico:

```javascript
const sendEmail = async () => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_TO,
    subject: "Teste de E-mail com Anexo",
    text: "Este é um teste de envio de e-mail com o Nodemailer e um anexo!",
    attachments: [
      {
        filename: "tst.xml",
        path: "utils/tst.xml",
      },
    ],
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("E-mail enviado: " + info.response);
    return "E-mail enviado com sucesso!";
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    throw error;
  }
};

module.exports = sendEmail;
```

---

### Arquivo `cypress.config.js`

O arquivo de configuração do Cypress é responsável por integrar a lógica de envio de e-mails e gerenciar as tasks durante os testes. Aqui está a configuração:

```javascript
const { defineConfig } = require("cypress");
const sendEmail = require("./utils/email.js");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        sendEmailTask() {
          console.log("Tarefa sendEmailTask iniciada");
          return sendEmail()
            .then((result) => {
              console.log("Tarefa sendEmailTask concluída:", result);
              return result;
            })
            .catch((error) => {
              console.error("Erro ao enviar e-mail:", error);
              throw error;
            });
        },
      });

      return config;
    },
  },
});
```

#### Explicação

- **`sendEmailTask`**: Uma task Cypress personalizada que chama a função `sendEmail` para enviar e-mails diretamente do código.
- **Logs**: O console exibe mensagens indicando o início, sucesso ou falha da tarefa.
- **Flexibilidade**: Esta integração facilita o uso do Cypress para automatizar testes que envolvem envio de e-mails.

---

## Estrutura do `.env.example`

Aqui está o arquivo `env.example`, que deve ser preenchido com os dados do usuário:

```plaintext
EMAIL_USER=seu-email@gmail.com
EMAIL_PASS=sua-senha-do-app
EMAIL_TO=email-destino@gmail.com
```

Certifique-se de que o arquivo `.env` nunca seja enviado ao repositório, incluindo-o no `.gitignore`.

---

## Contribuições

Contribuições são bem-vindas! Para colaborar:

1. Fork este repositório.
2. Crie uma branch para sua funcionalidade ou correção: `git checkout -b minha-feature`.
3. Envie suas alterações: `git push origin minha-feature`.

---

## Licença

Este projeto está licenciado sob a licença **MIT**. Consulte o arquivo `LICENSE` para mais informações.

---
