Cypress.on("uncaught:exception", (err, runnable) => {
  // Retorna false para impedir que o Cypress falhe o teste
  return false;
});

import "./commands";
