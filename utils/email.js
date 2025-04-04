require("dotenv").config();
const nodemailer = require("nodemailer");

const sendEmail = async () => {
  console.log("Iniciando o envio de e-mail...");

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // Usuário do e-mail
      pass: process.env.EMAIL_PASS, // Senha do e-mail
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
