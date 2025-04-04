describe("Enviar e-mail com sucesso", () => {
  it("Enviar e-mail e consultar logs", () => {
    cy.wait(5000);
    cy.task("sendEmailTask").then((result) => {
      cy.log("Resultado do envio de e-mail:", result);
    });
  });
});
