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
  video: true,
  viewportWidth: 2560,
  viewportHeight: 1440,
});
